import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const getAuthReviews = () => authenticatedHttp.get('/reviews')

export const getReviews = () => unauthenticatedHttp.get('/reviews')