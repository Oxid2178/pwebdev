// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-html-reporter'),
      require('karma-tfs-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml','html', "tfs"],
    htmlReporter: {
      outputDir: 'reports',
      reportName: 'jasmine'
    },
    tfsReporter: {
      outputDir: 'reports/jasmine',
      outputFile: 'testresults.xml'
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../reports/coverage'),
      reports: ['html', 'cobertura'],
      fixWebpackSourcePaths: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};