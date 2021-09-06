import {
  c as createElement$1,
  e as REACT_FRAGMENT_TYPE,
  P as PureComponent,
  i as createRoot,
} from "./chunks/react-dom.b4f119cdf.development.6444d606.js";
const birdPosterUrl = "/react-suspense-sandbox/assets/bird.64324c57.jpg";
const downsizingPosterUrl =
  "/react-suspense-sandbox/assets/downsizing.0dcb0b8a.jpg";
const pantherPosterUrl = "/react-suspense-sandbox/assets/panther.69955e7f.jpg";
const womanPosterUrl = "/react-suspense-sandbox/assets/woman.8a61599a.jpg";
const figuresPosterUrl = "/react-suspense-sandbox/assets/figures.fd28d63f.jpg";
const manPosterUrl = "/react-suspense-sandbox/assets/man.198181a0.jpg";
const movieListJSON = [
  { id: 1, title: "Lady Bird", rating: "99%", gross: "$52.9M", fresh: true },
  { id: 2, title: "Downsizing", rating: "51%", gross: "$24.5M", fresh: false },
  {
    id: 3,
    title: "Black Panther",
    rating: "98%",
    gross: "$403.6M",
    fresh: true,
  },
  {
    id: 4,
    title: "A Fantastic Woman",
    rating: "93%",
    gross: "$0.6M",
    fresh: true,
  },
  {
    id: 5,
    title: "Father Figures",
    rating: "22%",
    gross: "$17.5M",
    fresh: false,
  },
  { id: 6, title: "Early Man", rating: "81%", gross: "$6.8M", fresh: true },
];

const movieDetailsJSON = {
  1: {
    title: "Lady Bird",
    rating: "99%",
    fresh: true,
    audience: "81%",
    consensus:
      "Lady Bird delivers fresh insights about the turmoil of adolescence -- and reveals writer-director Greta Gerwig as a fully formed filmmaking talent.",
    poster: birdPosterUrl,
  },
  2: {
    title: "Downsizing",
    rating: "51%",
    fresh: false,
    audience: "23%",
    consensus:
      "Downsizing assembles a talented cast in pursuit of some truly interesting ideas -- which may be enough for some audiences to forgive the final product's frustrating shortcomings.",
    poster: downsizingPosterUrl,
  },
  3: {
    title: "Black Panther",
    rating: "98%",
    fresh: true,
    audience: "77%",
    consensus:
      "Black Panther elevates superhero cinema to thrilling new heights while telling one of the MCU's most absorbing stories -- and introducing some of its most fully realized characters.",
    poster: pantherPosterUrl,
  },
  4: {
    title: "A Fantastic Woman",
    rating: "93%",
    fresh: true,
    audience: "82%",
    consensus:
      "Subtle and tender, A Fantastic Woman handles its timely, sensitive subject matter with care.",
    poster: womanPosterUrl,
  },
  5: {
    title: "Father Figures",
    rating: "22%",
    fresh: false,
    audience: "36%",
    consensus: "No consensus yet.",
    poster: figuresPosterUrl,
  },
  6: {
    title: "Early Man",
    rating: "81%",
    fresh: true,
    audience: "57%",
    consensus:
      "Early Man isn't quite as evolved as Aardman's best work, but still retains the unique visuals and sweet humor that have made the studio a favorite among animation enthusiasts.",
    poster: manPosterUrl,
  },
};

const movieReviewsJSON = {
  1: [{ id: 0, fresh: true, text: "The densely packed" }],
  2: [{ id: 0, fresh: true, text: "While Downsizing is" }],
  3: [{ id: 0, fresh: true, text: "Black Panther is not" }],
  4: [{ id: 0, fresh: true, text: "Given it could be" }],
  5: [{ id: 0, fresh: false, text: "Limp jokes, bad chemistry" }],
  6: [{ id: 0, fresh: false, text: "The story is thin, " }],
};
function MovieListPage(props) {
  const movies = movieListJSON;
  return createElement$1(
    "div",
    { className: "MovieListPage" },
    createElement$1("h1", null, "Top Box Office 🍿"),
    movies.map((movie) =>
      createElement$1(MovieListItem, {
        key: movie.id,
        ...movie,
        onMovieClick: props.onMovieClick,
      })
    )
  );
}

