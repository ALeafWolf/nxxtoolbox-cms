"use strict";

/**
 * date-list controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::date-list.date-list",
  ({ strapi }) => ({
    async findEntries(ctx) {
      const query = {
        fields: ["start", "end", "url"],
        populate: {
          merches: {
            fields: ["name"],
            populate: ["avatar"],
          },
        },
        ...ctx.query,
      };
      // Calling the default core action
      const entries = await strapi.entityService.findMany(
        "api::date-list.date-list",
        query
      );
      return entries;
    },
  })
);
