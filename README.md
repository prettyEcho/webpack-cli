## title
    webpack打包配置

### 目标
* 两套环境配置: dev and prod
    - dev (webpack-dev-server)
        + 热替换 
        + 实时重载
        + 支持单、多页面打包
        + 动态生成html,并自动注入的js,css,image
        + 支持es6/es7第二阶段提案
        + 支持样式文件自动补全前缀，更好的兼容各个浏览器
        + 支持less,sass
        + 代码规范: eslint //todo

    - prod
        + 支持单、多页面打包
        + 动态替换html中静态资源地址为cdn地址,
        + 解决cdn缓存问题
        + 提取各个chunk中公共部分，并存入缓存，提高加载速度
        + 动态压缩代码
        + 支持es6/es7第二阶段提案
        + 支持样式文件自动补全前缀，更好的兼容各个浏览器
        + 支持less,sass
        + 代码规范: eslint //todo

### Usage
* npm i
* dev: npm start
* prod: npm run build

### 遇到的问题
* webpack-dev-server下html-webpack-plugin打包的html位置
    - webpack-dev-server打包的bundles会存在内存中，访问的位置未publicPath

### 要求
* 配置中html和产出的js名一致，参考'./config/config.js'

### 对当前官网项目优劣分析
* 优势
    - 支持es6.es7
    - 支持样式文件自动补全前缀，更好的兼容各个浏览器
    - 支持less,sass
    - 动态提取js中公共部分，自动注入到html，第一次加载会存入缓存，提高加载速度
    - 打包后的静态文件体积更小，加载静态资源更快
    - 生成的js,css,img文件名自带hash值，并自动注入html，解决了cdn缓存问题

* 劣势
    - 该配置不适宜频繁更改线上项目代码，因为每次更改都需要把所有静态资源重新上传到cdn;适宜在本地服务器环境开发好，调试好，然后上传到线上服务器。
    - 该配置适宜前后端分离的项目，以及基于node做后端的项目,因为可以用到html-webpack-plugin支持的ejs模版（handlebars、ejs等）。

### output 
    path: 打包后bundles路径
    publicPath: 浏览器访问静态资源路径

### loader

* babel: 安装依赖 babel-loader babel-core babel-preset-es2015 babel-preset-stage-2
    - exclude: /node_modules/  babel会对js进行编译，编译/node_modules/中依赖js会产生未知错误。

* postcss-loader: 安装依赖 postcss-loader
    - 需要放到less/sass之后，css-loader之前

* less: 安装依赖 less-loader less

* sass: 安装依赖 sass-loader node-sass

* css-loader: 安装依赖 css-loader 
    - 编译css文件为字符串

* style-loader: 安装依赖 style-loader 
    - 把css添加到html的style标签里

* autoprefixer: 安装依赖 autoprefixer
    - 样式文件补全前缀

* url-loader: 安装依赖 url-loader 
    - 处理url路径
    - limit: 图片大小限制，超过限制默认转换成base64格式
    - name: 文件名
        + [name]: chunk名
        + [ext]: 原拓展名
        + [hash]: hash值
    - fallback: 当图片大小超过设定的限制时，启用的加载器

### plugins

* extract-text-webpack-plugin
    - 生成路径相对于output.path,访问路径相对于output.publicPath
    - filename: 文件名
        + [name]: chunk名
        + [id]: chunk 的数量
        + [contenthash]: 根据提取文件的内容生成的hash
        + [<hashType>:contenthash:<digestType>:<length>]: 自定义hash

* html-webpack-plugin
    - 生成路径相对于output.path,访问路径相对于output.publicPath
    - title
        + 生成的html文档的标题。配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值，如下ejs模板语法形式：
        `<title>{%= o.htmlWebpackPlugin.options.title %}</title>`
    - template 
        + 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs
        + 为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader
    - inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
        1. true或者body：所有JavaScript资源插入到body元素的底部
        2. head: 所有JavaScript资源插入到head元素中
        3. false： 所有静态资源css和JavaScript都不会注入到模板文件中
    - favicon
        + 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
    - hash
        + true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
    - chunks
        + 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
    - excludeChunks
        +  这个与chunks配置项正好相反，用来配置不允许注入的thunk
    - chunksSortMode
        + none | auto| function，默认auto； 允许指定的thunk在插入到html文档前进行排序。
        + function值可以指定具体排序规则；auto基于thunk的id进行排序； none就是不排序
    - xhtml
        + true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
    - cache
        + true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件
    - showErrors
        + true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。

* webpack-dev-server
    - devServer
        + contentBase: 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要,默认情况下，将使用当前工作目录作为提供内容的目录,推荐使用绝对路径
        + publicPath: 静态文件访问目录
        + compress: 压缩
        + hot: 热替换
        + inline: 一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
        + host: 端口

* clean-webpack-plugin
    - root: 项目目录 process.cwd()
    - verbose: true, 
    - dry: false 擦除

* CommonsChunkPlugin
    - 提取公共chunk

* DefinePlugin
    - 定义变量
