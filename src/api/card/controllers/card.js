"use strict";

/**
 *  card controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async findAll(ctx) {
    const query = {
      fields: [
        "name",
        "img_ref",
        "slug",
        "influence",
        "defense",
        "attribute",
      ],
      populate: {
        character: {
          fields: ["name"],
        },
        thumbnail: true,
        skills: {
          fields: ["slug", "name"],
          populate: {
            skill_group: {
              fields: ["img_ref"],
            },
          },
          sort: {
            skill_group: {
              slot: "asc",
            },
          },
        },
        rarity: {
          fields: ["value"],
        },
        card_acquisitions: true,
      },
      sort: {
        id: "desc",
      },
      ...ctx.query,
      filters: {
        publishedAt: {
          $ne: null,
        },
      },
      
    };
    // Calling the default core action
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );
    // const entries = await strapi.service.card.find(query);
    return entries;
  },
  async findCard(ctx) {
    const query = {
      fields: ["name", "attribute", "influence", "defense", "img_ref", "slug"],
      populate: {
        character: {
          fields: ["name"],
        },
        rarity: {
          fields: ["value"],
        },
        card_acquisitions: true,
        skills: {
          fields: ["name", "slug", "variant"],
          populate: {
            number: {
              fields: ["lv1", "lv10"],
            },
            skill_group: {
              fields: ["img_ref", "description"],
            },
          },
          sort: {
            skill_group: {
              slot: "asc",
            },
          },
        },
      },
      ...ctx.query,
      filters: {
        slug: {
          $eq: ctx.query.slug,
        },
        publishedAt: {
          $ne: null,
        },
      },
    };
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );
    return entries[0];
  },
}));
