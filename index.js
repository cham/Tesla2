const cluster = require('cluster')

if (cluster.isWorker) {
  require('./cluster/worker')
} else {
  require('./cluster/master')
}
