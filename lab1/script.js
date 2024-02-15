//modularity

let itemCollection = function(){
  //private aliases for properties and methods
  let items = ["item1", "item2", "item3"];

  let addItem = function(newItem){
    items.push(newItem);
  };
  let numOfItems = function(){
    console.log(items.length);
  };
  // Public aliases
  return {
    addItem: function(item){
      addItem(item);
    },
    returnNumOfItem: numOfItems
  }
}(); //immediately-invoked function expressions. IIFE

export default itemCollection;