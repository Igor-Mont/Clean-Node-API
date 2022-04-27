import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Igor',
        email: 'igor@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  });
  
});