import birdPosterUrl from "../img/bird.jpg";
import downsizingPosterUrl from "../img/downsizing.jpg";
import pantherPosterUrl from "../img/panther.jpg";
import womanPosterUrl from "../img/woman.jpg";
import figuresPosterUrl from "../img/figures.jpg";
import manPosterUrl from "../img/man.jpg";

/** @type {MovieList} */
export const movieListJSON = [
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

/** @type {Record<number, MovieDetails>} */
export const movieDetailsJSON = {
	1: {
		title: "Lady Bird",
		rating: "99%",
		fresh: true,
		audience: "81%",
		consensus:
			"Lady Bird delivers fresh insights about the turmoil of adolescence—and reveals writer-director Greta Gerwig as a fully formed filmmaking talent.",
		poster: birdPosterUrl,
	},
	2: {
		title: "Downsizing",
		rating: "51%",
		fresh: false,
		audience: "23%",
		consensus:
			"Downsizing assembles a talented cast in pursuit of some truly interesting ideas—which may be enough for some audiences to forgive the final product’s frustrating shortcomings.",
		poster: downsizingPosterUrl,
	},
	3: {
		title: "Black Panther",
		rating: "98%",
		fresh: true,
		audience: "77%",
		consensus: `Black Panther elevates superhero cinema to thrilling new heights while telling one of the MCU’s most absorbing stories—and introducing some of its most fully realized characters.`,
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
			"Early Man isn’t quite as evolved as Aardman’s best work, but still retains the unique visuals and sweet humor that have made the studio a favorite among animation enthusiasts.",
		poster: manPosterUrl,
	},
};

/** @type {Record<number, MovieReview[]>} */
export const movieReviewsJSON = {
	1: [
		{
			id: 0,
			fresh: true,
			text: "The densely packed detail which makes this such a luminous work shows Gerwig to be an uncommonly alert filmmaker.",
			author: { name: "Ryan Gilbey", publication: "New Statesman" },
		},
		{
			id: 1,
			fresh: true,
			text: "While there is an acute authorial intelligence informing the transitions between scenes, the steady trot of clipped vignettes comes to seem monotonous and somewhat evasive, a way to move along before anything too hard and hurtful happens.",
			author: { name: "Nick Pinkerton", publication: "Sight and Sound" },
		},
		{
			id: 2,
			fresh: true,
			text: "Gerwig’s deft handling of script, camera and actors is all the more impressive given that this is her first film as solo director.",
			author: { name: "Ed Potton", publication: "Times (UK)" },
		},
		{
			id: 3,
			fresh: true,
			text: "A gloriously funny and wistfully autobiographical coming-of-age comedy.",
			author: { name: "Peter Bradshaw", publication: "Guardian" },
		},
		{
			id: 4,
			fresh: true,
			text: "If Gerwig is capable of all this in her first solo feature, who knows what feats of woodwork she'll craft for us next.",
			author: { name: "Tim Robey", publication: "Daily Telegraph (UK)" },
		},
		{
			id: 5,
			fresh: true,
			text: "Writer-director Gerwig manages brilliantly the delicate feat of portraying the vulnerabilities and eccentricities of the townsfolk without patronising them.",
			author: { name: "Geoffrey Macnab", publication: "Independent (UK)" },
		},
		{
			id: 6,
			fresh: true,
			text: "Lady Bird uses its eponymous protagonist in the construction of one of the most skeptical voices of modern cinematography.",
			author: {
				name: "Alberto Sáez Villarino",
				publication: "El antepenúltimo mohicano",
			},
		},
		{
			id: 7,
			fresh: true,
			text: "There is no doubt that it has a certain charm. I guess a lot of its appeal lies in its accessibility, its slightly subversive attitude and its hipster aura.",
			author: { name: "Jaime Fa de Lucas", publication: "Culturamas" },
		},
		{
			id: 8,
			fresh: true,
			text: "Gerwig's film, which closes with a tribute to Sacramento, ends well and feels sincere.",
			author: { name: "Hugo Hernández Valdivia", publication: "Cinexcepción" },
		},
		{
			id: 9,
			fresh: true,
			text: "...beautiful, delicate and precise.",
			author: { name: "Luis Martínez", publication: "El Mundo (Spain)" },
		},
		{
			id: 10,
			fresh: true,
			text: "A pleasant and fresh surprise, it reminds me a bit of Juno.",
			author: { name: "Israel Acosta Aroche", publication: "Konexión" },
		},
		{
			id: 11,
			fresh: true,
			text: "...nice and warm.",
			author: { name: "Fernanda Solórzano", publication: "Letras Libres" },
		},
	],
	2: [
		{
			id: 0,
			fresh: true,
			text: "While Downsizing is not not about the end of human life on earth, it confronts the prospect with minimal sentiment, and uses it to ask questions about what the good life might consist of, here and now.",
			author: { name: "Henry K. Miller", publication: "Sight and Sound" },
		},
		{
			id: 1,
			fresh: true,
			text: "It starts out quick, sharp and funny and ends as a solemn and slow-moving leviathan: a movie overwhelmed by its own ecological and human implications",
			author: { name: "Peter Bradshaw", publication: "Guardian" },
		},
		{
			id: 2,
			fresh: false,
			text: "Dare we say that this once admired indie writer-director, who made Exhibition, Sideways and About Schmidt, is developing a humourless streak?",
			author: { name: "Nigel Andrews", publication: "Financial Times" },
		},
		{
			id: 3,
			fresh: true,
			text: "It's a state-of-the-nation address by stealth, wry and wide-reaching.",
			author: { name: "Trevor Johnston", publication: "Little White Lies" },
		},
		{
			id: 4,
			fresh: true,
			text: "A smart, thought-provoking miniature piece.",
			author: {
				name: "James Mottram",
				publication: "South China Morning Post",
			},
		},
		{
			id: 5,
			fresh: true,
			text: "Payne’s film is full of invention, wit, great scenes and big—if not fully realised—intentions. Downsizing may be about a small world, but it is an audacious, out-sized peach of a picture.",
			author: { name: "Ian Freer", publication: "Empire Magazine" },
		},
		{
			id: 6,
			fresh: true,
			text: "Sometimes a change of perspective helps a person to better understand the world, and Downsizing makes it literal.",
			author: { name: "Emmanuel Báez", publication: "Cinéfiloz" },
		},
		{
			id: 7,
			fresh: true,
			text: "...an exquisite cast, probably one of the most intelligent comeidies of the year.",
			author: { name: "Marco Cubillo", publication: "Konexión" },
		},
		{
			id: 8,
			fresh: false,
			text: "Christoph Waltz and Hong Chau feature in a fine cast but the entire plot meanders too much in search of decent narrative hinge. The middle act is in particular need of a boot up the rear.",
			author: {
				name: "Hilary A White",
				publication: "Sunday Independent (Ireland)",
			},
		},
		{
			id: 9,
			fresh: false,
			text: "The really sobering economy of scale about this overlong auteur indulgence is that it cost $68 million to make and none of that money went on a script doctor.",
			author: { name: "Michael Coldwell", publication: "Starburst" },
		},
		{
			id: 10,
			fresh: true,
			text: "The most ambitious and least convincing film of Nebraska’s talented filmmaker [Alexander Payne].",
			author: { name: "Diego Batlle", publication: "La Nación (Argentina)" },
		},
		{
			id: 11,
			fresh: false,
			text: "The intentions were good, but nothing worth remembering.",
			author: { name: "Carlos Díaz Reyes", publication: "Vanguardia (Mexico)" },
		},
	],
	3: [
		{
			id: 0,
			fresh: true,
			text: "Black Panther is not just smart and politically aware for a superhero film—it’s smart and politically aware, full stop.",
			author: { name: "Helen Lewis", publication: "New Statesman" },
		},
		{
			id: 1,
			fresh: true,
			text: "When it comes to creative visuals, engaging action and likable characters, “Black Panther” stands confidently next to the best fare offered up by the Marvel Cinematic Universe.",
			author: { name: "Matthew Rozsa", publication: "Salon.com" },
		},
		{
			id: 2,
			fresh: true,
			text: "The identity politics provide a fresh spin to the genre’s increasingly tedious narrative formula.",
			author: { name: "J. R. Jones", publication: "Chicago Reader" },
		},
		{
			id: 3,
			fresh: true,
			text: "Jordan has swagger to spare, with those rolling shoulders, but there’s a breath of charm, too, all the more seductive in the overblown atmosphere of Marvel. He’s twice as pantherish as the Panther.",
			author: { name: "Anthony Lane", publication: "New Yorker" },
		},
		{
			id: 4,
			fresh: true,
			text: "The real stars of Black Panther are its women, both before and behind the camera.",
			author: { name: "Kelli Weston", publication: "Sight and Sound" },
		},
		{
			id: 5,
			fresh: true,
			text: "[The] script adheres to the usual genre formula of tomfoolery, in-jokes, mythology and outright poppycock, but their knack for teasing emotional resonance out of standard scenarios gives them the edge over predecessors and competitors alike.",
			author: { name: "Ryan Gilbey", publication: "New Statesman" },
		},
		{
			id: 6,
			fresh: true,
			text: "In short, Black Panther emerges as a great cinematic triumph.",
			author: { name: "José Martín", publication: "El antepenúltimo mohicano" },
		},
		{
			id: 7,
			fresh: true,
			text: "Black Panther is good, but it’s not the greatest film of the MCU.",
			author: { name: "Rafael Rosales Santos", publication: "Konexión" },
		},
		{
			id: 8,
			fresh: true,
			text: "One of the best comic adaptations we have ever seen.",
			author: { name: "Carlos Díaz Reyes", publication: "Vanguardia (Mexico)" },
		},
		{
			id: 9,
			fresh: true,
			text: "Comes as close as a film possibly can to sloughing off all of the problems that persistently cling to this franchise.",
			author: { name: "Tim Brayton", publication: "Alternate Ending" },
		},
		{
			id: 10,
			fresh: true,
			text: "Emotional, occasionally funny, and narratively unpredictable. (...) I doubt any other blockbuster will manage to surpass “Black Panther” this year.",
			author: { name: "Sebastian Zavala Kahn", publication: "Cinencuentro" },
		},
		{
			id: 11,
			fresh: true,
			text: "The majority of moviegoers want to see films led by strong, intelligent characters that are more diverse than just heterosexual white men, especially when they are as thoughtfully and beautifully made as this one.",
			author: { name: "Lee Jutton", publication: "Film Inquiry" },
		},
	],
	4: [
		{
			id: 0,
			fresh: true,
			text: "Given it could be re-titled “Microaggressions: The Movie”, this is an unsurprisingly upsetting watch at times, but it’s made compelling by Vega’s dignified, heartfelt performance.",
			author: { name: "Helen O’Hara", publication: "Empire Magazine" },
		},
		{
			id: 1,
			fresh: true,
			text: "It shows how thinking of a person in terms of his or her physical condition can have a harmful effect on that person, limiting his or her sense of self.",
			author: { name: "Ben Sachs", publication: "Chicago Reader" },
		},
		{
			id: 2,
			fresh: true,
			text: "A quietly honest centre never wavers.",
			author: { name: "Kate Taylor", publication: "Globe and Mail" },
		},
		{
			id: 3,
			fresh: true,
			text: "At its core, A Fantastic Woman is the story of genuine love, something requires no definition.",
			author: { name: "Peter Howell", publication: "Toronto Star" },
		},
		{
			id: 4,
			fresh: true,
			text: "Its clarity of purpose translates to an effectively lean and straightforward story of adversity and survival, in any language.",
			author: { name: "Michael Phillips", publication: "Chicago Tribune" },
		},
		{
			id: 5,
			fresh: true,
			text: "“A Fantastic Woman” serves as a gentle reminder that we all contain multitudes.",
			author: { name: "Ann Hornaday", publication: "Washington Post" },
		},
		{
			id: 6,
			fresh: true,
			text: "The plot is straightforward, but the film’s tone and style supply an artful mix of sensations. The lighting is colorful and heady...The film’s rhythms gracefully accompany her endeavor, rising and falling with every setback or tiny, incremental victory.",
			author: { name: "Peg Aloi", publication: "Arts Fuse" },
		},
		{
			id: 7,
			fresh: true,
			text: "Defiant, determined, Vega delivers a star-making performance in a drama of embattled grief, directed with heart.",
			author: { name: "Kevin Harley", publication: "Total Film" },
		},
		{
			id: 8,
			fresh: false,
			text: "Compelling on a human level but dramatically monotonous. There aren’t exactly a lot of surprises here.",
			author: { name: "Sean Burns", publication: "The ARTery" },
		},
		{
			id: 9,
			fresh: true,
			text: "Vega establishes a milestone in the push for equality playing a transgender woman determined to properly grieve for her recently deceased lover.",
			author: { name: "Al Alexander", publication: "The Patriot Ledger" },
		},
		{
			id: 10,
			fresh: true,
			text: "Vega’s remarkable turn is something of a revelation, as if we are in on some kind of unique discovery.",
			author: { name: "Jonathan W. Hickman", publication: "Daily Film Fix" },
		},
		{
			id: 11,
			fresh: true,
			text: "[Daniela] Vega is stunning. She delivers a performance of such breadth, scope and unwavering strength the cumulative power of what she accomplishes is unquestionably exceptional.",
			author: { name: "Sara Michelle Fetters", publication: "MovieFreak.com" },
		},
	],
	5: [
		{
			id: 0,
			fresh: false,
			text: "Limp jokes, bad chemistry and the least believable onscreen fraternal bond make for a very lacklustre viewing experience.",
			author: { name: "Eve Barlow", publication: "Empire Magazine" },
		},
		{
			id: 1,
			fresh: false,
			text: "The film, which finished shooting more than two years ago before spending endless months without a release date, is both meandering and bloated, suggesting the Frankensteinian result of brutal test screenings.",
			author: { name: "Eric Henderson", publication: "Slant Magazine" },
		},
		{
			id: 2,
			fresh: false,
			text: "Distinguished mainly by its overqualified cast and lack of inspiration, “Father Figures” can’t decide whether it’s a gross-out comedy or an uplifting tale of brotherly love; it embraces the worst of both worlds.",
			author: { name: "Ben Kenigsberg", publication: "New York Times" },
		},
		{
			id: 3,
			fresh: false,
			text: "Would you like to watch Wilson and a young child urinate on each other in a rest stop bathroom? Thought not.",
			author: { name: "Johnny Oleksinski", publication: "New York Post" },
		},
		{
			id: 4,
			fresh: false,
			text: "Who’s your daddy? Who cares.",
			author: { name: "John DeFore", publication: "Hollywood Reporter" },
		},
		{
			id: 5,
			fresh: false,
			text: "A limply spritzing fountain of unconvincing (and unfunny) tricks out of the how-to-write-a-comedy-hit manual.",
			author: { name: "Owen Gleiberman", publication: "Variety" },
		},
		{
			id: 6,
			fresh: false,
			text: "Come back, Daddy’s Home 2; all is forgiven!",
			author: { name: "Tara Brady", publication: "Irish Times" },
		},
		{
			id: 7,
			fresh: false,
			text: "Offensive, amateurish and should be avoided, then forgotten. Who’s the Daddy? Who cares?",
			author: { name: "Linda Marric", publication: "HeyUGuys" },
		},
		{
			id: 8,
			fresh: false,
			text: "A talented cast mostly sink with the ship in a so-called comedy that is desperately dull and uninspired, often feeling like yet another carbon copy of a film we’ve seen several times before.",
			author: { name: "Allan Hunter", publication: "Daily Express (UK)" },
		},
		{
			id: 9,
			fresh: false,
			text: "If you’re looking for laughs, look elsewhere.",
			author: { name: "Ken McIntyre", publication: "Total Film" },
		},
		{
			id: 10,
			fresh: false,
			text: "Wilson and Helms are the right leads for this odd couple tale of friction between a laidback bum and his uptight sibling, but the central conceit (that women enjoying sexual freedom is funny) no longer passes for a joke.",
			author: { name: "Eddie Harrison", publication: "The List" },
		},
		{
			id: 11,
			fresh: false,
			text: "This almost totally fails as a comedy, with broad, unfunny, dumb jokes (such as Wilson and a young boy urinating on each other), though it’s marginally better during the goopy, heartwarming parts.",
			author: {
				name: "Jeffrey M. Anderson",
				publication: "Common Sense Media",
			},
		},
	],
	6: [
		{
			id: 0,
			fresh: false,
			text: "The story is thin, allowing little room for imaginative engagement, and the comedy uninspired. Early Man contains a nice anti-sexism message, but delivers it half-heartedly.",
			author: { name: "Ben Sachs", publication: "Chicago Reader" },
		},
		{
			id: 1,
			fresh: false,
			text: "Aardman is a haven for creatures that hail from other species but match us or even outstrip us in proficiency and grace. Early Man, though, is stuffed with men and women...whereas the beasts of the field and the fowls of the air are reduced to extras.",
			author: { name: "Anthony Lane", publication: "New Yorker" },
		},
		{
			id: 2,
			fresh: true,
			text: "At least there’s director Nick Park’s playful Silly Putty visual imagination to take your mind off just how thin the story is.",
			author: { name: "Chris Nashawaty", publication: "Entertainment Weekly" },
		},
		{
			id: 3,
			fresh: false,
			text: "Mostly, “Early Man” plays like an overstuffed episode of “The Flintstones,” riffing on caveman accessories, as well as soccer fandom and hooliganism.",
			author: { name: "Brian Lowry", publication: "CNN.com" },
		},
		{
			id: 4,
			fresh: true,
			text: "There’s a quaintness about the film, from the animation style to the wholesome jokes, that is refreshing for this pop-culture-obsessed animation era.",
			author: { name: "Fraser Abe", publication: "Globe and Mail" },
		},
		{
			id: 5,
			fresh: true,
			text: "If just hearing animator Nick Park’s name doesn’t bring an anticipatory smile to your face, watching a few minutes of the thoroughly amusing “Early Man” will do the trick.",
			author: { name: "Kenneth Turan", publication: "Los Angeles Times" },
		},
		{
			id: 6,
			fresh: true,
			text: "In the end, the great charm of the film is that it will seduce fans... and football opponents alike.",
			author: { name: "Carlos Del Río", publication: "Cine Premiere" },
		},
		{
			id: 7,
			fresh: true,
			text: "...lovable characters and humor so innocent some may see it as demodé. [Full Review in Spanish]",
			author: { name: "Néstor Burtone", publication: "Otroscines.com" },
		},
		{
			id: 8,
			fresh: true,
			text: "While not quite up to Wallace and Gromit levels of stop-motion sophistication, Aardman Animations’ Early Man assays a delightfully handcrafted, peculiarly British trip back in time, and one that will tickle the wee ones...",
			author: { name: "Ken Eisner", publication: "Georgia Straight" },
		},
		{
			id: 9,
			fresh: true,
			text: "Might not be a particularly impressive film, and it darn sure isn’t a surprising film, but it is a wonderfully pleasant & pleasurable film.",
			author: { name: "Tim Brayton", publication: "Alternate Ending" },
		},
		{
			id: 10,
			fresh: false,
			text: "Silly and derivative, it’s a bit of a primeval disappointment.",
			author: { name: "Susan Granger", publication: "SSG Syndicate" },
		},
		{
			id: 11,
			fresh: true,
			text: "Early Man is technically-impressive and boasts strong visuals, but its simple story holds it back from reaching its full potential.",
			author: { name: "Chris Agar", publication: "ScreenRant" },
		},
	],
};
