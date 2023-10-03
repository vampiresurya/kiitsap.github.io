function JS_XML_Node() {};function JS_XML_Document() {this.nodeType=9;this.async=false;this.ownerDocument=null;this.documentElement=null;this.parentNode=null;this.nextSibling=null;this.previousSibling=null;this.childNodes=new Array();this.attributes=new Array();this.xml=null;this.toXML=function(recursive) {if(recursive==null) {recursive=true;};var xml="";if(this.documentElement!=null) {xml=this.documentElement.toXML(recursive);};this.xml=xml;return xml;};};JS_XML_Document.prototype=new JS_XML_Node();JS_XML_Document.prototype.createAttribute=function(name) {if(name==null) {return;};var attribute=new JS_XML_Attr();attribute.name=name;attribute.nodeName=name;attribute.value="";attribute.nodeValue="";return attribute;};JS_XML_Document.prototype.createElement=function(tagName) {if(tagName==null) {return;};var element=new JS_XML_Element();element.tagName=tagName;element.ownerDocument=this;return element;};JS_XML_Document.prototype.loadXML=function(xmlString) {var parser=new JS_XML_Parser(this, xmlString);if(xmlString==null || xmlString=="") {return;};if(useTry=false) {try {parser.parseDocument();} catch(e) {alert("JS_XML_Document::loadXML() Exception\n\n" +(e.reason==null? "No further information" :"errorCode=" + e.errorCode + "\nfilePos="   + e.filePos   + "\nlinePos="   + e.linePos   + "\nsrcText="   + e.srcText   + "\nreason="    + e.reason    + "\nline="      + e.line      + "\nurl="       + e.url));};} else {parser.parseDocument();};};function JS_XML_Attr() {this.nodeType=2;this.parentNode=null;this.nextSibling=null;this.previousSibling=null;};JS_XML_Attr.prototype=new JS_XML_Node();function JS_XML_ProcessingInstruction() {this.nodeType=7;};JS_XML_ProcessingInstruction.prototype=new JS_XML_Node();function JS_XML_Comment() {this.nodeType=8;};JS_XML_Comment.prototype=new JS_XML_Node();function JS_XML_Text() {this.nodeType=3;};JS_XML_Text.prototype=new JS_XML_Node();function JS_XML_CDATASection() {this.nodeType=4;};JS_XML_CDATASection.prototype=new JS_XML_Text();function JS_XML_Element() {this.nodeType=1;this.attributes=new Array();this.childNodes=new Array();this.nodeValue=null;this.ownerDocument=null;this.hasChildNodes=function() {return this.childNodes.length>0;};this.toXML=function(recursive) {if(recursive==null) {recursive=true;};return internalToXML(this,recursive);};var internalToXML=function(node, recursive) {var startTag="<" + node.tagName;for(var i in node.attributes) {startTag += " " + node.attributes[i].name + "=\"" + generalEscape(node.attributes[i].value) + "\"";};var content="";if(node.text!=null) {content += generalEscape(node.text);};if(recursive && node.hasChildNodes()) {for(var j in node.childNodes) {content += internalToXML(node.childNodes[j],recursive);};};if(content!="") {return startTag + ">" + content + "</" + node.tagName + ">";} else {return startTag + "/>";};};};JS_XML_Element.prototype=new JS_XML_Node();JS_XML_Element.prototype.appendChild=function(child) {if(child!=null) {this.childNodes[this.childNodes.length]=child;};};JS_XML_Element.prototype.removeChild=function(child) {if(child!=null) {for(var i=0; i<this.childNodes.length; i++) {if(this.childNodes[i]==child) {for(var j=i; j<this.childNodes.length-1; j++) {this.childNodes[j]=this.childNodes[j+1];};this.childNodes[this.childNodes.length-1]=null;this.childNodes.length--;break;};};};};JS_XML_Element.prototype.setAttribute=function(name, value) {if(name==null) {return;};var attribute=this.ownerDocument.createAttribute(name);attribute.value=value;attribute.nodeValue=value;this.setAttributeNode(attribute);};JS_XML_Element.prototype.setAttributeNode=function(attr) {if(attr==null) {return;};this.attributes[this.attributes.length]=attr;};JS_XML_Element.prototype.getAttribute=function(name) {var attribute=this.getAttributeNode(name);return attribute==null? null : attribute.value;};JS_XML_Element.prototype.getAttributeNode=function(name) {for(var i=0; i<this.attributes.length; i++) {if(this.attributes[i].name==name) {return this.attributes[i];};};return null;};JS_XML_Element.prototype.getElementsByTagName=function(name) {if(typeof(name)=="undefined" || name==null) {name="";};if(name=="*") {return this.childNodes;} else {var children=new Array();for(var i=0; i<this.childNodes.length; i++) {if(this.childNodes[i].tagName==name) {children[children.length]=this.childNodes[i];};};return children;};};function JS_XML_Parser(callingDocument, originalXML) {this.parseDocument=function() {if(originalXML.charAt(this.currentXMLPosition)=="<" &&(originalXML.charAt(this.currentXMLPosition+1)=="?" ||originalXML.charAt(this.currentXMLPosition+1)=="!")) {if(this.parse(this.toRegularExpression("$VB"),41)) {};};callingDocument.documentElement=this.parseElement(callingDocument);callingDocument.parsed=true;callingDocument.xml=originalXML;};this.parseElement=function(parentElement) {var element=new JS_XML_Element();element.parentNode=parentElement;element.ownerDocument=callingDocument;if(this.parse(this.toRegularExpression("<($AC)"),20)) {element.tagName=RegExp.$1;element.nodeName=element.tagName;} else {this.reportError("Invalid element start tag","","","","","","");};var attribute=null;while(this.parse(this.toRegularExpression("$XB*$PB"),400)) {attribute=new JS_XML_Attr();attribute.parentNode=element;attribute.name=generalUnescape(RegExp.$1);attribute.nodeName=attribute.name;attribute.value=generalUnescape(RegExp.$3==""? generalUnescape(RegExp.$2) : generalUnescape(RegExp.$3));attribute.nodeValue=attribute.value;element.attributes[element.attributes.length]=attribute;};this.parse(this.INTERNAL_OPTIONAL_SPACES,5);if(this.parseConstant("/")) {if(!this.parseConstant(">")) {this.reportError("Invalid end of empty element tag, expected \">\"","","","","","","");};} else {if(!this.parseConstant(">")) {this.reportError("Invalid end of element \"" + element.tagName + "\" start-tag, expected \">\"","","","","","","");};if(this.parse(this.toRegularExpression("($AB)"),80)) {element.text=generalUnescape(RegExp.$1);};var tempXMLPosition=0;while(!(originalXML.charAt(this.currentXMLPosition  )=="<" &&originalXML.charAt(this.currentXMLPosition+1)=="/")) {try {tempXMLPosition=this.currentXMLPosition;element.childNodes[element.childNodes.length]=this.parseElement(element);} catch(e) {this.currentXMLPosition=tempXMLPosition;break;};this.parse(this.toRegularExpression("$AB"),80);};if(!this.parse(this.toRegularExpression("$W"),15)) {this.reportError("Invalid end tag","","","","","","");};if(element.tagName!=RegExp.$1) {this.reportError("Invalid end tag name, started as \"" + element.tagName + "\", ended as \"" + RegExp.$1 + "\"","","","","","","");};};if(element.childNodes.length>=1) {element.firstChild=element.childNodes[0];element.firstChild.nextSibling=element.childNodes.length>=2? element.childNodes[1] : null;element.firstChild.previousSibling=null;element.lastChild=element.childNodes[element.childNodes.length-1];element.lastChild.nextSibling=null;element.lastChild.previousSibling=element.childNodes.length>=2? element.childNodes[element.childNodes.length-2] : null;if(element.childNodes.length>=3) {for(var i=1; i<=element.childNodes.length-2; i++) {element.childNodes[i].nextSibling=element.childNodes[i+1];element.childNodes[i].previousSibling=element.childNodes[i-1];};};};return element;};this.parse=function(regularExpression, approximateLengthOfMatch, strictStringForm) {if(approximateLengthOfMatch==null || approximateLengthOfMatch<=0) {this.matches=originalXML.substring(this.currentXMLPosition).match(regularExpression);if(this.matches==null) {return false;} else {this.currentXMLPosition += this.matches[0].length;return true;};} else {if(this.currentXMLPosition + approximateLengthOfMatch > this.originalXMLLength) {approximateLengthOfMatch=this.originalXMLLength - this.currentXMLPosition;};this.matches=originalXML.substr(this.currentXMLPosition,approximateLengthOfMatch).match(regularExpression);if(this.matches==null) {return this.parse(regularExpression,-1);} else {if((this.matches[0].length < approximateLengthOfMatch) ||(approximateLengthOfMatch + this.currentXMLPosition == this.originalXMLLength)) {this.currentXMLPosition += this.matches[0].length;return true;} else {return this.parse(regularExpression,approximateLengthOfMatch<<1);};};};};this.parseConstant=function(stringForm) {if(originalXML.indexOf(stringForm,this.currentXMLPosition)==this.currentXMLPosition) {this.currentXMLPosition += stringForm.length;return true;} else {return false;};};this.toRegularExpression=function(stringForm) {if(JS_XML_Parser[stringForm]!=null) {return JS_XML_Parser[stringForm];};var tempForm=stringForm;while(this.INTERNAL_REGULAR_EXPRESSION_FORMAT.test(tempForm)) {tempForm=tempForm.replace(RegExp.$1,JS_XML_Parser[RegExp.$2]);};JS_XML_Parser[stringForm]=new RegExp("^" + tempForm);return JS_XML_Parser[stringForm];};this.reportError=function(reason,errorCode,filePos,line,linePos,srcText,url) {var parseError=new Object();parseError.errorCode=errorCode;parseError.filePos=filePos;parseError.linePos=linePos;parseError.srcText=srcText;parseError.reason=reason;parseError.line=line;parseError.url=url;throw parseError;};this.matches=null;this.originalXMLLength=originalXML.length;this.currentXMLPosition=0;this.INTERNAL_REGULAR_EXPRESSION_FORMAT=/(\$([A-Z][A-Z_]*))/;this.INTERNAL_OPTIONAL_SPACES=/^(?:\u0020|\u0009|\u000D|\u000A)*/;};function generalEscape(str) {if(typeof(str)=="string") {str=str.replace(/"/g,"&quot;");str=str.replace(/&(?!amp;)/g,"&amp;" );str=str.replace(/'/g,"&apos;");str=str.replace(/</g,"&lt;"  );str=str.replace(/>/g,"&gt;"  );};return str;};function generalUnescape(str) {if(typeof(str)=="string") {var index;var endIndex;var charCode;while((index=str.indexOf("&#"))!=-1 &&(endIndex=str.indexOf(";",index+2))!=-1) {charCode=str.substring(index+2,endIndex);str=str.replace(new RegExp("&#" + charCode + ";","g"), String.fromCharCode(charCode));};str=str.replace(/&quot;/g,"\"");str=str.replace(/&amp;/g ,"&" );str=str.replace(/&apos;/g,"'" );str=str.replace(/&lt;/g  ,"<" );str=str.replace(/&gt;/g  ,">" );};return str;};JS_XML_Parser.Z="[\\u0041-\\u005A]|[\\u0061-\\u007A]|[\\u00C0-\\u00D6]|[\\u00D8-\\u00F6]|[\\u00F8-\\u00FF]|[\\u0100-\\u0131]|[\\u0134-\\u013E]|[\\u0141-\\u0148]|[\\u014A-\\u017E]|[\\u0180-\\u01C3]|[\\u01CD-\\u01F0]|[\\u01F4-\\u01F5]|[\\u01FA-\\u0217]|[\\u0250-\\u02A8]|[\\u02BB-\\u02C1]|[\\u0388-\\u038A]|[\\u038E-\\u03A1]|[\\u03A3-\\u03CE]|[\\u03D0-\\u03D6]|[\\u03E2-\\u03F3]|[\\u0401-\\u040C]|[\\u040E-\\u044F]|[\\u0451-\\u045C]|[\\u045E-\\u0481]|[\\u0490-\\u04C4]|[\\u04C7-\\u04C8]|[\\u04CB-\\u04CC]|[\\u04D0-\\u04EB]|[\\u04EE-\\u04F5]|[\\u04F8-\\u04F9]|[\\u0531-\\u0556]|[\\u0561-\\u0586]|[\\u05D0-\\u05EA]|[\\u05F0-\\u05F2]|[\\u0621-\\u063A]|[\\u0641-\\u064A]|[\\u0671-\\u06B7]|[\\u06BA-\\u06BE]|[\\u06C0-\\u06CE]|[\\u06D0-\\u06D3]|[\\u06E5-\\u06E6]|[\\u0905-\\u0939]|[\\u0958-\\u0961]|[\\u0985-\\u098C]|[\\u098F-\\u0990]|[\\u0993-\\u09A8]|[\\u09AA-\\u09B0]|[\\u09B6-\\u09B9]|[\\u09DC-\\u09DD]|[\\u09DF-\\u09E1]|[\\u09F0-\\u09F1]|[\\u0A05-\\u0A0A]|[\\u0A0F-\\u0A10]|[\\u0A13-\\u0A28]|[\\u0A2A-\\u0A30]|[\\u0A32-\\u0A33]|[\\u0A35-\\u0A36]|[\\u0A38-\\u0A39]|[\\u0A59-\\u0A5C]|[\\u0A72-\\u0A74]|[\\u0A85-\\u0A8B]|[\\u0A8F-\\u0A91]|[\\u0A93-\\u0AA8]|[\\u0AAA-\\u0AB0]|[\\u0AB2-\\u0AB3]|[\\u0AB5-\\u0AB9]|[\\u0B05-\\u0B0C]|[\\u0B0F-\\u0B10]|[\\u0B13-\\u0B28]|[\\u0B2A-\\u0B30]|[\\u0B32-\\u0B33]|[\\u0B36-\\u0B39]|[\\u0B5C-\\u0B5D]|[\\u0B5F-\\u0B61]|[\\u0B85-\\u0B8A]|[\\u0B8E-\\u0B90]|[\\u0B92-\\u0B95]|[\\u0B99-\\u0B9A]|[\\u0B9E-\\u0B9F]|[\\u0BA3-\\u0BA4]|[\\u0BA8-\\u0BAA]|[\\u0BAE-\\u0BB5]|[\\u0BB7-\\u0BB9]|[\\u0C05-\\u0C0C]|[\\u0C0E-\\u0C10]|[\\u0C12-\\u0C28]|[\\u0C2A-\\u0C33]|[\\u0C35-\\u0C39]|[\\u0C60-\\u0C61]|[\\u0C85-\\u0C8C]|[\\u0C8E-\\u0C90]|[\\u0C92-\\u0CA8]|[\\u0CAA-\\u0CB3]|[\\u0CB5-\\u0CB9]|[\\u0CE0-\\u0CE1]|[\\u0D05-\\u0D0C]|[\\u0D0E-\\u0D10]|[\\u0D12-\\u0D28]|[\\u0D2A-\\u0D39]|[\\u0D60-\\u0D61]|[\\u0E01-\\u0E2E]|[\\u0E32-\\u0E33]|[\\u0E40-\\u0E45]|[\\u0E81-\\u0E82]|[\\u0E87-\\u0E88]|[\\u0E94-\\u0E97]|[\\u0E99-\\u0E9F]|[\\u0EA1-\\u0EA3]|[\\u0EAA-\\u0EAB]|[\\u0EAD-\\u0EAE]|[\\u0EB2-\\u0EB3]|[\\u0EC0-\\u0EC4]|[\\u0F40-\\u0F47]|[\\u0F49-\\u0F69]|[\\u10A0-\\u10C5]|[\\u10D0-\\u10F6]|[\\u1102-\\u1103]|[\\u1105-\\u1107]|[\\u110B-\\u110C]|[\\u110E-\\u1112]|[\\u1154-\\u1155]|[\\u115F-\\u1161]|[\\u116D-\\u116E]|[\\u1172-\\u1173]|[\\u11AE-\\u11AF]|[\\u11B7-\\u11B8]|[\\u11BC-\\u11C2]|[\\u1E00-\\u1E9B]|[\\u1EA0-\\u1EF9]|[\\u1F00-\\u1F15]|[\\u1F18-\\u1F1D]|[\\u1F20-\\u1F45]|[\\u1F48-\\u1F4D]|[\\u1F50-\\u1F57]|[\\u1F5F-\\u1F7D]|[\\u1F80-\\u1FB4]|[\\u1FB6-\\u1FBC]|[\\u1FC2-\\u1FC4]|[\\u1FC6-\\u1FCC]|[\\u1FD0-\\u1FD3]|[\\u1FD6-\\u1FDB]|[\\u1FE0-\\u1FEC]|[\\u1FF2-\\u1FF4]|[\\u1FF6-\\u1FFC]|[\\u212A-\\u212B]|[\\u2180-\\u2182]|[\\u3041-\\u3094]|[\\u30A1-\\u30FA]|[\\u3105-\\u312C]|[\\uAC00-\\uD7A3]|\\u0386|\\u038C|\\u03DA|\\u03DC|\\u03DE|\\u03E0|\\u0559|\\u06D5|\\u093D|\\u09B2|\\u0A5E|\\u0A8D|\\u0ABD|\\u0AE0|\\u0B3D|\\u0B9C|\\u0CDE|\\u0E30|\\u0E84|"+"\\u0E8A|\\u0E8D|\\u0EA5|\\u0EA7|\\u0EB0|\\u0EBD|\\u1100|\\u1109|\\u113C|\\u113E|\\u1140|\\u114C|\\u114E|\\u1150|\\u1159|\\u1163|\\u1165|\\u1167|\\u1169|"+"\\u1175|\\u119E|\\u11A8|\\u11AB|\\u11BA|\\u11EB|\\u11F0|\\u11F9|\\u1F59|\\u1F5B|\\u1F5D|\\u1FBE|\\u2126|\\u212E";JS_XML_Parser.OB="[\\u0020-\\uD7FF]|[\\uE000-\\uFFFD]|[\\u10000-\\u10FFFF]|\\u0009|\\u000A|\\u000D";JS_XML_Parser.L="&#[0-9]+;|&#x[0-9a-fA-F]+;";JS_XML_Parser.M="[\\u0300-\\u0345]|[\\u0360-\\u0361]|[\\u0483-\\u0486]|[\\u0591-\\u05A1]|[\\u05A3-\\u05B9]|[\\u05BB-\\u05BD]|[\\u05C1-\\u05C2]|[\\u064B-\\u0652]|[\\u06D6-\\u06DC]|[\\u06DD-\\u06DF]|[\\u06E0-\\u06E4]|[\\u06E7-\\u06E8]|[\\u06EA-\\u06ED]|[\\u0901-\\u0903]|[\\u093E-\\u094C]|[\\u0951-\\u0954]|[\\u0962-\\u0963]|[\\u0981-\\u0983]|[\\u09C0-\\u09C4]|[\\u09C7-\\u09C8]|[\\u09CB-\\u09CD]|[\\u09E2-\\u09E3]|[\\u0A40-\\u0A42]|[\\u0A47-\\u0A48]|[\\u0A4B-\\u0A4D]|[\\u0A70-\\u0A71]|[\\u0A81-\\u0A83]|[\\u0ABE-\\u0AC5]|[\\u0AC7-\\u0AC9]|[\\u0ACB-\\u0ACD]|[\\u0B01-\\u0B03]|[\\u0B3E-\\u0B43]|[\\u0B47-\\u0B48]|[\\u0B4B-\\u0B4D]|[\\u0B56-\\u0B57]|[\\u0B82-\\u0B83]|[\\u0BBE-\\u0BC2]|[\\u0BC6-\\u0BC8]|[\\u0BCA-\\u0BCD]|[\\u0C01-\\u0C03]|[\\u0C3E-\\u0C44]|[\\u0C46-\\u0C48]|[\\u0C4A-\\u0C4D]|[\\u0C55-\\u0C56]|[\\u0C82-\\u0C83]|[\\u0CBE-\\u0CC4]|[\\u0CC6-\\u0CC8]|[\\u0CCA-\\u0CCD]|[\\u0CD5-\\u0CD6]|[\\u0D02-\\u0D03]|[\\u0D3E-\\u0D43]|[\\u0D46-\\u0D48]|[\\u0D4A-\\u0D4D]|[\\u0E34-\\u0E3A]|[\\u0E47-\\u0E4E]|[\\u0EB4-\\u0EB9]|[\\u0EBB-\\u0EBC]|[\\u0EC8-\\u0ECD]|[\\u0F18-\\u0F19]|[\\u0F71-\\u0F84]|[\\u0F86-\\u0F8B]|[\\u0F90-\\u0F95]|[\\u0F99-\\u0FAD]|[\\u0FB1-\\u0FB7]|[\\u20D0-\\u20DC]|[\\u302A-\\u302F]|\\u309A|\\u05C4|\\u0670|\\u093C|\\u20E1|\\u0FB9|\\u3099|\\u094D|\\u09BC|\\u09BE|\\u09BF|\\u09D7|\\u0F3F|\\u0F39|\\u0F3E|\\u0F35|\\u0A02|\\u0A3C|\\u0A3E|\\u0F97|\\u0A3F|\\u0ABC|\\u0B3C|\\u0BD7|\\u05BF|\\u0D57|\\u0E31|\\u0EB1|\\u0F37";JS_XML_Parser.WB="[\\u0030-\\u0039]|[\\u0660-\\u0669]|[\\u06F0-\\u06F9]|[\\u0966-\\u096F]|[\\u09E6-\\u09EF]|[\\u0A66-\\u0A6F]|[\\u0AE6-\\u0AEF]|[\\u0B66-\\u0B6F]|[\\u0BE7-\\u0BEF]|[\\u0C66-\\u0C6F]|[\\u0CE6-\\u0CEF]|[\\u0D66-\\u0D6F]|[\\u0E50-\\u0E59]|[\\u0ED0-\\u0ED9]|[\\u0F20-\\u0F29]";JS_XML_Parser.EB="\"(?:\\u0020|\\u000D|\\u000A|[a-zA-Z0-9]|[-'\\(\\)\\+,\\./:=\\?;!\\*#@\\$_%])*\"|'(?:\\u0020|\\u000D|\\u000A|[a-zA-Z0-9]|[-\\(\\)\\+,\\./:=\\?;!\\*#@\\$_%])*'";JS_XML_Parser.J="$XB+encoding(?:$XB*=$XB*)(?:\"[A-Za-z][A-Za-z0-9._-]*\"|'[A-Za-z][A-Za-z0-9._-]*')";JS_XML_Parser.AB="[^<]*";JS_XML_Parser.XB="(?:\\u0020|\\u0009|\\u000D|\\u000A)";JS_XML_Parser.PB="($AC)(?:$XB*=$XB*)(?:\"((?:[^<&\"]|$U|$L)*)\"|'((?:[^<&']|$U|$L)*)')";JS_XML_Parser.K="$XB+($AC)$XB+$BB$XB+$N";JS_XML_Parser.BB="CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS|$GB|$IB";JS_XML_Parser.LB="($OB)*";JS_XML_Parser.FB="<!\\[CDATA\\[$LB\\]\\]>";JS_XML_Parser.RB="((\\($XB*$T($XB*\\|$XB*$T)+$XB*\\))|$SB)(\\?|\\*|\\+)?";JS_XML_Parser.TB="<!--($OB)*-->";JS_XML_Parser.T="(($AC)|(\\($XB*($XB*\\|$XB*)+$XB*\\))|$SB)(\\?|\\*|\\+)?";JS_XML_Parser.I="%($AC);|$XB+";JS_XML_Parser.N="#REQUIRED|#IMPLIED|((#FIXED$XB+)?\"([^<&\"]|$U|$L)*\"|'([^<&']|$U|$L)*')";JS_XML_Parser.E="<!DOCTYPE$XB+($AC)(?:$XB+$JB)?$XB*(?:\\[$MB\\]$XB*)?>";JS_XML_Parser.W="</($AC)$XB*>";JS_XML_Parser.O="<!ELEMENT$XB+($AC)$XB+EMPTY|ANY|$YB|$RB$XB*>";JS_XML_Parser.P="$CB|$B";JS_XML_Parser.S="$HB|$JB$R?";JS_XML_Parser.U="&(?:$AC);";JS_XML_Parser.HB="\"([^%&\"]|%($AC);|$U|$L)*\"|'([^%&']|%($AC);|$U|$L)*'";JS_XML_Parser.IB="\\($XB*$NB($XB*|$XB*$NB)*$XB*\\)";JS_XML_Parser.JB="SYSTEM$XB+(\"[^\"]*\"|'[^']*')|PUBLIC$XB+$EB$XB+(\"[^\"]*\"|'[^']*')";JS_XML_Parser.X="$V?$C";JS_XML_Parser.C="$Q|$Y|$DB|($I*)";JS_XML_Parser.CB="<!ENTITY$XB+($AC)$XB+$S$XB*>";JS_XML_Parser.UB="$OB*";JS_XML_Parser.DB="<!\\[$XB*IGNORE$XB*\\[$G*\\]\\]>";JS_XML_Parser.G="$UB((<!\\[$G\\]\\]>$UB)*)";JS_XML_Parser.Y="<!\\[$XB*INCLUDE$XB*\\[$C\\]\\]>";JS_XML_Parser.MB="($Q|$I)*";JS_XML_Parser.Q="(?:(?:<!ELEMENT$XB+($AC)$XB+contentspec$XB*>)|(?:<!ATTLIST$XB+($AC)$K*$XB*>)|$P|(?:<!NOTATION$XB+($AC)$XB+($JB|$QB)$XB*>)|$H|$TB)";JS_XML_Parser.YB="\\($XB*#PCDATA($AC))*$XB*\\)\\*|\\($XB*#PCDATA$XB*\\)";JS_XML_Parser.R="$XB+(NDATA)$XB+($AC)";JS_XML_Parser.AC="(?:$Z|[\\u4E00-\\u9FA5]|[\\u3021-\\u3029]|\\u3007|_|:)(?:$Z|[\\u4E00-\\u9FA5]|[\\u3021-\\u3029]|\\u3007|$WB|\\.|-|_|:|$M|[\\u3031-\\u3035]|[\\u309D-\\u309E]|[\\u30FC-\\u30FE]|\\u00B7|\\u02D0|\\u02D1|\\u0387|\\u0640|\\u0E46|\\u0EC6|\\u3005)*";JS_XML_Parser.ZB="(?:$AC)(?:\\u0020$AC)*";JS_XML_Parser.NB="($Z|[\\u4E00-\\u9FA5]|[\\u3021-\\u3029]|\\u3007|$WB|\\.|-|_|:|$M|[\\u3031-\\u3035]|[\\u309D-\\u309E]|[\\u30FC-\\u30FE]|\\u00B7|\\u02D0|\\u02D1|\\u0387|\\u0640|\\u0E46|\\u0EC6|\\u3005)+";JS_XML_Parser.KB="$NB(?:\\u0020$NB)*";JS_XML_Parser.GB="NOTATION$XB+\\($XB*(?:$AC)($XB*|$XB*(?:$AC))*$XB*\\)";JS_XML_Parser.B="<!ENTITY$XB+%$XB+(?:$AC)$XB+$D$XB*>";JS_XML_Parser.D="$HB|$JB";JS_XML_Parser.H="<\\?$A($XB+($OB*))?\\?>";JS_XML_Parser.A="(?:$AC)";JS_XML_Parser.VB="(?:<\\?xml$XB+version$XB*=$XB*(?:'1\\.0'|\"1\\.0\")(?:$J)?(?:$F)?$XB*\\?>)?(?:$TB|$H|$XB+)*(?:$E(?:$TB|$H|$XB+)*)?";JS_XML_Parser.QB="PUBLIC$XB+$EB";JS_XML_Parser.SB="\\($XB*,$XB*\\)";JS_XML_Parser.F="$XB+standalone$XB*=$XB*('(yes|no)'|\"(yes|no)\")";JS_XML_Parser.V="<\\?xml($XB+version$XB*=$XB*('1\\.0'|\"1\\.0\"))?$J$XB*\\?>";