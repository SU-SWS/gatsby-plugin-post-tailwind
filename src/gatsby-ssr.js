import * as React from "react"
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from "gatsby"

// TODO: Remove for v3 - Fix janky path/asset prefixing
const withPrefix = withAssetPrefix || fallbackWithPrefix

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { dest } = pluginOptions
  const rm = dest.match(/.*public\//gm);
  const path = dest.replace(rm, '');
  setHeadComponents([
    <link
      href={withPrefix(path)}
      rel="stylesheet"
    />,
  ])
}