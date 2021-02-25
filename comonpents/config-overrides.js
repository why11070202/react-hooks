const {override, disableEsLint, fixBabelImports, addWebpackAlias} = require('customize-cra');
const rewirePostcss = require('react-app-rewire-postcss')
const px2rem = require("postcss-px2rem-exclude");
const path = require("path")
module.exports = override(
  disableEsLint(), //禁用eslint
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  //路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'node': path.resolve(__dirname, 'node_modules'),
  }),
  (config, env) => {
    // 重写postcss
    rewirePostcss(config, {
      plugins: () => [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")({
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
        }),
        //关键:设置px2rem
        px2rem({
          remUnit: 75,//这里最开始写的是75，但是antd的样式变的可小，查询后看人家设置的是37.5，然后试了下确实好了
          exclude: /node_modules|folder_name/i,
        }),
      ],
    });

    return config;
  }
)



