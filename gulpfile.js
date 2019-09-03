const fse = require("fs-extra");
const path = require("path");
const gulp = require("gulp");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const deleteEmpty = require("delete-empty");
const childProcess = require("child_process");
const log = require("fancy-log");
const clc = require("cli-color");
const { promisify } = require("util");

sass.compiler = require("node-sass");

const execFile = promisify(childProcess.execFile);

process.on("unhandledRejection", function(reason, p) {
  console.error(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason,
  );
  process.exit(1);
});

const documentationComponent = removeKymaPrefixFromPackage(
  require("./packages/documentation-component/package.json").name,
);
const odataReact = removeKymaPrefixFromPackage(
  require("./packages/odata-react/package.json").name,
);
const markdownRenderEngine = removeKymaPrefixFromPackage(
  require("./packages/markdown-render-engine/package.json").name,
);
const openApiRenderEngine = removeKymaPrefixFromPackage(
  require("./packages/open-api-render-engine/package.json").name,
);
const asyncApiRenderEngine = removeKymaPrefixFromPackage(
  require("./packages/async-api-render-engine/package.json").name,
);
const odataRenderEngine = removeKymaPrefixFromPackage(
  require("./packages/odata-render-engine/package.json").name,
);

const sources = "packages";
const packageNames = {
  [documentationComponent]: documentationComponent,
  [odataReact]: odataReact,
  [markdownRenderEngine]: `dc-${markdownRenderEngine}`,
  [openApiRenderEngine]: `dc-${openApiRenderEngine}`,
  [asyncApiRenderEngine]: `dc-${asyncApiRenderEngine}`,
  [odataRenderEngine]: `dc-${odataRenderEngine}`,
};

const packages = {
  [odataReact]: ts.createProject(`${sources}/${odataReact}/tsconfig.prod.json`),
  [markdownRenderEngine]: ts.createProject(
    `${sources}/${markdownRenderEngine}/tsconfig.json`,
  ),
  [openApiRenderEngine]: ts.createProject(
    `${sources}/${openApiRenderEngine}/tsconfig.json`,
  ),
  [asyncApiRenderEngine]: ts.createProject(
    `${sources}/${asyncApiRenderEngine}/tsconfig.json`,
  ),
  [odataRenderEngine]: ts.createProject(
    `${sources}/${odataRenderEngine}/tsconfig.json`,
  ),
};
const rollupPackages = {
  [documentationComponent]: documentationComponent,
};

const modules = Object.keys(packages);
const rollupModules = Object.keys(rollupPackages);
const allModules = [...modules, ...rollupModules];

const distId = process.argv.indexOf("--dist");
const dist = distId < 0 ? sources : process.argv[distId + 1];

const install = async () => {
  return Promise.all(
    allModules.map(mod => {
      const packageName = path.resolve(__dirname, `${sources}/${mod}`);
      return installPackage(packageName);
    }),
  );
};
const installPackage = async dir => {
  log.info(
    `Installing dependencies of ${clc.magenta(dir.replace(__dirname, ""))}`,
  );
  try {
    await execFile(`yarn`, ["install"], {
      cwd: dir,
    });
  } catch (err) {
    log.error(`Failed installing dependencies of ${dir}`);
    throw err;
  }
};

const scss = done => {
  allModules.forEach(mod => {
    gulp
      .src(`${path.resolve(sources, mod)}/src/*.scss`)
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(gulp.dest(`${path.resolve(sources, mod)}/lib`));
  });
  done();
};

modules.forEach(mod => {
  gulp.task(mod, () => {
    return packages[mod]
      .src()
      .pipe(packages[mod]())
      .pipe(
        gulp.dest(`${dist}/${dist === sources ? mod : packageNames[mod]}/lib`),
      );
  });
});

rollupModules.forEach(mod => {
  gulp.task(`${mod}:rollup`, async () => {
    const packageName = path.resolve(__dirname, `${sources}/${mod}`);

    await buildByRollup(packageName);
    if (
      `${packageName}/lib` !== `${__dirname}/${dist}/${packageNames[mod]}/lib`
    ) {
      await fse.copy(`${packageName}/lib`, `${dist}/${packageNames[mod]}/lib`);
    }
  });
});

modules.forEach(mod => {
  gulp.task(`${mod}:dev`, () => {
    return packages[mod]
      .src()
      .pipe(sourcemaps.init())
      .pipe(packages[mod]())
      .pipe(
        sourcemaps.mapSources(sourcePath => `./${sourcePath.split("/").pop()}`),
      )
      .pipe(sourcemaps.write("."))
      .pipe(
        gulp.dest(`${dist}/${dist === sources ? mod : packageNames[mod]}/lib`),
      );
  });
});

gulp.task(
  "build:rollup",
  gulp.series(rollupModules.map(mod => `${mod}:rollup`)),
);

gulp.task("build:normal", gulp.series(modules));

gulp.task("build", gulp.series("build:rollup", "build:normal", scss));

gulp.task(
  "build:dev",
  gulp.series("build:rollup", modules.map(mod => `${mod}:dev`, scss)),
);

gulp.task("watch", () => {
  modules.forEach(mod => {
    gulp.watch(
      [`${sources}/${mod}/src/**/*.ts`, `${sources}/${mod}/src/**/*.tsx`],
      gulp.series(mod),
    );
  });
  rollupModules.forEach(mod => {
    gulp.watch(
      [`${sources}/${mod}/src/**/*.ts`, `${sources}/${mod}/src/**/*.tsx`],
      gulp.series(`${mod}:rollup`),
    );
  });
});

gulp.task("copy-misc", () => {
  return gulp
    .src(["LICENSE", ".npmignore"])
    .pipe(gulp.dest(`${sources}/${documentationComponent}`))
    .pipe(gulp.dest(`${sources}/${odataReact}`))
    .pipe(gulp.dest(`${sources}/${markdownRenderEngine}`))
    .pipe(gulp.dest(`${sources}/${openApiRenderEngine}`))
    .pipe(gulp.dest(`${sources}/${asyncApiRenderEngine}`))
    .pipe(gulp.dest(`${sources}/${odataRenderEngine}`));
});

const cleanOutput = () =>
  gulp
    .src(
      [
        `${sources}/*/lib/**/*.js`,
        `${sources}/*/lib/**/*.d.ts`,
        `${sources}/*/lib/**/*.jsx`,
        `${sources}/*/lib/**/*.js.map`,
        `${sources}/*/lib/**/*.css`,
      ],
      {
        read: false,
      },
    )
    .pipe(clean());

const cleanDirs = done => {
  deleteEmpty.sync(`${sources}/`);
  done();
};

const cleanBundle = gulp.series(cleanOutput, cleanDirs);

const buildByRollup = async dir => {
  log.info(`Building package ${clc.magenta(dir.replace(__dirname, ""))}`);
  try {
    await await execFile(`yarn`, ["build"], {
      cwd: dir,
    });
  } catch (err) {
    log.error(`Failed building package ${dir}`);
    throw err;
  }
};

function removeKymaPrefixFromPackage(packageName) {
  const name = packageName.replace("@kyma-project/", "");
  return name.replace("dc-", "");
}

module.exports = { scss, install, cleanBundle };
