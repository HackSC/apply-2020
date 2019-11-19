const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

// Full write access to a user's hackerProfile
router.put("/:email", async (req, res) => {
  const updatedhackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      email: req.params.email
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await models.HackerReview.findAll();
    return res.json({ reviews: reviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.put("/review/:id", async (req, res) => {
  const requestId = req.params.id;
  const allowedFields = new Set(["scoreOne", "scoreTwo", "comments"]);
  const formInput = req.body;

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }

  try {
    const result = await models.HackerReview.update(req.body, {
      where: {
        id: requestId
      }
    });

    return res.json({ update: result });
  } catch (e) {
    return res.status(500).json({
      error: e
    });
  }
});

router.get("/review", async (req, res) => {
  try {
    const profilesWCount = await models.HackerProfile.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("HackerReviews.id")),
            "reviewCount"
          ]
        ]
      },
      include: [
        {
          model: models.HackerReview,
          attributes: []
        }
      ],
      group: ["HackerProfile.userId"]
    });

    const acceptableProfile = profilesWCount.find(profile => {
      return profile.dataValues.reviewCount < 3;
    });
    if (acceptableProfile) {
      const newProfile = await models.HackerReview.create({
        hackerId: acceptableProfile.dataValues.userId,
        createdBy: req.user.id
      });

      return res.json({
        review: newProfile,
        profile: acceptableProfile
      });
    } else {
      return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
});

module.exports = router;
