const CracoLessPlugin = require("craco-less")
const WebpackBar = require("webpackbar")

module.exports = () => {
  return {
    webpack: {
      plugins: [new WebpackBar({ profile: true })],
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: {
                "@primary-color": "#1273EA",
                "@text-color": "#151A30",
                "@font-size-base": "14px",
                "@disabled-color": "#464a4c",
                "@line-height-base": 1.5,
                "@item-hover-bg": "#cedade",
                "@form-item-label-font-size": "10px",
                "@form-vertical-label-padding": "0 0 0 10px",
                "@label-color": "#57627B",
                "@border-color-base": "#C5CEE0",
                "@border-radius-base": "8px",
                "@btn-font-weight": "600",
                "@btn-default-color": "#1273EA",
                "@btn-default-bg": "#F7F9FC",
                "@btn-default-border": "#F7F9FC",
                "@btn-disable-bg": "#F7F9FC",
                "@btn-disable-border": "#F7F9FC",
              },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  }
}
