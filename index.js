/*
* pid stats
* Copyright(c) 2017-present @GavinDmello
* MIT Licensed
*/

const fs = require('fs')
const execSync = require('child_process').execSync

class Stats {
    constructor() {
        this.cpu = 0.0
        this.memory = 0.0
        this.utime = 0.0
        this.stime = 0.0
        this.startTime = 0.0
        this.clockTick = 0
        this.pageSize = 0
        this.totalTime = 0.0
        this.rss = 0.0
        this.vsize = 0.0
        this.uptime = 0.0

    }

    // populate stats
    getStats(callback) {
        var that = this
        fs.readFile("/proc/" + process.pid + "/stat", 'utf8', traverseData)

        function traverseData(err, data) {

            if (err) {
                callback(err, null)
                return
            }

            data = data.substr(data.lastIndexOf(')') + 2)
            var elems = data.toString().split(' ')
            that.utime = parseFloat(elems[11])
            that.stime = parseFloat(elems[12])
            that.startTime = parseFloat(elems[19])
            that.clockTick = parseInt(execSync('getconf CLK_TCK', { encoding: 'utf8' }))
            that.pageSize = parseInt(execSync('getconf PAGESIZE', { encoding: 'utf8' }))
            that.totalTime = (that.utime + that.stime) / that.clockTick
            that.rss = parseFloat(elems[21]) / (1024 * 1024)
            that.vsize = parseFloat(elems[20])

            that.memory = (that.rss * that.pageSize)

            fs.readFile('/proc/uptime', 'utf8', processData)
        }

        function processData(err, uptime) {

            if (err) {
            	callback(err, null)
                return
            }

            that.uptime = parseFloat(uptime.split(' ')[0])
            that.processUptime = that.uptime - that.startTime / that.clockTick

            that.cpu = (that.totalTime / that.processUptime) * 100

            callback(null, {
                cpu: that.cpu,
                memory: that.memory,
                utime: that.utime,
                stime: that.stime,
                startTime: that.startTime,
                clockTick: that.clockTick,
                pageSize: that.pageSize,
                rss: that.rss,
                vsize: that.vsize,
                totalTime : that.totalTime,
                uptime : that.uptime
            })
            that = null
        }
    }

    // returns CPU percentage
    getCPUPercentage() {
        return this.cpu
    }

    // returns memory in MB
    getMemory() {
        return this.memory
    }
}

module.exports = Stats