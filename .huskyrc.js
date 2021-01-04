module.exports = {
  hooks: {
    'pre-push': 'npm-run-all prettier:report eslint:report markdownlint:report'
  }
};
