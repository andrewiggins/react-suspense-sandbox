import * as React from "react";
import { Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";
import Spinner from "./Spinner.jsx";
import {
	fetchMovieDetailsJSON,
	fetchMovieReviewsJSON,
	loadImage,
} from "../api";

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
	const movie = MovieDetailsResource.read(props.id);
	return (
		<div className="MovieDetails">
			<MoviePoster src={movie.poster} />
			<h1>{movie.title}</h1>
			<MovieMetrics {...movie} />
		</div>
	);
}

const ImageResource = createResource(loadImage);

function Img({ src, ...rest }) {
	return <img src={ImageResource.read(src)} {...rest} />;
}

function MoviePoster(props) {
	return (
		<div className="MoviePoster">
			{/* Though note: since the image src isn't loading through an onscreen image,
			the browser will download the image as low priority. So a fallback of <img src />
			is probably a pretty good strategy, but then what's the point of this? */}
			<Suspense fallback={<div>Loading image...</div>}>
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
	const reviews = MovieReviewsResource.read(props.id);
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
