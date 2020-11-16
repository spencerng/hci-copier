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
		document.getElementById('screen1').hidden=true;
		document.getElementById('screen2').hidden=false;
		document.getElementById('account#').innerHTML = "Account number: " + accountNum;
	}
	else{
		//do nothing here
	}
}

//logout back to account screen1
function logout(){
	accountNum = "";
	document.getElementById('code').value = "";
	document.getElementById('screen1').hidden=false;
	document.getElementById('screen2').hidden=true;
}

//button to submit printInformation and review print job
function reviewPrint(){
	document.getElementById('screen2').hidden=true;
	document.getElementById('screen3').hidden=false;
}

//return to screen2 input
function returnScreen2(){
	document.getElementById('screen2').hidden=false;
	document.getElementById('screen3').hidden=true;
}

//print page
function confirmPrint(){
	document.getElementById('screen3').hidden=true;
	document.getElementById('screen4').hidden=false;
}