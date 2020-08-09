const express = require("express");
const router = express.Router();

const validUrl = require("valid-url"); //checking valid url or not
const shortId = require("shortid"); //giving short id
const { BASE_URL } = require("../config"); //base url
const Url = require("../Model/Url"); //loading Schema from model
//const { isValid } = require("shortid");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isUrl(BASE_URL)) {
    return res.status(401).json("INVALID BASE URL PLEASE PROVIDE VALID URL");
  }

  //GENERATE SHORT URL
  const urlCode = shortId.generate();
  if (validUrl.isUrl(longUrl)) {
    try {
      let url = await Url.findone({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = BASE_URL + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("SERVER ERROR");
    }
  } else {
    res.status(401).json("INVALID LONG URL");
  }
});

module.exports = router;
