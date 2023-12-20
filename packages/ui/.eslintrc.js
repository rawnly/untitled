/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
