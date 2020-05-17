const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  //format is always JSON
  var format = req.query.format;
  //language is always en-gb
  var language = req.query.language;
  console.log(format, language)
  console.log("GET: /api/remedy/symptoms/ - Attempt to get symptoms data.");
  axios.get('https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms',
  {
    headers:{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
    "x-rapidapi-key":"47dd31d7afmsh2cb07155fce1f9ap10b028jsn99dddbd263b9",
    "useQueryString":true
    },
    params:{
    "format":format,
    "language":language
    }
})
.then(response => {
  console.log(response)
  res.json(response.data.features)
})
.catch(error => {
  console.log("ERROR: " + error);
  res.json(error)
});
})
module.exports = router;
