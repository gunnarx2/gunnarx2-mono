module.exports = {
  preset: 'ts-jest',
  testRegex: '(\\.|/)test\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  verbose: true,
  testPathIgnorePatterns: ['node_modules', 'lib']
};
