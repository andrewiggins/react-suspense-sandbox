# Movie App

The app from [Dan Abramov's ReactFest Suspense video](https://www.youtube.com/watch?v=6g3g0Q_XVb4).

Original source: https://github.com/bvaughn/react/tree/cf25a938ea06787a20c715b817b815acf348aeb5/fixtures/suspense/io

Perhaps [React's async fixture](https://twitter.com/dan_abramov/status/1025185531515351040)
replaces this sandbox...

## Enhancements

Throughout the video he enhances the app from loading static synchronous data to loading everything asnychronously. Here
are the enhancements in order.

### Introduce Fetcher and Placeholder

1. Read movie details from `fetchMovieDetails` using `movieDetailFetcher`, deferring the change to `showDetail` state
2. Wrap `MoviePage` in a `Placeholder` to delay showing a spinner
3. Read movie reviews from `fetchMovieReviews` using `movieReviewsFetcher`
4. Wrap `MovieReviews` in a `Placeholder`

### Introduce Loading component for inline spinner

5. Add inline loading to `MovieListPage` using `Loading` component and remove `Placeholder` around `MoviePage`

### Code splitting

6. Code-split and dynamically download the `MoviePage` component using a `MoviePageLoader` component and
   `moviePageFetcher`

### Async images

7. Download the movie posters using an `imageFetcher` and `Img` component so the `MoviePage` is given a chance to wait
   for the image to load
8. Wrap the `Img` component in `MoviePoster` in a `Placeholder` that falls back to a normal `<img />`

### Prefetching pages

9. Add `NextButton` that increments the `currentId` (deferred) by `1`
10. Prerender the next page without blocking the browser by using the `MoviePageLoader` component inside of a `hidden`
    `div` (remember, lowest priority work for React is offscreen, i.e. hidden). Don't forget to add keys so react can
    simply swap the existing nodes when the next page is fetched

## API Updates

Since this video, the APIs React has released have changed:

1. `createFetcher` is now `createResource` in the `simple-cache-provider` package
2. `Loading` is a user-defined component?
