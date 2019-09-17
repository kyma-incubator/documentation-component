import { task, src, dest } from "gulp";

import { getPackageDir } from "../util";
import { packagesDirs } from "../constants";

function prePublish(): NodeJS.ReadWriteStream {
  const files = src(["LICENSE", ".npmignore"]);

  return packagesDirs.reduce(
    (stream, packagePath: string) =>
      stream.pipe(dest(getPackageDir(packagePath))),
    files,
  );
}

task("pre-publish", prePublish);
