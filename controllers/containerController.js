'use strict'
const Docker = require('dockerode')

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

exports.index = async (req, res) => {
  try {
    const containers = await docker.listContainers()
    res.send(JSON.stringify(containers))
  } catch (error) {
    res.send(error)
  }
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
  try {
    await docker.pull('redis:latest')
    docker.run('redis', ['-d'], undefined, {
      'name': 'Redis-5',
      'Labels': {
        'environment': 'blueWhale'
      },
      'HostConfig': {
        'PortBindings': {
          '6379/tcp': [
            {
              'HostPort': '0'
            }
          ]
        }
      }
    })
    res.send('Container Started')
  } catch (error) {
    res.send(error)
  }
}

exports.delete = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container.inspect((err, data) => {
    if (err) return res.send({ error: err })
    container.remove()
    return res.send({ status: 200, message: `Container ${container.id} has been removed` })
  })
}
