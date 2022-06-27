module.exports = {
  routes: [
    {
      method: "GET",
      path: "/cards",
      handler: "card.findAll",
      config: {
        policies: [],
      },
    },
  ],
};
