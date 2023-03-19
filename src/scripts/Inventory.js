export default class Inventory {
    constructor(){
        this.items = [{
            name: "cone",
            id: 1
        },
        {
            name: "code sheet",
            id: 2
        },
        {
            name: "example",
            id: 3
        },
        {
            name: "test",
            id: 4
        }
    ];
    }

    addItem(currentItem){
        // console.log('Vous avez ajouté : ' + currentItem);
        this.items.push({ name : currentItem, id: this.items.length + 1 })
        
        // console.log('Items actuels :');
        // console.table(this.items);
    }

    removeItem(currentItem){
        // console.log('Vous avez retiré : ' + currentItem);
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

        // console.log('Items actuels :');
        // console.table(this.items);
    }

    removeFromItemsList(toRemove){

    }
}