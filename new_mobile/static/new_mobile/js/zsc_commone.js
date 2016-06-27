// JavaScript Document
var checkSubmitFlg = false; 

function checkSubmit(){
	if(checkSubmitFlg==true){
		alert(['请您稍等会再发布！']);
		return false;
	} 
	checkSubmitFlg==true;
	return true; 
} 