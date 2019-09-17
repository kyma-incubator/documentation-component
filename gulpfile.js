const join = require("path").join;
const tsconfigPath = join(__dirname, "./tools/gulp/tsconfig.json");

require("ts-node").register({
  project: tsconfigPath,
});
require("./tools/gulp/gulpfile");
