'use strict'
const Docker = require('dockerode')
let docker = new Docker({ socketPath: '/var/run/docker.sock' })

exports.index = async (req, res) => {
  const containers = await docker.listContainers()
    .catch(er => {
      res.send(er)
    })
  res.send(JSON.stringify(containers))
}

exports.create = async (req, res) => {
  await docker.container.create({
    Image: 'redis',
    name: 'redis'
  })
    .catch(er => {
      console.log(er)
      res.send(er)
    })
  res.send('Create route')
}

exports.show = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) {
      console.log(err)
      res.send(err)
    }
    res.send(data)
  })
}

// exports.start

exports.stop = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
  container.stop()
}
