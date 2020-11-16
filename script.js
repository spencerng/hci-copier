var data;
var copiesField, brightnessField;
var btnGroups = ['side', 'sep', 'source', 'sepSource']
var pages = 0; //for printing animation use only

function onLoad() {
	data = { copies: 1, brightness: 0, side: null, source: null, sep: null, sepSource: null }

	removeActive("");

	copiesField = document.getElementById("copies");
	copiesField.value = data.copies;
	brightnessField = document.getElementById("brightnessSlider");
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

	for (var i = 0; i < btnGroups.length; i++) {
		registerGroup(btnGroups[i] + "Btn")
	}

}

function registerGroup(className) {
	var elements = document.getElementsByClassName(className)
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = function () {
			removeActive(className)

			this.className += " active";
			checkSepSourceEnable()
			checkPrintBtnEnable()
		}
	}
}

function getGroupValue(className) {
	var elements = document.getElementsByClassName(className)
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className.includes("active")) {
			if (elements[i].value != undefined) {
				return elements[i].value;
			} else {
				return elements[i].id;
			}
			
		}
	}

	return "";
}

function checkSepSourceEnable () {
	var sepLabel = document.getElementById("sepSourceLabel")
	if (getGroupValue("sepBtn") === "Yes") {
		disableClass("sepSourceBtn", false)
		sepLabel.classList.remove("disable-text")
	} else {
		removeActive("sepSourceBtn")
		disableClass("sepSourceBtn", true)
		sepLabel.className += " disable-text"
	}
}

function disableClass(className, disable) {
	var elements = document.getElementsByClassName(className)
	for (var i = 0; i < elements.length; i++) {
		elements[i].disabled = disable;
	}
}

function checkPrintBtnEnable () {
	reviewBtn = document.getElementById("review-btn")
	if (getGroupValue("sideBtn") !== "" && getGroupValue("sourceBtn") !== "" && (getGroupValue("sepBtn") === "No" 
		|| getGroupValue("sepSourceBtn") !== "")) {
		reviewBtn.disabled = false;
	} else {
		reviewBtn.disabled = true;
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
		document.getElementById('printLabel').innerHTML = "Print Progress: Copy " + String(pages) + " of " + data.copies; 
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
	data.side = getGroupValue('sideBtn')
	data.sep = getGroupValue('sepBtn')
	data.source = getGroupValue('sourceBtn')
	data.sepSource = getGroupValue('sepSourceBtn')
	

	//set all information on info page to match with data
	document.getElementById('accNum').innerHTML = data.accountNum;
	document.getElementById('pageNum').innerHTML = data.copies;

	var brightnessVal = data.brightness;

	if (brightnessVal > 0) {
		brightnessVal = "+" + brightnessVal + " (brighter)"
	} else if (brightnessVal < 0) {
		brightnessVal += " (darker)"
	} else {
		brightnessVal += " (default)"
	}

	document.getElementById('brightness').innerHTML = brightnessVal;

	document.getElementById('sideOpt').innerHTML = data.side.split("-")[0] + " &xrarr; " + data.side.split("-")[1]
	document.getElementById('paperBin').innerHTML = "Bin " + data.source;

	if (data.sep === "Yes") {
		document.getElementById('seperator').innerHTML = "From Bin " + data.sepSource;
	} else {
		document.getElementById('seperator').innerHTML = "None"
	}

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