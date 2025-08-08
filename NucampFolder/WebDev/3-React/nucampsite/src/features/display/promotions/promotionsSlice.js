// course video had this at '../../app/shared/promotions';
import { PROMOTIONS } from '../../../app/shared/PROMOTIONS';
// use lowercase file names for any files that do not export 
// a React component (e.g., data, utility functions)
export const selectFeaturedPromotion = () => {
    /* Find the first promotion that is featured
       by checking if the featured property is true
       and return it. */
    return PROMOTIONS.find(promotion => promotion.featured);
};
/** Select all promotions */
/*
export const selectAllPromotions = () => {
    return PROMOTIONS;
};
*/
/** Find a promotion by its ID */
/*
export const selectPromotionById = (id) => {
    return PROMOTIONS.find(promotion => promotion.id === id);
};
*/