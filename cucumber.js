const { format } = require("node:path");

module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    paths: ["tests/e2e/cucumber/features/**/*.feature"],
    require: [
      "tests/e2e/cucumber/steps/**/*.ts",
      "tests/e2e/cucumber/support/**/*.ts",
    ],

    format: [
      "progress-bar",
      "html:cucumber-report.html",
      "allure-cucumberjs/reporter",
    ],

    formatOptions: {
      colorsEnabled: true,
      dummyFormart: false,
      resultsDir: "allure-results",
    },
  },
};
