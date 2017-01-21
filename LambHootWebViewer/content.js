chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
 if (request.action == "getDom")
   sendResponse(document);
 else
   sendResponse({}); // Send nothing..
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "clicked"){
		switchImgSrc();
	}
  });

var elements = document.getElementsByTagName('*');
var lastImageIndex = 0;
var numberOfPics = 138;
var pics = new Array(numberOfPics);
for(p=1; p <= numberOfPics; p++){
	pics[p-1] = chrome.extension.getURL("pics/p" + p + ".jpg");
}

function switchText(){//unused, keeping it for later
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		for (var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];

			if (node.nodeType === 3) {
				var text = node.nodeValue;
				var regex = new RegExp( '(' + "puppet" + ')', 'gi' );
				var replacedText = text.replace(regex, "Asshole");
				
				//var replacedText = text.replace("div", "FUCK");

				if (replacedText !== text) {
					element.replaceChild(document.createTextNode(replacedText), node);
				}
			}
		}
	}//end for
	 //setTimeout(switchText, 5000);
}

function switchImgSrc() {
	/*
			var images = document.getElementsByTagName('img');
			console.log(images);
			for (i = 0; i < images.length; i++){
					var aProf = selectRandomPic();
					images[i].setAttribute('src', images[i].getAttribute('src').replace(images[i].getAttribute('src'), aProf));
			}
			*/
			loadXMLDoc("good");
		
	//setInterval(switchImgSrc, 5000);
}

function selectRandomPic(){
	var choice = Math.floor(Math.random() * pics.length);
	return pics[choice];
}

function loadXMLDoc(word)
    {
		//get content from
		//<section class="container-info antonyms" >
		
		url = "http://www.thesaurus.com/browse/" + word + "?s=t";
		
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                alert(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);//the bool is async, must be truez
		//while(xmlhttp.state != "done"){console.log();}
		xmlhttp.send();//catch for the async
		content = xmlhttp.responseText;
		console.log(content);
    }

//window.onload = switchImgSrc();
//document.onload = switchImgSrc();

//switchImgSrc();