/* 
    基本配置
*/
const path = require('path');

module.exports = {
    HTMLDirs: [
        'index',
        'demo'
    ],
    JSDirs: {
        'index': './src/js/entry.js',
        'demo': './src/js/demo.js'
    },
    prodPublicPath: 'http://js.feiliu.com/static/test/'
}