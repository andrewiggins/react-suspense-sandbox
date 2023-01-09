import * as React from "react";
import Spinner from "./Spinner.jsx";
import { movieDetailsJSON, movieReviewsJSON } from "../api/data.js";

// ------------------------------
// Individual movie page
// ------------------------------

export default function MoviePage(props) {
	return (
		<div>
			<MovieDetails id={props.id} />
			<MovieReviews id={props.id} />
		</div>
	);
}

// ------------------------------
// Individual movie details
// ------------------------------
// _______
// |     |  Moorise Kingdom
// |     |  🍅 93%
// |     |  86% liked it
// ------------------------------
function MovieDetails(props) {
	const movie = movieDetailsJSON[props.id];
	return (
		<div className="MovieDetails">
			<MoviePoster src={movie.poster} />
			<h1>{movie.title}</h1>
			<MovieMetrics {...movie} />
		</div>
	);
}

function MoviePoster(props) {
	return (
		<div className="MoviePoster">
			<img src={props.src} alt="poster" />
		</div>
	);
}

function MovieMetrics(props) {
	return (
		<>
			<div className="MovieMetrics-tomato">
				<h4>Tomatometer</h4>
				<p>
					{props.fresh ? "🍅" : "😖"} {props.rating}
				</p>
			</div>
			<div className="MovieMetrics-audience">
				<h4>Audience</h4>
				<p>🍿 {props.audience}</p>
			</div>
			<div className="MovieMetrics-consensus">
				<h4>Critics consensus</h4>
				<p>{props.consensus}</p>
			</div>
		</>
	);
}

function MovieReviews(props) {
	const reviews = movieReviewsJSON[props.id];
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
			<figure>{props.fresh ? "🍅" : "😖"}</figure>
			<p>{props.text}</p>
			<p>{props.author}</p>
		</blockquote>
	);
}
