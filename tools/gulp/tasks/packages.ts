import { task, watch, series, dest, src } from "gulp";
import { createProject } from "gulp-typescript";
import sass from "gulp-sass";

/* tslint:disable */
// @ts-ignore
sass.compiler = require("node-sass");
/* tslint:enable */

import {
  getPackageTSConfig,
  getPackageDir,
  getDestination,
  getNodeModulesDestination,
} from "../util";
import { PACKAGES_DIR, PACKAGES, Packages, packagesDirs } from "../constants";

const packages = packagesDirs
  .map(pack => ({
    [pack]: createProject(getPackageTSConfig(pack)),
  }))
  .reduce(
    (obj, item) => ({
      ...obj,
      [Object.keys(item)[0]]: item[Object.keys(item)[0]],
    }),
    {},
  );

packagesDirs.forEach(packageName => {
  task(`${packageName}:build`, () => buildPackage(packageName));
  task(`${packageName}:build:dev`, () => buildPackageDev(packageName));
  task(`${packageName}:sass`, () => transpileSASS(packageName));
  task(`${packageName}:sass:dev`, () => transpileSASSDev(packageName));
});

function watchForChanges() {
  packagesDirs.forEach(packageName => {
    watch(
      [
        `${PACKAGES_DIR}/${packageName}/src/**/*.ts`,
        `${PACKAGES_DIR}/${packageName}/src/**/*.tsx`,
      ],
      series(`${packageName}:build`),
    );
    watch(
      [`${PACKAGES_DIR}/${packageName}/src/**/*.scss`],
      series(`${packageName}:sass`),
    );
  });
  watch(
    [`${Packages[PACKAGES.OPEN_API_RE]}/src/assets/**/*`],
    series(copyOpenApiStyleAssets),
  );
}

function buildPackage(packageName: string) {
  return packages[packageName]
    .src()
    .pipe(packages[packageName]())
    .pipe(dest(getDestination(packageName)));
}

function buildPackageDev(packageName: string) {
  return packages[packageName]
    .src()
    .pipe(packages[packageName]())
    .pipe(dest(getNodeModulesDestination(packageName)));
}

function transpileSASS(packageName: string) {
  return src(`${getPackageDir(packageName)}/src/**/*.scss`)
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(getDestination(packageName)));
}

function transpileSASSDev(packageName: string) {
  return src(`${getPackageDir(packageName)}/src/**/*.scss`)
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(getNodeModulesDestination(packageName)));
}

function copyOpenApiStyleAssets() {
  return src(
    `${PACKAGES_DIR}/${Packages[PACKAGES.OPEN_API_RE]}/src/assets/**/*`,
  ).pipe(dest(`${getDestination(Packages[PACKAGES.OPEN_API_RE])}/assets`));
}

function copyOpenApiStyleAssetsDev() {
  return src(
    `${PACKAGES_DIR}/${Packages[PACKAGES.OPEN_API_RE]}/src/assets/**/*`,
  ).pipe(
    dest(`${getNodeModulesDestination(Packages[PACKAGES.OPEN_API_RE])}/assets`),
  );
}

task("build", series(packagesDirs.map(packageName => `${packageName}:build`)));
task(
  "build:dev",
  series(packagesDirs.map(packageName => `${packageName}:build:dev`)),
);
task("sass", series(packagesDirs.map(packageName => `${packageName}:sass`)));
task(
  "sass:dev",
  series(packagesDirs.map(packageName => `${packageName}:sass:dev`)),
);
task("open-api-assets", copyOpenApiStyleAssets);
task("open-api-assets:dev", copyOpenApiStyleAssetsDev);
task("watch", watchForChanges);
