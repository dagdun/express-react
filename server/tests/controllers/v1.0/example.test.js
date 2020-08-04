const request = require('supertest')
const { startServer, stopServer } = require('../../prepare-server')
const exampleModel = require('../../../models/example')

describe('example unittest', () => {
  let server
  beforeEach(async () => {
    server = await startServer()
  })

  afterEach(async () => {
    await stopServer()
  })
  it('call get, should return json', async () => {
    await new exampleModel({
      name: '123',
    }).save()

    await new exampleModel({
      name: '456',
    }).save()

    const { statusCode, body } = await request(server).get('/v1.0/example')
    expect(statusCode).toEqual(200)
    expect(body.data.length).toEqual(2)
    expect(body.data[0].name).toEqual('123')
    expect(body.data[1].name).toEqual('456')
    expect(body.message).toEqual('success')
    expect(body.status).toEqual(200)
  })

  it('call post, should return json', async () => {
    const saveData = {
      name: 'abc',
    }
    const { statusCode, body } = await request(server)
      .post('/v1.0/example')
      .send(saveData)
    expect(statusCode).toEqual(200)

    expect(body.data).toEqual(saveData)
    expect(body.message).toEqual('success')
    expect(body.status).toEqual(200)
  })

  it('call getId, should return json', async () => {
    const newDoc = await new exampleModel({
      name: 'bbb',
    }).save()

    const { statusCode, body } = await request(server).get(
      '/v1.0/example/' + newDoc._id,
    )
    expect(statusCode).toEqual(200)
    expect(body.data).toEqual({ name: 'bbb' })
    expect(body.message).toEqual('success')
    expect(body.status).toEqual(200)
  })

  it('call getId, should return false', async () => {
    const newDoc = await new exampleModel({
      name: 'bbb',
    }).save()

    const { statusCode, body } = await request(server).get(
      '/v1.0/example/5eb812562069922cb26624b0',
    )
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('doc not found')
    expect(body.status).toEqual(404)
  })

  it('call postId, should return json', async () => {
    const newDoc = await new exampleModel({
      name: 'bbb',
    }).save()

    const { statusCode, body } = await request(server)
      .post('/v1.0/example/' + newDoc._id)
      .send({ name: 'ccc' })
    expect(statusCode).toEqual(200)
    expect(body.data).toEqual({ name: 'ccc' })
    expect(body.message).toEqual('success')
    expect(body.status).toEqual(200)
  })

  it('call postId, should return false', async () => {
    const newDoc = await new exampleModel({
      name: 'bbb',
    }).save()

    const { statusCode, body } = await request(server)
      .post('/v1.0/example/5eb812562069922cb26624b0')
      .send({ name: 'ccc' })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('doc not found')
    expect(body.status).toEqual(404)
  })

  it('call deleteId, should return json', async () => {
    const newDoc = await new exampleModel({
      name: 'ddd',
    }).save()

    await new exampleModel({
      name: 'eee',
    }).save()
    const { statusCode, body } = await request(server).delete(
      '/v1.0/example/' + newDoc._id,
    )
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('success')
    expect(body.status).toEqual(200)

    const { body: body1 } = await request(server).get('/v1.0/example')
    expect(body1.data.length).toEqual(1)
    expect(body1.data[0].name).toEqual('eee')

  })
})
