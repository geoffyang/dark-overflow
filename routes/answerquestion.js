var express = require("express");
var router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

router.post(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const text = req.body.textToSend;

    const questionId = parseInt(req.params.id, 10);
    const { userId } = req.session.auth;

    const score = 0;
    const answer = await db.Answer.create({ text, score, questionId, userId });
    res.json({ answerId: answer.id });
  })
);

module.exports = router;
