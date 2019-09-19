import { task, watch as watchForChanges, series, dest, src } from "gulp";
import { createProject } from "gulp-typescript";
import sass from "gulp-sass";

/* tslint:disable */
// @ts-ignore
sass.compiler = require("node-sass");
/* tslint:enable */

import { getPackageTSConfig, getPackageDir, getDestination } from "../util";
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
  task(`${packageName}:sass`, () => transpileSASS(packageName));

  const tasks: any[] = [`${packageName}:build`, `${packageName}:sass`];
  if (packageName === Packages[PACKAGES.OPEN_API_RE]) {
    tasks.push(copyOpenApiStyleAssets);
  }
  task(packageName, series(...tasks));
});

function buildPackage(packageName: string) {
  return packages[packageName]
    .src()
    .pipe(packages[packageName]())
    .pipe(dest(getDestination(packageName)));
}

function transpileSASS(packageName: string) {
  return src(`${getPackageDir(packageName)}/src/**/*.scss`)
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(getDestination(packageName)));
}

function copyOpenApiStyleAssets() {
  return src(
    `${PACKAGES_DIR}/${Packages[PACKAGES.OPEN_API_RE]}/src/assets/**/*`,
  ).pipe(dest(`${getDestination(Packages[PACKAGES.OPEN_API_RE])}/assets`));
}

function watch() {
  packagesDirs.forEach(packageName => {
    watchForChanges(
      [
        `${PACKAGES_DIR}/${packageName}/src/**/*.ts`,
        `${PACKAGES_DIR}/${packageName}/src/**/*.tsx`,
        `${PACKAGES_DIR}/${packageName}/src/**/*.scss`,
      ],
      series(packageName),
    );
    watchForChanges(
      [`${Packages[PACKAGES.OPEN_API_RE]}/src/assets/**/*`],
      series(copyOpenApiStyleAssets),
    );
  });
}

task("build", series(packagesDirs));
task("watch", watch);
