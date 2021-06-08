#Recipe Scraper

**A NodeJS application for scraping recipes from giallozafferono.**

[![Build Status](https://travis-ci.com/heyiamZer0/recipe-scraper.svg?branch=main)](https://travis-ci.org/jadkins89/Recipe-Scraper)
[![Maintainability](https://api.codeclimate.com/v1/badges/e19f00790723cfbae553/maintainability)](https://codeclimate.com/github/heyiamZer0/recipe-scraper/maintainability)

## Installation

Run the following script in your terminal, it will create a folder containing the script and install dependencies.

```sh
git clone --depth=50 --branch=main https://github.com/heyiamZer0/recipe-scraper.git recipe-scraper && cd recipe-scraper && npm install
```

## Usage

```sh
npm run start
```

starts the scraper and once finished will save a recipes.json in `./` directory

## Built With

-   [NodeJS][nodejs] - runtime environment
-   [Axios][axios] - promise based HTTP Client
-   [Cheerio][cheerio] - JQuerry-like API interface

[nodejs]: https://github.com/nodejs/node
[axios]: https://github.com/axios/axios
[cheerio]: https://github.com/cheeriojs/cheerio

## Recipe Object

Some recipes may have the `calories` field set as null.

```typescript
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

## Related projects

-   [Recipe REST API][recipe-server]
-   [Recipe React App][react-app]

[recipe-server]: https://github.com/heyiamZer0/recipe-server
[react-app]: https://github.com/heyiamZer0/recipier-react

## License

Distributed under the MIT License. See `LICENSE` for more information.
