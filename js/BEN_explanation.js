var fruits = ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
undefined
fruits
(6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
for (var i = 0; i < fruits.length; i++) {
    console.log(fruits);
}
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
VM2648:2 (6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
undefined
for (var i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
VM2664:2 apple
VM2664:2 banana
VM2664:2 pear
VM2664:2 orange
VM2664:2 watermelon
VM2664:2 wintermelon
undefined
for (var i = 0; i < fruits.length; i++) {
    if (fruits[i].includes("melon")){
        console.log(fruits[i]);
    }
}
VM2742:3 watermelon
VM2742:3 wintermelon
undefined
function searchFruits(searchTerm) {
    for (var i = 0; i < fruits.length; i++) {
        if (fruits[i].includes(searchTerm)){
        console.log(fruits[i]);
        }
    }
}
undefined
searchFruits("melon")
VM2874:4 watermelon
VM2874:4 wintermelon
undefined
searchFruits("apple")
VM2874:4 apple
undefined
function searchFruits(searchTerm, arrayToSearch) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i].includes(searchTerm)){
        console.log(arrayToSearch[i]);
        }
    }
}
undefined
fruits
(6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
searchFruits("apple", fruits)
VM3048:4 apple
undefined
var otherFruitArray = ["lemon", "grapes"]
undefined
fruits
(6) ["apple", "banana", "pear", "orange", "watermelon", "wintermelon"]
otherFruitArray
(2) ["lemon", "grapes"]
searchFruits("lemon", otherFruitArray)
VM3048:4 lemon
undefined
// go read up on .includes()
undefined
