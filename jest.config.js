module.exports = {
  preset: '@testing-library/react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
        babelConfig: true,
      },
    ],
  },
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(@react-native|react-native|rn-fetch|redux-persist-filesystem|@react-navigation|@react-native-community|@react-native-masked-view|react-navigation|react-navigation-redux-helpers|@sentry))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/ImageMock.js',
    '^@env$': '<rootDir>/jest/env.js',
  },
  snapshotResolver: './snapshot-resolver.js',
};
