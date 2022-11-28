"use strict";

/**
 *  merch controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::merch.merch", ({ strapi }) => ({
  async findAll(ctx) {
    const query = {
      fields: ["name", "price", "sell_date_index"],
      populate: {
        series: {
          fields: ["name", "type"],
        },
        character: {
          fields: ["name"],
        },
        avatar: {
          fields: ["url"],
        },
        materials: {
          fields: ["value"],
        },
        packagings: {
          fields: ["value"],
        },
        technologies: {
          fields: ["value"],
        },
        size: {
          fields: ["value"],
        },
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
      "api::merch.merch",
      query
    );
    return entries;
  },
  async findMerch(ctx) {
    const { id } = ctx.params;
    const query = {
      fields: [
        "name",
        "weibo",
        "tmall",
        "price",
        "sell_date_index",
        "description",
      ],
      populate: {
        series: {
          fields: ["name", "type", "sell_times"],
        },
        character: {
          fields: ["name"],
        },
        avatar: {
          fields: ["url"],
        },
        images: {
          fields: ["url"],
        },
        materials: {
          fields: ["value"],
        },
        packagings: {
          fields: ["value"],
        },
        technologies: {
          fields: ["value"],
        },
        size: {
          fields: ["value"],
        },
      },
      ...ctx.query,
      filters: {
        publishedAt: {
          $ne: null,
        },
      },
    };
    const entry = await strapi.entityService.findOne(
      "api::merch.merch",
      parseInt(id),
      query
    );
    return entry;
  },
  // async getPriceRange(ctx) {
  //   const query = {
  //     fields: ["price"],
  //     sort: ["price"],
  //     filters: {
  //       publishedAt: {
  //         $ne: null,
  //       },
  //     },
  //   };
  //   const entry = await strapi.entityService.findMany(
  //     "api::merch.merch",
  //     query
  //   );
  //   const length = entry.length();
  //   const range = [entry[0].price, entry[length - 1].price];
  //   return range;
  // },
}));
