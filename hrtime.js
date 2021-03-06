// code from here https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

(function() {
  'use strict'

  // polyfil for window.performance.now
  var performance = window.performance
  var performanceNow = window.performance.now ||
  window.performance.mozNow ||
  window.performance.msNow ||
  window.performance.oNow ||
  window.performance.webkitNow ||
  function() {
    return (new Date()).getTime()
  }

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3
    var seconds = Math.floor(clocktime)
    var nanoseconds = Math.floor((clocktime % 1) * 1e9)
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0]
      nanoseconds = nanoseconds - previousTimestamp[1]
      if (nanoseconds < 0) {
        seconds--
        nanoseconds += 1e9
      }
    }
    return [seconds, nanoseconds]
  }

  window.hrtime = hrtime
})()
