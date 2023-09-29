import { movieDetailsJSON, movieListJSON, movieReviewsJSON } from "./data";

const defaultDelay = 1000;

/** @type {(id: number) => Promise<typeof movieDetailsJSON[1]>} */
export function fetchMovieDetailsJSON(id) {
	return delay(defaultDelay).then(() => movieDetailsJSON[id]);
}

/** @type {() => Promise<typeof movieListJSON>} */
export function fetchMovieListJSON() {
	return delay(defaultDelay).then(() => movieListJSON);
}

/** @type {(id: number) => Promise<typeof movieReviewsJSON[1]>} */
export function fetchMovieReviewsJSON(id) {
	return delay(defaultDelay).then(() => movieReviewsJSON[id]);
}

export function loadImage(src) {
	const imgLoad = new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});

	return Promise.all([imgLoad, delay(defaultDelay)]).then(() => src);
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
