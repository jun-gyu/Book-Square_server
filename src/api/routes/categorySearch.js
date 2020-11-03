const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");
const { clientId, clientSecret } = require("../../config/index");
router.post("/", (req, res) => {
  const { select } = req.body;

  axios
    .get(
      `https://openapi.naver.com/v1/search/book_adv.xml?d_publ=${encodeURI(
        "교보문고"
      )}&d_catg=${select}&display=4`,
      {
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      }
    )
    .then((data) => {
      let resultSendData = null;
      xml2js.parseString(data.data, (err, result) => {
        if (err) {
          throw err;
        }
        const json = JSON.stringify(result, null, 4);
        resultSendData = json;
      });
      return resultSendData;
    })
    .then((data) => res.status(200).send(data));
});

module.exports = router;
