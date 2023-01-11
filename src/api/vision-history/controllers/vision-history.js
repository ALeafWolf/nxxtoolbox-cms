"use strict";

/**
 *  vision-history controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::vision-history.vision-history",
  ({ strapi }) => ({
    async findHistories(ctx) {
      const queryA = {
        filters: {
          server: {
            $eq: "CN",
          },
        },
        fields: ["start", "end", "type", "weibo", "bilibili"],
        populate: {
          cards: {
            fields: ["name", "slug", "img_ref"],
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
        sort: {
          start: "asc",
        },
        ...ctx.query,
      };
      const queryB = {
        filters: {
          server: {
            $eq: "GLOBAL",
          },
        },
        fields: ["start", "end", "type", "weibo", "bilibili"],
        populate: {
          cards: {
            fields: ["name", "slug", "img_ref"],
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
        sort: {
          start: "asc",
        },
        ...ctx.query,
      };
      const cn = await strapi.entityService.findMany(
        "api::vision-history.vision-history",
        queryA
      );
      const global = await strapi.entityService.findMany(
        "api::vision-history.vision-history",
        queryB
      );

      return { cn, global };
    },
  })
);
