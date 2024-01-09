const express = require("express");
const router = express.Router();

router.post("/calculatePrice", async (req, res) => {
  try {
    function calculateTotalPrice(items, isMember) {
      const discounts = {
        orangePinkGreenBundle: 0.05,
        memberCard: 0.1,
      };

      let totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      items.forEach((item) => {
        if (
          ["Orange", "Pink", "Green"].includes(item.color) &&
          item.quantity >= 2
        ) {
          const bundleDiscount =
            item.price * item.quantity * discounts.orangePinkGreenBundle;
          totalPrice -= bundleDiscount;
        }
      });

      if (isMember) {
        const memberCardDiscount = totalPrice * discounts.memberCard;
        totalPrice -= memberCardDiscount;
      }

      return Math.round(totalPrice);
    }

    const totalPrice = calculateTotalPrice(
      req.body.quantities,
      req.body.isMember
    );

    return res.send(totalPrice.toString());
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return res.status(500).send("Error fetching attractions");
  }
});

module.exports = router;
