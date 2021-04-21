"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var React = _interopRequireWildcard(require("react"));

var _gatsby = require("gatsby");

// TODO: Remove for v3 - Fix janky path/asset prefixing
const withPrefix = _gatsby.withAssetPrefix || _gatsby.withPrefix;

exports.onRenderBody = ({
  setHeadComponents
}, pluginOptions) => {
  const {
    dest
  } = pluginOptions;
  const rm = dest.match(/.*public\//gm);
  const path = dest.replace(rm, '');
  setHeadComponents([/*#__PURE__*/React.createElement("link", {
    key: "gatsby-plugin-post-tailwind",
    href: withPrefix(path),
    rel: "stylesheet"
  })]);
};