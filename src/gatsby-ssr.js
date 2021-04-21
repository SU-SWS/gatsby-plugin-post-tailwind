import * as React from "react"
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from "gatsby"

// TODO: Remove for v3 - Fix janky path/asset prefixing
const withPrefix = withAssetPrefix || fallbackWithPrefix

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { dest } = pluginOptions

console.log(dest);

  setHeadComponents([
    <link
      href={withPrefix(dest)}
      rel="stylesheet"
    />
  ])
}