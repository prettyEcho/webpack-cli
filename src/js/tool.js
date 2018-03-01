/**
 * tool.js
 * @authors Your Name (you@example.org)
 * @date    2017-07-14 16:04:38
 * @version $Id$
 */
//let $ = require('jquery');
var tool = {
	getDom: function(name){
		return document.getElementsByClassName(name);
	}
};
module.exports = tool;