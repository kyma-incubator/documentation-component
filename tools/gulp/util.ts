import { promisify } from "util";
import childProcess from "child_process";

import {
  TS_CONFIG_FILE,
  ORGANIZATION_DIR,
  PACKAGES_DIR,
  PackageNames,
} from "./constants";

export const execFile = promisify(childProcess.execFile);

export function getPackageDir(packageName: string): string {
  return `${PACKAGES_DIR}/${packageName}`;
}

export function getPackageTSConfig(packageName: string): string {
  return `${PACKAGES_DIR}/${packageName}/${TS_CONFIG_FILE}`;
}

export function getDestination(packageName: string): string {
  return `${PACKAGES_DIR}/${packageName}/lib`;
}

export function getNodeModulesDestination(packageName: string): string {
  return `node_modules/${ORGANIZATION_DIR}/${PackageNames[packageName]}/lib`;
}
