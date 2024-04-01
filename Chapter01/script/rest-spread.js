"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function ConsolidatedGrid(grid, margin) {
    let consolidatedGrid = Object.assign(Object.assign({}, margin), grid);
    consolidatedGrid.Width += grid.Width;
    consolidatedGrid.Height += grid.Height;
    consolidatedGrid.Padding = margin.Padding ? margin.Padding : grid.Padding;
    return consolidatedGrid;
}
let grid = { Height: 20, Width: 10, Padding: 5 };
let margin = { Left: 5, Top: 5, Width: 5, Height: 5 };
let consolidatedGrid = ConsolidatedGrid(grid, margin);
console.log(`Left : ${consolidatedGrid.Left}, Top : ${consolidatedGrid.Top}, Width : ${consolidatedGrid.Width},  Height : ${consolidatedGrid.Height}, Padding ${consolidatedGrid.Padding}`);
console.log(`Grid : Height ${grid.Height}, Width ${grid.Width}, Padding ${grid.Padding}`);
console.log(`Margin : Height ${margin.Height}, Width ${margin.Width}, Padding ${margin.Padding}, Left ${margin.Left}, Top ${margin.Top}`);
let guitar = { manufacturer: 'Ibanez', type: 'Jem 777', strings: 6 };
/*
// Original way of deconstructing an object
const manufacturer = guitar.manufacturer;
const type = guitar.type;
const strings = guitar.strings;
*/
/*
// Deconstructing all elements in the literal
const {manufacturer : manufacturer1, type, strings} = guitar;
*/
let { manufacturer } = guitar, details = __rest(guitar, ["manufacturer"]);
console.log(`The guitar ${manufacturer} ${details.type} has ${details.strings} strings`);
const instruments = ['Guitar', 'Violin', 'Oboe', 'Drums'];
/*
const gtr = instruments[0];
const violin = instruments[1];
const oboe = instruments[2];
const drums = instruments[3];
*/
/*
let [gtr, ...instrumentslice] = instruments;
console.log(instrumentslice[1]);
*/
// Deconstructing all objects in the literal
let [gtr, violin, oboe, drums] = instruments;
console.log(gtr);
// Rest parameters demonstration
function PrintInstruments(log, ...instruments) {
    console.log(log);
    instruments.forEach(instrument => {
        console.log(instrument);
    });
}
// trying out printing arguments parameter
function PrintInstruments2(log) {
    console.log(log);
    console.log(typeof (arguments));
}
PrintInstruments2("my instrument shop");
PrintInstruments('Music Shop Inventory', 'Guitar', 'Drums', 'Clarinet', 'Clavinova');
//# sourceMappingURL=rest-spread.js.map