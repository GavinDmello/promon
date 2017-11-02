# pid-stats
Collects information from /proc/pid/stat for linux/unix systems

```
npm install pid-stats
```


## API
- getStats(callback)	// returns all information associated to pid
- getCPUPercentage() // returns CPU percentage used by the application
- getMemory() // returns rss memory of the application in MB

## Example
```js
	var Stats = require('pid-stats')
	var s = new Stats()
	s.getStats(function (err, data) {
		console.log(err, data)
	})
	var cpuPercent = s.getCPUPercentage()
	var memory = s.getMemory()

```

## License
MIT