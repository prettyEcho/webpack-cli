/**
 * entry.js
 * @authors Your Name (you@example.org)
 * @date    2017-07-14 15:09:29
 * @version $Id$
 */

import '../css/index.css';//引入css文件

//import bar from './demo3';

//bar();

var demo1 = require('./demo1.js');
var demo2 = require('./demo2.js');

demo1.init();
demo2.init();

/* console.log('1234');

var oImg = new Image();
oImg.src = require('../img/test.jpg');
document.body.appendChild(oImg); */
