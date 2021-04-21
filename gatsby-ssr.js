"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var React = _interopRequireWildcard(require("react"));

var _gatsby = require("gatsby");

// TODO: Remove for v3 - Fix janky path/asset prefixing
const withPrefix = _gatsby.withAssetPrefix || _gatsby.withPrefix;

exports.onRenderBody = ({
  setHeadComponents
}, pluginOptions) => {
  const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"; // Skip on development.

  if (activeEnv === "development") {
    console.log("Skipping adding head link.");
    return;
  }

  const {
    dest
  } = pluginOptions;
  const rm = dest.match(/.*public\//gm);
  const path = dest.replace(rm, '');
  setHeadComponents([/*#__PURE__*/React.createElement("link", {
    key: "gatsby-plugin-post-tailwind-preload",
    href: withPrefix(path),
    rel: "preload",
    as: "style"
  }), /*#__PURE__*/React.createElement("link", {
    key: "gatsby-plugin-post-tailwind",
    href: withPrefix(path),
    rel: "stylesheet"
  })]);
};