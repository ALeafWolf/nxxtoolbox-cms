"use strict";

/**
 *  card controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async findAll(ctx) {
    const query = {
      fields: ["name", "img_ref", "slug", "influence", "defense", "attribute"],
      populate: {
        character: {
          fields: ["name"],
        },
        skills: {
          fields: ["slug", "name", "img_ref"],
        },
        rarity: {
          fields: ["value"],
        },
        card_acquisitions: {
          fields: ["value"],
        },
      },
      sort: {
        rarity: {
          id: "desc",
        },
        character: {
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
  async findCard(ctx){
    const query = {
      filters: {
        slug: {
          $eq: ctx.query.slug
        }
      },
      fields: ["name", "type", "influence", "defense", "img_ref"],
      populate: {
        skills: {
          fields: ["name", "slug", "img_ref", "description"],
          populate: {
            number: {
              fields: ["lv1", "lv10"]
            },
            card_acquisitions: {
              fields: "*"
            }
          },
          sort: {
            slot: "asc"
          }
        }
      },
      ...ctx.query
    };
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );

    return entries;
  }
}));
