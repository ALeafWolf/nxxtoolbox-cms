module.exports = {
    routes: [
      {
        method: "GET",
        path: "/skill-detail",
        handler: "skill.findSkill",
        config: {
          policies: [],
        },
      },
    ],
  };