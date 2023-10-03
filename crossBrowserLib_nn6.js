var SAPCB_NavigatorVersion = "NN6";
function SAPCB_Node_setInnerText( node, text )
{
	node.firstChild.data = text;
}
function SAPCB_Node_getChild(node, index) {
   if(node!=null) {
      var child = node.childNodes.item( index );
      return child; 
   } else {
      return null;
   }
}
function SAPCB_getElementById( id )
{
	return document.getElementById( id );
}
function SAPCB_Document_getElementById( document, id )
{
	return document.getElementById( id );
}
function SAPCB_HTMLDocument_getElementById( document, id )
{
	return document.getElementById( id );
}
function SAPCB_HTMLElement_hide( element )
{
	element.style.display = "none";
}
function SAPCB_HTMLElement_show( element )
{
	element.style.display = "block";
}
function SAPCB_Node_getChildNodes( node )
{
	return node.childNodes;
}
function SAPCB_Node_getParentNode( node )
{
	return node.parentNode;
}
function SAPCB_Node_insertAfter( newChild, refChild )
{
	var nextSibling = refChild.nextSibling;
	if( nextSibling == null ) refChild.parentNode.appendChild( newChild );
	else refChild.parentNode.insertBefore( newChild, nextSibling );
}
////////////////////////////////////////////////////////////////
//document object model extensions
HTMLElement.prototype.__defineSetter__("innerHTML", function(str) {
	var r = this.ownerDocument.createRange();
	r.selectNodeContents(this);
	r.deleteContents();
	var df = r.createContextualFragment(str);
	this.appendChild(df);
	return str;
});

HTMLElement.prototype.__defineGetter__("innerHTML", function() {
	return getInnerHTML(this);
});
	
  
HTMLElement.prototype.__defineSetter__("outerHTML", function(html) {
	var range = document.createRange();
	this.innerHTML = html;
	range.selectNodeContents(this);
	var frag = range.extractContents();
	this.parentNode.insertBefore(frag, this);
	this.parentNode.removeChild(this);
});

HTMLElement.prototype.__defineGetter__("outerHTML", function() {
	return getOuterHTML(this)
});

function getInnerHTML(node) {
	var str = "";
	var nodeChildNodes = node.childNodes;
	var nodeChildNodesLength = nodeChildNodes.length;
	for (var i=0; i < nodeChildNodesLength; i++)
		str += getOuterHTML(nodeChildNodes.item(i));
	return str;
}

function getOuterHTML(node) {
	var str = "";
	
	switch (node.nodeType) {
		case 1: // ELEMENT_NODE
			str += "<" + node.nodeName;
			var nodeAttributes = node.attributes;
			var nodeAttributesLength = nodeAttributes.length;
			for (var i=0; i< nodeAttributesLength; i++) {
				if (nodeAttributes.item(i).nodeValue != null) {
					str += " "
					str += nodeAttributes.item(i).nodeName;
					str += "=\"";
					str += nodeAttributes.item(i).nodeValue;
					str += "\"";
				}
			}

			if (node.childNodes.length == 0 && leafElems[node.nodeName])
				str += ">";
			else {
				str += ">";
				str += getInnerHTML(node);
				str += "</" + node.nodeName + ">"
			}
			break;
				
		case 3:	//TEXT_NODE
			str += node.nodeValue;
			break;
			
		case 4: // CDATA_SECTION_NODE
			str += "<![CDATA[" + node.nodeValue + "]]>";
			break;
					
		case 5: // ENTITY_REFERENCE_NODE
			str += "&" + node.nodeName + ";"
			break;

		case 8: // COMMENT_NODE
			str += "<!--" + node.nodeValue + "-->"
			break;
	}

	return str;
}

var _leafElems = ["IMG", "HR", "BR", "INPUT"];
var leafElems = {};
var _leafElemsLength = _leafElems.length;
for (var i=0; i<_leafElemsLength; i++)
	leafElems[_leafElems[i]] = true;
////////////////////////////////////////////////////////////////
//webframework functions (to be removed later on)
function SAP_getObject( id )
{
	return SAPCB_getElementById( id );
}
function SAP_registerObject( id )
{
	return SAPCB_getElementById( id );
}
function SAPCB_Node_getParentNode( node, index )
{
	return node.parentNode;
}
function SAPCB_HTMLDocument_getElementsByTagName( document, tagName )
{
	return document.getElementsByTagName( tagName );
}
function SAPCB_Document_getElementsByTagName( document, tagName )
{
	return document.getElementsByTagName( tagName );
}
function SAPCB_Node_getElementById( node, id )
{
	if( node == null ) return null;
	if( node.id == id ) return node;
	var nodeChildnodes = node.childNodes;
	if( nodeChildnodes == null ) return null;
	var i;
	var nodeChildnodesLength = nodeChildnodes.length;
	for(i=0; i < nodeChildnodesLength; i++)
	{
		var childNode = nodeChildnodes[i];
		var resultNode = SAPCB_Node_getElementById( childNode, id );
		if( resultNode != null ) return resultNode;
	}
}
function SAPCB_Node_getAttribute( node, attName )
{
	return node.getAttribute( attName );
}
function SAPCB_Node_setAttribute( node, attName, attValue )
{
	return node.setAttribute( attName, attValue );
}
function SAPCB_Node_getElementsByIdHelper( node, id, array )
{
	if( node == null ) return;
	if( node.id == id ) { array[ array.length ] = node; return; }
	var nodeChildNodes = node.childNodes;
	if( nodeChildNodes == null ) return;
	var i;
	var nodeChildNodesLength = nodeChildNodes.length;
	for(i=0; i < nodeChildNodesLength; i++)
	{
		var childNode = nodeChildNodes[i];
		SAPCB_Node_getElementsByIdHelper( childNode, id, array );
	}
}
function SAPCB_Node_getElementsById( node, id )
{
	var result = new Array();
	SAPCB_Node_getElementsByIdHelper( node, id, result );
	return result;
}
function SAPCB_Node_setClassAttribute(node, attValue )
{
  	node.setAttribute( "class", attValue);
}
function SAPCB_Node_toggleDisplay( obj )
{
	var display = obj.style.display;
	if( ( display == "block" ) || ( display == "" ) ) obj.style.display = "none"; 
	else obj.style.display = "block";
}
function SAPCB_Node_remove( node )
{
	var parentNode = node.parentNode;
	if( parentNode != null ) node.parentNode.removeChild( node );
}
function SAPCB_Form_appendHiddenInputfield( form, name, value )
{
	var inputField = document.createElement("INPUT"); 
	form.appendChild( inputField );
	inputField.type = "hidden";
	inputField.name = name;
	inputField.value = value;
}
