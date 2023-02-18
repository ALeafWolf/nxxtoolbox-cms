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
        thumbnail: {
          fields: ["url"],
        },
        images: {
          fields: ["url"],
        },
        character: {
          fields: ["name"],
        },
        rarity: {
          fields: ["value"],
        },
        card_acquisitions: {
          fields: "*",
          populate: {
            cards: {
              fields: [`name`, "name_en", "name_ko"],
              populate: ["thumbnail"],
              sort: {
                character: {
                  id: "asc",
                },
              },
            },
          },
          sort: ["start:desc", "end:desc"],
        },
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
    return card;
  },
  async findCardForPowerCalculator(ctx) {
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
        thumbnail: {
          fields: ["url"],
        },
        character: {
          fields: ["name"],
        },
        rarity: {
          fields: ["value"],
        },
        skills: {
          fields: ["name", "name_en", "name_ko", "slug", "rank", "variant"],
          populate: {
            number: {
              fields: ["lv1", "lv10"],
            },
            skill_group: {
              fields: ["description", "description_en", "description_ko"],
              populate: {
                icon: {
                  fields: ["url"],
                },
                character: {
                  fields: ["name"],
                },
                attribute: {
                  fields: ["name"],
                },
              },
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
    return entries;
  },
}));
