import {movieDetailsJSON, movieListJSON, movieReviewsJSON} from './data';

const defaultDelay = 1000;

export function fetchMovieDetails(id) {
  return delay(defaultDelay).then(() => movieDetailsJSON[id]);
}

export function fetchMovieList() {
  return delay(defaultDelay).then(() => movieListJSON);
}

export function fetchMovieReviews(id) {
  return delay(defaultDelay).then(() => movieReviewsJSON[id]);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
