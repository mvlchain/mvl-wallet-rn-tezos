module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
    plugins: [
      ['module:react-native-dotenv', { moduleName: '@env' }],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            crypto: 'react-native-quick-crypto',
            stream: 'stream-browserify',
            buffer: '@craftzdog/react-native-buffer',
          },
        },
        'shim-resolver',
      ],
      ['@babel/plugin-proposal-numeric-separator'],
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx'],
          alias: {
            // `yarn start --reset-cache` is needed when you add new alias
            '@@assets': './src/assets',
            '@@components': './src/components',
            '@@config': './src/config',
            '@@hooks': './src/hooks',
            '@@screens': './src/screens',
            '@@utils': './src/utils',
            '@@types': './src/types',
            '@@store': './src/store',
            '@@style': './src/style',
            '@@domain': './src/domain',
            '@@navigation': './src/navigation',
            '@@constants': './src/constants',
            '@@generated': './src/generated',
            '@@test': './src/test',
            '@@mocks': './__mocks__',
          },
        },
      ],
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__scanCodes'],
        },
      ],
    ],
  };
};
