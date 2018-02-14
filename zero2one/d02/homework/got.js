function getInfo() {
    let link = "http://gameofthrones.wikia.com/wiki/Rhaegar_Targaryen";
    window.alert("MOPA");
    console.log(link);
    document.getElementById("textResult").innerHTML = "TESTE!";
}

const chars = [{"Rhaegar":"867"}, {"Arya":"148"}, {"Jaime":"529"}];
const MOPA = [];
function getPeople(data){
    console.log(chars.length)
    /*for(let i = 0; i < chars.length; i++){
	for(x in chars[i]){
	    console.log(chars[i]);
	    console.log(x);
	    console.log((chars[i])[x])
	}
    }
    for(x in chars){
	console.log(x);
    }*/
    for(let i = 0; i < chars.length; i++){
	for(x in chars[i]){
	    let link = `https:anapioficeandfire.com/api/characters/${(chars[i])[x]}`;
	    console.log(link);
	    let aux = fetch(link)
		.then(response => response.json())
		.then(result => {
		    fillData(result, data, x);
		    MOPA.push(result);
		})
		.catch(err => {
		    console.error('Failed retrieving information, err');
		});
	}
    }
    console.log("SIZE: " + MOPA.length);
    //fillData2(data);
}

function fillData(result, data, person) {
    console.log("Filling data...")
    console.log(person);
    let text = "text" + person;
    console.log("texto: " + text);
    if(data == 'aliases')
	document.getElementById(text).innerHTML = `Aliases: ${result.aliases[1]}`;
    else if(data == 'gender')
	document.getElementById(text).innerHTML = `Gender: ${result.gender}`;
    else if(data == 'culture')
	document.getElementById(text).innerHTML = `Culture: ${result.culture}`;
}

function fillData2(data) {
    console.log(MOPA);
    console.log(MOPA.pop());
    for (let i in MOPA) {
	console.log(MOPA[i]);
	console.log("FIM");
    }

}
