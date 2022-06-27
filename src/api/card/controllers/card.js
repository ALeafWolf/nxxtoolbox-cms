"use strict";

/**
 *  card controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async findAll(ctx) {
    const query = {
    //   fields: ["name", "img_ref", "slug", "influence", "defense"],
      populate: "*",
      sort: {
        character: {
          id: "asc",
        },
        rarity: {
          id: "asc",
        },
      },
      ...ctx.query,
    };
    // Calling the default core action
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );

    return entries;
  },
}));
