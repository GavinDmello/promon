var Stats = require('./index')
var s = new Stats()
s.getStats(function (err, data) {
	console.log(err, data)
})