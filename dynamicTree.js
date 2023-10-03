///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//SAPTreeNode
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
//PRIVATE SECTION
/////////////////////////////////////////////////////////////////////////////////////

//static helpers
function SAPTreeGenImageUrl( src )
{
//	if( SAPCB_NavigatorVersion == "IE5" )
//	{
//	var date = new Date();

//	return src + "?" + date.getTime();
//}
//	else return src;
	return src;
}

var leftKeyCode        =  37;
var rightKeyCode       =  39;
var upKeyCode          =  38;
var downKeyCode        =  40;
var F10KeyCode         = 121;
var toggleKeyCode      =  32;
var selectKeyCode      =  13;
var skipToStartKeyCode =  66;
var skipToEndKeyCode   =  90;

var accStartElement = null;
var accEndElement   = null; 

var accessibility = true;
var isContxtMenuEnable = true;

function SAPTreeStatic_classifyEvent(event) {
   var tagName = SAPCB_NavigatorVersion=="IE5" ? window.event.srcElement.tagName : event.target.nodeName;
   if((tagName=="IMG") || (tagName=="SPAN")) {
      SAP_eventObject.eventType = "ICON_CLICKED";
   } else if(tagName=="A" || tagName=="#text") {
      SAP_eventObject.eventType = "TEXT_CLICKED";
   } else {
      SAP_eventObject.eventType = "DIV_CLICKED";
   }
}

function SAPTreeBeginStatic_onkeypress(event) {
    window.event.cancelBubble = true;
	if(SAPCB_NavigatorVersion=="IE5" && SAP_Acc && window.event.keyCode==skipToEndKeyCode) {
	   accEndElement.focus();
	}
}
   
function SAPTreeEndStatic_onkeypress(event) {
    window.event.cancelBubble = true;
	if(SAPCB_NavigatorVersion=="IE5" && SAP_Acc  && window.event.altKey && window.event.shiftKey && window.event.keyCode==skipToStartKeyCode) {
	   window.setTimeout("accStartElement.focus();",10);
	}
}

function SAPTreeNodeStatic_onkeypress(event)
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.noedOnKeyPress );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;

	var keyCode;
	if( SAPCB_NavigatorVersion == "IE5" )
	{
		keyCode = window.event.keyCode;
	}
	else
	{
		keyCode = event.which;
		window.status += keyCode;
	}
	if( keyCode != null )
	{
		if( keyCode == toggleKeyCode ) node.toggle();
		if( keyCode == selectKeyCode ) tree.selectNode( node , event);
	}
}
function SAPTreeNodeStatic_onPaste(event)
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnPaste );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
}
function SAPTreeNodeStatic_onBeforePaste(event)
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnBeforePaste );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
}
function SAPTreeNodeStatic_onkeydown(event)
{
	var myEvent = null;
	if (SAPCB_NavigatorVersion == "NN6") myEvent = evt;
	else myEvent = window.event;

	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
	eval( tree.noedOnKeyPress );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;

	var keyCode;
	if( SAPCB_NavigatorVersion == "IE5" )
	{
		keyCode = window.event.keyCode;
	}
	else
	{
		keyCode = event.which;
		window.status += keyCode;
	}
	if( keyCode != null )
	{
		if( keyCode == toggleKeyCode ) node.toggle();
		if( keyCode == selectKeyCode ) tree.selectNode( node , event);
		
		if( keyCode == upKeyCode )
		{
			var visibleNodes = tree.getVisibleNodes();
			var visibleNodesLength = visibleNodes.length;
			var upNode = null;
			var i;
			for(i=0; i<visibleNodesLength; i++)
			{
				var visibleNode = visibleNodes[i];
				if( visibleNode == node )
				{
					if( upNode != null ) upNode.getNodeAnchor().focus();
					break;
				}
				else upNode = visibleNode;
			}
			//support multiple selections
			if( upNode != null )
			{
				if( tree.selectionMode == "MULTI" )
				{
					if( myEvent.shiftKey == true )
					{
						//check whether upNode and node are siblings
						if( tree.selectedNodes.length > 0 )
						{
							if( tree.nodeIsSelected( upNode ) )
							{
								tree.removeNodeFromSelection( node );
							}
							else
							{
								var firstSelectedNode = tree.selectedNodes[0];
								if( node.isSibling( upNode ) && node.isSibling( firstSelectedNode ) )					
									tree.addToSelection( upNode );
							}
						}
					}
		                }
			}
		}
		if( keyCode == downKeyCode )
		{
			var visibleNodes = tree.getVisibleNodes();
			var visibleNodesLength = visibleNodes.length;
			var lastIndex = visibleNodesLength - 1;
			var i;
			var downNode = null;
			for(i=0; i<visibleNodesLength; i++)
			{
				var visibleNode = visibleNodes[i];
				if( visibleNode == node )
				{
					if( i < lastIndex  ) 
					{
						downNode = visibleNodes[i+1];
						downNode.getNodeAnchor().focus();
						break;
					}
				}
			}			
			//support multiple selections
			if( downNode != null )
			{
				if( tree.selectionMode == "MULTI" )
				{
					if( myEvent.shiftKey == true )
					{
						//check whether upNode and node are siblings
						if( tree.selectedNodes.length > 0 )
						{
							if( tree.nodeIsSelected( downNode ) )
							{
								tree.removeNodeFromSelection( node );
							}
							else
							{
								var firstSelectedNode = tree.selectedNodes[0];
								if( node.isSibling( downNode ) && node.isSibling( firstSelectedNode ) )					
									tree.addToSelection( downNode );
							}
						}
					}
				}
			}
		}
		if( keyCode == leftKeyCode )
		{
			if( node.status == "o" ) 
			{
				SAP_eventObject.eventType = "ICON_CLICKED";
				eval( tree.nodeOnClick );
				if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
				node.toggle();
			}
			else 
			{
				if( node.parent != null ) node.parent.getNodeAnchor().focus();
			}
		}
		if( keyCode == rightKeyCode )
		{
			if( node.status == "c" ) 
			{
				SAP_eventObject.eventType = "ICON_CLICKED";
				eval( tree.nodeOnClick );
				if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
				node.toggle();
			}
			else 
			{
				if( ( node.type == "F" ) && ( node.children.length > 0 ) )
					node.children[0].getNodeAnchor().focus();	
			}
		}
		if(SAP_Acc && SAPCB_NavigatorVersion=="IE5") {
		   if(keyCode==skipToStartKeyCode) {
		      accStartElement.focus();
		      myEvent.cancelBubble = true;
		   } else if(keyCode==skipToEndKeyCode) {
		      accEndElement.focus();
		      myEvent.cancelBubble = true;
		   }
		}
		// Todo: For netscape, find out how "shitKey" is represented
		if(keyCode==F10KeyCode && window.event.shiftKey) {
			if(tree.nodeOnContextMenu!=null && tree.nodeOnContextMenu!="") {
				eval(tree.nodeOnContextMenu);
				if(SAP_eventObject!=null &&
				   SAP_eventObject.returnValue!=null && 
				   SAP_eventObject.returnValue==false) {
				   return false;
				}
			}
		}
	}
}
function SAPTreeNodeStatic_onclick(event)
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnClick );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
	if( SAPCB_NavigatorVersion == "IE5" )
	{
		if( ( window.event.srcElement.tagName == "IMG" ) || ( window.event.srcElement.tagName == "SPAN" ) ) node.toggle();
	}
	else
	{
		if( event.target.nodeName != "#text" ) node.toggle();
	}
    tree.selectNode( node , event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnAfterClick );
	}
	return false;
}
function SAPTreeNodeStatic_ondblclick(event)
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node, event );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnDblClick );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
	node.toggle();
        tree.selectNode( node , event);

	return false;
}
function SAPTreeNodeStatic_ondragenter()
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnDragEnter );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
}
function SAPTreeNodeStatic_ondragover()
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnDragOver );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
}
function SAPTreeNodeStatic_ondrop()
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnDrop );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;

	if( tree.onDropUrl != null ){
		SAPGlbl_submitForm( tree.onDropUrl + "?eventData=" + escape( window.event.dataTransfer.getData("Text") ) )
	}
}
function SAPTreeNodeStatic_ondragstart()
{
	var tree = SAP_getJSTree( this.treeID );
	var node = tree.getNode( this.nodeID );
	if( tree.uiState == 0 ) return;
	SAP_createEvent( node );
	SAPTreeStatic_classifyEvent(event);
	if (!isLoadingNode(node))
	{
		eval( tree.nodeOnDragStart );
	}
	if( ( SAP_eventObject != null ) && ( SAP_eventObject.returnValue != null ) && ( SAP_eventObject.returnValue == false ) ) return false;
}
function SAPTreeNodeStatic_oncontextmenu(event) {
   var tree = SAP_getJSTree(this.treeID);
   var node = tree.getNode(this.nodeID);
   if(tree.uiState==0) {
      return;
   }
   SAP_createEvent(node);
   SAPTreeStatic_classifyEvent(event);
   if(SAP_eventObject.eventType=="TEXT_CLICKED" || SAP_eventObject.eventType=="ICON_CLICKED") {
   if (!isLoadingNode(node))
   {
      eval(tree.nodeOnContextMenu);
   }
   }
   if(SAP_eventObject!=null &&
      SAP_eventObject.returnValue!=null &&
      SAP_eventObject.returnValue==false) {
      return false;
   }
}


///////////////////////////////////////////////////////////////////////
//methods
///////////////////////////////////////////////////////////////////////
//rendering methods
function SAPTreeNode_getChildrenDiv() {
	return this.childrenDiv;
}

function SAPTreeNode_getNodeDiv() {
	return this.iso;
}

function SAPTreeNode_getNodeAnchor() {
   if(this.tree.toWrap) {
      return SAPCB_Node_getChild(SAPCB_Node_getChild(this.getNodeDiv(),0).rows[0].cells[2],0);
   } else {
	  return SAPCB_Node_getChild(this.getNodeDiv(),2);
   }
}

