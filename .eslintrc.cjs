module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/strict-type-checked", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
