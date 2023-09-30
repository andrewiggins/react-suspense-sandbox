import * as React from "react";
import { use, Suspense } from "react";
import Spinner from "./Spinner.jsx";
import {
	fetchMovieDetails,
	fetchMovieReviews,
	fetchImage,
} from "../api/index.js";

// --------------------------
// Individual movie page
// --------------------------
/** @param {{ id: number }} props */
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
// Individual movie details
// --------------------------
// ________
// |      |  Moonrise Kingdom
// |      |  🍅 93%
// |      |  86% liked it
// --------------------------

/** @param {{ id: number; }} props */
function MovieDetails(props) {
	const movie = use(fetchMovieDetails(props.id));
	return (
		<div className="MovieDetails">
			<MoviePoster src={movie.poster} />
			<h1>{movie.title}</h1>
			<MovieMetrics {...movie} />
		</div>
	);
}

/** @param {{ src: string; } & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props */
function Img({ src, ...rest }) {
	return <img src={use(fetchImage(src))} {...rest} />;
}

/** @param {{ src: string }} props */
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

/** @param {MovieDetails} props */
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
// Individual movie reviews pane
// ----------------------------
//  __________________________
// | "Good movie" - Dan       |
// |_ ________________________|
// | "Waste of time" - Andrew |
// |__________________________|
// ----------------------------

/** @param {{ id: number }} props */
function MovieReviews(props) {
	const reviews = use(fetchMovieReviews(props.id));
	return (
		<div className="MovieReviews">
			{reviews.map((review) => (
				<MovieReview key={review.id} {...review} />
			))}
		</div>
	);
}

/** @param {MovieReview} props */
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
