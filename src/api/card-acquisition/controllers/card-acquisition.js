"use strict";

/**
 *  card-acquisition controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::card-acquisition.card-acquisition",
  ({ strapi }) => ({
    async findAll(ctx) {
      let { sort, filters } = ctx.query;
      if (!sort) {
        sort = ["start", "end", "id"];
      }
      if (!filters) {
        filters = {
          publishedAt: {
            $ne: null,
          },
        };
      } else {
        filters = {
          ...filters,
          publishedAt: {
            $ne: null,
          },
        };
      }
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
            fields: [`name`, "name_en", "name_ko"],
            populate: ["thumbnail"],
            sort: {
              rarity: {
                id: "desc",
              },
              character: {
                id: "asc",
              },
            },
          },
        },
        sort: sort,
        filters: filters,
      };
      const entries = await strapi.entityService.findMany(
        "api::card-acquisition.card-acquisition",
        query
      );
      return entries;
    },
  })
);
