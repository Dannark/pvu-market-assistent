
const nextButton = `div.box.tw-cursor-pointer`

var keepMonitoring = false

const delay = ms => new Promise(res => setTimeout(res, ms));

const intervalToRefreshPage = setInterval(() => { 
	monitoringFowardAndBackwardsStrategy(); 
}, 6000);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if( request.message === "monitoring_action" ) {
		keepMonitoring = !keepMonitoring
	}
  }
);

async function monitoringFowardAndBackwardsStrategy(){
	if (keepMonitoring){
		var nextButtonDiv = $(nextButton)[1]
		
		if(nextButtonDiv != undefined){
			triggerMouseEvent(nextButtonDiv, "mousedown");

			await delay(5000);
			var prevButtonDiv = $(nextButton)[0]
			triggerMouseEvent(prevButtonDiv, "mousedown");
		}
	}
}

function triggerMouseEvent(node, eventType) {
    var event = document.createEvent('MouseEvents');
	event.initEvent(eventType, true, true);
	
	try {
		// node.dispatchEvent(event);
		node.click()
	}catch (e) {
		console.log('> Simulating Click Error: User Class Container not Found.',e)
	}
	
}


function sendMsgDelay(msg, sendButton){
	var event = new Event('input', {bubbles: true});
	var textbox =  $('.'+containerCaixaDeTexto).find('.'+caixaTexto) //document.getElementsByClassName(caixaTexto);
	console.log(textbox)
	textbox[0].textContent = msg;
	textbox[0].dispatchEvent(event);
	var sendbox = document.getElementsByClassName(sendButton);
	sendbox[0].click();
	console.log("message sent!");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
}