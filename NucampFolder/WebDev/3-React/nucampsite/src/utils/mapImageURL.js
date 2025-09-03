import { baseUrl } from '../app/shared/baseUrl';
/**
 * @const {Function} mapImageURL
 * @import baseUrl
 * @description This arrow function takes a base URL and returns a new array in which each item's image property is replaced with a full URL.
 * @param {Array} arr - The array of items to map.
 * @param {Object} item - The item to map.
 * @operation spread operator to concatenate the base URL with the image path
 * @property {string} image - The full URL of the item's image.
 * @returns {Array} - The mapped array with full image URLs.
 */
export const mapImageURL = (arr) => {
    return arr.map((item) => {
        return {
            ...item,
            image: baseUrl + item.image
        };
    });
};


