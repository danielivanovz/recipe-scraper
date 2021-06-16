<h1 align="center">recipe scraper</h1>

<h5 align="center">A NodeJS application for scraping recipes from giallozafferono.</h5>

<div align="center">
  <a href="https://travis-ci.com/github/heyiamZer0/recipe-scraper">
    <img src="https://travis-ci.com/heyiamZer0/recipe-scraper.svg?branch=main" alt="Build Status">
  </a>
  <a href="https://codeclimate.com/github/heyiamZer0/recipe-scraper/maintainability"><img src="https://api.codeclimate.com/v1/badges/e19f00790723cfbae553/maintainability" /></a>
<a href='https://coveralls.io/github/heyiamZer0/recipe-scraper?branch=main'><img src='https://coveralls.io/repos/github/heyiamZer0/recipe-scraper/badge.svg?branch=main' alt='Coverage Status' /></a>

</a>


</div>

<br>

## Installation

Run the following script in your terminal, it will create a folder containing the script and install dependencies.

```sh
git clone --depth=50 --branch=main https://github.com/heyiamZer0/recipe-scraper.git recipe-scraper && cd recipe-scraper && npm install
```

## Usage

```sh
yarn devTS
```

starts the scraper and once finished will save a recipes.json in `./` directory

## Built With

-   [NodeJS][nodejs] - runtime environment
-   [Axios][axios] - promise based HTTP Client
-   [Cheerio][cheerio] - JQuerry-like API interface
-   [TypeScript 4.0][typescript] - codebase
-   [Pino][pino] - logging

[nodejs]: https://github.com/nodejs/node
[axios]: https://github.com/axios/axios
[cheerio]: https://github.com/cheeriojs/cheerio
[typescript]:https://github.com/microsoft/TypeScript
[pino]:https://github.com/pinojs/pino

## Recipe Object

Some recipes may have the `calories` field set as null.

```typescript
{
    title: String
    image: String
    description: String
    ingredients: [{
        name: String
        quantity: String
    }]
    instructions: [{
        step: Number
        text: String
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
