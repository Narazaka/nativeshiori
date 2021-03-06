module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['detectBrowsers', 'mocha'],
    plugins: [
      'karma-mocha',
      'karma-mocha-own-reporter',
      'karma-edge-launcher',
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
      require.resolve('power-assert/build/power-assert'),
      require.resolve('kawari.js/kawari.js'),
      require.resolve('browserfs/dist/browserfs'),
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
      usePhantomJS: false,
      postDetection: function(availableBrowsers) {
        var result = availableBrowsers;
        var chromeIndex = availableBrowsers.indexOf('Chrome');
        if (chromeIndex >= 0) {
          result.splice(chromeIndex, 1);
          result.push('ChromeHeadless');
        }
        result.push('Electron');
        return result;
      },
    },
    espowerPreprocessor: {
      transformPath: function(path) {
        return path.replace(/\.js/, '.espowered.js');
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
