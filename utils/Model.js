class Recipe {
  constructor(title, link) {
    // , ingredients, image
    this.title = title;
    this.link = link;
    // this.ingredients = ingredients;
    // this.image = image;
  }
}

class Recipes {
  constructor() {
    this.recipes = [];
  }

  newRecipe(title, link) {
    let p = new Recipe(title, link);
    this.recipes.push(p);
    return p;
  }

  get allModels() {
    return this.recipes;
  }

  get numberOfRecipes() {
    return this.recipes.length;
  }
}

module.exports = Recipes;
