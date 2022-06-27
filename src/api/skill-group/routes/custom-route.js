module.exports = {
    routes: [
      {
        method: "GET",
        path: "/skill-groups",
        handler: "skill-group.findAll",
        config: {
          policies: [],
        },
      },
    ],
  };