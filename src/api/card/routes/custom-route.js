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
      path: "/card/detail",
      handler: "card.findCard",
      config: {
        policies: [],
      },
    },
  ],
};
