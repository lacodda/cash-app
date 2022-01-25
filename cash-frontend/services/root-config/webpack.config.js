const { join, resolve } = require("path");
const { readFileSync } = require("fs");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const projectRoot = join(__dirname, "../../../");
const keyPath = resolve(projectRoot, "./ssl/ssl.key");
const certPath = resolve(projectRoot, "./ssl/ssl.crt");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "cash";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    devServer: {
      server: {
        type: "https",
        options: {
          key: readFileSync(keyPath),
          cert: readFileSync(certPath),
        },
      },
    },
  });
};
