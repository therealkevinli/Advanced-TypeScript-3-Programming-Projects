interface IStream {
    ReadStream() : Int8Array; // Array of bytes
}

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
class Data<T extends IStream> {
// Method level constraint
    ReadStream<T extends IStream>(stream : T) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}



class WebStream implements IStream {
    ReadStream(): Int8Array {
        let array : Int8Array = new Int8Array(8);

        for (let index : number = 0; index < array.length; index++){
            array[index] = index + 3;
        }

        return array;
    }
}

class DiskStream implements IStream {
    ReadStream(): Int8Array {
        let array : Int8Array = new Int8Array(20);

        for (let index : number = 0; index < array.length; index++){
            array[index] = index + 3;
        }

        return array;
    }
}

const webStream = new Data<WebStream>();
const diskStream = new Data<DiskStream>();

webStream.ReadStream(new WebStream());

let diskArray:any = diskStream.ReadStream(new DiskStream()); //prints undefined

let ds = new DiskStream();
console.log(ds.ReadStream()); //prints all the values of the array