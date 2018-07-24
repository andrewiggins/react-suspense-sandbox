import {movieDetailsJSON, movieListJSON, movieReviewsJSON} from './data';

const defaultDelay = 1000;

export function fetchMovieDetails(id) {
  return delay(defaultDelay).then(() => movieDetailsJSON);
}

export function fetchMovieList() {
  return delay(defaultDelay).then(() => movieListJSON);
}

export function fetchMovieReviews() {
  return delay(defaultDelay).then(() => movieReviewsJSON);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
