enum Genre {
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal
}

//Maps have set, get, has, delete, size, and clear attributes
//https://www.javatpoint.com/typescript-map

class MusicCollection {
    private readonly collection : Map<Genre, string[]>; //readonly just makes it so that we can't make a new assignment to it later
    constructor() {
        this.collection = new Map<Genre, string[]>(); //readonly allows it only to be initialized in constructor
    }

    public Add(genre : Genre, artist : string[]) : void {
        // this.collection = new Map<Genre, string[]>(); // this is blocked by readonly
        this.collection.set(genre, artist);
    }

    public Get(genre : Genre) : string[] | undefined {
        return this.collection.get(genre);
    }

    // Create a new array and return a combined 
    // public AddArtist(genre: Genre, artist: string): void {
    //     if (!this.collection.get(genre).has(artist))
    //     {

    //     }

    // }
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
