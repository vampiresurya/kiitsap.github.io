// -------------------------------------------------------------------------
//
//  Dynamic loading support
//
// -------------------------------------------------------------------------
function addExtraAttributes(node, extraAttributes) {
   if(extraAttributes!=null) {
      var length = extraAttributes.length;
      for(var i=0; i<length; i++) {
         node[extraAttributes[i]] = extraAttributes[i+1];
         i++;
      }
   }
}

function addNewOrUpdateExistingNode(tree, id, text, status, parentNode, unloaded, extraAttributes, insertionIndex) {
   var existingNode = tree.getNode(id);
   if(existingNode!=null) {
      // Existing node (update it's attributes aside from "status")
      addExtraAttributes(existingNode, extraAttributes);
      if(existingNode.text!=text) {
         existingNode.text = text;
         existingNode.setText(text);
      }
      existingNode.doDynamicDelete      = false;
      existingNode.getNodeAnchor().href = existingNode.href!=null? existingNode.href : "#";
      if(existingNode.unloaded) {
         existingNode.unloaded = unloaded;
      }

      var image = existingNode.getImage();
      if(existingNode.type=="F") {
         if(existingNode.getNodeDiv()!=null && image!=null) {
            if(existingNode.status=="c" && existingNode.folderCloseImageUrl!=null) {
               image.src = existingNode.folderCloseImageUrl;
            }
            if(existingNode.status=="o" && existingNode.folderOpenImageUrl!=null) {
               image.src = existingNode.folderOpenImageUrl;
            }
         }
      } else {
         existingNode.setIcon(existingNode.imageUrl);
      }

      var div = existingNode.getNodeDiv();
      if(div!=null) {
         if(existingNode.title!=null) {
            div.title = existingNode.title;
	     } else if(div.title!=null) {
            div.title = "";
	     }
      }
      return existingNode;
   } else if(parentNode!=null) {
      // New node (update it's attributes aside from "status")
      var newNode = tree.JSaddFolder(id, text, status, parentNode, insertionIndex);
      addExtraAttributes(newNode, extraAttributes);
      newNode.unloaded        = unloaded;
      newNode.doDynamicDelete = false;

      var childrenDiv = parentNode.getChildrenDiv();
      if(childrenDiv==null) {
         parentNode.insertChildrenDynamic();
      } else {
         newNode.insert(childrenDiv, insertionIndex);
         if(parentNode.status!="o") {
            SAPCB_HTMLElement_hide(childrenDiv);
         }
      }
      return newNode;
   }
   return null;
}

// Inserts an xml document as a subtree to the provided node
function xmlFileLoaded(xmlDoc) {
    // !!!!!!!!! check later if we need to treat the node status
    if(xmlDoc==null ||
       xmlDoc.documentElement==null) {
       return;
    }
    // there is one extra level of tree elements
    var root = xmlDoc.documentElement;
    if(root.tagName=="error") {
       xmlFileLoadedErrorHandler(root);
    } else {
       xmlFileLoadedNodeHandler(root);
    }
}

function xmlFileLoadedErrorHandler(xmlRootNode) {
    var treeId = xmlRootNode.getAttribute("id");
    if (treeId != null) {
        var tree = SAP_getJSTree(treeId);
        if (tree != null && tree.dynamicLoadErrorHandler != null) {
            var errorMsg = xmlRootNode.getAttribute("msg");
            eval(tree.dynamicLoadErrorHandler + "('" + errorMsg + "')");
        }
    }
}

// Inserts an xml node as a subtree to the provided node
function xmlFileLoadedNodeHandler(xmlRootNode) {
   var treeId = xmlRootNode.getAttribute("id");
   if(treeId!=null) {
      var tree           = SAP_getJSTree(treeId);
      var children       = xmlRootNode.childNodes;
      var child          = null;
      var length         = children.length;
      var insertionIndex = 0;
      for(var i=0; i<length; i++) {
         child = children[i];
         if(child.tagName=="treenode") {
            addXmlNode(tree, child, null, insertionIndex++);
         }
      }
   }
}

