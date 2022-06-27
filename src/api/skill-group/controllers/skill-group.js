"use strict";

/**
 *  skill-group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::skill-group.skill-group",
  ({ strapi }) => ({
    async fineOne(ctx){

    },
    async findAll(ctx) {
      const query = {
        fields: ["name", "img_ref"],
        populate: {
            skills: {
                fields: ['slug', 'name', 'description'],
                populate: {
                    number: {
                        fields: ['lv1', 'lv10']
                    },
                    rarity:{
                        fields: ['value']
                    }
                },
                sort: ['variant', 'rank']
            }
        },
        ...ctx.query
      };
      // Calling the default core action
      const entries = await strapi.entityService.findMany(
        "api::skill-group.skill-group",
        query
      );

      return entries;
    },
  })
);
