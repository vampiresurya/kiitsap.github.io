var emptyDoc = "com.sap.portal.pagebuilder.emptyDocument";
function createUniqueUrl(url) {
   if (!(createUniqueUrl.sequance)) {
      createUniqueUrl.sequance=0;
   }
   createUniqueUrl.sequance++;
   return url + (url.indexOf("?")==-1 ? "?" : "&") + "uniqueSequence=" + createUniqueUrl.sequance;
}

function NSXMLDocument() {
	this.doc = null;
}

function loadAndHandle(uniqueUrl,xmlStr) {
		  //handle session timeout - 
   	// do not show the "loading..." forever, delete the loading node, and add an info node for refreshing the portal.   	
	if (xmlStr!=null && xmlStr.indexOf("sessionTimeout")>=0)
  {
  		handleSessionTimeout(xmlStr.substring("sessionTimeout".length));
  		return;
  }

   var iFrame               = document.getElementById(uniqueUrl + "_iFrame");
   var form                 = document.getElementById(uniqueUrl + "_Form"  );
   if(iFrame==null || xmlStr==null || xmlStr=="") {
      return; // ERROR
   }
   document.body.removeChild(iFrame);
   if(form!=null) {
      document.body.removeChild(form);
   }
   var xmlDoc = new JS_XML_Document();
   xmlDoc.loadXML(xmlStr);
   eval(iFrame.xmlHandler + "(xmlDoc, iFrame.handlerDataObject);");
   if(iFrame.afterLoadEventHandler!=null && iFrame.afterLoadEventHandler!="" && iFrame.afterLoadEventHandler!="undefined") {
      eval(iFrame.afterLoadEventHandler + "(iFrame.afterLoadEventHandlerData);");
   }
}

function handleSessionTimeout(parentNodeID)
{
	var dtnTree = SAP_getJSTree("DetailedNavigationTree");
	var loadingNode = dtnTree.getNode(parentNodeID+"_Loading");
	if (loadingNode!=null)
	{
			if (xmsg_timeout==null)
			{
				xmsg_timeout = "Your session has timed out. Please refresh your browser";
			} 
		loadingNode.setText(xmsg_timeout);
	}

	
}


function loadXml(xmlURL, xmlHandler, handlerDataObject, locale, postParams, afterLoadEventHandler, afterLoadEventHandlerData) {
    var uniqueUrl = createUniqueUrl(xmlURL);
    
    // Load the url to an auxilary IFrame. From it extract the xml string to be parsed.
    // Prepare the IFrame
    var iFrame = document.createElement("IFRAME");
    iFrame.style.visibility          = "hidden";
    iFrame.width                     = 0;
    iFrame.height                    = 0;
    iFrame.name                      = uniqueUrl;
    iFrame.id                        = uniqueUrl + "_iFrame";
    iFrame.xmlHandler                = xmlHandler;
    iFrame.handlerDataObject         = handlerDataObject;
    iFrame.afterLoadEventHandler     = afterLoadEventHandler;
    iFrame.afterLoadEventHandlerData = afterLoadEventHandlerData;
    iFrame.addEventListener("load", iFrameOnLoad, false);

    // Attach the IFrame and setup its loading.
    function iFrameOnLoad() {
       var xmlStr      = getInnerHTML(frames[iFrame.name].document);
	   var xmlStartIdx = xmlStr.indexOf("\<\!\-\-\<update\>") + 4;
       var xmlEndIdx   = xmlStr.indexOf("\<\/update\>\-\-\>")+9;
	   if(xmlStartIdx == -1 || xmlEndIdx == -1) {
			xmlStartIdx = xmlStr.indexOf("\<\!\-\-") + 4;
			xmlEndIdx   = xmlStr.indexOf("\-\-\>");
		}
	   
       loadAndHandle(uniqueUrl,xmlStr.substr(xmlStartIdx, xmlEndIdx - xmlStartIdx));
    }

    if(postParams!=null && postParams!="") {
       var form    = document.createElement("FORM");
       form.id     = uniqueUrl + "_Form";
       form.method = "Post";
       form.action = uniqueUrl;
       form.target = iFrame.name;
       var ampIndex         = 0;
       var eqlIndex         = 0;
       var currentParameter = "";
       var formInput        = null;
       while((ampIndex=postParams.indexOf("&")) > -1) {
       	  currentParameter = postParams.substring(0,ampIndex).replace(/~!~/g,"&");
          currentParameter = postParams.substring(0,ampIndex);
          postParams       = postParams.substring(ampIndex+1,postParams.length);
          eqlIndex         = currentParameter.indexOf("=");
          if(eqlIndex==-1) {
             continue;
          }
          formInput       = document.createElement("INPUT");
          formInput.type  = "hidden";
          formInput.name  = currentParameter.substring(0,eqlIndex);
          formInput.value = currentParameter.substring(eqlIndex+1,currentParameter.length);
          form.appendChild(formInput);
       }
       // The last parameter
       currentParameter = postParams.replace(/~!~/g,"&");
       eqlIndex         = currentParameter.indexOf("=");
       if(eqlIndex!=-1) {
          formInput       = document.createElement("INPUT");
          formInput.type  = "hidden";
          formInput.name  = currentParameter.substring(0,eqlIndex);
          formInput.value = currentParameter.substring(eqlIndex+1,currentParameter.length);
          form.appendChild(formInput);
       }
       iFrame.src = emptyDoc;//"about:blank";
       document.body.appendChild(iFrame);
       document.body.appendChild(form);
       form.submit();
    } else {
       iFrame.src = uniqueUrl;
       document.body.appendChild(iFrame);
    }
}
