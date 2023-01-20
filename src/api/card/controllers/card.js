"use strict";

/**
 *  card controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async findAll(ctx) {
    const filters = ctx.query.filters ? ctx.query.filters : {};
    filters.publishedAt = {
      $ne: null,
    };
    const query = {
      fields: [
        "name",
        "name_en",
        "name_ko",
        "influence",
        "defense",
        "attribute",
        "is_permanent",
      ],
      populate: {
        character: {
          fields: ["name"],
        },
        thumbnail: true,
        skills: {
          fields: ["slug", "name", "name_en", "name_ko"],
          populate: {
            skill_group: {
              populate: ["icon"],
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
      filters: filters,
    };
    // Calling the default core action
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );
    return entries;
  },
  async findCard(ctx) {
    const { name } = ctx.params;
    const { locale } = ctx.query;
    const query = {
      fields: [
        "name",
        "name_en",
        "name_ko",
        "attribute",
        "influence",
        "defense",
      ],
      populate: {
        character: {
          fields: ["name"],
        },
        rarity: {
          fields: ["value"],
        },
        card_acquisitions: true,
        skills: {
          fields: ["name", "name_en", "name_ko", "slug", "variant"],
          populate: {
            number: {
              fields: ["lv1", "lv10"],
            },
            skill_group: {
              fields: ["description", "description_en", "description_ko"],
              populate: ["icon"],
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
    const entries = await strapi.entityService.findMany(
      "api::card.card",
      query
    );
    const card = entries[0];
    if (card) {
      if (locale === "en") {
        card.name = card.name_en;
      } else if (locale === "ko") {
        card.name = card.name_ko;
      }
    }
    return card;
  },
}));
