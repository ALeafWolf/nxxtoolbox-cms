"use strict";

/**
 *  card controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async findAll(ctx) {
    const { locale } = ctx.query;
    console.log(locale);
    const query = {
      fields: [
        "name",
        "img_ref",
        "name_en",
        "name_ko",
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
    if (locale === "en") {
      for (let i = 0; i < entries.length; i++) {
        entries[i].name = entries[i].name_en;
      }
    } else if (locale === "ko") {
      for (let i = 0; i < entries.length; i++) {
        entries[i].name = entries[i].name_ko;
      }
    }
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
        "img_ref",
        "slug",
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
