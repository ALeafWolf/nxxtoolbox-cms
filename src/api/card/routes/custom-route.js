module.exports = {
  routes: [
    {
      method: "GET",
      path: "/card/list",
      handler: "card.findAll",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/card/power",
      handler: "card.findCardForPowerCalculator",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/card/detail/:name",
      handler: "card.findCard",
      config: {
        policies: [],
      },
    },
  ],
};
