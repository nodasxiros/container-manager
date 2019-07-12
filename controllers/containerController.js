'use strict'
const Docker = require('dockerode')

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

exports.index = async (req, res) => {
  const containers = await docker.listContainers({ all: true })

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
  console.log(1)
  await docker.pull('redis:latest')
  console.log(2)
  // const container = await docker.createContainer({
  //   Image: 'redis',
  //   AttachStdin: false,
  //   AttachStdout: true,
  //   AttachStderr: true,
  //   Tty: true,
  //   Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
  //   OpenStdin: false,
  //   StdinOnce: false
  // })

  docker.buildImage('./redis.tar', { t: 'redis-three' }, (err, stream) => {
    console.log(3)
    if (err) return res.send(err)
    console.log(4)
    stream.pipe(process.stdout, {
      end: true
    })
    console.log(5)

    stream.on('end', function () {
      docker.createContainer({
        Image: 'redis'
      }, function (err, container) {
        if (err) return res.send(err)
        container.attach({
          stream: true,
          stdout: true,
          stderr: true,
          tty: true
        }, function (err, stream) {
          if (err) return res.send(err)
          stream.pipe(process.stdout)
          container.start(function (err, data) {
            if (err) return res.send(err)
          })
        })
      })
    })
  })
  //   .then(container => {
  //     container.start()
  //     res.send(`Container ${container.id} has started`)
  //   })
  //   .catch(err => console.log(err))
}
