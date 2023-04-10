## Data Model

### Domain
Super == Owner<br>
Admin == Employee<br>
User == Customer<br>
### Interfaces
**1.** Each item list (e.g. the central item list, employee list, and customer lists) is a list of menu items. Owner can use the edit, add, and remove components to add/remove from the central list or modify existing elements in said list.

**2.** Each menu item is an interface FoodProps containing the following props:<br>
name: string<br>
image: string<br>
description: string<br>
rating: int<br>
type: list of strings (e.g. appetizer, entree, dessert)<br>
ingredients: list of strings<br>
allergens: list of strings<br>
popular: boolean<br>
spicy: boolean<br>

**3.** There is another interface specifically for Owner that extends FoodProps and has extra field displaying the food's total count in all customer lists.

**4.** The filter box on the website will filter the existing central item list to output only the items matching the criteria.

**5.** There is a list of customers. Owner can modify this list.


yeah like could we also have filter box to sort price as well        that would be good i think filter is gonna be really annoying to implement

i think from the user personas, we will also eventually a text box for  “less” and “more” or “none” of certain ingredients or we can also make description a list of x ingredients, and for each ingredient, create x amount of buttons for “no {ingredient}”


