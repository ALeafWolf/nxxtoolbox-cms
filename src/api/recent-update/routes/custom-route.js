module.exports = {
  routes: [
    {
      method: "GET",
      path: "/recent-update",
      handler: "recent-update.getUpdates",
      config: {
        policies: [],
      },
    },

  ], 
};
