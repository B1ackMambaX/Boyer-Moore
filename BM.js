let arg = process.argv;
let fs = require('fs');
let text = fs.readFileSync(arg[2]);
text = text.toString();
let pattern = fs.readFileSync(arg[3]);
pattern = pattern.toString();
let language = arg[4];
language = language.toString();

function getBadCharTable(pattern){
    let badCharTable;
    if (language == "Russian"){
        badCharTable = new Array(1104).fill(pattern.length);
    }
    if(language == "English") {
        badCharTable =  new Array(257).fill(pattern.length);
    }
    for(let i = 0; i < pattern.length - 1; i++){
        badCharTable[pattern.charCodeAt(i)] = pattern.length - i - 1;
    }
    return badCharTable;
}
function getSuffLength(pattern,index){
    let suffLength = 0;
    for (let i=index, j=pattern.length - 1; i>= 0 && pattern[i] === pattern[j]; i--, j--) {
        suffLength += 1;
    }
    return suffLength;
}

function getGoodSuffTable(pattern){
    let goodSuffTable = new Array(pattern.length).fill(0);
    let prefixIndex = pattern.length;
    let index = 0;
    for(let i = pattern.length; i >0; i--) {
        index = i;
        for(let i = index, j = 0; i < pattern.length; i++, j++){
            if (pattern[i] == pattern[j]){
                prefixIndex = i;
            }
        }
        goodSuffTable[pattern.length - i] = prefixIndex - 1 + pattern.length;
    }
    for(let i = 0; i < pattern.length - 1; i++) {
        let suffLength = getSuffLength(pattern,i);
        goodSuffTable[suffLength] = pattern.length - 1 - i + suffLength;
        goodSuffTable[suffLength] = goodSuffTable[suffLength] > pattern.length ? pattern.length : goodSuffTable[suffLength];
    }
    return goodSuffTable;
}


let result = [];
let i = pattern.length - 1;
function search(text, pattern){
    let BCtable = getBadCharTable(pattern);
    let GStable = getGoodSuffTable(pattern);
    let delta = 0;
    for (i ; i < text.length; ) {
        let j = pattern.length - 1;
        while (pattern[j] === text[i]) {
            if (j === 0) {
                result.push(i);
                i += 1;
            }
            i--;
            j--;
        }
        if(j == -1){
            delta = pattern.length;
        }
        else{
        delta = Math.max(GStable[pattern.length - 1 - j], BCtable[text.charCodeAt(i)]);
        }
        i+= delta;
    }
    
}
search(text,pattern);
console.log(result);






