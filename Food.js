"use strict";
// This class constructs a food object that represents a meal. These are its fields:
// title (string) the title of the food object
// description (string) a brief description of the food object
// instructions (string) instructions on how to make the meal
// ingredients (string) a list (string list) of ingredients that are required
// img_url (string) a url of the image. After generation, this url expires in 2 hours

export class Food {
    constructor(title, description, instructions, ingredients, img_url) {
        this.title = title;
        this.description = description;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.img_url = img_url;
    }
}