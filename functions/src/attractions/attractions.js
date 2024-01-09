const express = require("express");
const router = express.Router();
const attractionsData = require("./attractions.json");
const tagsData = require("./tags.json");

router.get("/", async (req, res) => {
  try {
    function mapTags(tags, tagData) {
      return tags.map((tagId) => tagData.find((tag) => tag.id === tagId));
    }

    const placesWithData = attractionsData.map((attraction) => ({
      ...attraction,
      tagsInfo: mapTags(attraction.tags, tagsData),
    }));

    return res.send(placesWithData);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return res.status(500).send("Error fetching attractions");
  }
});

module.exports = router;
