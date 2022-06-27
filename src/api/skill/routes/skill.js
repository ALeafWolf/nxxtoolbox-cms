'use strict';

/**
 * skill router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::skill.skill',
({ strapi }) => ({
    async findWithGroup(ctx){
        const query = {
            fields: ['name', 'description', 'img_ref'],
            populate: {

            }
        }
    }
}));
