module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
    page: true,
    DEFAULT_SCHOOLID: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: ['**/tests/**.js', '/mock/**.js', '**/**.test.js'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0, // 自定义函数使用_开头 -- by hjl
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // 一元运算符例如++可用 -- by hjl
    // 'linebreak-style': ['off', 'windows'],
    'no-param-reassign': 1,
    'react/no-did-update-set-state': 0, // componentDidUpdate里面使用setState，注意做好判断避免死循环 -- by hjl
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'react/no-array-index-key': 0,    // 关闭使用index作为key的检查
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
