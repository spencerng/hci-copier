var data;
var copiesField;

function onLoad() {
	data = { copies: 1 }
	copiesField = document.getElementById("copies")
	copiesField.value = 1;
	document.getElementById("plusCopyBtn").onclick = function () { copiesField.value = copiesField.value + 1; }
	document.getElementById("minusCopyBtn").onclick = function () { 
		if (copiesField.value != 1) {
			copiesField.value -= 1;
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
		document.getElementById('printProgress').value = 33;
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
	accountNum = "";
	document.getElementById('code').value = "";
	replace('printOptionsScreen', 'enterAccountScreen');
	document.getElementById('printProgress').value = 0;
}

//button to submit printInformation and review print job
function reviewPrint() {
	replace('printOptionsScreen', 'reviewPrintScreen');
	//set accountNum in review page
	document.getElementById('accNum').innerHTML = data.accountNum;
	data.copies = copiesField.value;
	document.getElementById('printProgress').value = 66;
}

//return to printOptionsScreen input
function returnScreen2(){
	replace('reviewPrintScreen', 'printOptionsScreen')
	document.getElementById('printProgress').value = 33;
}

//print page
function confirmPrint(){
	replace('reviewPrintScreen', 'printingScreen')
	document.getElementById('printProgress').value = 100;
}