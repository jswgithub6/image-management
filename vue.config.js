const { resolve } = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  productionSourceMap: false,
});
