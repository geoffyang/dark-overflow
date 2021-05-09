var express = require("express");
var router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

// post answer vote
router.post(
  "/:id(\\d+)/vote/:votetype(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);

    let voteSum = parseInt(req.params.votetype, 10);

    if (voteSum === 2) voteSum = -1;

    const { userId } = req.session.auth;

    const vote = await db.AnswerVote.create({ userId, answerId, voteSum });

    res.send();

  })
);

// delete answer vote - may be wrong
router.delete(
  "/:id(\\d+)/vote",
  requireAuth,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const { userId } = req.session.auth;
    const vote = await db.AnswerVote.findOne({
      where: {
        answerId,
        userId,
      },
    });

    vote.destroy();
    res.send();
  })
);


// delete answer
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const answer = await db.Answer.findByPk(parseInt(req.params.id, 10));
    // const { userId } = req.session.auth;
    answer.destroy();
    res.send();
  })
);

module.exports = router;
