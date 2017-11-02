/*
* promon
* Copyright(c) 2017-present @GavinDmello
* MIT Licensed
*/

var Stats = require('./index')
var s = new Stats()
s.getStats(function (err, data) {
	console.log(err, data)
})