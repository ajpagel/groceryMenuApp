//one array (newitem [])
// two classes item, grocery list and menu)
//options to create, view and delete (create item, view items, delete item from list)
//I created a menu app that will allow someone to create a grocery list that they name and add items to it. For example, you can add grocery items to your "grocery shopping list".

class Item {
    constructor (name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    describe() {
        return `You added ${this.quantity} ${this.name} to your list.`;
    }
}

class List {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error (`You can only add an instance of Item. Argument is not an item: ${item}`);
        }
    }

    describe() {
        return `${this.name} has ${this.items.length} items on it.`;
    }
}


class Menu {
    constructor() {
        this.lists = [];
        this.selectedList = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection){
                case '1':
                    this.createList();
                    break;
                case '2':
                    this.viewLists();
                    break;
                case '3':
                    this.deleteList();
                    break;
                case '4':
                    this.displayLists();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ('Enjoy your shopping!')
    }


    showMainMenuOptions (){
        return prompt(`
        0) Exit
        1) Create New List
        2) View Lists
        3) Delete List
        4) Display All Lists
        `);
    }

    showListMenuOptions (listInfo){
        return prompt(`
        0) Back
        1) Create Item
        2) Delete Item
        ----------------
        ${listInfo}
        `);
    }

    displayLists(){
        let listString= '';
        for (let i=0; i < this.lists.length; i++){
            listString+= i + ') ' + this.lists[i].name + '\n';
        }
        alert(listString);
    }

    createList(){
        let name = prompt (`Enter name for new shopping list:`);
        this.lists.push(new List(name));
    }

    viewLists(){
        let index = prompt ('Enter index of the shopping list you wish to view:');
        if (index > -1 && index < this.lists.length){
            this.selectedList = this.lists[index];
            let description = 'Team Name: ' + this.selectedList.name + '\n';
        
            for(let i = 0; i < this.selectedList.items.length; i++) {
                description += i + ') ' + this.selectedList.items[i].quantity + ' - ' + this.selectedList.items[i].name + '\n';
            }

            let selection = this.showListMenuOptions (description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }

    deleteList() {
        let index = prompt ('Enter the index of the list you wish to delete:');
        if (index > -1 && index < this.lists.length){
            this.lists.splice(index,1);
        }
    }


    createItem(){
        let name = prompt ('Enter the item that you need to add to your list:');
        let quantity= prompt ('Enter the amount of the item that you need to purchase: ');
        this.selectedList.items.push(new Item (name, quantity));
    }


    deleteItem(){
        let index = prompt ('Enter the index of the item that you no longer need on your list.');
        if (index > -1 && index < this.selectedList.items.length) {
            this.selectedList.items.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start();