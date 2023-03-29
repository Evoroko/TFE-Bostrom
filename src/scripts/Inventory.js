import lvl1Items from "./lvl1-items";

export default class Inventory {
    constructor(){
        this.items = [];
    }

    addItem(currentItem){
        let haveItem = false;
        for(let heldItem of this.items){
            if(currentItem == heldItem.name){
                haveItem = true;
            }
        }
        if(haveItem == false){
            for(let item in lvl1Items){
                if(currentItem == lvl1Items[item].name){
                    // Revoir le pb d'incrémentation de toutes les instances de l'id d'un même objet
                    let addedItem = lvl1Items[item];
                    addedItem.id = this.items.length + 1;
                    this.items.push(addedItem);
                }
            }
        }        
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