function MovieListItem(props) {
  return createElement$1(
    "div",
    { className: "MovieListItem" },
    createElement$1(
      "button",
      { onClick: () => props.onMovieClick(props.id) },
      createElement$1("figure", null, props.fresh ? "🍅" : "😖"),
      createElement$1("p", null, props.title),
      createElement$1("p", null, props.rating, " · ", props.gross)
    )
  );
} // ------------------------------
// Individual movie page
// ------------------------------

function MoviePage(props) {
  return createElement$1(
    "div",
    null,
    createElement$1(MovieDetails, { id: props.id }),
    createElement$1(MovieReviews, { id: props.id })
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
  return createElement$1(
    "div",
    { className: "MovieDetails" },
    createElement$1(MoviePoster, { src: movie.poster }),
    createElement$1("h1", null, movie.title),
    createElement$1(MovieMetrics, { ...movie })
  );
}

function MoviePoster(props) {
  return createElement$1(
    "div",
    { className: "MoviePoster" },
    createElement$1("img", { src: props.src, alt: "poster" })
  );
}

function MovieMetrics(props) {
  return createElement$1(
    REACT_FRAGMENT_TYPE,
    null,
    createElement$1(
      "div",
      { className: "MovieMetrics-tomato" },
      createElement$1("h4", null, "Tomatometer"),
      createElement$1("p", null, props.fresh ? "🍅" : "😖", " ", props.rating)
    ),
    createElement$1(
      "div",
      { className: "MovieMetrics-audience" },
      createElement$1("h4", null, "Audience"),
      createElement$1("p", null, "🍿 ", props.audience)
    ),
    createElement$1(
      "div",
      { className: "MovieMetrics-consensus" },
      createElement$1("h4", null, "Critics consensus"),
      createElement$1("p", null, props.consensus)
    )
  );
}

function MovieReviews(props) {
  const reviews = movieReviewsJSON[props.id];
  return createElement$1(
    "div",
    { className: "MovieReviews" },
    reviews.map((review) =>
      createElement$1(MovieReview, { key: review.id, ...review })
    )
  );
}

function MovieReview(props) {
  return createElement$1(
    "blockquote",
    { className: "MovieReview" },
    createElement$1("figure", null, props.fresh ? "🍅" : "😖"),
    createElement$1("p", null, props.text),
    createElement$1("p", null, props.author)
  );
} // ------------------------------
// Main screen
// ------------------------------

class App extends PureComponent {
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
    return createElement$1(
      "div",
      { className: "App" },
      showDetail ? this.renderDetail(currentId) : this.renderList()
    );
  }

  renderDetail(id) {
    return createElement$1(
      REACT_FRAGMENT_TYPE,
      null,
      createElement$1(
        "button",
        { className: "App-back", onClick: this.handleBackClick },
        "👈"
      ),
      createElement$1(MoviePage, { id: id })
    );
  }

  renderList() {
    return createElement$1(MovieListPage, {
      onMovieClick: this.handleMovieClick,
    });
  }
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
function style(filename) {
  if (typeof document === "undefined") {
    // eslint-disable-next-line no-undef
    wmr.ssr.head.elements.add({
      type: "link",
      props: { rel: "stylesheet", href: filename },
    });
  } else {
    const prev = document.querySelector(
      'link[rel=stylesheet][href="' + filename + '"]'
    );
    if (prev) return;
    const node = document.createElement("link");
    node.rel = "stylesheet";
    node.href = filename;
    document.head.appendChild(node);
  }
}
style("/react-suspense-sandbox/assets/styles.5bf5249f.css");
const container = document.getElementById("root");
const root = createRoot(container);
root.render(createElement$1(App, null));
