#### 1. 通过vue-cli构建基本应用
###### 国内最好使用cnpm代替npm：npm install -g cnpm --registry=https://registry.npm.taobao.org
##### 创建项目
-    如果电脑没有全局安装vue-cli，则先安装：npm install --global vue-cli  
-    在当前目录创建一个基于 webpack 模板的新项目：vue init webpack project-name  
-    进入项目：cd project-name，安装依赖：npm install，运行：npm run dev
    
    创建项目时建议保留eslint，培养自己的代码习惯和风格
    /* eslint-disable */，可绕过eslint检验

#### 2. 可能会用到的loader
    vuex：官方状态管理
    axios：用来配置ajax请求
    js-md5：md5加密
    mint-ui：移动端组件库
    node-sass，sass-loader：使用sass
    less，less-loader：使用less
    px2rem-loader:px自动转rem
    weixin-js-sdk：引入微信jssdk

##### 安装所需loader
###### 使用sass
-     cnpm install node-sass  --save-dev
      cnpm install sass-loader  --save-dev

- 打开webpack.base.config.js在loaders里面加上

```
{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
}
```
- 在vue文件中配置使用

```
<style lang="scss" scoped></style>
```
###### 安装配置px2rem-loader，px自动转rem，使用此laoder则不需要sass封装相关的函数

    在utils.js中添加配置

```JavaScript
// cssLoaders中添加
// remUnit，设置为设计稿宽度/10
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75,
      sourceMap: options.sourceMap,
    }
}
// generateLoaders中修改
const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]
// return中添加
px2rem: generateLoaders('px2rem', { remUnit: 75})
```


###### 安装axios，关于使用，[可查看官方文档](https://www.kancloud.cn/yunye/axios/234845)，也可参考个人使用的封装。
-     cnpm install axios --save-dev
    
###### 安装Mint UI，关于使用，移步文章[Mint UI API](http://mint-ui.github.io/docs/#/zh-cn2/quickstart)
-     cnpm install mint-ui --save-dev

##### 3.封装ajax，配置全局矢量图标
- ajax可更加自己的需求进行简单封装，本demo见src/tool/ajax.js文件。
- demo中的矢量图标使用的是阿里巴巴适量图标库，在线引用方式，使用Symbol方式在index.html中直接引入
##### 4.对项目做适配处理
- 适配方案使用淘宝的适配方案，用flexible
##### 5.路由，状态管理
    