module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
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
          '@@domain': './src/domain',
        },
      },
    ],
  ],
};
