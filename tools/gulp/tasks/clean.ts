import { task, src, series } from "gulp";
// @ts-ignore
import deleteEmpty from "delete-empty";
// @ts-ignore
import clean from "gulp-clean";

import { PACKAGES_DIR } from "../constants";

function cleanLib(done: () => void) {
  src([`${PACKAGES_DIR}/*/lib`], {
    read: false,
  }).pipe(clean());
  done();
}

function cleanNodeModules(done: () => void) {
  src([`${PACKAGES_DIR}/*/node_modules`], {
    read: false,
  }).pipe(clean());
  done();
}

function cleanEmpty(done: () => void) {
  deleteEmpty.sync(`${PACKAGES_DIR}/`);
  done();
}

function cleanPackageLocks(done: () => void) {
  src([`${PACKAGES_DIR}/*/package-lock.json`], {
    read: false,
  }).pipe(clean());
  done();
}

task("clean-bundles", series(cleanNodeModules, cleanLib, cleanEmpty));
task("clean-package-locks", cleanPackageLocks);
