class NoOne {
    constructor(options = {}) {
	this.name = options.name || "NoOne";
	this.height = options.height || "20";
    }

    setHeight(height) {
	this.height = height;
	return this;
    }
    
    getName() {
	return this.name;
    }

    setKill() {
	this.kill = true;
    }
    /*toString() {
	return `NoOne - ${this.name}`;
    }

    getHeight() {
	return `NoOne - ${this.height}`;
    }*/
}

function printResult() {
    let name = document.getElementById("input_text").value;
    let email = document.getElementById("input_email").value;
    window.alert("1");
    const Arya = new NoOne();
    console.log(Arya);
    Arya.setKill();
    console.log(Arya);
    window.alert("2");
}
