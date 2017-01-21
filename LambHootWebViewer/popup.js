	

	
	
	var pageDocument;
			chrome.tabs.getSelected(null, function(tab) {
		  // Send a request to the content script.
		  chrome.tabs.sendRequest(tab.id, {action: "getDom"}, function(response) {
			pageDocument = response;
			console.log(response);
		  });
		});
		




function messageSendOnClick(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "clicked"}, function(response) {
	  });
	});
}

//assigns the onClick of the button in the popup
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('launchButton');
    link.addEventListener('click', function() {
		messageSendOnClick();
    });
});