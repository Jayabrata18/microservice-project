const ShoppingSerivce = require("../services/shopping-service");
module.exports = (app) => {
  const service = new ShoppingService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log(
      "=============== Shopping Service Received  event ================="
    );
  });
};
