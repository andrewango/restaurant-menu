## Data Model

**1.** Each item list (including the central item list, admin item list, and user item list) is a collection of menu items. A superuser can use the edit/add/remove feature to add/remove from the central list of menu items or modify existing elements in said list.

**2.** Each menu item is an interface containing: 
name - string
image - url string
type - collection of strings (e.g. appetizer, entree, dessert)
description - string
ingredients - collection of strings
allergens - collection of strings
popular - boolean
spicy - boolean

**3.** The filter box on the website will filter the existing central item list to output only the items matching the criteria.

**4.** We have a list of users. [Customer, Employee, Owner]. A superuser can modify this list.


yeah like could we also have filter box to sort price as well        that would be good i think filter is gonna be really annoying to implement

i think from the user personas, we will also eventually a text box for  “less” and “more” or “none” of certain ingredients or we can also make description a list of x ingredients, and for each ingredient, create x amount of buttons for “no {ingredient}”


