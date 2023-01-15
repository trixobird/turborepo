module.exports = {
  extends: ["next", "turbo", "prettier"],
  ignorePatterns: ["dist/**/*"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "semi": "warn"
  },
};
