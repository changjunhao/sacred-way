module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  overrides: [
    {
      files: ['*.config.js', 'babel.config.js'],
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
};
