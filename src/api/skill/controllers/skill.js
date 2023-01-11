"use strict";

/**
 *  skill controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::skill.skill", ({ strapi }) => ({
  async findSkill(ctx) {
    const { name } = ctx.query;
    const query = {
      fields: ["name", "name_en", "name_ko", "variant"],
      populate: {
        number: {
          fields: ["lv1", "lv10"],
        },
        relate_cards: {
          fields: ["name", "name_en", "name_ko"],
          populate: ["character", "thumbnail"],
          sort: {
            character: {
              id: "asc",
            },
          },
        },
        skill_group: {
          fields: ["description", "description_en", "description_ko"],
          populate: {
            icon: {
              fields: ['url']
            },
            skills: {
              fields: ["rank", "variant", "name", "name_en", "name_ko"],
              sort: ["rank", "variant"],
            },
          },
        },
      },
      ...ctx.query,
      filters: {
        $or: [
          {
            name: name,
          },
          {
            name_en: name,
          },
          {
            name_ko: name,
          },
        ],
        publishedAt: {
          $ne: null,
        },
      },
    };
    // Calling the default core action
    const entries = await strapi.entityService.findMany(
      "api::skill.skill",
      query
    );

    return entries;
  },
}));
