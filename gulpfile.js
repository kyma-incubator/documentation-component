const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const deleteEmpty = require("delete-empty");
const childProcess = require("child_process");
const log = require("fancy-log");
const clc = require("cli-color");
const { promisify } = require("util");

process.on("unhandledRejection", err => {
  throw err;
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
  [odataReact]: odataReact,
};

const modules = Object.keys(packages);
const rollupModules = Object.keys(rollupPackages);
const distId = process.argv.indexOf("--dist");
const dist = distId < 0 ? sources : process.argv[distId + 1];

gulp.task("install:packages", async () => {
  const packagesFolder = path.join(__dirname, sources);
  await install(packagesFolder);
});

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
    gulp
      .src(`${packageName}/lib/**`)
      .pipe(gulp.dest(`${dist}/${packageNames[mod]}/lib`));
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
gulp.task("build", gulp.series("build:rollup", "build:normal"));
gulp.task(
  "build:dev",
  gulp.series("build:rollup", modules.map(mod => `${mod}:dev`)),
);

gulp.task("watch", () => {
  modules.forEach(mod => {
    gulp.watch(
      [
        `${sources}/${mod}/src/**/*.ts`,
        `${sources}/${mod}/src/*.ts`,
        `${sources}/${mod}/src/**/*.tsx`,
        `${sources}/${mod}/src/*.tsx`,
      ],
      gulp.series(mod),
    );
  });
  rollupModules.forEach(mod => {
    gulp.watch(
      [
        `${sources}/${mod}/src/**/*.ts`,
        `${sources}/${mod}/src/*.ts`,
        `${sources}/${mod}/src/**/*.tsx`,
        `${sources}/${mod}/src/*.tsx`,
      ],
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

gulp.task("clean:output", () => {
  return gulp
    .src(
      [
        `${sources}/*/lib/**/*.js`,
        `${sources}/*/lib/**/*.jsx`,
        `${sources}/*/lib/**/*.d.ts`,
        `${sources}/*/lib/**/*.js.map`,
      ],
      {
        read: false,
      },
    )
    .pipe(clean());
});
gulp.task("clean:dirs", done => {
  deleteEmpty.sync(`${sources}/`);
  done();
});
gulp.task("clean:bundle", gulp.series("clean:output", "clean:dirs"));

const install = async folder => {
  const directories = getDirs(folder);
  const execFile = promisify(childProcess.execFile);

  const promises = directories.map(async dir => {
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
  });
  await Promise.all(promises);
};

const buildByRollup = async dir => {
  const execFile = promisify(childProcess.execFile);

  log.info(`Building package ${clc.magenta(dir.replace(__dirname, ""))}`);
  try {
    await execFile(`yarn`, ["build"], {
      cwd: dir,
    });
  } catch (err) {
    log.error(`Failed building dependencies of ${dir}`);
    throw err;
  }
};

const filterFolders = dir => {
  return fs.readdirSync(dir).filter(file => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};
const getDirs = base => filterFolders(base).map(path => `${base}/${path}`);

function removeKymaPrefixFromPackage(packageName) {
  const name = packageName.replace("@kyma-project/", "");
  return name.replace("dc-", "");
}
