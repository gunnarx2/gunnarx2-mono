const path = require('path');

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [__dirname, path.join(__dirname, '../../')]
      }
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: ['div']
      }
    ]
  }
};
