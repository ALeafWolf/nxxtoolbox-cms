"use strict";

/**
 * recent-update controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::recent-update.recent-update",
  ({ strapi }) => ({
    async getUpdates(ctx) {
      const query = {
        fields: "*",
        populate: {
          card_list: {
            populate: {
              cards: {
                fields: ["name", "name_en", "name_ko"],
                populate: ["thumbnail"]
              },
              date: {
                fields: '*'
              }
            },
          },
          merch_list: {
            populate: {
              merches: {
                fields: ["name"],
                populate: {
                    avatar: {
                        fields: ['url']
                    }
                }
              },
              date: {
                fields: '*'
              }
            },
          },

        },
      };
      const entries = await strapi.entityService.findMany(
        "api::recent-update.recent-update",
        query
      );
      return entries;
    },
  })
);
