module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: 3, proposals: true }
        }
      ]
    ],
    ignore: [
      'node_modules',
      'lib',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/setupJest.ts'
    ]
  };
};
