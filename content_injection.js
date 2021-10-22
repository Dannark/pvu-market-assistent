

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

	console.log("Clicked at the extension: ", request);

    findElements()
  }
);

// function sendToGroup(msgToSend, toGroup){
// 	var myVar;
// 	$('.'+userObject).each(function(){
		
// 		if($(this).find('.'+userTitle).attr('title') != undefined && $(this).find('.'+userMsg).attr('title') != undefined){

// 			var myTitle = ""+$(this).find('.'+userTitle).attr('title').toString().trim();
// 			var myMsg = ""+$(this).find('.'+userMsg).attr('title').toString().trim();

// 			//lastAnsweredUsers.push({name:myTitle, value:myMsg});
			
// 			if(myTitle == toGroup){
// 				myVar = $(this);
// 			}
// 		}
// 		else{
// 			console.log("erro ao encontrar classe do usuario title/msg");
// 		}
// 	});

// 	var elementoClick = myVar.find("."+userContainerClick);
// 	triggerMouseEvent(elementoClick, "mousedown");
	
// 	sendMsg(msgToSend, sendButton);

// }



function triggerMouseEvent(node, eventType) {
    var event = document.createEvent('MouseEvents');
	event.initEvent(eventType, true, true);
	
	console.log('simulando click',node, eventType)
	try {
		node.dispatchEvent(event);
	}catch (e) {
		console.log('> Simulating Click Error: User Class Container not Found.',e)
	}
	
}

function setExtensionId(){
	var myToken = chrome.runtime.id;
	document.cookie = "extensionID="+myToken;
}

function sendMsg(msg, sendButton){
	// this block will fire in future because wp can take some tome to download page content
	setTimeout(function() { sendMsgDelay(msg, sendButton); }, 1500);
	return msg.replaceAll("*","");
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