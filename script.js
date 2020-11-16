//when keypad is pressed
var accountNum;

function keyPress(value){
	//backspace is pressed
	if (value == -1){
		document.getElementById('code').value=document.getElementById('code').value.slice(0, -1);
	}
	//clear is pressed
	else if (value == -2){
		document.getElementById('code').value = "";
	}
	//keys 0-9 are pressed
	else if ((String(document.getElementById('code').value).length) < 4 && value >= 0 && value <= 9){
		document.getElementById('code').value += String(value);
	}
	//submit button is pressed
	else if(value == -3 && (String(document.getElementById('code').value).length) == 4){
		accountNum = document.getElementById('code').value
		document.getElementById('enterAccountScreen').hidden=true;
		document.getElementById('printOptionsScreen').hidden=false;
		document.getElementById('account#').innerHTML = "Account number: " + accountNum;
	}
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
}

//button to submit printInformation and review print job
function reviewPrint() {
	replace('printOptionsScreen', 'reviewPrintScreen');
}

//return to printOptionsScreen input
function returnScreen2(){
	replace('reviewPrintScreen', 'printOptionsScreen')
}

//print page
function confirmPrint(){
	replace('reviewPrintScreen', 'printOptionsScreen')
}