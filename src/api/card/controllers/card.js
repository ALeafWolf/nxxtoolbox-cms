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
  async findCard(ctx) {
    const query = {
      filters: {
        slug: {
          $eq: ctx.query.slug,
        },
      },
      fields: ["name", "attribute", "influence", "defense", "img_ref"],
      populate: {
        character: {
          fields: ["name"],
        },
        rarity: {
          fields: ["value"],
        },
        skills: {
          fields: ["name", "slug", "description"],
          populate: {
            number: {
              fields: ["lv1", "lv10"],
            },
            card_acquisitions: {
              fields: "*",
            },
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
      },
      ...ctx.query,
    };
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );
    const history = await strapi.entityService.findMany(
      "api::vision-history.vision-history",
      {
        filters: {
          cards: {
            slug: {
              $eq: ctx.query.slug,
            },
          },
        },
      }
    );
    entries[0].history = history;
    return entries[0];
  },
}));
