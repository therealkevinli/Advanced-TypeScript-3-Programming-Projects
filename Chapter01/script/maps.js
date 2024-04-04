"use strict";
var Genre;
(function (Genre) {
    Genre[Genre["Rock"] = 0] = "Rock";
    Genre[Genre["CountryAndWestern"] = 1] = "CountryAndWestern";
    Genre[Genre["Classical"] = 2] = "Classical";
    Genre[Genre["Pop"] = 3] = "Pop";
    Genre[Genre["HeavyMetal"] = 4] = "HeavyMetal";
})(Genre || (Genre = {}));
//Maps have set, get, has, delete, size, and clear attributes
//https://www.javatpoint.com/typescript-map
class MusicCollection {
    constructor() {
        this.collection = new Map(); //readonly allows it only to be initialized in constructor
    }
    Add(genre, artist) {
        // this.collection = new Map<Genre, string[]>(); // this is blocked by readonly
        this.collection.set(genre, artist);
    }
    Get(genre) {
        return this.collection.get(genre);
    }
}
let collection = new MusicCollection();
collection.Add(Genre.Classical, [`Debussy`, `Bach`, `Elgar`, `Beethoven`]);
collection.Add(Genre.CountryAndWestern, [`Dolly Parton`, `Toby Keith`, `Willie Nelson`]);
collection.Add(Genre.HeavyMetal, [`Tygers of Pan Tang`, `Saxon`, `Doro`]);
collection.Add(Genre.HeavyMetal, [`Tyger tiger`, `Anglo Saxon`, `Doro the explorer`]); //this line overrides the earlier HeavyMetal add because add uses set instead of extend
collection.Add(Genre.Pop, [`Michael Jackson`, `Abba`, `The Spice Girls`]);
collection.Add(Genre.Rock, [`Deep Purple`, `Led Zeppelin`, `The Dixie Dregs`]);
console.log(collection.Get(Genre.HeavyMetal));
console.log(collection.Get(0)); //this will print rock artists because it is the first [0th] genre in enum
//# sourceMappingURL=maps.js.map