var normalizedData = {};
// this variable is for indexing the entries inside the result object
let dataCounter = 1;

var findChildren = function (people) {
    let childArray = [];
    for (let i = 0; i < people.length; i++) {
        childArray.push(people[i].id)
    }
    return childArray;
}

var normalizeJSON = function (people) {

    for (let x = 0; x < people.length; x++) {

        var obj = {};
        if (people[x].hasOwnProperty('children')) {
            obj['id'] = people[x].id;
            obj['name'] = people[x].name;
            obj['children'] = findChildren(people[x].children);
            normalizedData[dataCounter] = obj;
            dataCounter++;

            //running a recursive function for the nested elements
            normalizeJSON(people[x].children);
        } else {
            people[x]['children'] = [];
            normalizedData[dataCounter] = people[x];
            dataCounter++;
        }
    }

}

normalizeJSON(people);
console.log(normalizedData);