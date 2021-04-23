import * as React from "react"
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from "gatsby"

// TODO: Remove for v3 - Fix janky path/asset prefixing
const withPrefix = withAssetPrefix || fallbackWithPrefix


exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

  // Skip on development.
  if (activeEnv === "development") {
    console.log("Skipping adding head link.")
    return;
  }

  const { dest } = pluginOptions
  const rm = dest.match(/.*public\//gm);
  const path = dest.replace(rm, '');

  setHeadComponents([
    <link
      key="gatsby-plugin-post-tailwind-preload"
      href={withPrefix(path)}
      rel="preload"
      as="style"
    />,
    <link
      key="gatsby-plugin-post-tailwind"
      href={withPrefix(path)}
      rel="stylesheet"
    />,
  ])
}