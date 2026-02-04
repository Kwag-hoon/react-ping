const mysql = require('mysql');

// db연결 설정 
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
<<<<<<< HEAD
  password:'', //저는 비밀번호가 달라서 다른 분들 꼭 돌려보실때 1234로 변경하고 테스트 해보세요
=======
  password:'1234', //저는 비밀번호가 달라서 다른 분들 꼭 돌려보실때 1234로 변경하고 테스트 해보세요
>>>>>>> c1ab1677cdce7c77f34472f495e1e0de2138005b
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
