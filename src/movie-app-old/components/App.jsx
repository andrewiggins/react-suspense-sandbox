import * as React from "react";
import { Suspense, PureComponent, startTransition } from "react";
import Spinner from "./Spinner";
import MovieListPage from "./MovieListPage";

// TODO: Update App to function component and use useTransition and isPending?
// Perhaps do that in a new app? Also look at using `use` hook for resources.
// Also, provide a way to switch between full screen spinner and inline spinner.

const MoviePageLoader = React.lazy(() => import("./MoviePage.jsx"));

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
