module.exports = {
    routes: [
      {
        method: "GET",
        path: "/version-histories",
        handler: "vision-history.findHistories",
        config: {
          policies: [],
        },
      }
    ],
  };