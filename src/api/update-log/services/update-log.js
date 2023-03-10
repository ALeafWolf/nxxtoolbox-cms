'use strict';

/**
 * update-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::update-log.update-log');
