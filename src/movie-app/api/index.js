import { movieDetailsJSON, movieListJSON, movieReviewsJSON } from "./data";

const defaultDelay = 1000;

/** @type {(id: number) => Promise<MovieDetails>} */
export function fetchMovieDetailsJSON(id) {
	return delay(defaultDelay).then(() => movieDetailsJSON[id]);
}

/** @type {() => Promise<MovieList>} */
export function fetchMovieListJSON() {
	return delay(defaultDelay).then(() => movieListJSON);
}

/** @type {(id: number) => Promise<MovieReview[]>} */
export function fetchMovieReviewsJSON(id) {
	return delay(defaultDelay).then(() => movieReviewsJSON[id]);
}

/** @type {(src: string) => Promise<string>} */
export function loadImage(src) {
	const imgLoad = new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});

	return Promise.all([imgLoad, delay(defaultDelay)]).then(() => src);
}

/** @type {(ms: number) => Promise<void>} */
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
