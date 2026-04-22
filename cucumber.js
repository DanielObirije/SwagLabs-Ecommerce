// module.exports = {
//   default: {
//     requireModule: ["ts-node/register", "tsconfig-paths/register"],
//     paths: ["tests/e2e/cucumber/features/**/*.feature"],
//     require: [
//       "tests/e2e/cucumber/steps/**/*.ts",
//       "tests/e2e/cucumber/support/**/*.ts",
//     ],

//     format: [
//       "@cucumber/pretty-formatter",
//       "html:cucumber-report.html",
//       "allure-cucumberjs/reporter",
//     ],

//     formatOptions: {
//       colorsEnabled: true,
//       dummyFormart: false,
//       resultsDir: "allure-results",
//     },
//   },
// };
module.exports = {
  default: {
    requireModule: ["ts-node/register", "tsconfig-paths/register"],

    paths: ["tests/e2e/cucumber/features/**/*.feature"],

    require: [
      "tests/e2e/cucumber/steps/**/*.ts",
      "tests/e2e/cucumber/support/**/*.ts",
    ],

    format: [
      "@cucumber/pretty-formatter",
      "summary",
      "html:cucumber-report.html",
      "allure-cucumberjs/reporter",
    ],

    formatOptions: {
      resultsDir: "allure-results",
    },
  },
};
