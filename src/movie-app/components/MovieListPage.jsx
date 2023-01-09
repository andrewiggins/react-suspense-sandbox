import * as React from "react";
import { movieListJSON } from "../api/data.js";

export default function MovieListPage(props) {
	const movies = movieListJSON;
	return (
		<div className="MovieListPage">
			<h1>Top Box Office 🍿</h1>
			{movies.map((movie) => (
				<MovieListItem
					key={movie.id}
					{...movie}
					onMovieClick={props.onMovieClick}
				/>
			))}
		</div>
	);
}

function MovieListItem(props) {
	return (
		<div className="MovieListItem">
			<button onClick={() => props.onMovieClick(props.id)}>
				<figure>{props.fresh ? "🍅" : "😖"}</figure>
				<p>{props.title}</p>
				<p>
					{props.rating} · {props.gross}
				</p>
			</button>
		</div>
	);
}
