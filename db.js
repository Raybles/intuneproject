const mysql = require('mysql2/promise');
const credentials = {
    host: 'trh22.brighton.domains',
    user: 'trh22_intuneuser',
    password: 'fkvooskvksmfkm',
    database: 'trh22_intune'
};
async function query(sql, params) {
    const connection = await mysql.createConnection(credentials);
    const [results, ] = await connection.execute(sql, params);
    return results;
}
module.exports = {
    query
}