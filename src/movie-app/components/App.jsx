import * as React from "react";
// import { CSSTransitionGroup } from 'react-transition-group';
import Spinner from "./Spinner.jsx";
import MovieListPage from "./MovieListPage.jsx";
import MoviePage from "./MoviePage.jsx";

// ------------------------------
// Main screen
// ------------------------------

export default class App extends React.PureComponent {
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
			showDetail: true,
		});
	};

	handleBackClick = () => {
		this.setState({
			currentId: null,
			showDetail: false,
		});
	};

	render() {
		const { currentId, showDetail } = this.state;
		return (
			<div className="App">
				{showDetail ? this.renderDetail(currentId) : this.renderList()}
			</div>
		);
	}

	renderDetail(id) {
		return (
			<>
				<button className="App-back" onClick={this.handleBackClick}>
					{"👈"}
				</button>
				<MoviePage id={id} />
			</>
		);
	}

	renderList() {
		return <MovieListPage onMovieClick={this.handleMovieClick} />;
	}
}

function NextButton(props) {
	return (
		<div className="next" onClick={props.onClick}>
			<div className="next-inner">
				{props.isLoading ? <Spinner size="small" /> : "👉"}
			</div>
		</div>
	);
}

// function CrossFade(props) {
//   return (
//     <CSSTransitionGroup
//       transitionName="fade"
//       transitionEnterTimeout={400}
//       transitionLeaveTimeout={200}
//     >
//       {props.children}
//     </CSSTransitionGroup>
//   );
// }
