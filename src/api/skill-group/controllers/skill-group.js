"use strict";

/**
 *  skill-group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// function isSmaller(a, b) {
//   return (
//     a.slot < b.slot ||
//     (a.slot === b.slot && a.character.id < b.character.id) ||
//     (a.slot === b.slot &&
//       a.character.id === b.character.id &&
//       a.attribute.id < b.attribute.id)
//   );
// }

// function swap(arr, a, b) {
//   let temp = arr[a];
//   arr[a] = arr[b];
//   arr[b] = temp;
// }

// function partition(arr, low, high) {
//   const pivot = arr[Math.floor((low + high) / 2)];
//   let l = low,
//     h = high;
//   while (l <= h) {
//     while (isSmaller(arr[l], pivot)) {
//       l++;
//     }
//     while (isSmaller(pivot, arr[h])) {
//       h--;
//     }
//     if (l <= h) {
//       swap(arr, l, h);
//       l++;
//       h--;
//     }
//   }
//   return l;
// }

// function quickSort(arr, low, high) {
//   if (arr.length > 1) {
//     const pivot = partition(arr, low, high);
//     if (low < pivot - 1) {
//       quickSort(arr, low, pivot - 1);
//     }
//     if (high > pivot + 1) {
//       quickSort(arr, pivot + 1, high);
//     }
//   }
// }

module.exports = createCoreController(
  "api::skill-group.skill-group",
  ({ strapi }) => ({
    async findAll(ctx) {
      const query = {
        fields: ["name", "img_ref", "description", "slot"],
        populate: {
          attribute: {
            fields: ["id"],
          },
          character: {
            fields: ["id"],
          },
          skills: {
            fields: ["slug", "name"],
            populate: {
              number: {
                fields: ["lv1", "lv10"],
              },
              rarity: {
                fields: ["value"],
              },
            },
            sort: ["variant", "rank"],
          },
        },
        sort: {
          id: "asc",
        },
        ...ctx.query,
        status: 'published',
      };
      // Calling the default core action
      const entries = await strapi.entityService.findMany(
        "api::skill-group.skill-group",
        query
      );
      // quickSort(entries, 0, entries.length - 1);
      return entries;
    },
  })
);
