'use strict';

/**
 * update-item service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::update-item.update-item');
