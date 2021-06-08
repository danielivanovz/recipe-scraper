#Recipe Scraper

**A NodeJS application for scraping recipes from giallozafferono.**

[![Build Status](https://travis-ci.com/heyiamZer0/recipe-scraper.svg?branch=main)](https://travis-ci.org/jadkins89/Recipe-Scraper)
[![Maintainability](https://api.codeclimate.com/v1/badges/e19f00790723cfbae553/maintainability)](https://codeclimate.com/github/heyiamZer0/recipe-scraper/maintainability)

## Installation

Run the following script in your terminal

```sh
git clone --depth=50 --branch=main https://github.com/heyiamZer0/recipe-scraper.git recipe-scraper && cd recipe-scraper && npm install
```

## Usage

starts the scraper and once finished will save a recipes.json in `./` directory

```sh
npm run start
```

## Recipe Object

Some recipes may have the `calories` field set as null.

```js
{
    title: String
    image: String
    ingredients: [{
        ingredient: String
        quantity: String
    }]
    description: [{
        step: Number
        instructions: String
    }]
    calories: null || Number
    category: String
    difficulty: String
    time: Number
}
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
