module.exports = {
  extends: ['@gunnarx2/eslint-react'],
  rules: {
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: ['div']
      }
    ]
  }
};