function addXmlNode(tree, xmlNode, parentNode, insertionIndex) {
   // retreive attributes
   var extraAttributes = new Array();
   var attributeName;
   var attributeValue;
   for(var i=0; i<xmlNode.attributes.length; i++) {
      attributeName  = xmlNode.attributes[i].nodeName;
      attributeValue = xmlNode.attributes[i].nodeValue;
      if(attributeName=="id") {
         var id = attributeValue;
      } else if(attributeName=="text") {
         var text = attributeValue;
      } else if(attributeName=="status") {
         var status = attributeValue;
      } else if(attributeName=="unloaded") {
         var unloaded = attributeValue=="true"? true : false;
      } else {
         extraAttributes[extraAttributes.length] = attributeName;
         extraAttributes[extraAttributes.length] = attributeValue;
      }         
   }
   var newNode = addNewOrUpdateExistingNode(tree,
                                            id,
                                            text,
                                            status,
                                            parentNode,
                                            unloaded,
                                            extraAttributes,
                                            insertionIndex);
   if(newNode!=null && !unloaded) {
      // Mark the children for deleting (thos that are updated will not be deleted later)
      var childNodes = newNode.getChildren();
      var childNode  = null;
      var length     = childNodes.length;
      for(var i=0; i<length; i++) {
        childNode = childNodes[i];
        childNode.doDynamicDelete= true;
		if(childNode.type=="F")
		{
			if(childNode.status=="o")
				childNode.toggle();
			 cleanChilds(childNode,tree);
		}
      }
      // Add/update them (thus removing the delete flag)
      var insertionIndex = 0;
      var xmlChildren    = xmlNode.childNodes;
      var xmlChild       = null;
      length             = xmlChildren.length;
      for(var i=0; i<length; i++) {
         xmlChild = xmlChildren[i];
         if(xmlChild.tagName=="treenode") {
            addXmlNode(tree, xmlChild, newNode, insertionIndex++);
         }
      }
      // Delete the unupdated
      length = childNodes.length;
      for(var i=0; i<length; i++) {
         childNode = childNodes[i];
         if(childNode.doDynamicDelete) {
            tree.deleteNode(childNode);
         }
      }
   } else {
      // Add/update new children
      var insertionIndex = 0;
      var xmlChildren    = xmlNode.childNodes;
      var xmlChild       = null;
      var length         = xmlChildren.length;
      for(var i=0; i<length; i++) {
         xmlChild = xmlChildren[i];
         if(xmlChild.tagName=="treenode") {
            addXmlNode(tree, xmlChild, newNode, insertionIndex++);
         }
      }
   }
}

function cleanChilds(node,tree)
{
	var childNodes = node.getChildren();
	var length = childNodes.length;
	for(var i=0;i<length;i++)
		cleanChilds(childNodes[i],tree)
	 tree.deleteNode(node);
}

// The main function for dynamically refreshing a node (loading the contents from the server).
// If no xml Event handler is provided, xmlFileLoaded() is called.
// The following can be null:
// xmlEventHandler
// postParams
// afterLoadEventHandler
// afterLoadEventHandlerData
function dynamicRefresh(tree, parentId, xmlEventHandler, postParams, afterLoadEventHandler, afterLoadEventHandlerData) {
    var parentNode = tree.getNode(parentId);
    if(parentNode==null              ||
       !parentNode.unloaded          ||
       parentNode.dynamicURL == null ||
       parentNode.dynamicURL == "") {
       return;
    }
    // Add a dummy "Loading..." node
    if(parentNode.unloaded) {
        addNewOrUpdateExistingNode(tree,
                                   parentId + "_Loading",
                                   xmsg_loading!=null ? xmsg_loading : "Loading...",
                                   "c",
                                   parentNode);
    }
    loadXml(parentNode.dynamicURL,
            xmlEventHandler!=null? xmlEventHandler : "xmlFileLoaded",
            null,
            null,
            postParams,
            afterLoadEventHandler,
            afterLoadEventHandlerData);
}

function ChildNodesToAdd(tree,parentNode,nodesToInsert,insertionIndex) {
   this.tree           = tree;
   this.parentNode     = parentNode;
   this.nodesToInsert  = nodesToInsert;
   this.insertionIndex = insertionIndex;
}

function addChildrenToNode(childNodesToAdd) {
   if(childNodesToAdd==null) {
      return;
   }
   for(var i=0; i<childNodesToAdd.nodesToInsert.length; i++) {
      childNodesToAdd.tree.addNode(childNodesToAdd.nodesToInsert[i],
                                   childNodesToAdd.parentNode,
                                   childNodesToAdd.insertionIndex);
   }
   EPCM.raiseEvent('urn:com.sapportals.appdesigner:contentCatalog','refreshNode', childNodesToAdd.parentNode.getID());
}

