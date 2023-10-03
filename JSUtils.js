var JSUtils=function(){function $(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++){elements.push($(arguments[i]))}return elements}element=document.getElementById(element);return element}function hasClass(element,className){if(element==null){return}var classesArr=JSUtils.BrowserDetection.is_ie?element.getAttribute("className").split(" "):element.getAttribute("class").split(" "),i;for(i=0;i<classesArr.length;i++){if(classesArr[i]===className){return true}}return false}function waitForObject(objectStr,cbFunction,cbArgument){var objectExists=false;try{eval("("+objectStr+")");objectExists=true}catch(e){}if(objectExists){cbFunction(cbArgument)}else{setTimeout(function(){waitForObject(objectStr,cbFunction,cbArgument)},50)}}var waitForEvent=function(urn,eventName,cb){if(EPCM){if(EPCM.isSubscribed(urn,eventName)){cb()}else{setTimeout(function(){waitForEvent(urn,eventName,cb)},50)}}};var ESCAPE_TO_HTML=function(str){if(isEmpty(str)){return""}return(str+"").replace(/([\"\&\<\>\'])/g,ESCAPE_TO_HTML.rep)};ESCAPE_TO_HTML.map={'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;"};ESCAPE_TO_HTML.rep=function(a,b){return ESCAPE_TO_HTML.map[b]||b};var getElementFromEvent=function(evt){return evt.srcElement||evt.target};var getQueryAndParams=function(paramsMap){var query=LSAPI.AFPPlugin.urlhandler.getQueryString();paramsMap=paramsMap.merge(query);if(!isEmpty(paramsMap)){return paramsMap}else{var qMap=new ParamMap();return qMap}};var filterParams=function(params,filter){var location=params.indexOf(filter);if(location!==-1){var before=params.substring(0,location-1);var after=params.substring(location+filter.length);var endOfParam=after.indexOf("&");if(endOfParam!==-1){after=after.substring(endOfParam);return before+after}else{return before}}return params};var isEmpty=function(s){return(!s||(s==null)||(s.length==0))};var compareNodeID=function(source,target){var compSource,compTarget;if(source.indexOf("navurl://")===-1){compSource="navurl://"+MD5(source)}else{compSource=source}if(target.indexOf("navurl://")===-1){compTarget="navurl://"+MD5(target)}else{compTarget=target}if(compSource===compTarget){return true}if(escape(compSource)===compTarget){return true}if(escape(compTarget)===compSource){return true}return false};var findItemInArray=function(arr,val){for(var i=0;i<arr.length;i++){if(arr[i]==val){return i}}return -1};var findAbsolutePosition=function(elm){if(elm.getBoundingClientRect){var bound=elm.getBoundingClientRect();return{x:bound.left+document.body.scrollLeft,y:bound.top+document.body.scrollTop,r:bound.right}}else{var offsetTrail=elm;var offsetX=0;var offsetY=0;while(offsetTrail){offsetX+=offsetTrail.offsetLeft-(offsetTrail.parentNode?offsetTrail.parentNode.scrollLeft:0);offsetY+=offsetTrail.offsetTop;offsetTrail=offsetTrail.offsetParent}if(navigator.userAgent.indexOf("Mac")!=-1&&typeof document.body.leftMargin!="undefined"){offsetX+=document.body.leftMargin;offsetY+=document.body.topMargin}return{x:offsetX,y:offsetY}}};var relevantURLParams=["afpdebugmode","pretty","sap-wd-pb-debugmode"];var extractContentAreaForwardingParams=function extractContentAreaForwardingParams(){var fullURL=document.location.href;var paramLocation=fullURL.indexOf("?",0);var parametersString=fullURL.substr(paramLocation+1);var parameterArray=parametersString.split("&");var relevantParameters=new Array();for(var i=0;i<parameterArray.length;i++){paramLowerCase=parameterArray[i].toLowerCase();if((paramLowerCase.indexOf(relevantURLParams[0])==0)||(paramLowerCase.indexOf(relevantURLParams[1])==0)||(paramLowerCase.indexOf(relevantURLParams[2])==0)){var equalSignPosition=parameterArray[i].indexOf("=");var parameterLength=parameterArray[i].length;var key=parameterArray[i].substr(0,equalSignPosition);var value=parameterArray[i].substr(equalSignPosition+1,parameterLength);relevantParameters.push({key:key,value:value})}}return relevantParameters};var messageFormat=function(message,parameters){if(!message){return""}if(!parameters){return message}var i;var result=message;for(i=0;i<parameters.length;i++){var regex=new RegExp("[{]"+i+"[}]","g");result=result.replace(regex,parameters[i])}return result};var getAbsoluteVisiblePosition=function(element){return getAbsolutePosition(element,true)};var getAbsolutePosition=function(element,includeScroll){var r={x:element.offsetLeft,y:element.offsetTop};if(includeScroll&&!isInputTextElement(element)){r.x-=element.scrollLeft;r.y-=element.scrollTop}if(element.offsetParent){var tmp=getAbsolutePosition(element.offsetParent,includeScroll);r.x+=tmp.x;r.y+=tmp.y}return r};var isInputTextElement=function(element){return(element&&(element.tagName.toLowerCase()=="input")&&(element.type.toLowerCase()=="text"))};var mouseCoords=function(ev){if(ev.pageX||ev.pageY){return{x:ev.pageX,y:ev.pageY}}return{x:ev.clientX+document.body.scrollLeft-document.body.clientLeft,y:ev.clientY+document.body.scrollTop-document.body.clientTop}};var clearAllEventsFromElement=function clearAllEventsFromElement(htmlNode){if(htmlNode.onclick){htmlNode.onclick=null}if(htmlNode.onmouseout){htmlNode.onmouseout=null}if(htmlNode.onmouseover){htmlNode.onmouseover=null}if(htmlNode.onmousedown){htmlNode.onmousedown=null}if(htmlNode.onmouseup){htmlNode.onmouseup=null}if(htmlNode.ondblclick){htmlNode.ondblclick=null}if(htmlNode.onmousemove){htmlNode.onmousemove=null}if(htmlNode.onkeydown){htmlNode.onkeydown=null}if(htmlNode.onkeypress){htmlNode.onkeypress=null}if(htmlNode.onkeyup){htmlNode.onkeyup=null}if(htmlNode.onfocus){htmlNode.onfocus=null}if(htmlNode.onblur){htmlNode.onblur=null}if(htmlNode.onchange){htmlNode.onchange=null}if(htmlNode.onreset){htmlNode.onreset=null}if(htmlNode.onselect){htmlNode.onselect=null}if(htmlNode.onsubmit){htmlNode.onsubmit=null}htmlNode=htmlNode.firstChild;while(htmlNode){JSUtils.clearAllEventsFromElement(htmlNode);htmlNode=htmlNode.nextSibling}};var setElementText=function(element,text){if(!element){return}if(JSUtils.BrowserDetection.is_ie){element.innerText=text}else{element.textContent=text}};var trimString=function trimString(str){return(str||"").replace(/^\s+|\s+$/g,"")};var zeroPadding=function zeroPadding(num,count){var numZeropad=num+"";while(numZeropad.length<count){numZeropad="0"+numZeropad}return numZeropad};var eliminateDuplicates=function eliminateDuplicates(arr,includeTrim){if(typeof(arr)=="undefined"||!arr){return arr}var i,len=arr.length,out=[],obj={};for(i=0;i<len;i++){var curr=includeTrim?trimString(arr[i]):arr[i];if(curr!=""){obj[curr]=0}}for(i in obj){out.push(i)}return out};var addFormParams=function addFormParams(paramName,paramValue,sb){var encodedParamName=JSUtils.ESCAPE_TO_HTML(paramName);var encodedParamValue=JSUtils.ESCAPE_TO_HTML(paramValue);sb.Append("<input type='hidden' name='");sb.Append(encodedParamName);sb.Append("' id='");sb.Append(encodedParamName);sb.Append("' value='");sb.Append(encodedParamValue);sb.Append("' />\n")};var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&2147483648);lY8=(lY&2147483648);lX4=(lX&1073741824);lY4=(lY&1073741824);lResult=(lX&1073741823)+(lY&1073741823);if(lX4&lY4){return(lResult^2147483648^lX8^lY8)}if(lX4|lY4){if(lResult&1073741824){return(lResult^3221225472^lX8^lY8)}else{return(lResult^1073741824^lX8^lY8)}}else{return(lResult^lX8^lY8)}}function F(x,y,z){return(x&y)|((~x)&z)}function G(x,y,z){return(x&z)|(y&(~z))}function H(x,y,z){return(x^y^z)}function I(x,y,z){return(y^(x|(~z)))}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(128<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else{if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}}return utftext}var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,3614090360);d=FF(d,a,b,c,x[k+1],S12,3905402710);c=FF(c,d,a,b,x[k+2],S13,606105819);b=FF(b,c,d,a,x[k+3],S14,3250441966);a=FF(a,b,c,d,x[k+4],S11,4118548399);d=FF(d,a,b,c,x[k+5],S12,1200080426);c=FF(c,d,a,b,x[k+6],S13,2821735955);b=FF(b,c,d,a,x[k+7],S14,4249261313);a=FF(a,b,c,d,x[k+8],S11,1770035416);d=FF(d,a,b,c,x[k+9],S12,2336552879);c=FF(c,d,a,b,x[k+10],S13,4294925233);b=FF(b,c,d,a,x[k+11],S14,2304563134);a=FF(a,b,c,d,x[k+12],S11,1804603682);d=FF(d,a,b,c,x[k+13],S12,4254626195);c=FF(c,d,a,b,x[k+14],S13,2792965006);b=FF(b,c,d,a,x[k+15],S14,1236535329);a=GG(a,b,c,d,x[k+1],S21,4129170786);d=GG(d,a,b,c,x[k+6],S22,3225465664);c=GG(c,d,a,b,x[k+11],S23,643717713);b=GG(b,c,d,a,x[k+0],S24,3921069994);a=GG(a,b,c,d,x[k+5],S21,3593408605);d=GG(d,a,b,c,x[k+10],S22,38016083);c=GG(c,d,a,b,x[k+15],S23,3634488961);b=GG(b,c,d,a,x[k+4],S24,3889429448);a=GG(a,b,c,d,x[k+9],S21,568446438);d=GG(d,a,b,c,x[k+14],S22,3275163606);c=GG(c,d,a,b,x[k+3],S23,4107603335);b=GG(b,c,d,a,x[k+8],S24,1163531501);a=GG(a,b,c,d,x[k+13],S21,2850285829);d=GG(d,a,b,c,x[k+2],S22,4243563512);c=GG(c,d,a,b,x[k+7],S23,1735328473);b=GG(b,c,d,a,x[k+12],S24,2368359562);a=HH(a,b,c,d,x[k+5],S31,4294588738);d=HH(d,a,b,c,x[k+8],S32,2272392833);c=HH(c,d,a,b,x[k+11],S33,1839030562);b=HH(b,c,d,a,x[k+14],S34,4259657740);a=HH(a,b,c,d,x[k+1],S31,2763975236);d=HH(d,a,b,c,x[k+4],S32,1272893353);c=HH(c,d,a,b,x[k+7],S33,4139469664);b=HH(b,c,d,a,x[k+10],S34,3200236656);a=HH(a,b,c,d,x[k+13],S31,681279174);d=HH(d,a,b,c,x[k+0],S32,3936430074);c=HH(c,d,a,b,x[k+3],S33,3572445317);b=HH(b,c,d,a,x[k+6],S34,76029189);a=HH(a,b,c,d,x[k+9],S31,3654602809);d=HH(d,a,b,c,x[k+12],S32,3873151461);c=HH(c,d,a,b,x[k+15],S33,530742520);b=HH(b,c,d,a,x[k+2],S34,3299628645);a=II(a,b,c,d,x[k+0],S41,4096336452);d=II(d,a,b,c,x[k+7],S42,1126891415);c=II(c,d,a,b,x[k+14],S43,2878612391);b=II(b,c,d,a,x[k+5],S44,4237533241);a=II(a,b,c,d,x[k+12],S41,1700485571);d=II(d,a,b,c,x[k+3],S42,2399980690);c=II(c,d,a,b,x[k+10],S43,4293915773);b=II(b,c,d,a,x[k+1],S44,2240044497);a=II(a,b,c,d,x[k+8],S41,1873313359);d=II(d,a,b,c,x[k+15],S42,4264355552);c=II(c,d,a,b,x[k+6],S43,2734768916);b=II(b,c,d,a,x[k+13],S44,1309151649);a=II(a,b,c,d,x[k+4],S41,4149444226);d=II(d,a,b,c,x[k+11],S42,3174756917);c=II(c,d,a,b,x[k+2],S43,718787259);b=II(b,c,d,a,x[k+9],S44,3951481745);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()};var refreshPortalToFirstNode=function(){if(document.location.href.indexOf("NavigationTarget")==-1){document.location.reload()}else{var search=document.location.search;var params=search.split("&");var i=0;for(i=0;i<params.length;i++){if(params[i].indexOf("NavigationTarget")!=-1){break}}var newSearch="";var j=0;for(j=0;j<params.length;j++){if(i!=j){newSearch+=params[j];newSearch+="&"}}if(newSearch.charAt(0)!="?"&&newSearch.length>0){newSearch="?".concat(newSearch)}if(newSearch.charAt(newSearch.length-1)=="&"){newSearch=newSearch.substring(0,newSearch.length-1)}var url=document.location.protocol+"//"+document.location.host+document.location.pathname+newSearch;document.location.reload(url)}};var getBooleanValue=function(value){if(JSUtils.isEmpty(value)){return false}if(typeof value==="boolean"){return value}if(typeof value==="string"){return(value==="true")?true:false}return false};var BrowserDetection=function(){var agt=navigator.userAgent.toLowerCase();var is_ie=(agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1);var is_standards=false;if(EPCM){is_ie=(EPCM.getUAType()===EPCM.MSIE);if(is_ie){is_standards=EPCM.isStandardsMode(window);return{is_ie:true,is_gecko:false,applewebkit:false,is_safari_mac:false,is_firefox:false,is_firefox_linux:false,is_standards:is_standards}}}var applewebkit=(agt.indexOf("applewebkit")!=-1);var is_gecko=agt.indexOf("gecko")!=-1;var is_safari_mac=applewebkit&&(agt.indexOf("mac")!=-1);var is_firefox=agt.indexOf("firefox")!=-1;var is_firefox_linux=is_firefox&&(agt.indexOf("linux")!=-1);if(document.documentMode){if(document.documentMode>7){is_standards=true}else{is_standards=false}}else{if(document.compatMode){is_standards=(document.compatMode==="CSS1Compat")}is_standards=false}return{is_ie:is_ie,is_gecko:is_gecko,applewebkit:applewebkit,is_safari_mac:is_safari_mac,is_firefox:is_firefox,is_firefox_linux:is_firefox_linux,is_standards:is_standards}}();StringBuilder=function(stringToAdd){var h=new Array();if(stringToAdd){h[0]=stringToAdd}this.Append=Append;this.AppendLine=AppendLine;this.ToString=ToString;this.Clear=Clear;this.Length=Length;this.GetType=GetType;function Append(stringToAppend){h[h.length]=stringToAppend}function AppendLine(stringToAppend){h[h.length]=stringToAppend;h[h.length]="\r\n"}function ToString(){if(!h){return""}if(h.length<2){return(h[0])?h[0]:""}var a=h.join("");h=new Array();h[0]=a;return a}function Clear(){h=new Array()}function Length(){if(!h){return 0}if(h.length<2){return(h[0])?h[0].length:0}var a=h.join("");h=new Array();h[0]=a;return a.length}function GetType(){return"StringBuilder"}};return{"$":$,hasClass:hasClass,BrowserDetection:BrowserDetection,StringBuilder:StringBuilder,waitForObject:waitForObject,waitForEvent:waitForEvent,ESCAPE_TO_HTML:ESCAPE_TO_HTML,getElementFromEvent:getElementFromEvent,getQueryAndParams:getQueryAndParams,filterParams:filterParams,isEmpty:isEmpty,extractContentAreaForwardingParams:extractContentAreaForwardingParams,getBooleanValue:getBooleanValue,compareNodeID:compareNodeID,findItemInArray:findItemInArray,findAbsolutePosition:findAbsolutePosition,messageFormat:messageFormat,getAbsoluteVisiblePosition:getAbsoluteVisiblePosition,getAbsolutePosition:getAbsolutePosition,mouseCoords:mouseCoords,setElementText:setElementText,clearAllEventsFromElement:clearAllEventsFromElement,trimString:trimString,zeroPadding:zeroPadding,addFormParams:addFormParams,MD5:MD5,eliminateDuplicates:eliminateDuplicates,refreshPortalToFirstNode:refreshPortalToFirstNode}}();ParamMap=function(){var a=new Array();var q=0;var e=function(y,v){if(!JSUtils.isEmpty(y)){if(y.indexOf("?")==0){y=y.substr(1)}var B=y.split("&");if(B!=null){for(var x=0;x<B.length;x++){var u=B[x].indexOf("=");var A=B[x].length;var w=B[x].substr(0,u);var z=B[x].substr(u+1,A);if(v){l(decodeURIComponent(w),decodeURIComponent(z),null,v)}else{l(decodeURIComponent(w),decodeURIComponent(z))}}}}};var l=function(v,x,y,u){if(!JSUtils.isEmpty(v)){if(JSUtils.isEmpty(x)){x=""}if(f(v)){p(v).putValue(x)}else{var w=new d();if(y){w.setUnique(y)}w.putValue(x);if(u){w.setReadonly(u)}q++;a[v]=w}}};var f=function(u){return(typeof(a[u])!="undefined")};var s=function(u){var v=a[u];if(v!=null){return v.getValue()}else{return null}};var p=function(u){return a[u]};var t=function(u){if(f(u)){q--;delete a[u]}};var m=function(){return a};var b=function(){return q};var o=function(){return(b()==0)};var r=function(){var u=new ParamMap();for(k in a){if(a.hasOwnProperty(k)){i(k,this,u)}}return u};var i=function(A,x,z){var w=x._private.getEntry(A);var u=w.isUnique();var B=w.isReadonly();var v=w.getValue();if(typeof(v)=="string"){z.put(A,v,u)}else{var y;for(y=0;y<v.length;y++){z.put(A,v[y],u)}}if(B){z._private.getEntry(A).setReadonly(B)}};var c=function(u,v){var x=[];if(!u){u="="}if(!v){v="&"}for(currKey in a){if(a.hasOwnProperty(currKey)){var w=s(currKey);if(typeof(w)=="string"){x.push(encodeURIComponent(currKey),u,encodeURIComponent(w),v)}else{for(j=0;j<w.length;j++){x.push(encodeURIComponent(currKey),u,encodeURIComponent(w[j]),v)}}}}x=x.join("");return x.substr(0,x.length-v.length)};var g=function(u){var v=u;if(v.indexOf("?")>-1){v+="&"+this.toParamString()}else{v+="?"+this.toParamString()}return v};var h=function(u){var v=this.clone();otherMap=u.getMap();for(k in otherMap){if(otherMap.hasOwnProperty(k)){i(k,u,v)}}return v};var n=function(u){if(this.getSize()!=u.getSize()){return false}for(var w in a){if(a.hasOwnProperty(w)){if(!u.containsKey(w)){return false}}}var v=u.getMap();for(var w in v){if(v.hasOwnProperty(w)){if(!f(w)){return false}}}return true};var d=function(){var B=false;var y=false;var z=null;var w=function(){return z};var x=function(D){if(!y){if(B){z=D}else{if(z!=null){z[z.length]=D}else{z=new Array();z[0]=D}}}};var u=function(D){B=D};var C=function(){return B};var A=function(D){y=D};var v=function(){return y};return{getValue:w,putValue:x,setUnique:u,isUnique:C,setReadonly:A,isReadonly:v}};return{putQueryString:e,get:s,put:l,containsKey:f,remove:t,getMap:m,getSize:b,isEmpty:o,clone:r,toParamString:c,toURLQueryString:g,merge:h,equals:n,_private:{getEntry:p}}};String.prototype.parseJSON=function(){try{return eval("("+this+")")}catch(e){return false}};afpLogger=function(){var e=function(){};var f=function(){};var c=function(){};var b=function(){};var a=function(){};var d=function(){alert("no logs - not in afpDebugMode!")};return{path:e,enter:f,logException:a,getMessages:b,clearMessages:c,printLog:d}}();