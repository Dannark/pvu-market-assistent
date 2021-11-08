// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let refreshButton = document.getElementById("refreshButton");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];

    if(changeColor.textContent == 'Activate'){
      changeColor.textContent = 'Deactivate'
    }
    else{
      changeColor.textContent = 'Activate'
    }
    chrome.tabs.sendMessage(activeTab.id, {"message": "monitoring_action"});
    
  });

});

// refreshButton.addEventListener("click", async () => {
//   console.log("refreshing the page")
//   // window.location.reload(false); //popup page

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: test,
//   });
// })

// function test(){
//   console.log('testeee', console.logs)
// }