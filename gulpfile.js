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

const sources = "packages";

const documentationComponent = removeKymaPrefixFromPackage(require("./packages/documentation-component/package.json").name);
const odataReact = removeKymaPrefixFromPackage(require("./packages/odata-react/package.json").name);
const markdownRenderEngine = removeKymaPrefixFromPackage(require("./packages/markdown-render-engine/package.json").name);
const openApiRenderEngine = removeKymaPrefixFromPackage(require("./packages/open-api-render-engine/package.json").name);
const asyncApiRenderEngine = removeKymaPrefixFromPackage(require("./packages/async-api-render-engine/package.json").name);
const odataRenderEngine = removeKymaPrefixFromPackage(require("./packages/odata-render-engine/package.json").name);

const packageNames = {
  [documentationComponent]: documentationComponent,
  [odataReact]: odataReact,
  [markdownRenderEngine]: `dc-${markdownRenderEngine}`,
  [openApiRenderEngine]: `dc-${openApiRenderEngine}`,
  [asyncApiRenderEngine]: `dc-${asyncApiRenderEngine}`,
  [odataRenderEngine]: `dc-${odataRenderEngine}`,
};
const packages = {
  [documentationComponent]: ts.createProject(
    `${sources}/${documentationComponent}/tsconfig.json`,
  ),
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

const modules = Object.keys(packages);
const distId = process.argv.indexOf("--dist");
const dist = distId < 0 ? sources : process.argv[distId + 1];

function removeKymaPrefixFromPackage(packageName) {
  const name = packageName.replace("@kyma-project/", "");
  return name.replace("dc-", "");
}

gulp.task("install:packages", async () => {
  const packagesFolder = path.join(__dirname, sources);
  await install(packagesFolder);
});

gulp.task("watch", () => {
  modules.forEach(mod => {
    gulp.watch(
      [
        `${sources}/${mod}/**/*.ts`,
        `${sources}/${mod}/*.ts`,
        `${sources}/${mod}/**/*.tsx`,
        `${sources}/${mod}/*.tsx`,
      ],
      [mod],
    );
  });
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
gulp.task("build", gulp.series(modules));

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
gulp.task("build:dev", gulp.series(modules.map(mod => `${mod}:dev`)));

gulp.task("copy-misc", () => {
  return gulp
    .src(["LICENSE", ".npmignore"])
    .pipe(gulp.dest(`${sources}/${documentationComponent}`))
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
  const exec = promisify(childProcess.exec);

  const promises = directories.map(async dir => {
    log.info(
      `Installing dependencies of ${clc.magenta(dir.replace(__dirname, ""))}`,
    );
    try {
      await exec(`npm install --no-shrinkwrap --prefix ${dir}`);
    } catch (err) {
      log.error(`Failed installing dependencies of ${dir}`);
      throw err;
    }
  });
  await Promise.all(promises);
};

const filterFolders = dir => {
  return fs.readdirSync(dir).filter(file => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};
const getDirs = base => filterFolders(base).map(path => `${base}/${path}`);
