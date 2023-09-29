import { movieDetailsJSON, movieListJSON, movieReviewsJSON } from "./data";

const defaultDelay = 1000;

export function fetchMovieDetailsJSON(id) {
	return delay(defaultDelay).then(() => movieDetailsJSON[id]);
}

export function fetchMovieListJSON() {
	return delay(defaultDelay).then(() => movieListJSON);
}

export function fetchMovieReviewsJSON(id) {
	return delay(defaultDelay).then(() => movieReviewsJSON[id]);
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
