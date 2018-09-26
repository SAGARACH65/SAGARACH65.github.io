let normalizedData = {};
// this letiable is for indexing the entries inside the result object
let dataCounter = 1;

let findChildren = child => {
    let childArray = [];
    child.map(item => {
        childArray.push(item.id)
    })
    return childArray;
}

let normalizeJSON = people => {

    people.map(item => {
        let obj = {};
        if (item.hasOwnProperty('children')) {
            obj['id'] = item.id;
            obj['name'] = item.name;
            obj['children'] = findChildren(item.children);
            normalizedData[dataCounter] = obj;
            dataCounter++;

            //running a recursive function for the nested elements
            normalizeJSON(item.children);
        } else {
            item['children'] = [];
            normalizedData[dataCounter] = item;
            dataCounter++;
        }
    })

}
normalizeJSON(people);
console.log(normalizedData);