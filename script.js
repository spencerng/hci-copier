var data;
var copiesField, brightnessField;
var pages = 0; //for printing animation use only

function onLoad() {
	data = { copies: 1, brightness: 3 }

	removeActive("");

	copiesField = document.getElementById("copies");
	copiesField.value = data.copies;
	brightnessField = document.getElementById("brightness");
	brightnessField.value = data.brightness;

	document.getElementById("plusCopyBtn").onclick = function () { 
		copiesField.value = parseInt(copiesField.value) + 1; 
	}
	document.getElementById("minusCopyBtn").onclick = function () { 
		if (copiesField.value != 1) {
			copiesField.value -= 1;
		}
	}

	document.getElementById('code').value = "";

	var btnGroups = ['sideBtn', 'sepBtn', 'sourceBtn', 'sepSourceBtn']

	for (var i = 0; i < btnGroups.length; i++) {
		registerGroup(btnGroups[i])
	}

}

function registerGroup(className) {
	var elements = document.getElementsByClassName(className)
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = function () {
			removeActive(className)

			this.className += " active";
		}
	}
}

function removeActive(filterClass) {
	var activeElements = document.getElementsByClassName("active")
	for (var j = 0; j < activeElements.length; j++) {
		if (filterClass == "" || (filterClass !== "" && activeElements[j].className.includes(filterClass))) {
			activeElements[j].classList.remove("active");
			j -= 1;
		}
	}
}

function keyPress(value){
	var codeBox = document.getElementById('code');
	
	if (value == -1){ //backspace is pressed
		codeBox.value= codeBox.value.slice(0, -1);
	} else if (value == -2){ //clear is pressed
		codeBox.value = "";
	}

	var codeLen = String(codeBox.value).length;
	
	if (codeLen < 4 && value >= 0 && value <= 9){
		codeBox.value += String(value);
		codeLen += 1;
	} else if (codeLen == 4 && value == -3) {
		data.accountNum = codeBox.value
		replace('enterAccountScreen', 'printOptionsScreen')
		document.getElementById('account#').innerHTML = "Account number: " + data.accountNum;
	}
	
	var nextButton = document.getElementById('accountNextBtn');
	nextButton.disabled = codeLen < 4;
}

function replace(idToHide, idToShow) {
	document.getElementById(idToHide).hidden = true;
	document.getElementById(idToShow).hidden = false;
}

//logout back to account enterAccountScreen
function logout(){
	replace('printOptionsScreen', 'enterAccountScreen');
	onLoad();
}

//printing animation and update
function printAnimation(){
	printInc = 100/data.copies;
	if (document.getElementById('printProgress').value < 100){
		pages += 1;
		document.getElementById('printProgress').value += printInc;
		document.getElementById('printLabel').innerHTML = "Print Progress: Page " + String(pages) + " of " + data.copies; 
	}
	else{
		document.getElementById('completeMessage').hidden = false;
	}
}


//button to submit printInformation and review print job
function reviewPrint() {
	replace('printOptionsScreen', 'reviewPrintScreen');
	data.copies = copiesField.value;
	data.brightness = brightnessField.value;
	//set all information on info page to match with data
	document.getElementById('accNum').innerHTML = data.accountNum;
	document.getElementById('pageNum').innerHTML = data.copies;
	// document.getElementById('brightness').innerHTML = data.brightness;
	//update printing animation
	document.getElementById('printLabel').innerHTML = "Print Progress: Page 0 of " + data.copies; 
	setInterval(printAnimation, 1000);
}

//return to printOptionsScreen input
function returnScreen2(){
	replace('reviewPrintScreen', 'printOptionsScreen')
}

//print page
function confirmPrint(){
	replace('reviewPrintScreen', 'printingScreen')
}