function SAPTreeNode_getImage() {
   if(this.tree.toWrap) {
      var img = SAPCB_Node_getChild(SAPCB_Node_getChild(this.getNodeDiv(),0).rows[0].cells[1],0);
   } else {
      var img = SAPCB_Node_getChild(this.getNodeDiv(),1);
   }
   if(SAPCB_NavigatorVersion=="IE5") {
      return SAPCB_Node_getChild(img,0);
   }
   return img;
}

function SAPTreeNode_getFolderImage() {
   if(this.tree.toWrap) {
      return SAPCB_Node_getChild(SAPCB_Node_getChild(this.getNodeDiv(),0).rows[0].cells[0],0);
   } else {
      return SAPCB_Node_getChild(this.getNodeDiv(),0);
   }
}

function SAPTreeNode_createChildrenDiv() {
	var level = this.level;
	level++;
	var newDiv = document.createElement("DIV");
    newDiv.id = this.tree.ID + "9" + this.nodeID + "9children";
    newDiv.className = "SItreelevel" + level;
	//newDiv.style.width = "100%";
    this.childrenDiv = newDiv;
    return newDiv;
}

function SAPTreeNode_insertChildren(content) {
	var i;
	var childrenArray = this.children;
	if( childrenArray == null ) return;
	var childrenArrayLength = childrenArray.length;
	var childrenLevel = this.level;
	childrenLevel++;
	if( childrenArrayLength > 0 )
	{
		var newDiv = this.createChildrenDiv();
		content.appendChild( newDiv );

		for( i=0; i < childrenArrayLength; i++)
		{
			var curChild = childrenArray[i];
			curChild.level = childrenLevel;
			curChild.insert( newDiv );
		}
	}
}
function SAPTreeNode_insertChildrenDynamic() {
   var i;
   var childrenArray = this.children;
   if(childrenArray==null) {
      return;
   }
   var childrenArrayLength = childrenArray.length;
   var childrenLevel       = this.level;
   childrenLevel++;
   if(childrenArrayLength>0) {
      if(this.type=='F') {
         var folderImage = this.getFolderImage();
         if(folderImage!=null && folderImage.className!=null) {
			if(this.status=="o") {
               folderImage.className = "SItreeOpenFolder";
            } else {
               folderImage.className = "SItreeClosedFolder";
            }
         }
      }
      var newDiv = this.createChildrenDiv();
      SAPCB_Node_insertAfter(newDiv,this.getNodeDiv());
      for(i=0; i<childrenArrayLength; i++) {
         var curChild = childrenArray[i];
         curChild.level = childrenLevel;
         curChild.insert(newDiv);
      }
   }
}
function SAPTreeNode_insert1( content, newNodeDiv, position )
{
	if( position == null ) content.appendChild( newNodeDiv );
	else
	{
		var childNodes = null;

		if( this.parent != null ) childNodes = this.parent.children;
		else childNodes = this.tree.roots;

		var childNodesLength = childNodes.length;

		//the node <this> has already been inserted at position <position> inside <childNodes>
		//thus if <position> equals <childNodesLength> minus one inserting at <position> means
		//inserting at the end
		if( position == ( childNodesLength - 1 ) ) content.appendChild( newNodeDiv );
		else
		{
			//the node <this> has already been inserted at position <position> inside <childNodes>
			//thus its right sibling is found at position <position>+1 inside <childNodes>
			var rightSiblingNode = childNodes[position+1];
  			content.insertBefore(newNodeDiv, rightSiblingNode.getNodeDiv());
		}
	}
}
function SAPTreeNode_insertAt(insertionIndex) {
	var parentNode = this.parent;
	if(parentNode!=null) {
		var parentNodeDiv = parentNode.getNodeDiv();
		if(parentNodeDiv) {
			//parentNode corresponds to a DOM Node
			var childrenDiv = parentNode.getChildrenDiv();
			if(childrenDiv!=null) {
				//children have been already inserted into DOM
				this.insert(childrenDiv, insertionIndex);
			} else {
				//children have NOT been inserted into DOM
				if(parentNode.status=="o") {
					//single new child will be visible
					parentNode.insertChildrenDynamic();
				}
			}
		}
	} else {
		//insert new root
		this.insert(this.tree.iso, insertionIndex);
	}
}
function SAPTreeNode_setText( text )
{
	this.text = text;
	var a = this.getNodeAnchor();

	SAPCB_Node_setInnerText( a, text );
}
function SAPTreeNode_setTextClass( className )
{
	var a = this.getNodeAnchor();
	a.className = className;
}
function SAPTreeNode_getTextClass()
{
	var a = this.getNodeAnchor();
	return a.className;
}
function SAPTreeNode_getText()
{
	return this.text;
}

function SAPTreeNode_render() {
   // Declarations
   var newNodeDiv = document.createElement("DIV");
   var newSpan    = document.createElement("A");
   var newFolderImg;
   var newImg;
   // Setup the newNodeDiv
   if(RtL) {
      newNodeDiv.style.marginLeft  = 10;
      newNodeDiv.style.marginRight = (parseInt(this.level)-1 ) * 16;
   } else {
      newNodeDiv.style.marginLeft  = (parseInt(this.level)-1 ) * 16;
      newNodeDiv.style.marginRight = 10;
   }
   //newNodeDiv.className = "SItreeoffset" + this.level;
   // Setup the newFolderImg
   if(SAPCB_NavigatorVersion=="IE5") {
      newFolderImg = document.createElement("SPAN");
      //newFolderImg.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
   } else {
      newFolderImg     = document.createElement("IMG");
      newFolderImg.src = SAPTreeGenImageUrl(SAP_TemplateDynamicTreeDefaultImage);		
   }
   if(this.type=="F") {
      if(this.status=="o") {
         if(this.tree.openImage!=null) {
            newFolderImg.src = SAPTreeGenImageUrl(this.tree.openImage);
         } else {
            newFolderImg.className = "SItreeOpenFolder";
            if(!this.unloaded && this.children.length==0) {
               newFolderImg.className = "SItreeNoneFolder";
            }
            if(SAP_Acc) {
               newFolderImg.title = folder_collapse;
            }
         }
      }	else {
         if(this.tree.closeImage!=null) {
            newFolderImg.src = SAPTreeGenImageUrl(this.tree.closeImage);
         } else {
            newFolderImg.className = "SItreeClosedFolder";
            if(!this.unloaded && this.children.length==0) {
               newFolderImg.className = "SItreeNoneFolder";
            }
            if(SAP_Acc) {
               newFolderImg.title = folder_expand;
            }
         }
      }
   } else {
	      if(this.pageStatusImageUrl != null)
	      {
	      	if(SAPCB_NavigatorVersion=="IE5") {
	      		newFolderImg.innerHTML = "<img src=\"" + this.pageStatusImageUrl + "\"  class='' >";
	      	}
	      	else {
	      		newFolderImg.src = SAPTreeGenImageUrl( this.pageStatusImageUrl );
	      	}
	      }
	      else
	      {
	      	newFolderImg.className = "SItreeNoneFolder";
	      }
   }
   // Setup the newImg
   if(SAPCB_NavigatorVersion!="IE5") {
      newImg = document.createElement("IMG");
      var newImgId = this.tree.ID + "/" + this.nodeID;
      var url;
      newImg.id = newImgId;
      if(this.type=="F") {
         newImg.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
         if(this.status=="o") {
            if(this.folderOpenImageUrl!=null) {
               newImg.src = SAPTreeGenImageUrl( this.folderOpenImageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.folderOpenImageUrl, newImgId);
               }
            }
         } else	{
            if(this.folderCloseImageUrl!=null) {
               newImg.src = SAPTreeGenImageUrl( this.folderCloseImageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.folderCloseImageUrl, newImgId);
               }
            }
         }
      } else {
         if(this.imageClass!=null) {
            newImg.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
            newImg.className = this.imageClass;
         } else {
            if(this.imageUrl!=null) {
               newImg.src = SAPTreeGenImageUrl( this.imageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.imageUrl, newImgId );								
               }
            } else {
               if(this.tree.documentImage!=null) {
                  newImg.src = SAPTreeGenImageUrl(this.tree.documentImage);
               } else {
                  newImg.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
                  newImg.className = "SItreeDoc";
               }
            }
         }
      }
   } else {
      newImg = document.createElement("SPAN");
      var newImgId = this.tree.ID + "/" + this.nodeID;
      var anImgSrc = "";
      var anImgClass = "";
      var url;
      if(this.type=="F") {
         anImgSrc = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
         if(this.status=="o") {
            if(this.folderOpenImageUrl!=null) {
               anImgSrc = SAPTreeGenImageUrl( this.folderOpenImageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.folderOpenImageUrl, newImgId );
               }
            }
         } else {
            if(this.folderCloseImageUrl!=null) {
               anImgSrc = SAPTreeGenImageUrl( this.folderCloseImageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.folderCloseImageUrl, newImgId );
               }
            }
         }
      } else {
         if(this.imageClass!=null) {
            anImgSrc = SAPTreeGenImageUrl(SAP_TemplateDynamicTreeDefaultImage);
            anImgClass = this.imageClass;
         } else {
            if(this.imageUrl!=null) {
               anImgSrc = SAPTreeGenImageUrl( this.imageUrl );
               if(this.tree.postloadImages) {
                  this.tree.addImageToBePostloaded( this.imageUrl, newImgId );
               }
            } else {
               if(this.tree.documentImage!=null) {
                  anImgSrc = SAPTreeGenImageUrl(this.tree.documentImage);
               } else {
                  anImgSrc = SAPTreeGenImageUrl(SAP_TemplateDynamicTreeDefaultImage);
                  anImgClass = "SItreeDoc";
               }
            }
         }
      }
      newImg.innerHTML = "<img id=\"" + newImgId + "\" src=\"" + anImgSrc + "\"" + (anImgClass!="" ? " class=\"" + anImgClass + "\"" : "") + ">";
   }
   // Setup the newSpan
   if(SAPCB_NavigatorVersion=="IE5") {
      newSpan.tabIndex = -1;
   }
   if(this.href!=null) {
      newSpan.href = this.href;
   } else {
      newSpan.href = "#";
   }
   var newTextNode = document.createTextNode(this.text);
   newSpan.appendChild(newTextNode);
   newSpan.className = "SItreeText";
   if(this.emphasized!=null && this.emphasized=='true') {
      newSpan.style.fontWeight = "bold";
   }
   //else newSpan.className = "SItreeText";
   this.selected = this.tree.nodeIsSelected(this);
   this.setTitle(newSpan);
   if(this.title!=null) {
      newNodeDiv.title = this.title;
   }
   // Append the hierarchy
   if(this.tree.toWrap) {
      var table = document.createElement("TABLE");
      var tr  = table.insertRow(-1);
      var td1 = tr.insertCell(-1);
      var td2 = tr.insertCell(-1);
      var td3 = tr.insertCell(-1);
	  table.cellSpacing = "0px";
	  if(this.tree.HighlightWholeLine) 
	  {
      	td3.style.width = "100%";      
      } 
      td1.appendChild(newFolderImg);
      td2.appendChild(newImg);
      td3.appendChild(newSpan);
      newNodeDiv.appendChild(table);
      table.style.marginLeft      = "0px";
      table.style.marginRight     = "0px";
      table.style.marginTop       = "0px";
      table.style.marginBottom    = "0px";
      table.style.paddingLeft     = "0px";
      table.style.paddingRight    = "0px";
      table.style.paddingTop      = "0px";
      table.style.paddingBottom   = "0px";
      td1.style.verticalAlign     = "top";
      td1.style.marginLeft        = "0px";
      td1.style.marginRight       = "0px";
      td1.style.marginTop         = "0px";
      td1.style.marginBottom      = "0px";
      td1.style.paddingLeft       = "0px";
      td1.style.paddingRight      = "0px";
	  if(SAPCB_NavigatorVersion=="IE5") 
	  {
		td1.style.paddingTop      = "0px";
	  }
	  else
	  {
		td1.style.paddingTop      = "3px";
	  }
      td1.style.paddingBottom     = "0px";
      td2.style.marginLeft        = "0px";
      td2.style.marginRight       = "0px";
      td2.style.marginTop         = "0px";
      td2.style.marginBottom      = "0px";
      td2.style.paddingLeft       = "0px";
      td2.style.paddingRight      = "0px";
      td2.style.paddingTop        = "2px";
      td2.style.paddingBottom     = "0px";
      td2.style.verticalAlign     = "top";
      td3.style.verticalAlign     = "top";
      td3.style.marginLeft        = "0px";
      td3.style.marginRight       = "0px";
      td3.style.marginTop         = "0px";
      td3.style.marginBottom      = "0px";
      td3.style.paddingLeft       = "3px";
      td3.style.paddingRight      = "0px";
      td3.style.paddingTop        = "0px";
      td3.style.paddingBottom     = "0px";
      newSpan.style.marginLeft    = "0px";
      newSpan.style.marginRight   = "0px";
      newSpan.style.marginTop     = "0px";
      newSpan.style.marginBottom  = "0px";
      newSpan.style.paddingLeft   = "0px";
      newSpan.style.paddingRight  = "0px";
      newSpan.style.paddingTop    = "0px";
      newSpan.style.paddingBottom = "0px";
   } else {
      newNodeDiv.style.whiteSpace = "nowrap";
      newNodeDiv.appendChild(newFolderImg);
      newNodeDiv.appendChild(newImg);
      newNodeDiv.appendChild(newSpan);
   }
   return newNodeDiv;
}

