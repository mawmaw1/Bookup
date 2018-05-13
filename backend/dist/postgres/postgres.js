const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: '212.47.237.59',
    database: 'postgres',
    password: 'kukenrbra',
    port: 7655,
})

client.connect()

exports.query1 = () => {
    const res = client.query('SELECT * from City limit 10')
    return res
}