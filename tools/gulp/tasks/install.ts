import { task } from "gulp";
import log from "fancy-log";
import clc from "cli-color";

import { execFile, getPackageDir } from "../util";
import { packagesDirs } from "../constants";

async function installPackage(dir: string, packageName: string) {
  log.info(`Installing dependencies of ${clc.magenta(packageName)}`);

  try {
    await execFile(`yarn`, ["install"], {
      cwd: dir,
    });
  } catch (err) {
    log.error(`Failed installing dependencies of ${packageName}`);
    throw err;
  }
}

async function install() {
  return Promise.all(
    packagesDirs.map(packageName =>
      installPackage(getPackageDir(packageName), packageName),
    ),
  );
}

task("install", install);
