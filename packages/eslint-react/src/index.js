module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  plugins: ['babel', 'cypress', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'no-undef': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error'
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        }
      }
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'consistent-return': 'off',
    'no-console': 'off',
    'no-undef': 'error',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'error',
    'no-shadow': 0,
    'func-names': 'off',
    'prefer-destructuring': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'max-lines': ['error', { max: 250, skipComments: true }],
    'babel/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always'
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        tsx: 'never',
        ts: 'never'
      }
    ]
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'cypress/globals': true
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: 'src'
      }
    },
    react: {
      version: 'detect'
    }
  }
};
