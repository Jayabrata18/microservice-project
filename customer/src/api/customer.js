const CustomerService = require("../services/customer-service");
const UserAuth = require("./middlewares/auth");
const { PublishMessage } = require("../utils");

module.exports = (app, channel) => {
  const service = new CustomerService();
  // SubscribeMessage(channel, service)

  app.post("/customer/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/customer/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/customer/address", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;

      const { street, postalCode, city, country } = req.body;

      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/customer/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
  app.delete("/customer/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data, payload } = await service.DeleteProfile(_id);
      PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(payload));
      res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // app.get("/customer/shoping-details", UserAuth, async (req, res, next) => {
  //   try {
  //     const { _id } = req.user;
  //     const { data } = await service.GetShopingDetails(_id);

  //     return res.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  // app.get("/customer/wishlist", UserAuth, async (req, res, next) => {
  //   try {
  //     const { _id } = req.user;
  //     const { data } = await service.GetWishList(_id);
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });
};
