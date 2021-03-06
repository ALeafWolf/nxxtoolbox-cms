"use strict";

/**
 *  skill controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::skill.skill", ({ strapi }) => ({
  async findSkill(ctx) {
    const query = {
      filters: {
        slug: {
          $eq: ctx.query.slug
        }
      },
      fields: ["name", "description", "slug", "img_ref"],
      populate: {
        number: {
          fields: ["lv1", "lv10"],
        },
        relate_cards: {
          fields: ["slug", "img_ref"],
          populate: ["character"],
          sort: {
            character: {
              id: "asc",
            },
          },
        },
        skill_group: {
          populate: {
            skills: {
              fields: ["slug", "rank", "variant"],
              sort: ["variant", "rank"],
            },
          },
        },
      },
      ...ctx.query,
    };
    // Calling the default core action
    const entries = await strapi.entityService.findMany(
      "api::skill.skill",
      query
    );

    return entries;
  },
}));
