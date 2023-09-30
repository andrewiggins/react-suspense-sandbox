import { movieDetailsJSON, movieListJSON, movieReviewsJSON } from "./data";

/**
 * @overload
 * @param {() => Promise<R>} fetcher
 * @returns {() => Promise<R>}
 * @template R
 */
/**
 * @overload
 * @param {(arg: P) => Promise<R>} fetcher
 * @returns {(arg: P) => Promise<R>}
 * @template P
 * @template R
 */
/**
 * @param {(arg?: P) => Promise<R>} fetcher
 * @returns {(arg?: P) => Promise<R>}
 * @template P
 * @template R
 */
function createResource(fetcher) {
	const cache = new Map();
	return (arg) => {
		if (cache.has(arg)) {
			return cache.get(arg);
		}
		const promise = fetcher(arg).finally(() => cache.delete(arg));
		cache.set(arg, promise);
		return promise;
	};
}

const defaultDelay = 1000;

/** @type {() => Promise<MovieList>} */
export const fetchMovieList = createResource(() => {
	return delay(defaultDelay).then(() => movieListJSON);
});

/** @type {(id: number) => Promise<MovieDetails>} */
function fetchMovieDetailsImpl(id) {
	return delay(defaultDelay).then(() => movieDetailsJSON[id]);
}
export const fetchMovieDetails = createResource(fetchMovieDetailsImpl);

/** @type {(id: number) => Promise<MovieReview[]>} */
function fetchMovieReviewsImpl(id) {
	return delay(defaultDelay).then(() => movieReviewsJSON[id]);
}
export const fetchMovieReviews = createResource(fetchMovieReviewsImpl);

/** @type {(src: string) => Promise<string>} */
function fetchImageImpl(src) {
	const imgLoad = new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});

	return Promise.all([imgLoad, delay(defaultDelay)]).then(() => src);
}
export const fetchImage = createResource(fetchImageImpl);

/** @type {(ms: number) => Promise<void>} */
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