function SAPTreeNode_setTitle(newSpan) {
   if(SAP_Acc) { // Accessibility
      if(this.type=="F") {
         newSpan.title = this.text + " " + (this.selected? xtol_active + " " : "") + (this.status=="o"? xtol_expanded : xtol_collapsed) + " " + xtol_Folder + " " + xtol_Level + " " + this.level + ".";
      } else {
         newSpan.title = this.text + " " + (this.selected? xtol_active + " " : "") + xtol_Item + " " + xtol_Level + " " + this.level + ".";
      }
      if(this.title!=null && this.title!="") {
         newSpan.title += " " + xtol_Furtherinformation + " " + this.title;
      }
   }
   else if(this.title!=null && this.title!="" && this.title != "undefined") 
	{
	   newSpan.title = this.title;
	}

}

function SAPTreeNode_insert(content, position) {
    ////////////////////////////////////////////////////////////////
    //node layout
	var newNodeDiv    = this.render();
	this.iso          = newNodeDiv;
	newNodeDiv.nodeID = this.nodeID;
	newNodeDiv.treeID = this.tree.ID;
	if(this.tree.toWrap) {
		this.getNodeAnchor().style.wordWrap   = "break-word";
		this.getNodeAnchor().style.whiteSpace = "normal";
	} else {
		this.getNodeAnchor().style.wordWrap   = "normal";
		this.getNodeAnchor().style.whiteSpace = "nowrap";
	}
	if(SAPCB_NavigatorVersion=="NN6") {
	   newNodeDiv.addEventListener("click",   SAPTreeNodeStatic_onclick,   false);
	   newNodeDiv.addEventListener("keydown", SAPTreeNodeStatic_onkeydown, false);
	} else {
	   newNodeDiv.onclick   = SAPTreeNodeStatic_onclick;
	   newNodeDiv.onkeydown = SAPTreeNodeStatic_onkeydown;
	}
	newNodeDiv.ondblclick	 = SAPTreeNodeStatic_ondblclick;
	newNodeDiv.ondragenter	 = SAPTreeNodeStatic_ondragenter;
	newNodeDiv.ondragover	 = SAPTreeNodeStatic_ondragover;
	newNodeDiv.ondrop	     = SAPTreeNodeStatic_ondrop;
    newNodeDiv.ondragstart	 = SAPTreeNodeStatic_ondragstart;
    newNodeDiv.oncontextmenu = SAPTreeNodeStatic_oncontextmenu;
    newNodeDiv.onpaste       = SAPTreeNodeStatic_onPaste;
    newNodeDiv.onbeforepaste = SAPTreeNodeStatic_onBeforePaste;

    //node layout end
    ////////////////////////////////////////////////////////////////

    this.insert1( content, newNodeDiv, position );

    if( this.status == "c" ) return;
	if( position == null ) this.insertChildren( content );
	else this.insertChildrenDynamic();
}
function SAPTreeNode_remove()
{
	var curNodeChildrenDiv = this.getChildrenDiv();
	var curNodeDiv = this.getNodeDiv();
	if( curNodeChildrenDiv != null ) {
		SAPCB_Node_remove( curNodeChildrenDiv );
		this.childrenDiv = null;
	}
	SAPCB_Node_remove( curNodeDiv );
}
//////////////////////////////////////////////////////////////////////////////////////////
//user interaction (reserved for internal use)
function SAPTreeNode_toggle()
{
	var curNode		= this;
//	if( curNode.children == null ) return;
	if( curNode.type != "F" ) return;

	var curNodeDiv	= this.getNodeDiv();
	var curTree	= curNode.tree;
	var childrenDiv = this.getChildrenDiv();

	var img = this.getImage();
	var folderImage  = this.getFolderImage()
	if(childrenDiv==null) {
       if(curNode.children.length>0) {
          curNode.insertChildrenDynamic();
       }
	   if(folderImage!=null) {
          if(this.tree.openImage!=null) {
             folderImage.src = SAPTreeGenImageUrl( this.tree.openImage );
          } else {
             folderImage.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
             folderImage.className = "SItreeOpenFolder";
             if(!curNode.unloaded && curNode.children.length == 0) {
                folderImage.className = "SItreeNoneFolder";
             }
          }
       }
       if(img!=null) {
          if(this.folderOpenImageUrl!=null) {
             img.src = SAPTreeGenImageUrl( this.folderOpenImageUrl );
             if(this.tree.postloadImages) {
                this.tree.addImageToBePostloaded( this.folderOpenImageUrl, img.id );
             }
	      }
	   }
       curNode.status = "o";
    } else {
       if(curNode.children.length>0) {
          if(curNode.status=="o") {
             if(folderImage!=null)	{
                if(this.tree.closeImage!=null) {
                   folderImage.src = SAPTreeGenImageUrl(this.tree.closeImage);
                } else	{
                   folderImage.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
                   folderImage.className = "SItreeClosedFolder";
                }
             }
             if(img!=null) {
                if(this.folderCloseImageUrl!=null) {
                   img.src = SAPTreeGenImageUrl( this.folderCloseImageUrl );
                   if(this.tree.postloadImages) {
                      this.tree.addImageToBePostloaded(this.folderCloseImageUrl, img.id);
                   }
	            }
             }
             curNode.status = "c";
             if(childrenDiv!=null) {
                SAPCB_HTMLElement_hide(childrenDiv);
             }
          } else {
             if(folderImage!=null) {
                if(this.tree.openImage!=null) {
                   folderImage.src = SAPTreeGenImageUrl(this.tree.openImage);
                } else {
                   folderImage.src = SAPTreeGenImageUrl( SAP_TemplateDynamicTreeDefaultImage );
                   folderImage.className = "SItreeOpenFolder";
                }
             }
             if(img!=null) {
                if(this.folderOpenImageUrl!=null) {
                   img.src = SAPTreeGenImageUrl( this.folderOpenImageUrl );
                   if(this.tree.postloadImages) {
                      this.tree.addImageToBePostloaded( this.folderOpenImageUrl, img.id );
                   }
                }
             }
             curNode.status = "o";
             if(childrenDiv!=null) {
                SAPCB_HTMLElement_show(childrenDiv);
             }
          }
       }
    }
    if(SAP_Acc) {
       if(folderImage!=null) {
          if(curNode.status=="o") {
             folderImage.title = folder_collapse;
          } else {
             folderImage.title = folder_expand;
          }
       }
    }
    this.setTitle( this.getNodeAnchor() );
    if(this.tree.postloadImages) {
       this.tree.postload();
    }
}
function SAPTreeNode_setIcon( url )
{
	this.imageUrl = url;
	var curNodeDiv = this.getNodeDiv();
	if( curNodeDiv == null ) return;
	var image = this.getImage();
	if( image == null ) return;
	image.src = SAPTreeGenImageUrl( url );
	if( this.tree.postloadImages ) this.tree.addImageToBePostloaded( url, image.id );
	if( this.tree.postloadImages ) this.tree.postload();
}
////////////////////////////////////////////////////////////////////////////////////
//searching
function SAPTreeNode_getNode( nodeID )
{
	if( this.nodeID == nodeID ) return this;
	var childrenArray = this.children;
	if( childrenArray == null ) return null;

	var childrenArrayLength = childrenArray.length;
	var i;
	for( i=0; i < childrenArrayLength; i++)
	{
		var curChild = childrenArray[i];
		var resultNode = curChild.getNode( nodeID );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
function SAPTreeNode_getNodeByAttribute( attribute, value )
{
	if( this[ attribute ] == value ) return this;
	var childrenArray = this.children;
	if( childrenArray == null ) return null;

	var childrenArrayLength = childrenArray.length;
	var i;
	for( i=0; i < childrenArrayLength; i++)
	{
		var curChild = childrenArray[i];
		var resultNode = curChild.getNodeByAttribute( attribute, value );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
function SAPTreeNode_getNodeByIndex( index )
{
	if( this.tree.visitedCount == index ) return this;
	this.tree.visitedCount++;
	var childrenArray = this.children;
	if( childrenArray == null ) return null;

	var childrenArrayLength = childrenArray.length;
	var i;
	for( i=0; i < childrenArrayLength; i++)
	{
		var curChild = childrenArray[i];
		var resultNode = curChild.getNodeByIndex( index );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
/////////////////////////////////////////////////////////////////////////////////////
//PUBLIC SECTION
/////////////////////////////////////////////////////////////////////////////////////
//properties
function SAPTreeNode_getID()
{
	return this.nodeID;
}
function SAPTreeNode_getNodeType()
{
	return this.type;
}
//methods
function SAPTreeNode_getChildrenIndex()
{
	var siblingArray;
	if( this.parent == null ) siblingArray = this.tree.roots;
	else siblingArray = this.parent.children;

	if( siblingArray == null ) return -1;
	var i;
	for(i=0; i < siblingArray.length; i++)
	{
		if( this == siblingArray[i] ) return i;
	}
	return -1;
}
/////////////////////////////////////////////////////////////////////////////////////
//serializiation
function SAPTreeNode_serialize()
{
	var result = "";
	result+= "<TreeNode>";
	result+= "<id>" + this.nodeID + "</id>";
	result+= "<text>" + this.text + "</text>";
	result+= "<type>" + this.type + "</type>";
	result+= "<state>" + this.status + "</state>";
	if( this.imageUrl != null ) result+= "<documentImage>" + this.imageUrl + "</documentImage>";

	var childrenArray = this.children;
	var childrenArrayLength = childrenArray.length;
	var i;
	for( i=0; i < childrenArrayLength; i++)
	{
		var curChild = childrenArray[i];

		result+= curChild.serialize();
	}
	result+= "</TreeNode>";
	return result;
}
/////////////////////////////////////////////////////////////////////////////////////
//constructor
function SAPTreeNode( nodeID, text, type, status )
{
	this.nodeID= nodeID;
	this.text= text;
	this.type= type;
	this.status = status;
	this.parent = null;
	this.selected = false;

	this.children = new Array();
}
//////////////////////////////////////////////
//allow tree structure inspection from outside
function SAPTreeNode_getChildren()
{
    // return a copy of the children array to prevent it from being modify
    var newArray = new Array();

    var childrenArray = this.children;
    if( childrenArray == null ) return null;
    var childrenArrayLength = childrenArray.length;
    for(var i=0; i < childrenArrayLength; i++)
    {
        newArray[i] = childrenArray[i];
    }
    return newArray;
}

function SAPTreeNode_getParent()
{
    return this.parent;
}
function SAPTreeNode_isSibling( node ){
	return( node.parent == this.parent );
}
function SAPTreeNode_getSiblings(){
	if( this.parent == null ) return this.tree.roots;
	else return this.parent.children;
}
function SAPTreeNode_setEmphasized()
{
	var span = this.getNodeAnchor();
	span.style.fontWeight = "bold";
	//if( this.tree.nodeIsSelected( this ) ) span.className = "SItreeSelColorMarked";
	//else span.className = "SItreeTextMarked";
	this.emphasized = 'true';
}
function SAPTreeNode_resetEmphasized()
{
	var span = this.getNodeAnchor();
	//if( this.tree.nodeIsSelected( this ) ) span.className = "SItreeSelColor";
	//else span.className = "SItreeText";
	span.style.fontWeight = "normal";
	this.emphasized = 'false';
}

function isLoadingNode(node)
{
	var loadingIndex = node.nodeID.indexOf("_Loading");
	if (loadingIndex == -1)
	{
		return false;
	}
	if (loadingIndex !=	node.nodeID.length - 8)
	{
		return false;
	}
	
	return true;
	
}

///////////////////////////////////////////////////////////////////////
//method assignment
SAPTreeNode.prototype.insert1				= SAPTreeNode_insert1;
SAPTreeNode.prototype.insert				= SAPTreeNode_insert;
SAPTreeNode.prototype.insertAt				= SAPTreeNode_insertAt;
SAPTreeNode.prototype.insertChildren		= SAPTreeNode_insertChildren;
SAPTreeNode.prototype.insertChildrenDynamic	= SAPTreeNode_insertChildrenDynamic;
SAPTreeNode.prototype.remove				= SAPTreeNode_remove;
SAPTreeNode.prototype.createChildrenDiv		= SAPTreeNode_createChildrenDiv;
SAPTreeNode.prototype.getID					= SAPTreeNode_getID;
SAPTreeNode.prototype.getNodeType			= SAPTreeNode_getNodeType;
SAPTreeNode.prototype.getNode				= SAPTreeNode_getNode;
SAPTreeNode.prototype.getChildrenIndex		= SAPTreeNode_getChildrenIndex;
SAPTreeNode.prototype.getNodeByAttribute	= SAPTreeNode_getNodeByAttribute;
SAPTreeNode.prototype.getNodeByIndex		= SAPTreeNode_getNodeByIndex;
SAPTreeNode.prototype.setIcon				= SAPTreeNode_setIcon;
SAPTreeNode.prototype.toggle				= SAPTreeNode_toggle;
SAPTreeNode.prototype.getChildrenDiv		= SAPTreeNode_getChildrenDiv;
SAPTreeNode.prototype.getNodeDiv			= SAPTreeNode_getNodeDiv;
SAPTreeNode.prototype.render				= SAPTreeNode_render;
SAPTreeNode.prototype.getText				= SAPTreeNode_getText;
SAPTreeNode.prototype.setText				= SAPTreeNode_setText;
SAPTreeNode.prototype.setTextClass			= SAPTreeNode_setTextClass;
SAPTreeNode.prototype.getTextClass			= SAPTreeNode_getTextClass;
SAPTreeNode.prototype.getNodeAnchor			= SAPTreeNode_getNodeAnchor;
SAPTreeNode.prototype.getImage				= SAPTreeNode_getImage;
SAPTreeNode.prototype.getFolderImage			= SAPTreeNode_getFolderImage;
SAPTreeNode.prototype.serialize				= SAPTreeNode_serialize;
SAPTreeNode.prototype.getChildren		= SAPTreeNode_getChildren;
SAPTreeNode.prototype.getParent		        = SAPTreeNode_getParent;
SAPTreeNode.prototype.isSibling		        = SAPTreeNode_isSibling;
SAPTreeNode.prototype.getSiblings		    = SAPTreeNode_getSiblings;
SAPTreeNode.prototype.setTitle			= SAPTreeNode_setTitle;
SAPTreeNode.prototype.setEmphasized			= SAPTreeNode_setEmphasized;
SAPTreeNode.prototype.resetEmphasized			= SAPTreeNode_resetEmphasized;


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//SAPTree
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
//static helpers
function Array_insert( array, insertionIndex, elem )
{
	if( array == null )
	{
		var newArray = new Array();
		newArray[0] = elem;
		return newArray;
	}
	var arrayLength = array.length;
	if( insertionIndex == arrayLength ) { array[ arrayLength ] = elem; return array; }
	else
	{
		if( ( insertionIndex < 0 ) || ( insertionIndex > arrayLength ) ) return null;
		var newArray = new Array();
		var i;
		for(i=0; i < insertionIndex; i++) newArray[i] = array[i];
		newArray[insertionIndex] = elem;
		for(i=insertionIndex; i < arrayLength; i++)
		{
			var j = i; j++;
			newArray[j] = array[i];
		}
		return newArray;
	}
}
function Array_remove( array, elem )
{
	var arrayLength = array.length;
	var newArray = new Array();
	var i;
	for(i=0; i < arrayLength; i++)
	{
		var curElem = array[i];
		if( curElem != elem ) newArray[ newArray.length ] = curElem;
	}
	return newArray;
}
/////////////////////////////////////////////////////////////////////////////////////
//PRIVATE SECTION
/////////////////////////////////////////////////////////////////////////////////////
//rendering
function SAPTree_insert(content) {
   if(SAPCB_NavigatorVersion=="IE5") content.onactivate=function() {event.cancelBubble=true}; 
   content.className = "SItree";
   this.iso = content;
   var roots = this.roots;
   var rootsLength = roots.length;
   var i;
   for(i=0; i<rootsLength; i++) {
      var curRoot = roots[i];
      curRoot.insert(content);
   }
   if(rootsLength>0) {
      if(SAPCB_NavigatorVersion=="IE5") {
         roots[0].getNodeAnchor().tabIndex = 0;
      }
   }
}

/////////////////////////////////////////////////////////////////////////////////////
//PUBLIC SECTION
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
//user interaction
function SAPTree_toggleTreeNode( node )
{
	node.toggle();
}
function SAPTree_toggleTreeNodeByName( nodeName )
{
	var node = this.getNode( nodeName );
	if( node != null ) node.toggle();
}
function SAPTree_toggleTreeNodeByIndex( index )
{
	var node = this.getNodeByIndex( index );
	if( node != null ) node.toggle();
}
function SAPTree_expandNode( node )
{
    if( node == null ) return;
    if( node.status == "o" ) return;

    node.toggle();
}
function SAPTree_collapseNode( node )
{
    if( node == null ) return;
    if( node.status == "c" ) return;

    node.toggle();
}
function SAPTree_setUIstate( state )
{
	this.uiState = state;
}

function SAPTree_setWrapping( toWrap )
{
	this.toWrap = toWrap;
}

//for highlighting the whole line in the DTN
function SAPTree_setWholeLineHighlight( HighlightWholeLine )
{
	this.HighlightWholeLine = HighlightWholeLine;
}

function SAPTree_addToSelection( node ) {
   this.selectedNodes[this.selectedNodes.length] = node;
   node.selected = true;
   node.setTitle(node.getNodeAnchor());
   var text = node.getNodeAnchor();	
   if(text == null || text == "undefined")
   {
	   return false;
   }
   
   //for highlighting the whole line in the DTN
   var dtnDIV = null;
   if(this.HighlightWholeLine)
   {
   	 dtnDIV = node.getNodeDiv();
   }
   
   if(SAPCB_NavigatorVersion=="IE5") 
   {
      var sel = null; 
      if(node.emphasized!=null && node.emphasized=='true') {
         sel = document.getElementById( this.ID + ":selmark" );
      } else {
         sel = document.getElementById( this.ID + ":sel" );
      }
      if(sel!=null)	
      {
         text.style.color           = sel.currentStyle.color;
         text.style.backgroundColor = sel.currentStyle.backgroundColor;
         text.style.fontWeight      = sel.currentStyle.fontWeight;
         if(dtnDIV != null)
         {
         	if(!this.toWrap)
         	{
         		dtnDIV.style.backgroundColor = sel.currentStyle.backgroundColor;
         	}
         	else
         	{
         		dtnDIV.childNodes[0].childNodes[0].childNodes[0].style.backgroundColor 	= sel.currentStyle.backgroundColor;
         	}
         }  
      }
   }
   else 
   {
      if(node.emphasized!=null && node.emphasized=='true') 
      {
         text.className = "SItreeSelColorMarked";
      } 
      else 
      {
         if(dtnDIV != null)
         {
         	if(!this.toWrap)
         	{
         		text.className = "SItreeSelColor";
         		dtnDIV.className = "SItreeDivColor";
         	}
         	else
         	{
         		text.className = "SItreeSelColor";
         		dtnDIV.childNodes[0].childNodes[0].childNodes[0].className = "SItreeDivColor";
         	}
         }
         else
         {
         	text.className = "SItreeSelColor";
         }
      } 
   }
   return true;
}

function SAPTree_removeSelection(node) {
	//node.getNodeAnchor().className = node.curBgColor;
	var text = node.getNodeAnchor();
	
	//for highlighting the whole line in the DTN
    var dtnDIV = null;
    if(this.HighlightWholeLine)
    {
   	  dtnDIV = node.getNodeDiv();
    }

	if( SAPCB_NavigatorVersion == "IE5" )
	{
		if( ( node.emphasized != null ) && ( node.emphasized == 'true' ) ) 
		{
			sel = document.getElementById( this.ID + ":selmark" );

			if( sel != null )
			{
				if (text!=null)
				{
					text.style.color = "";
					text.style.backgroundColor = "";
					text.style.fontWeight = sel.currentStyle.fontWeight;
				}
			}
		}
		else
		{
				if (text!=null)
				{
			        text.style.color = "";
		    	    text.style.backgroundColor = "";
		        	text.style.fontWeight = "";
		        	if(dtnDIV != null)
         			{
         				if(!this.toWrap)
         				{
									dtnDIV.style.backgroundColor = "";
         				}
         				else
         				{
         					dtnDIV.childNodes[0].childNodes[0].childNodes[0].style.backgroundColor 	= "";
         				}
         			}
		        }
	        }
	}
	else
	{
		if( ( node.emphasized != null ) && ( node.emphasized == 'true' ))
		{
			if (text!=null)
			{
				text.className = "SItreeTextMarked";
			}
		}
		else
		{
			 if (text!=null)
			 {
				text.className = "SItreeText";
				if(dtnDIV != null)
         		{
         			if(!this.toWrap)
         			{
         				dtnDIV.className = "";
         			}
         			else
         			{
         				dtnDIV.childNodes[0].childNodes[0].childNodes[0].className = "";
         			}
         		}
			 }
		}
	}
   node.selected = false;
   node.setTitle(node.getNodeAnchor());
}
function SAPTree_resetSelection(){
	var i;
	for(i=0; i<this.selectedNodes.length; i++){
		var curSelectedNode = this.selectedNodes[i];
		this.removeSelection( curSelectedNode );
	}
	this.selectedNodes = new Array();
}
function SAPTree_nodeIsSelected( node ){
	var i;
	for(i=0; i<this.selectedNodes.length; i++){
		var curNode = this.selectedNodes[i];
		if( curNode == node ) return true;
	}
}
function SAPTree_removeNodeFromSelection( node ){
	var selectedNodes = this.selectedNodes;
	this.selectedNodes = new Array();

	var i;
	for(i=0; i<selectedNodes.length; i++){
		var curSelectedNode = selectedNodes[i];
		if( curSelectedNode == node ){
			//unselect
			this.removeSelection( curSelectedNode );
		} else {
			this.selectedNodes[ this.selectedNodes.length ] = curSelectedNode;
		}
	}
   node.selected = false;
   node.setTitle(node.getNodeAnchor());
}
function SAPTree_selectNode( node , evt )
//add only siblings to already selected nodes
{
	var myEvent = null;
	if (SAPCB_NavigatorVersion == "NN6") myEvent = evt;
	else myEvent = event;

	//alert( evt );	alert( evt.shiftKey );alert( evt.ctrlKey );
	if( this.selectionMode == "SINGLE" )
	{
		this.resetSelection();
		this.addToSelection( node );

		//make selection visible
		var parentNode = node.parent;
		while( parentNode != null )
		{
			if( parentNode.status == "c" ) parentNode.toggle();
			parentNode = parentNode.parent;	
		}
		return;
	}
	if( myEvent.ctrlKey == false ){
		if( myEvent.shiftKey == false ){
			this.resetSelection();
			this.addToSelection( node );
		} else {
			//shift key pressed
			if( this.selectionAnchor == null ){
				this.resetSelection();
				var siblings = node.getSiblings();
				var i;
				for(i=0; i<siblings.length; i++){
					var curSibling = siblings[i];
					this.addToSelection( curSibling );
					if( curSibling == node ) break;
				}
			} else {
				if( this.selectionAnchor.isSibling( node ) ){
					//select all siblings in between
					var minIndex = getMinIndex(this.selectedNodes);
					var maxIndex = getMaxIndex(this.selectedNodes);
					this.resetSelection();
					var index1 = this.selectionAnchor.getChildrenIndex();
					var index2 = node.getChildrenIndex();
					var startIndex;
					var endIndex;
					if( index1 <= index2 ){
						startIndex = (minIndex>=0)? minIndex : index1;
						endIndex = index2;
					} else {
						startIndex = index2;
						endIndex = maxIndex>=0? maxIndex : index1;
					}
					var siblings = node.getSiblings();
					var i;
					for(i=startIndex;i<=endIndex;i++){
						var curSibling = siblings[i];
						this.addToSelection( curSibling );
					}
				} else {
					this.resetSelection();
					var siblings = node.getSiblings();
					var i;
					for(i=0; i<siblings.length; i++){
						var curSibling = siblings[i];
						this.addToSelection( curSibling );
						if( curSibling == node ) break;
					}
				}
			}
		}
	} else {
		if( myEvent.shiftKey == false ){
			//determine whether node is currently selected
			if( this.nodeIsSelected( node ) ){
				//remove node from selection
				this.removeNodeFromSelection( node );
			} else {
				//if the current selection is not empty and node is no sibling to all
				//currently selected nodes
				if( this.selectedNodes.length > 0 ){
					var selectedNode = this.selectedNodes[0];
					//check whether selectedNode and node are siblings
					if( !selectedNode.isSibling( node ) ){
						//remove current selection
						this.resetSelection();
					}
				}
				//add node to selection
				this.addToSelection( node );
			}
		} else {
		}
	}
	this.selectionAnchor = node;

	//window.status+= this.selectedNodes.length;
	if (SAPCB_NavigatorVersion == "NN6") myEvent.stopPropagation();
}

function getMinIndex(nodes)
{
	if(nodes == null && nodes != "undefined" && nodes.length ==0)
		return -1;
	var min = nodes[0].getChildrenIndex();
	for(var i=0;i<nodes.length;++i)
		min = (nodes[i].getChildrenIndex() < min)? nodes[i].getChildrenIndex() : min;
	return min;			
}

function getMaxIndex(nodes)
{
	if(nodes == null && nodes != "undefined" && nodes.length ==0)
		return -1;
	var max = nodes[0].getChildrenIndex();
	for(var i=0;i<nodes.length;++i)
		max = (nodes[i].getChildrenIndex() > max)? nodes[i].getChildrenIndex() : max;
	return max;			
}


function SAPTree_selectNodeByIndex( index )
{
	var curNode = this.getNodeByIndex( index );
	if( curNode != null ) this.selectNode( curNode );
}
function SAPTree_selectNodeByName( nodeName )
{
	var curNode = this.getNode( nodeName );
	if( curNode != null ) this.selectNode( curNode );
}
function SAPTree_getSelectedNode()
{
	if( this.selectedNodes.length == 0 ) {
		alert("Nothing selected"); return null;
}
	if( this.selectedNodes.length == 1 ) return this.selectedNodes[0];
	alert( "Node selection is not unique" );
	return null;
//	return this.selectedNode;
}
/////////////////////////////////////////////////////////////////////////////////////
//Maintainance of the JavaScript Datastructure
function SAPTree_JSaddNode( newNode, parentNode, insertionIndex )
{
	newNode.tree = this;

	if( parentNode != null )
	{
		newNode.level = parentNode.level+1;
		if( parentNode.children == null )
		{
			parentNode.children = new Array();
			parentNode.children[0] = newNode;
		}
		else
		{
			var parentNodeChildren = parentNode.children;
			if( insertionIndex == null ) parentNodeChildren[ parentNodeChildren.length ] = newNode;
			else
			{
				parentNode.children = Array_insert( parentNodeChildren, insertionIndex, newNode );
			}
		}

		newNode.parent = parentNode;
	}
	else
	{
		newNode.level = 1;
		if( insertionIndex == null ) this.roots[ this.roots.length ] = newNode;
		else
		{
			this.roots = Array_insert( this.roots, insertionIndex, newNode );
		}

		newNode.parent = null;
	}
	return newNode;
}
function SAPTree_JSaddFolder( nodeID, text, status, parentNode, insertionIndex )
{
	var newNode = new SAPTreeNode( nodeID, text, "F", status );
	return this.JSaddNode( newNode, parentNode, insertionIndex );
}
function SAPTree_JSaddDocument( nodeID, text, parentNode )
{
	var newNode = new SAPTreeNode( nodeID, text, "D", "" );
	return this.JSaddNode( newNode, parentNode );
}
function SAPTree_JSinorderAddNode( nodeID, text, type, status, level )
{
	var newNode = new SAPTreeNode( nodeID, text, type, status );
	var parentNode = null;
	if( level > 1 ) parentNode = this.levelArray[ level - 1 ];

	this.JSaddNode( newNode, parentNode );
	this.levelArray[ level ] = newNode;

	return newNode;
}
function SAPTree_JSdeleteNode( node )
{
	var parentNode = node.parent;
	if( parentNode == null ) this.roots = Array_remove( this.roots, node );
	else {
	    parentNode.children = Array_remove( parentNode.children, node );
	    if (parentNode.children.length == 0) {
		if (parentNode.type == 'F' && !parentNode.unloaded) {
		    var folderImage = parentNode.getFolderImage();
		    if (folderImage != null && folderImage.className != null) {
		    	folderImage.className = "SItreeNoneFolder";
		    }
		}
	    	var childsDiv = parentNode.getChildrenDiv();
	    	if (childsDiv != null) {
	    	    SAPCB_Node_remove(childsDiv);
	    	    parentNode.childrenDiv = null;
	    	}
	    }
	}
}
/////////////////////////////////////////////////////////////////////////////////////
//access methods
function SAPTree_getNode( nodeID )
{
	var roots = this.roots;
	var rootsLength = roots.length;
	var i;
	for(i=0; i < rootsLength; i++)
	{
		var curRoot = roots[i];
		var resultNode = curRoot.getNode( nodeID );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
function SAPTree_getNodeByAttribute( attribute, value )
{
	var roots = this.roots;
	var rootsLength = roots.length;
	var i;
	for(i=0; i < rootsLength; i++)
	{
		var curRoot = roots[i];
		var resultNode = curRoot.getNodeByAttribute( attribute, value );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
function SAPTree_getNodeByIndex( index )
{
	this.visitedCount = 0;

	var roots = this.roots;
	var rootsLength = roots.length;
	var i;
	for(i=0; i < rootsLength; i++)
	{
		var curRoot = roots[i];
		var resultNode = curRoot.getNodeByIndex( index );
		if( resultNode != null ) return resultNode;
	}
	return null;
}
function SAPTree_traverse( node, nodes )
{
	nodes[ nodes.length ] = node;

	var children = node.children;
	var childrenLength = children.length;
	var i;
	for( i=0; i < childrenLength; i++)
	{
		var curChild = children[i];
		this.traverse( curChild, nodes );
	}
}
function SAPTree_traverseVisibleNodes( node, nodes )
{
	nodes[ nodes.length ] = node;

	if( ( node.type == "F" ) && ( node.status == "o" ) )
	{
		var children = node.children;
		var childrenLength = children.length;
		var i;
		for( i=0; i < childrenLength; i++)
		{
			var curChild = children[i];
			this.traverseVisibleNodes( curChild, nodes );
		}
	}
}
function SAPTree_getNodes()
{
	var nodes = new Array();

	var roots = this.roots;
	var rootsLength = roots.length;
	var i;
	for(i=0; i < rootsLength; i++)
	{
		var curRoot = roots[i];
		this.traverse( curRoot, nodes );
	}

	return nodes;
}

function SAPTree_getRoots() {
   return this.roots;
}

function SAPTree_getVisibleNodes()
{
	var nodes = new Array();

	var roots = this.roots;
	var rootsLength = roots.length;
	var i;
	for(i=0; i < rootsLength; i++)
	{
		var curRoot = roots[i];
		this.traverseVisibleNodes( curRoot, nodes );
	}

	return nodes;
}
function SAPTree_getChildrenNumber( node )
{
	if( node.children == null ) return 0;
	return node.children.length;
}
/////////////////////////////////////////////////////////////////////////////////////
//filtering
function SAPTree_hideNode( node )
{
	var curNodeDiv = node.getNodeDiv();
	var curNodeChildrenDiv = node.getChildrenDiv();
	if( curNodeChildrenDiv != null ) SAPCB_HTMLElement_hide( curNodeChildrenDiv );
	SAPCB_HTMLElement_hide( curNodeDiv );
}
function SAPTree_recoverNode( node )
{
	var curNodeDiv = node.getNodeDiv();
	var curNodeChildrenDiv = node.getChildrenDiv();
	if( curNodeChildrenDiv != null ) SAPCB_HTMLElement_show( curNodeChildrenDiv );
	SAPCB_HTMLElement_show( curNodeDiv );
}
function SAPTree_nodeIsVisible( node )
{
	//traverse the path from node to its rootnode
	var curNode = node.parent;
	while( curNode != null )
	{
		if( curNode.status == "c" ) return false;
		curNode = curNode.parent;
	}
	return true;
}
/////////////////////////////////////////////////////////////////////////////////////
//rendering
function SAPTree_render()
{
	if( this.rendered != null ) return;

	var targetElement = SAPCB_getElementById( this.ID );

	if( SAPCB_NavigatorVersion == "IE5" )
	{
		var sel;
		
		sel = document.getElementById( this.ID + ":sel" );
	
		if( sel == null ) 
		{
			sel = document.createElement("span");
			sel.id = this.ID + ":sel";
			sel.className = "SItreeSelColor";
			sel.style.display = 'none';
			targetElement.appendChild( sel );
		}

		sel = document.getElementById( this.ID + ":selmark" );
	
		if( sel == null ) 
		{
			sel = document.createElement("span");
			sel.id = this.ID + ":selmark";
			sel.className = "SItreeSelColorMarked";
			sel.style.display = 'none';
			targetElement.appendChild( sel );
		}
	}
	
	if(SAP_Acc)	{
	var startImg = document.createElement("SPAN");
   	startImg.src = SAP_TemplateDynamicTreeDefaultImage;
//	startImg.alt = xtol_EnteringTree;
   	startImg.tabIndex = "0";
   	//added a different string for role editor in accessibility mode - when there is no context menu. The Role Editor code updates the 
   	//isContxtMenuEnable variable to be false.
   	if (isContxtMenuEnable)
   	{
		if(this.nodeOnContextMenu == "undefined" || this.nodeOnContextMenu == "") 
			startImg.title = xtol_EnteringTreeNoCM;
		else
			startImg.title = xtol_EnteringTree;
   	}
   	else 
   	{
   		startImg.title = xtol_EnteringTreeNoCM;
   	}
   	startImg.endImgId = "end:" + this.ID;
	startImg.onkeydown = SAPTreeBeginStatic_onkeypress;
   	startImg.id = "start:" + this.ID;
   	startImg.setAttribute("treeId", this.ID);
   	startImg.onfocus = function()
				{
					var tree = SAP_getJSTree(this.getAttribute("treeId"));
					if(tree.nodeOnContextMenu == "undefined" || tree.nodeOnContextMenu == "") startImg.title = xtol_EnteringTreeNoCM;
				};

	accStartElement = startImg;
   	targetElement.appendChild( startImg );
   	EPCM.subscribeEvent("urn:com.sapportals.portal:UiService", "focusTree", function(treeId) { startImg.focus(); } );
   	}

	this.insert( targetElement );

	if(SAP_Acc)	{
	var endImg = document.createElement("SPAN");
   	endImg.src = SAP_TemplateDynamicTreeDefaultImage;
   	endImg.alt = xtol_LeavingTree;
   	endImg.tabIndex = "-1";
	endImg.onkeydown = SAPTreeEndStatic_onkeypress;
   	endImg.id = "end:" + this.ID;
	accEndElement = endImg;
   	targetElement.appendChild( endImg );
   	}

	this.rendered = true;

	var stateInputField = document.createElement("INPUT");
	stateInputField.id = this.ID + ":state";
	stateInputField.name = this.ID;
	stateInputField.type = "HIDDEN";
	targetElement.appendChild( stateInputField );

	if( this.postloadImages ) this.postload();
}
////////////////////////////////////////////////////////////////////////////////////
//Maintainance of the tree (affects both the JavaScript Datastructure and the rendering )
function SAPTree_addNode(node,parentNode,insertionIndex) {
   if(parentNode!=null && parentNode.status=="c") {
      if(parentNode.unloaded) {
         var nodesToInsert = new Array();
         nodesToInsert[0] = node;
         var content = new ChildNodesToAdd(this,parentNode,nodesToInsert,insertionIndex);
         dynamicRefresh(this,parentNode.nodeID,null,null,"addChildrenToNode",content);
      } else {
         parentNode.toggle();
         this.JSaddNode( node, parentNode, insertionIndex );
         node.insertAt( insertionIndex );
      }
   } else {
      this.JSaddNode( node, parentNode, insertionIndex );
      node.insertAt( insertionIndex );
   }
   return true;
}

function SAPTree_moveNode( node, parentNode, insertionIndex )
{
	this.deleteNode( node );
	this.addNode( node, parentNode, insertionIndex );
}
function SAPTree_deleteNode( curNode )
{
	var selectedNodeIDs = "";
	var selectedNodes = this.selectedNodes;
	var i;
	for(i=0; i<selectedNodes.length; i++){
		var selectedNode = selectedNodes[i];
		if(i>0) selectedNodeIDs+= ",";
		selectedNodeIDs+= selectedNode.getID();
	}
//	var selectedNode = this.getSelectedNode();
//	var selectedNodeID = "";
//	if( selectedNode != null ) selectedNodeID = selectedNode.getID();

	curNode.remove();//removing curNode from DOM
	this.JSdeleteNode( curNode ); //removing curNode from javascript tree representation

	//restore selection
	/*if( selectedNode != null )
	{
		var selectedNode = this.getNode( selectedNodeID );
		this.selectedNodes = new Array();
		this.selectedNodes[0] = selectedNode;
	}*/
	if( selectedNodeIDs != "" ){
		this.resetSelection();
		var ar = selectedNodeIDs.split(",");
		var i;
		for(i=0; i<ar.length; i++){
			var selectedNodeID = ar[i];
			var selectedNode = this.getNode( selectedNodeID );
			if( selectedNode != null ){
				this.addToSelection( selectedNode );
	}
}
	}
}
function SAPTree_deleteSelectedNode()
{
	var selectedNode = this.getSelectedNode();
	if( selectedNode != null ) { this.selectedNodes = new Array(); this.deleteNode( selectedNode ); }
	else alert("nothing selected");
}
function SAPTree_deleteSelectedNodes(){
	var i;
	for(i=0;i<this.selectedNodes.length; i++){
		var selectedNode = this.selectedNodes[i];

		selectedNode.remove();//removing curNode from DOM
		this.JSdeleteNode( selectedNode ); //removing curNode from javascript tree representation

	}
	this.selectedNodes = new Array();
}
////////////////////////////////////////////////////////////////////////////////////
//misc
function SAPTree_setNodeMark( node )
{
	var curNodeDiv = node.getNodeDiv();
	if( curNodeDiv == null ) return;
	curNodeDiv.className = "SItreeNodeMarked";
}
function SAPTree_removeNodeMark( node )
{
	var curNodeDiv = node.getNodeDiv();
	if( curNodeDiv == null ) return;
	curNodeDiv.className = "SItreeNodeUnmarked";
}
////////////////////////////////////////////////////////////////////////////////////
//compatibility
function SAPTree_onload()
{
	var targetElement = SAPCB_getElementById( this.ID );
	this.render();
}
////////////////////////////////////////////////////////////////////////////////////
//size
function SAPTree_setWidth( width )
{
	var targetElement = SAPCB_getElementById( this.ID );
	if( targetElement.tagName == "DIV" ) targetElement.style.width = width;
}
function SAPTree_setHeight( height )
{
	var targetElement = SAPCB_getElementById( this.ID );
	if( targetElement.tagName == "DIV" ) targetElement.style.height = height;
}
function SAPTree_getWidth( width )
{
	var targetElement = SAPCB_getElementById( this.ID );
	if( targetElement.tagName == "DIV" ) return targetElement.offsetWidth;
	else return -1;
}
function SAPTree_getHeight( height )
{
	var targetElement = SAPCB_getElementById( this.ID );
	if( targetElement.tagName == "DIV" ) return targetElement.offsetHeight;
	else return -1;
}
////////////////////////////////////////////////////////////////////////////////////
//serialization
function SAPTree_serialize()
{
	var result = "";
	result+= "<Tree>";
	//if( this.selectedNode != null ) result+= "<selection>" + this.selectedNode.nodeID + "</selection>";
	//else result+= "<selection></selection>";

        result+= "<nodeOnAfterClick>" + this.nodeOnAfterClick + "</nodeOnAfterClick>";
        result+= "<nodeOnClick>" + this.nodeOnClick + "</nodeOnClick>";
        result+= "<nodeOnDragEnter>" + this.nodeOnDragEnter + "</nodeOnDragEnter>";
        result+= "<nodeOnDragOver>" + this.nodeOnDragOver + "</nodeOnDragOver>";
        result+= "<nodeOnDrop>" + this.nodeOnDrop + "</nodeOnDrop>";
        result+= "<nodeOnDragStart>" + this.nodeOnDragStart + "</nodeOnDragStart>";
        result+= "<nodeOnContextMenu>" + this.nodeOnContextMenu + "</nodeOnContextMenu>";
        result+= "<noedOnKeyPress>" + this.noedOnKeyPress + "</noedOnKeyPress>";
    if( this.openImage != null ) result+= "<openImage>" + this.openImage + "</openImage>";
    if( this.closeImage != null ) result+= "<closeImage>" + this.closeImage + "</closeImage>";
    if( this.onDropUrl != null ) result+= "<onDropUrl>" + this.onDropUrl + "</onDropUrl>";

	var rootArray = this.roots;
	var rootArrayLength = rootArray.length;
	var i;
	for( i=0; i < rootArrayLength; i++)
	{
		var curRoot = rootArray[i];

		result+= curRoot.serialize();
}
	result+= "</Tree>";

	var stateInputField = SAPCB_getElementById( this.ID + ":state" );
	stateInputField.value = result;

	//return result;
}
////////////////////////////////////////////////////////////////////////////////////
//construction
function SAPTree( ID, nodeOnClick, nodeOnDblClick, nodeOnDragEnter, nodeOnDragOver, nodeOnDrop, nodeOnDragStart, nodeOnContextMenu, noedOnKeyPress, nodeOnAfterClick, nodeOnPaste, nodeOnBeforePaste )
{
	this.ID = ID;
	this.nodeOnClick = nodeOnClick;
	this.nodeOnDblClick = nodeOnDblClick;
	this.nodeOnDragEnter = nodeOnDragEnter;
	this.nodeOnDragOver = nodeOnDragOver;
	this.nodeOnDrop = nodeOnDrop;
    this.nodeOnDragStart = nodeOnDragStart;
    this.nodeOnContextMenu = nodeOnContextMenu;
    this.noedOnKeyPress = noedOnKeyPress;
    this.nodeOnAfterClick = nodeOnAfterClick;
    this.nodeOnPaste = nodeOnPaste;
    this.nodeOnBeforePaste = nodeOnBeforePaste;
        

	//this.curSelection = null;
	//this.curSelection = new Array();

	this.selectedNodes = new Array();
	this.selectionAnchor = null;

	this.roots = new Array();
	this.levelArray = new Array(); //needed for efficient inorder insertion

	var SAP_treeArrayLength = SAP_treeArray.length;
	SAP_treeArray[ SAP_treeArrayLength ] = this;

	var SAP_objectArrayLength = SAP_objectArray.length;
	SAP_objectArray[ SAP_objectArrayLength ] = this;

	this.selectionMode = "MULTI";
	
	this.preloadedImages = new Array();
	
	this.imagesToBePostloaded = new Array();
	this.imageIdsToBePostloaded = "";
	this.toWrap = false;
	this.HighlightWholeLine = false;
	
}
function SAPTree_getSelectedNodes(){
	return this.selectedNodes;
}
function SAPTree_setSelectionMode( selectionMode ){
	this.selectionMode = selectionMode;
}
function SAPTree_imageIsPreloaded( preloadImage )
{
	var preloadedImages = this.preloadedImages;
	var preloadedImagesLength = preloadedImages.length;
	var i;
	for(i=0; i<preloadedImagesLength;i++)
	{
		var preloadedImage = preloadedImages[i];
		if( preloadedImage == preloadImage ) return true;
	}
	return false; 
}
function SAPTree_preloadImages( preloadImagesString, callbackString )
{
//preloading isn't needed anymore, instead just take the treeID and render it.	
	var treeId = callbackString;
	var index = callbackString.indexOf(",");
	if( index != -1 )
	{
		treeId = callback.substring(0, index);	  		
	}
	SAP_getJSTree(treeId).render();
/*
	int index = callbackString.indexOf(",");
	if( index != -1 )
	{
		try{
		 	treeId = callback.substring(0, index);	  
		 	SAPTree_render();
			SAP_getJSTree(treeId).render();
		}
		catch(e){}
	}
	
	if( SAPCB_NavigatorVersion != "IE5" )
	{
		eval( callbackString );
		return;
	}
	var preloadImages = preloadImagesString.split(",");
	var preloadImagesLength = preloadImages.length;
	var i;
	preloadImagesString = "";
	for(i=0; i<preloadImagesLength;i++)
	{
		var preloadImage = preloadImages[i];
		
		if( ! this.imageIsPreloaded( preloadImage ) )
		{
			if( preloadImagesString == "" ) preloadImagesString = preloadImage;
			else 	preloadImagesString+= "," + preloadImage;
			
			this.preloadedImages[ this.preloadedImages.length ] = preloadImage;
		}
	}
	if( preloadImagesString != "" )
	{
		var targetElement = SAPCB_getElementById( this.ID );
		var iFrameId = this.ID + "/IFRAME";
		var iFrame = SAPCB_getElementById( iFrameId );
		var src = SAP_TemplateDynamicTreePreloadUrl + "?images=" + preloadImagesString + "&callback=" + callbackString;
		if( iFrame == null ) 
		{
			////iFrame = document.createElement("IFRAME");
			////iFrame.style.position = "absolute";
			////iFrame.style.visibility = 'hidden';
			//iFrame.width = 1;
			//iFrame.height = 1;
			////iFrame.style.height = 50;
			////iFrame.style.width = 50;
			////iFrame.id = iFrameId;
			////iFrame.src = SAP_TemplateDynamicTreePreloadUrl + "?images=" + preloadImagesString + "&callback=" + callbackString;
			////targetElement.appendChild(iFrame);
			targetElement.insertAdjacentHTML( 'beforeEnd', "<IFRAME id='" + iFrameId + "' name='" + iFrameId + "' style='position:absolute; width:50; height:50; visibility: hidden' src='" + src + "'></IFRAME>" );
		}
		////else iFrame.src = SAP_TemplateDynamicTreePreloadUrl + "?images=" + preloadImagesString + "&callback=" + callbackString;
		else window.frames[ iFrameId ].location.href = src;
	}
	*/
}
function SAPTree_addImageToBePostloaded( src, id ){
	if( this.postloadImages == false ) return;
	
	var found = false;
	var imagesToBePostloaded = this.imagesToBePostloaded;
	var imagesToBePostloadedLength = imagesToBePostloaded.length;
	var i;
	for(i=0; i<imagesToBePostloadedLength; i++)
	{
		var imageSrc = imagesToBePostloaded[i];
		if( imageSrc == src ) 
		{
			found = true;
			break;	
		}
	}
	if( !found ) this.imagesToBePostloaded[ imagesToBePostloadedLength ] = src;
	if( this.imageIdsToBePostloaded != "" ) this.imageIdsToBePostloaded+=",";
	this.imageIdsToBePostloaded+= id;
}
function SAPTree_postload(){
	var images = "";
	var imagesToBePostloaded = this.imagesToBePostloaded;
	var imagesToBePostloadedLength = imagesToBePostloaded.length;
	var i;
	for(i=0; i<imagesToBePostloadedLength; i++)
	{
		var imageSrc = imagesToBePostloaded[i];
		if( images != "" ) images+= ",";
		images+= imageSrc;
	}
	
	this.imagesToBePostloaded = new Array();
//	this.imageIdsToBePostloaded
	//alert( "postload " + images );
	this.preloadImages( images, "" );
	this.imageIdsToBePostloaded = "";
}
///////////////////////////////////////////////////////////////////////////////////
//method assignment
SAPTree.prototype.setUIstate			= SAPTree_setUIstate;
SAPTree.prototype.JSi					= SAPTree_JSinorderAddNode;
SAPTree.prototype.JSaddNode				= SAPTree_JSaddNode;
SAPTree.prototype.getNode				= SAPTree_getNode;
SAPTree.prototype.insert				= SAPTree_insert;
SAPTree.prototype.render				= SAPTree_render;
SAPTree.prototype.expandNode			= SAPTree_expandNode;
SAPTree.prototype.collapseNode			= SAPTree_collapseNode;
SAPTree.prototype.getNodeByAttribute	= SAPTree_getNodeByAttribute;
SAPTree.prototype.getNodeByIndex		= SAPTree_getNodeByIndex;
SAPTree.prototype.toggleTreeNode		= SAPTree_toggleTreeNode;
SAPTree.prototype.toggleTreeNodeByName	= SAPTree_toggleTreeNodeByName;
SAPTree.prototype.toggleTreeNodeByIndex = SAPTree_toggleTreeNodeByIndex;
SAPTree.prototype.selectNode			= SAPTree_selectNode;
SAPTree.prototype.selectNodeByIndex		= SAPTree_selectNodeByIndex;
SAPTree.prototype.selectNodeByName		= SAPTree_selectNodeByName;
SAPTree.prototype.addNode				= SAPTree_addNode;
SAPTree.prototype.moveNode				= SAPTree_moveNode;
SAPTree.prototype.deleteNode			= SAPTree_deleteNode;
SAPTree.prototype.JSaddFolder			= SAPTree_JSaddFolder;
SAPTree.prototype.JSaddDocument			= SAPTree_JSaddDocument;
SAPTree.prototype.JSdeleteNode			= SAPTree_JSdeleteNode;
SAPTree.prototype.onload				= SAPTree_onload;
SAPTree.prototype.getSelectedNode		= SAPTree_getSelectedNode;
SAPTree.prototype.deleteSelectedNode	= SAPTree_deleteSelectedNode;
SAPTree.prototype.deleteSelectedNodes	= SAPTree_deleteSelectedNodes;
SAPTree.prototype.hideNode				= SAPTree_hideNode;
SAPTree.prototype.recoverNode			= SAPTree_recoverNode;
SAPTree.prototype.setWidth				= SAPTree_setWidth;
SAPTree.prototype.setHeight				= SAPTree_setHeight;
SAPTree.prototype.getWidth				= SAPTree_getWidth;
SAPTree.prototype.getHeight				= SAPTree_getHeight;
SAPTree.prototype.nodeIsVisible			= SAPTree_nodeIsVisible;
SAPTree.prototype.getNodes				= SAPTree_getNodes;
SAPTree.prototype.getVisibleNodes				= SAPTree_getVisibleNodes;
SAPTree.prototype.getRoots              = SAPTree_getRoots;
SAPTree.prototype.traverse				= SAPTree_traverse;
SAPTree.prototype.traverseVisibleNodes				= SAPTree_traverseVisibleNodes;
SAPTree.prototype.setNodeMark			= SAPTree_setNodeMark;
SAPTree.prototype.removeNodeMark		= SAPTree_removeNodeMark;
SAPTree.prototype.getChildrenNumber		= SAPTree_getChildrenNumber;
SAPTree.prototype.serialize				= SAPTree_serialize;
SAPTree.prototype.addToSelection		= SAPTree_addToSelection;
SAPTree.prototype.removeSelection		= SAPTree_removeSelection;
SAPTree.prototype.resetSelection		= SAPTree_resetSelection;
SAPTree.prototype.nodeIsSelected		= SAPTree_nodeIsSelected;
SAPTree.prototype.removeNodeFromSelection = SAPTree_removeNodeFromSelection;
SAPTree.prototype.getSelectedNodes	 = SAPTree_getSelectedNodes;
SAPTree.prototype.setSelectionMode	 = SAPTree_setSelectionMode;
SAPTree.prototype.preloadImages	 	 = SAPTree_preloadImages;
SAPTree.prototype.imageIsPreloaded	 	 = SAPTree_imageIsPreloaded;
SAPTree.prototype.addImageToBePostloaded	 	 = SAPTree_addImageToBePostloaded;
SAPTree.prototype.postload	 	 = SAPTree_postload;
SAPTree.prototype.clone	 	 = SAPTree_clone;
SAPTree.prototype.cloneNode	 	 = SAPTree_cloneNode;
SAPTree.prototype.setWrapping	 = SAPTree_setWrapping;
SAPTree.prototype.setWholeLineHighlight	 = SAPTree_setWholeLineHighlight;

function SAPTree_clone( treeID )
{
	var rTree = new SAPTree( treeID, this.nodeOnClick, this.nodeOnDblClick, this.nodeOnDragEnter, this.nodeOnDragOver, this.nodeOnDrop, this.nodeOnDragStart, this.nodeOnContextMenu, this.noedOnKeyPress, this.nodeOnAfterClick );

	var i;
	var roots = this.roots;
	var rootsLength = this.roots.length;
	
	for(i=0; i<rootsLength; i++)
	{
		var root = roots[i];
		
		this.cloneNode( root, rTree, null );	
	}
	
	for( property in this )
	{
		var value = this[ property ];
		var type = typeof( value );
		if( ( type == "number" ) || ( type == "string" ) || ( type == "boolean" ) || ( type == "undefined" ) )
		{
			if( rTree[ property ] == null ) rTree[ property ] = value;
		}	
	}
	rTree.rendered = null;
	return rTree;
}
function SAPTree_cloneNode( node, rTree, rParentNode )
{
	var rNode = new SAPTreeNode( node.nodeID, node.text, node.type, node.status );
	rTree.JSaddNode( rNode, rParentNode, null );
	
	var children = node.children;
	var childrenLength = children.length;
	var i;
	
	for(i=0; i<childrenLength;i++)
	{
		var child = children[i];
		this.cloneNode( child, rTree, rNode );	
	}
	
	for( property in node )
	{
		var value = node[ property ];
		var type = typeof( value );
		if( ( type == "number" ) || ( type == "string" ) || ( type == "boolean" ) || ( type == "undefined" ) )
		{
			if( rNode[ property ] == null ) rNode[ property ] = value;
		}	
	}
}
/////////////////////////////////////////////////////////////////////////////////////
//tree registry
var SAP_treeArray = new Array();
function SAP_getJSTree( ID )
{
	var i;
	var SAP_treeArrayLength = SAP_treeArray.length;
	for(i=0; i < SAP_treeArrayLength; i++)
	{
		var curTree = SAP_treeArray[i];
		if( curTree.ID == ID ) return curTree;
	}
	return null;
}
function SAPTreeStatic_onDrop()
{
	event.returnValue = false;
	var dragData = window.event.dataTransfer.getData("Text");
	if( dragData != null ){
		var ar;
		ar = dragData.split(":");
		if( ( ar.length == 4 ) && ( ar[0] == "SAP" ) ){
			var tree = ar[1];
			var node = ar[2];

			var node = SAP_eventObject.srcElement;
			var newNode = new SAPTreeNode( ar[3], ar[3], "D", "c" );
			node.tree.addNode( newNode, node );
		}
	}
}
function SAPTreeStatic_OnDragOver()
{
	event.returnValue = false;

	var dragData = window.event.dataTransfer.getData("Text");
	if ( dragData != null ) {
		window.event.dataTransfer.dropEffect = "move";
	} else {
	}

/*	var node = SAP_eventObject.srcElement;
	if( node != null )
	{
		if( ( node.type == "Folder" ) && ( node.status == "closed" ) )
		{
			node.tree.expandNode( node )
		}
	}*/
	}
function SAPTreeStatic_onDragStart()
{
	var node = SAP_eventObject.srcElement;
	window.event.dataTransfer.setData("Text", "SAP:" + node.tree.ID + ":" + node.nodeID + ":" + node.text );
	window.event.dataTransfer.clearData("HTML");
	window.event.dataTransfer.clearData("Image");
	window.event.dataTransfer.clearData("URL");
	window.event.dataTransfer.effectAllowed = "all";
	event.returnValue = true;
}
