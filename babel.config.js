module.exports = {
  presets: [
    ["@babel/env", { modules: false }],
    "@babel/preset-react",
    "@babel/typescript",
  ],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
      },
    ],
    "@babel/plugin-transform-runtime",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-async-generator-functions",
  ],
};
