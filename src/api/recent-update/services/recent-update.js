'use strict';

/**
 * recent-update service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recent-update.recent-update');
