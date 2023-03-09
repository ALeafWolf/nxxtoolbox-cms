module.exports = {
  routes: [
    {
      method: "GET",
      path: "/date-list/entries",
      handler: "date-list.findEntries",
      config: {
        policies: [],
      },
    },
  ],
};
