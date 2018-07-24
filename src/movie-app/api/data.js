import birdPosterUrl from "../img/bird.jpg";
import downsizingPosterUrl from "../img/downsizing.jpg";
import pantherPosterUrl from "../img/panther.jpg";
import womanPosterUrl from "../img/woman.jpg";
import figuresPosterUrl from "../img/figures.jpg";
import manPosterUrl from "../img/man.jpg";

export const movieListJSON = [
  { id: 1, title: "Lady Bird", rating: "99%", gross: "$52.9M", fresh: true },
  { id: 2, title: "Downsizing", rating: "51%", gross: "$24.5M", fresh: false },
  {
    id: 3,
    title: "Black Panther",
    rating: "98%",
    gross: "$403.6M",
    fresh: true
  },
  {
    id: 4,
    title: "A Fantastic Woman",
    rating: "93%",
    gross: "$0.6M",
    fresh: true
  },
  {
    id: 5,
    title: "Father Figures",
    rating: "22%",
    gross: "$17.5M",
    fresh: false
  },
  { id: 6, title: "Early Man", rating: "81%", gross: "$6.8M", fresh: true }
];

export const movieDetailsJSON = {
  1: {
    title: "Lady Bird",
    rating: "99%",
    fresh: true,
    audience: "81%",
    consensus:
      "Lady Bird delivers fresh insights about the turmoil of adolescence -- and reveals writer-director Greta Gerwig as a fully formed filmmaking talent.",
    poster: birdPosterUrl
  },
  2: {
    title: "Downsizing",
    rating: "51%",
    fresh: false,
    audience: "23%",
    consensus:
      "Downsizing assembles a talented cast in pursuit of some truly interesting ideas -- which may be enough for some audiences to forgive the final product's frustrating shortcomings.",
    poster: downsizingPosterUrl
  },
  3: {
    title: "Black Panther",
    rating: "98%",
    fresh: true,
    audience: "77%",
    consensus:
      "Black Panther elevates superhero cinema to thrilling new heights while telling one of the MCU's most absorbing stories -- and introducing some of its most fully realized characters.",
    poster: pantherPosterUrl
  },
  4: {
    title: "A Fantastic Woman",
    rating: "93%",
    fresh: true,
    audience: "82%",
    consensus:
      "Subtle and tender, A Fantastic Woman handles its timely, sensitive subject matter with care.",
    poster: womanPosterUrl
  },
  5: {
    title: "Father Figures",
    rating: "22%",
    fresh: false,
    audience: "36%",
    consensus: "No consensus yet.",
    poster: figuresPosterUrl
  },
  6: {
    title: "Early Man",
    rating: "81%",
    fresh: true,
    audience: "57%",
    consensus:
      "Early Man isn't quite as evolved as Aardman's best work, but still retains the unique visuals and sweet humor that have made the studio a favorite among animation enthusiasts.",
    poster: manPosterUrl
  }
};

export const movieReviewsJSON = {
  1: [{ id: 0, fresh: true, text: "The densely packed" }],
  2: [{ id: 0, fresh: true, text: "While Downsizing is" }],
  3: [{ id: 0, fresh: true, text: "Black Panther is not" }],
  4: [{ id: 0, fresh: true, text: "Given it could be" }],
  5: [{ id: 0, fresh: false, text: "Limp jokes, bad chemistry" }],
  6: [{ id: 0, fresh: false, text: "The story is thin, " }]
};
