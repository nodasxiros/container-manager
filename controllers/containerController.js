'use strict'
const Docker = require('dockerode')

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

exports.index = async (req, res) => {
  try {
    const containers = await docker.listContainers()
    const ContainersReduced = containers.map(x => {
      return {
        'id': x.Id,
        'names': x.Names
      }
    })
    res.send(JSON.stringify(ContainersReduced))
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
  container
    .start()
    .then(() => res.send(`Container ${req.params.id} started`))
    .catch(err => res.send(err))
}

exports.stop = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container
    .stop()
    .then(() => res.send(`Container ${req.params.id} stopped`))
    .catch(error => res.send(error))
}

exports.create = async (req, res) => {
  try {
    await docker.pull('redis:latest')
    docker.createContainer({
      Image: 'redis',
      name: `${Math.random().toString(36).substr(2, 9)}`
    })
      .then(() => {
        res.send('Container Created')
      })
      .catch(err => res.send(err))
  } catch (error) {
    res.send(error)
  }
}

exports.delete = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container
    .remove()
    .then(() => res.send(`Container ${req.params.id} has been removed`))
    .catch(err => res.send(err))
}

exports.logs = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container
    .logs({ stdout: true })
    .then(l => res.send(JSON.stringify(l)))
    .catch(err => res.send(err))
}

exports.stats = async (req, res) => {
  const container = await docker.getContainer(req.params.id)
  container
    .stats()
    .then(stats => res.send(stats))
    .catch(err => res.send(err))
}
