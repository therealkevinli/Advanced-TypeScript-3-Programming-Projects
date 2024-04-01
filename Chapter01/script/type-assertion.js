"use strict";
function isElectricGuitar(v) {
    return v.numberOfPickups !== undefined;
}
class Electric {
    constructor(numberOfPickups) {
        this.numberOfPickups = numberOfPickups;
    }
}
class MusicStore {
    BuyInstrument(instrument) {
        if (isElectricGuitar(instrument)) {
            // Note that the backtick allows us to use the string formatting below...
            console.log(`Playing guitar with ${instrument.numberOfPickups} pickups`);
        }
        else {
            console.log(`This is a pretty cool violin`);
        }
    }
}
new MusicStore().BuyInstrument(new Electric(3));
//# sourceMappingURL=type-assertion.js.map