var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['detectBrowsers', 'mocha'],
    plugins: [
      'karma-mocha',
      'karma-mocha-own-reporter',
      'karma-ie-launcher',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-electron',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-detect-browsers',
      'karma-coverage',
      'karma-espower-preprocessor',
    ],
    files: [
      require.resolve('mocha-lazy-bdd/dist/mocha-lazy-bdd'),
      require.resolve('power-assert/build/power-assert'),
      require.resolve('kawari.js/kawari.js'),
      require.resolve('browserfs/dist/browserfs'),
      'mock/mocha-lazy-bdd.js',
      'nativeshiori.js',
      'nativeshiori-encode.js',
      'test/**/*.js',
    ],
    exclude: ['**/*.swp'],
    preprocessors: {
      'src/**/*.js': ['espower', 'coverage'],
      'test/**/*.js': ['espower'],
    },
    coverageReporter: {
      reporters: [{type: 'lcov'}],
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        '**/*.js': 'isparta',
      },
      instrumenterOptions: {
        isparta: {
          babel: {
            presets: ['power-assert'],
            sourceMap: true,
          },
        },
      },
    },
    reporters: ['mocha-own', 'coverage'],
    detectBrowsers: {
      postDetection: function(availableBrowsers) {
        const result = availableBrowsers;
        if (process.env.TRAVIS) {
          const chrome_index = availableBrowsers.indexOf('Chrome');
          if (chrome_index >= 0) {
            result.splice(chrome_index, 1);
            result.push('Chrome_travis_ci');
          }
        }
        const phantom_index = availableBrowsers.indexOf('PhantomJS');
        if (phantom_index >= 0) result.splice(phantom_index, 1);
        result.push('Electron');
        return result;
      },
    },
    espowerPreprocessor: {
      transformPath: function(path) { return path.replace(/\.js/, '.espowered.js'); },
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity,
  });
};
