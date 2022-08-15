"use strict";

/**
 *  contact controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => ({
  async create(ctx) {
    let req = ctx.request.body;
    const entity = await strapi.service("api::contact.contact").create(req);
    await strapi.plugins["email"].services.email.send({
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Submission from NXXToolbox",
      text: `
        Name: ${entity.name}
        Email: ${entity.name || "N/A"}
        Comment: 
        ${entity.comment}
        `,
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
