module.exports = {
  routes: [
    {
      method: "GET",
      path: "/card-acquisition/list",
      handler: "card-acquisition.findAll",
      config: {
        policies: [],
      },
    },
  ],
};
