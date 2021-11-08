chrome.runtime.onInstalled.addListener(() => {
  console.log('installed')
  //chrome.storage.sync.set({ color });
  // console.log('Default background color set to %cgreen', `color: ${color}`);
});