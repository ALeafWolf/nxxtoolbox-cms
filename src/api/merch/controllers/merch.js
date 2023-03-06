"use strict";

/**
 *  merch controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::merch.merch", ({ strapi }) => ({
  async findAll(ctx) {
    const filter = {
      publishedAt: {
        $ne: null,
      },
      ...ctx.query.filters,
    };

    const query = {
      fields: ["name", "price"],
      populate: {
        series: {
          fields: ["name", "type"],
        },
        avatar: {
          fields: ["url"],
        },
        sell_dates: {
          populate: {
            start: {
              fields: ["date"],
            },
            end: {
              fields: ["date"],
            },
          },
        },
        sell_date_ranges: {
          fields: ['value', 'start', 'end'],
          sort: 'start'
        }
      },
      filters: filter,
      sort: ctx.query.sort,
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
        "description",
      ],
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
        images: {
          fields: ["url"],
        },
        type: {
          fields: ["value"],
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
        sell_date_ranges: {
          fields: ['value', 'start', 'end', 'url'],
          sort: 'start'
        }
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
  async getPriceRange(ctx) {
    const query = {
      fields: ["price"],
      sort: ["price"],
      filters: {
        publishedAt: {
          $ne: null,
        },
      },
    };
    const entry = await strapi.entityService.findMany(
      "api::merch.merch",
      query
    );
    const length = entry.length;
    const range = [entry[0].price, entry[length - 1].price];
    return range;
  },
}));
