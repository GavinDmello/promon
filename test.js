/*
* promon
* Copyright(c) 2017-present @GavinDmello
* MIT Licensed
*/

const Stats = require('./index')
const pidStats = new Stats()
const chai = require('chai')

describe('Checking stats', () => {
	var lastCPU = 0
	var lastMemory = 0
    it('check for stats', (done) => {
        chai.should()
        pidStats.getStats((err, data) => {
            if (err) {
                err.should.be.rejected
                done()
            } else {
            	lastCPU = data.cpu
            	lastMemory = data.memory
                data.cpu.should.be.a('number')
                data.memory.should.be.a('number')
                data.utime.should.be.a('number')
                data.stime.should.be.a('number')
                data.startTime.should.be.a('number')
                data.clockTick.should.be.a('number')
                data.pageSize.should.be.a('number')
                data.totalTime.should.be.a('number')
                data.rss.should.be.a('number')
                data.vsize.should.be.a('number')
                data.uptime.should.be.a('number')
                done()
            }
        })

    })

    it('should return last cpu', (done) => {
    	chai.expect(pidStats.getCPUPercentage()).to.equal(lastCPU)
        pidStats.getCPUPercentage().should.be.a('number')
        done()
    })

    it('should return last memory', (done) => {
    	chai.expect(pidStats.getMemory()).to.equal(lastMemory)
        pidStats.getCPUPercentage().should.be.a('number')
        done()
    })
})