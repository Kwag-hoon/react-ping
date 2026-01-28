const jwt = require('jsonwebtoken');

function auth (req, res, next){
  console.log('Authorization header:', req.headers.authorization);
  const authHeader = req.headers.authorization;

  // 토큰 없으면 차단 
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({ message: '인증 토큰이 없습니다'});
  }

  const token =  authHeader.split('')[1];

  try{
    const decoded = jwt.verify(token, 'Ping_secret_key');
    req.user = decoded;
    // {user_no, user_role, user_grade}
    next();

  }catch{
    return res.status(401).json({message : '유효하지 않은 토큰입니다'});
  }
}

module.exports = auth;