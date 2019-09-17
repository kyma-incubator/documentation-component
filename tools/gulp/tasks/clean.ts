import { task, src, series } from "gulp";
// @ts-ignore
import deleteEmpty from "delete-empty";
// @ts-ignore
import clean from "gulp-clean";

import { PACKAGES_DIR } from "../constants";

function cleanOutputs() {
  src([`${PACKAGES_DIR}/*/lib`], {
    read: false,
  }).pipe(clean());
}

function cleanDirs(done: () => void) {
  deleteEmpty.sync(`${PACKAGES_DIR}/`);
  done();
}

task("clean-bundles", series(cleanOutputs, cleanDirs));
