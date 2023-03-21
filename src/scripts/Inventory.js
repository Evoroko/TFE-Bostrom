export default class Inventory {
    constructor(){
        this.items = [];
    }

    addItem(currentItem){
        this.items.push({ name : currentItem, id: this.items.length + 1, status: 'inactive' })
    }

    removeItem(currentItem){
        let index = 0;
        let currentIdValue = 0;

        for(let item of this.items){
            index += 1;
            if(currentItem == item.name){
                this.items.splice(item.id - 1, 1)
            }
        }

        index = 0;

        for(let item of this.items){
            index += 1;
            if(item.id - (index-1) != 1){
                item.id = item.id - 1;
            }
        }
    }

    setActive(currentItem){
        for(let item of this.items){
            if(currentItem == item.id){
                item.status = 'active';
            }
        }
    }

    setAllInactive(){
        for(let item of this.items){
            item.status = 'inactive';
        }
    }
}