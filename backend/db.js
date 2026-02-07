const mysql = require('mysql2');

// db연결 설정 
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'', 
  database:'ping',
  multipleStatements:true
});

// 연결 
connection.connect((err) =>{
  if(err) {
    console.error('MYSQL 연결 실패 :', err);
    return;
  }
  console.log('MYSQL 연결 성공');
});

module.exports = connection;
