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
    consensus: "Lady Bird delivers fresh insights about",
    poster: "/img/bird.jpg"
  },
  2: {
    title: "Downsizing",
    rating: "51%",
    fresh: false,
    audience: "23%",
    consensus: "Downsizing assembles a talented cast in",
    poster: "/img/downsizing.jpg"
  },
  3: {
    title: "Black Panther",
    rating: "98%",
    fresh: true,
    audience: "77%",
    consensus: "Black Panther elevates superhero cinema to",
    poster: "/img/panther.jpg"
  },
  4: {
    title: "A Fantastic Woman",
    rating: "93%",
    fresh: true,
    audience: "82%",
    consensus: "Subtle and tender, A Fantastic Woman",
    poster: "/img/woman.jpg"
  },
  5: {
    title: "Father Figures",
    rating: "22%",
    fresh: false,
    audience: "36%",
    consensus: "No consensus yet.",
    poster: "/img/figures.jpg"
  },
  6: {
    title: "Early Man",
    rating: "81%",
    fresh: true,
    audience: "57%",
    consensus: "Early Man isn't quite as evolved as ",
    poster: "/img/man.jpg"
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
