const autoprefixer = require('autoprefixer')
const tailwind = require('tailwindcss');
const postcss = require('postcss')
const precss = require('precss')
const fs = require('fs')
const path = require('path');
const fse = require('fs-extra');
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

/**
 * On post build step for gatbsy builds.
 *
 * @param {*} nodeOptions
 * @param {*} pluginOptions
 */
exports.onPostBuild = async function onPostBuild(nodeOptions, pluginOptions) {
  const entry = path.resolve(pluginOptions.src);
  const dest = path.resolve(pluginOptions.dest);
  const defaultPlugins = [precss, tailwind, autoprefixer];
  let userOpts = false;
  if (pluginOptions.config?.length) {
    userOpts = require(pluginOptions.config)
  }
  else {
    try {
      userOpts = require(path.resolve('./postcss.config.js'))
    }
    catch (error) {
      userOpts = false;
    }
  }
  const postConfig = userOpts.plugins || defaultPlugins;

  fs.readFile(entry, (err, css) => {
    postcss(postConfig)
      .process(css, 
        { 
          from: entry, 
          to: dest 
        }
      )
      .then(result => {
        fse.outputFile(dest, result.css, err => {
          if(err) {
            console.log(err);
          } else {
            console.info('The css was generated to path: ' + dest);
          }
        })

        if (result.map) {
          fs.writeFile(dest + '.map', result.map.toString(), () => true)
        }
      })
  })

}

/**
 * When in development, add the css file so gatsby-develop still works.
 * 
 */
exports.onCreateWebpackConfig = ({ stage, getConfig, actions }, pluginOptions) => {
  const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

  // Skip on development.
  if (activeEnv !== "development") {
    return;
  }

  // Nothing to do.
  if (!pluginOptions.src) {
    return;
  }

  // On gatsby 'develop'
  if (stage === 'develop')  {
    const config = getConfig();
    const absPath = path.resolve(pluginOptions.src);

    // Add the css to the entry points.
    config.entry.commons.push(absPath);

    // Ensure that the files get outputted.
    config.devServer = config.devServer || {};
    config.devServer.writeToDisk = true;

    actions.replaceWebpackConfig(config);
  }
}