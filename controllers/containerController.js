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

exports.show = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) return res.send({ error: err })
    return res.send(data)
  })
}

exports.start = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) return res.send({ error: err })
    container.start()
    return res.send({ status: 200, message: `Container ${container.id} has started` })
  })
}

exports.stop = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) return res.send({ error: err })
    container.stop()
    return res.send({ status: 200, message: `Container ${container.id} has stopped` })
  })
}

exports.create = async (req, res) => {
  docker.createContainer({
    Image: 'redis',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
    OpenStdin: false,
    StdinOnce: false
  })
    .then(container => {
      container.start()
      res.send(`Container ${container.id} has started`)
    })
    .catch(err => console.log(err))
}
