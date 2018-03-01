/**
 * demo1
 * @authors Your Name (you@example.org)
 * @date    2017-07-14 16:02:01
 * @version $Id$
 */

var obj = require('./tool.js');
var demo1 = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        //var demo1 = document.getElementsByClassName('demo1')[0];
        var demo1 = obj.getDom('demo1');
        demo1.onclick = this.changeStyle;
    },
    changeStyle: function() {
        this.style.width = '200px';
        this.style.height = '200px';
        this.style.background = 'green';
    }
}

module.exports = demo1;