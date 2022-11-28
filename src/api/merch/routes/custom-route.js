module.exports = {
  routes: [
    {
      method: "GET",
      path: "/merch/list",
      handler: "merch.findAll",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/merch/:id",
      handler: "merch.findMerch",
      config: {
        policies: [],
      },
    }
  ], 
};
