/**
 * demo2
 * @authors Your Name (you@example.org)
 * @date    2017-07-14 16:07:39
 * @version $Id$
 */

var obj = require('./tool.js');
	var demo2 = {
	    init: function() {
	        this.bindEvent();
	    },
	    bindEvent: function() {
	        //var demo2 = document.getElementsByClassName('demo2')[0];
	        var demo2 = obj.getDom('demo2');
	        demo2.onclick = this.changeStyle;
	    },
	    changeStyle: function() {
	    	console.log(1);
	        this.style.width = '200px';
	        this.style.height = '200px';
	        this.style.background = 'green';
	    }
	}

module.exports = demo2;


