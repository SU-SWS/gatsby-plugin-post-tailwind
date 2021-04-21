"use strict";

const autoprefixer = require('autoprefixer');

const tailwind = require('tailwindcss');

const postcss = require('postcss');

const precss = require('precss');

const fs = require('fs');

const path = require('path');

const fse = require('fs-extra');
/**
 * On post build step for gatbsy builds.
 *
 * @param {*} nodeOptions
 * @param {*} pluginOptions
 */


exports.onPostBuild = async function onPostBuild(nodeOptions, pluginOptions) {
  var _pluginOptions$config;

  const entry = path.resolve(pluginOptions.src);
  const dest = path.resolve(pluginOptions.dest);
  const defaultPlugins = [precss, tailwind, autoprefixer];
  let userOpts = false;

  if ((_pluginOptions$config = pluginOptions.config) !== null && _pluginOptions$config !== void 0 && _pluginOptions$config.length) {
    userOpts = require(pluginOptions.config);
  } else {
    try {
      userOpts = require(path.resolve('./postcss.config.js'));
    } catch (error) {
      userOpts = false;
    }
  }

  const postConfig = userOpts.plugins || defaultPlugins;
  fs.readFile(entry, (err, css) => {
    postcss(postConfig).process(css, {
      from: entry,
      to: dest
    }).then(result => {
      fse.outputFile(dest, result.css, err => {
        if (err) {
          console.log(err);
        } else {
          console.info('The css was generated to path: ' + dest);
        }
      });

      if (result.map) {
        fs.writeFile(dest + '.map', result.map.toString(), () => true);
      }
    });
  });
};