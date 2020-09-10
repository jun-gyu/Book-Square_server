const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

function checkAuthToken(req, res, next) {
  const authHeader = req.headers["auth-token"];
  const token = authHeader && authHeader.split(` `)[1];
  if (token === null) return res.status(401).send(); //unauthenticated 비인증.
  jwt.verify(token, keys.secretOrKey, (err, user) => {
    if (err) return res.status(403).send();
    /**클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
     *예를들어 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다.
     *401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다. */
    req.user = user;
    /* {
        id: '5f58dbce8885c87089a91ce3',
        name: 'hyojin',
        iat: 1599722707,
        exp: 1599726307
       } */
    next();
  });
}

function makeToken(payload) {
  const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
  const bearerToken = "Bearer " + token;
  return bearerToken;
}

module.exports = { makeToken, checkAuthToken };
