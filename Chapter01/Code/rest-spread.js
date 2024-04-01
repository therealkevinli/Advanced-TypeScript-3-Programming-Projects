// function PrintInstruments(log, ...arguments){
function PrintInstruments(){
    // arguments.forEach(argument => {console.log(argument)});
    console.log("hello world");
    console.log(arguments.length);
    for (var _i = 0; _i < arguments.length; _i++)
    {
        console.log(arguments[_i]);
    }
    arguments.forEach(argument => {console.log(argument)});
}

PrintInstruments("my instrument shop", "abc", "def");