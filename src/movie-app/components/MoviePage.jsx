import * as React from "react";
import { Suspense } from "react";
import { createResource } from "simple-cache-provider";
import { cache } from "../cache.js";
import Spinner from "./Spinner.jsx";
import { fetchMovieDetailsJSON, fetchMovieReviewsJSON } from "../api";

// --------------------------
// Invididual movie page
// --------------------------
export default function MoviePage(props) {
	return (
		<>
			<MovieDetails id={props.id} />
			<Suspense fallback={<Spinner size="medium" />}>
				<MovieReviews id={props.id} />
			</Suspense>
		</>
	);
}

// --------------------------
// Invididual movie details
// --------------------------
// ________
// |      |  Moonrise Kingdom
// |      |  🍅 93%
// |      |  86% liked it
// --------------------------

const MovieDetailsResource = createResource(fetchMovieDetailsJSON);

function MovieDetails(props) {
	const movie = MovieDetailsResource.read(cache, props.id);
	return (
		<div className="MovieDetails">
			<MoviePoster src={movie.poster} />
			<h1>{movie.title}</h1>
			<MovieMetrics {...movie} />
		</div>
	);
}

const ImageResource = createResource(
	(src) =>
		new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(src);
			img.src = src;
		})
);

function Img({ src, ...rest }) {
	return <img src={ImageResource.read(cache, src)} {...rest} />;
}

function MoviePoster(props) {
	return (
		<div className="MoviePoster">
			<Suspense fallback={<img src={props.src} alt="poster" />}>
				<Img src={props.src} alt="poster" />
			</Suspense>
		</div>
	);
}

function MovieMetrics(props) {
	return (
		<>
			<div className="MovieMetrics-tomato">
				<h4>Tomatometer</h4>
				<p>
					{props.fresh ? "🍅" : "🤢"} {props.rating}
				</p>
			</div>
			<div className="MovieMetrics-audience">
				<h4>Audience</h4>
				<p>
					{"🍿"} {props.audience}
				</p>
			</div>
			<div className="MovieMetrics-consensus">
				<h4>Critics Consensus</h4>
				<p>{props.consensus}</p>
			</div>
		</>
	);
}

// ----------------------------
// Invididual movie reviews pane
// ----------------------------
//  __________________________
// | "Good movie" - Dan       |
// |_ ________________________|
// | "Waste of time" - Andrew |
// |__________________________|
// ----------------------------

const MovieReviewsResource = createResource(fetchMovieReviewsJSON);

function MovieReviews(props) {
	const reviews = MovieReviewsResource.read(cache, props.id);
	return (
		<div className="MovieReviews">
			{reviews.map((review) => (
				<MovieReview key={review.id} {...review} />
			))}
		</div>
	);
}

function MovieReview(props) {
	return (
		<blockquote className="MovieReview">
			<figure>{props.fresh ? "🍅" : "🤢"}</figure>
			<p>{props.text}</p>
			<footer>
				{props.author.name}, {props.author.publication}
			</footer>
		</blockquote>
	);
}
