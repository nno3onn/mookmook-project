module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/prefer-stateless-function": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-nested-ternary": 0,
    "arrow-body-style": 0,
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    "react/jsx-no-bind": 0,
    "prefer-const": 0,
    "import/order": 0,
    "react/jsx-boolean-value": 0,
    "max-classes-per-file": 0,
    "no-useless-valid-typeof": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "react/no-array-index-key": 0,
    "no-useless-constructor": 0,
    "react/state-in-constructor": 0,
    "react/sort-comp": 0,
    "no-unused-expressions": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "valid-typeof": 0,
    "no-plusplus": 0,
    "eslint-disable": 0,
    "spaced-comment": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-unused-vars": 0,
    "array-callback-return": 0,
    "prefer-destructuring": 0,
    "no-return-assign": 0,
    "react/no-unused-state": 0,
    "react/no-access-state-in-setstate": 0,
    "prefer-const": 0,
    "no-useless-catch": 0,
    "react/button-has-type": 0,
    "react/no-unescaped-entities": 0,
    "no-restricted-globals": 0,
    "eslint-disable-next-line react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    camelcase: 0,
    "no-console": 0,
    "no-undef": 0,
    "class-methods-use-this": 0,
    "no-const-assign": 0,
    "lines-between-class-members": 0,
    "default-case": 0,
    "prefer-template": 0,
    "object-shorthand": 0,
    "no-array-constructor": 0,
    "lines-between-class-members": 0,
    "no-use-before-define": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
};
