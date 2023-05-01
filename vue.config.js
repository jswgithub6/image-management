const { resolve } = require("path");
const { defineConfig } = require("@vue/cli-service");
const isProduction = process.env.NODE_ENV !== "development";

const cdn = {
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    "element-ui": "ELEMENT",
    lodash: "_",
    axios: "axios",
  },
  css: ["https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css"],
  js: [
    "https://unpkg.com/vue@2.6.14/dist/vue.runtime.min.js",
    "https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js",
    "https://unpkg.com/element-ui@2.15.13/lib/index.js",
    "https://unpkg.com/lodash@4.17.21/lodash.min.js",
    "https://unpkg.com/axios@1.3.4/dist/axios.min.js",
  ],
};

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.plugin("html").tap((args) => {
      if (isProduction) args[0].cdn = cdn;
      return args;
    });
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (isProduction) config.externals = cdn.externals;
  },
});
