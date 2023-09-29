import * as React from "react";
import { Suspense, PureComponent, startTransition } from "react";
// import { unstable_deferredUpdates } from "react-dom";
// import { createResource } from "simple-cache-provider";
// import { cache } from "../cache";
import Spinner from "./Spinner";
import MovieListPage from "./MovieListPage";

// const MoviePageResource = createResource(() => import("./MoviePage.jsx"));

// function MoviePageLoader(props) {
// 	const MoviePage = MoviePageResource.read(cache).default;
// 	return <MoviePage {...props} />;
// }

// const MoviePageLoader = React.lazy(() => import("./MoviePage.jsx"));
import MoviePageLoader from "./MoviePage.jsx";

// -------------------------------
// Main screen
// -------------------------------
export default class App extends PureComponent {
	state = {
		currentId: null,
		showDetail: false,
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.showDetail !== this.state.showDetail ||
			prevState.currentId !== this.state.currentId
		) {
			window.scrollTo(0, 0);
		}
	}

	handleMovieClick = (id) => {
		this.setState({
			currentId: id,
		});
		startTransition(() => {
			this.setState({
				showDetail: true,
			});
		});
	};

	handleBackClick = () =>
		this.setState({
			currentId: null,
			showDetail: false,
		});

	render() {
		const { currentId, showDetail } = this.state;
		return (
			<div className="App">
				{showDetail ? this.renderDetail(currentId) : this.renderList(currentId)}
			</div>
		);
	}

	renderDetail(id) {
		return (
			<>
				<button className="App-back" onClick={this.handleBackClick}>
					{"👈"}
				</button>
				<Suspense fallback={<Spinner size="large" />}>
					<MoviePageLoader id={id} />
				</Suspense>
			</>
		);
	}

	renderList(loadingId) {
		return (
			<Suspense fallback={<Spinner size="large" />}>
				<MovieListPage
					loadingId={loadingId}
					onMovieClick={this.handleMovieClick}
				/>
			</Suspense>
		);
	}
}
