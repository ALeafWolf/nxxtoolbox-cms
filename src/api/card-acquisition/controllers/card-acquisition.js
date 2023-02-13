"use strict";

/**
 *  card-acquisition controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::card-acquisition.card-acquisition",
  ({ strapi }) => ({
    async findAll(ctx) {
      const query = {
        fields: [
          "start",
          "end",
          "type",
          "subtype",
          "server",
          "social_media_url",
          "video_url",
        ],
        populate: {
          cards: {
            fields: [`name`, 'name_en', 'name_ko'],
            populate: ["thumbnail"],
            sort: {
              rarity: {
                id: "desc"
              },
              character: {
                id: "asc",
              },
            },
          },
        },
        sort: ["start", "id"],
        ...ctx.query
      };
      const entries = await strapi.entityService.findMany(
        "api::card-acquisition.card-acquisition",
        query
      );
      return entries;
    },
  })
);
