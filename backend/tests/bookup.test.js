const mongo = require('../src/mongo/mongo');
require('dotenv').load();

beforeAll(() => {
    return mongo.connect();
});

afterAll(() => {
    mongo.disconnect()
});

test('test that mongo and postgres query 1 return the same amount', async () => {

})

test('test that mongo and postgres query 2 return the same amount', async () => {

})

test('test that mongo and postgres query 3 return the same amount', async () => {

})

test('test that mongo and postgres query 4 return the same amount', async () => {

})