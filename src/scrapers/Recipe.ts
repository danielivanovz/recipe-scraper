import { CheerioAPI } from 'cheerio';

interface RecipeModel {
	title: String;
	image?: String;
	description?: String;
	ingredients: Object;
	instructions: Object;
	calories?: Number;
	category: String;
	difficulty: String;
	time: Number;
}

export class Recipe implements RecipeModel {
	title: String;
	image: String | undefined;
	description: String | undefined;
	ingredients: Object;
	instructions: Object;
	calories?: Number | undefined;
	category: String;
	difficulty: String;
	time: Number;

	constructor() {
		this.title = '';
		this.image = '';
		this.description = '';
		this.instructions = {
			step: 0,
			text: '',
		};
		this.ingredients = {
			name: '',
			quantity: '',
		};
		this.calories = 0;
		this.category = '';
		this.difficulty = '';
		this.time = 0;
	}

	private setTitle($: CheerioAPI): string {
		return (this.title = $('div.gz-title-content.gz-innerdesktop > h1').text().toLowerCase());
	}

	private setImage($: CheerioAPI): string | undefined {
		return (this.image =
			$('.gz-featured-image > img').attr('data-src') ||
			$('div.gz-topstrip-recipe > div:nth-child(1) > div > picture > img').attr('src'));
	}

	private setDescription($: CheerioAPI) {
		return (this.description = $('head > meta:nth-child(8)').attr('content'));
	}

	private setInstructions($: CheerioAPI): Object {
		return (this.instructions = $('.gz-content-recipe-step')
			.toArray()
			.map((e, index) => {
				const instructions = $('p', $(e)).text();
				return { step: index, instructions: instructions };
			}));
	}

	private setIngredients($: CheerioAPI): Object {
		return (this.ingredients = $('.gz-list-ingredients > dd')
			.toArray()
			.map((e) => {
				const name = $(e).find('a').text().toLowerCase();
				const quantity = $(e)
					.text()
					.replace(/\s/g, '')
					.replace($(e).text().replace(/\s/g, '').slice(0, -4), '');
				return { name, quantity };
			}));
	}

	private setCalories($: CheerioAPI): Number {
		return (this.calories = Number($('.gz-text-calories-total').text().replace(/\s/g, '').slice(0, -3)));
	}

	private setCategory($: CheerioAPI): String {
		return (this.category = $('.gz-breadcrumb > ul > li:nth-child(1) > a').text().toLowerCase());
	}

	private setDifficulty($: CheerioAPI): String {
		return (this.difficulty = $('ul > li:nth-child(1) > span.gz-name-featured-data > strong').text().toLowerCase());
	}

	private setTime($: CheerioAPI): Number {
		return (this.time = parseInt($('ul > li:nth-child(2) > span.gz-name-featured-data > strong').text()));
	}

	public async createRecipe($: CheerioAPI) {
		try {
			this.setTitle($);
			this.setImage($);
			this.setDescription($);
			this.setIngredients($);
			this.setInstructions($);
			this.setCalories($);
			this.setCategory($);
			this.setDifficulty($);
			this.setTime($);
		} catch (error) {}
	}
}
