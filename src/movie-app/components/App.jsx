import * as React from "react";
import { useCallback, useEffect } from "react";
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
/**
 * @typedef {{ showDetail: false; currentId: null;  }} ListAppState
 * @typedef {{ showDetail: false; currentId: number;  }} LoadingDetailAppState
 * @typedef {{ showDetail: true; currentId: number;  }} DetailAppState
 * @typedef {ListAppState | LoadingDetailAppState | DetailAppState} AppState
 */
export default function App() {
	const [state, setState] = React.useState(
		/** @type {AppState} */ ({ showDetail: false, currentId: null })
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [state.showDetail, state.currentId]);

	/** @type {(id: number) => void} */
	const handleMovieClick = useCallback((id) => {
		setState({
			showDetail: false,
			currentId: id,
		});

		startTransition(() => {
			setState({
				showDetail: true,
				currentId: id,
			});
		});
	}, []);

	/** @type {() => void} */
	const handleBackClick = useCallback(() => {
		setState({
			currentId: null,
			showDetail: false,
		});
	}, []);

	const { currentId, showDetail } = state;
	return (
		<div className="App">
			{showDetail ? (
				<>
					<button className="App-back" onClick={handleBackClick}>
						{"👈"}
					</button>
					<Suspense fallback={<Spinner size="large" />}>
						<MoviePageLoader id={currentId} />
					</Suspense>
				</>
			) : (
				<Suspense fallback={<Spinner size="large" />}>
					<MovieListPage
						loadingId={currentId}
						onMovieClick={handleMovieClick}
					/>
				</Suspense>
			)}
		</div>
	);
}
