const cluster = require('cluster')

const totalInstances = require('os').cpus().length
let currentInstances = 0

const increment = () => {
  currentInstances++

  if (currentInstances === totalInstances) {
    console.info(totalInstances + ' workers listening.')
  }
}

for (let i = 0; i < totalInstances; i++) {
  cluster.fork().once('listening', increment)
}

const handleExit = (worker) => {
  console.error('Worker died. PID: ' + worker.process.pid)

  const newWorker = cluster.fork().once('listening', () => {
    console.info('Replacement worker spawned. PID: ' + newWorker.process.pid)
  })
}

cluster.on('exit', handleExit)
