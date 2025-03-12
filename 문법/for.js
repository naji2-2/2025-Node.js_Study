const letter = ['a', 'b', 'c', 'd', 'l', 'o', 'v', 'e'];

// 전통적인 for문
for(var i=0; i<letter.length; i++){
    console.log(letter[i]);
}

// forEach 사용
letter.forEach( f => console.log(f));

// for of 사용
for(const f of letter){
    console.log(f);
}