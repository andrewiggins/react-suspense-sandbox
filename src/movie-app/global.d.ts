declare module "*.jpg" {
	export default "" as string;
}

interface MovieDetails {
	// id: string;
	title: string;
	rating: string;
	fresh: boolean;
	audience: string;
	consensus: string;
	poster: string;
}

interface Movie {
	id: number;
	title: string;
	rating: string;
	gross: string;
	fresh: boolean;
}

type MovieList = Movie[];

interface MovieReview {
	id: number;
	fresh: boolean;
	text: string;
	author: {
		name: string;
		publication: string;
	}

}
