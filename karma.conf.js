module.exports = function (config) {
    config.set({
      frameworks: ['jasmine'],
      browsers: ['HeadlessChrome'],
      reporters: ['dots'],
      singleRun: true,
      autoWatch: false,
      files: [
        'src/**/*.spec.ts'
      ],
      // Configura otras opciones según tus necesidades
    });
  };
  