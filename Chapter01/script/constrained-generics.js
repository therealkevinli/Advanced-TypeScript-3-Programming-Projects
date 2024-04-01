"use strict";
// Class level constraint
// class Data<T extends IStream> {
//     ReadStream(stream : T) {
//         let output = stream.ReadStream();
//         console.log(output.byteLength);
//     }
// }
// Method level constraint:
// class Data<T> {
//     ReadStream<T extends IStream>(stream : T) {
//         let output = stream.ReadStream();
//         console.log(output.byteLength);
//     }
// }
// Class level constraint
class Data {
    // Method level constraint
    ReadStream(stream) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}
class WebStream {
    ReadStream() {
        let array = new Int8Array(8);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
class DiskStream {
    ReadStream() {
        let array = new Int8Array(20);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
const webStream = new Data();
const diskStream = new Data();
webStream.ReadStream(new WebStream());
let diskArray = diskStream.ReadStream(new DiskStream()); //prints undefined
let ds = new DiskStream();
console.log(ds.ReadStream()); //prints all the values of the array
//# sourceMappingURL=constrained-generics.js.map