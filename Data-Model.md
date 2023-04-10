## Data Model

### Domain
Super == Owner<br>
Admin == Employee<br>
User == Customer<br>
### Collections and Interfaces
**1.** Each menu item is an interface FoodProps containing the following props:<br>
name: string<br>
image: string<br>
description: string<br>
rating: int<br>
type: list of strings (e.g. appetizer, entree, dessert)<br>
ingredients: list of strings<br>
allergens: list of strings<br>
popular: boolean<br>
spicy: boolean<br>

**2.** Each food list (e.g. the central item list, employee list, and customer lists) is an interface OwnerListProps, EmployeeListProps, and CustomerListProps with the following props:<br>
foodList: list of FoodProps.<br><br>
Additionally, there should be a state variable newFoodList. EmployeeList should set newFoodList to a list with the updated food item, update its foodList to newFoodList (without mutation), and then OwnerList should update its foodList with newFoodList.<br>
Owner can use the edit, add, and remove components to add/remove from the central list or modify existing elements in said list.<br>

**3.** There is another interface specifically for Owner that extends FoodProps (it has the same props) and has an extra field displaying the food item's total count in all customer lists.<br>

**4.** There is a list of customers. Owner can create/delete/modify from this list.<br>
### Features
**1.** There are 3 buttons to select role: Owner, Employee, or Customer. Only one can be selected at a time.<br>

**2.** The filter box on the website will filter the existing central item list to output only the items matching the criteria. (Not sure about this yet)<br>

**3.** There are filter buttons for each user list. Only one filter can be selected at a time. (Not sure about this yet)


