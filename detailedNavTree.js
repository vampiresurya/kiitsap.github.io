var selectedNodeID;var dynNavNodeRoot;var dynamicLoadDone;var continueLoading = false;var lastSelectedNodeId =EPCM.getSAPTop().DTNlastSelectedNodeId;var TLNPath;
function reselectNode(newTree)
{
if(selectedNodeID != null)
{var historyNodeID = EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().context;if (historyNodeID == null || historyNodeID == ""){historyNodeID = EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL;}
var selectedNode = newTree.getNode(historyNodeID);if (selectedNode == null)
{selectedNode = newTree.getNode(EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL);}
var selectedNode2 = newTree.getNode(lastSelectedNodeId);if(selectedNode != null)
{continueLoading = false;newTree.addToSelection(selectedNode);}
else if(selectedNode2 != null)
{continueLoading = false;newTree.addToSelection(selectedNode2);}
else
{continueLoading = true;loadIt(newTree , EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL);}
}
else
{selectedNodeID = lastSelectedNodeId;var selectedNode2 = newTree.getNode(lastSelectedNodeId);if (selectedNode2 != null)
{continueLoading = false;newTree.addToSelection(selectedNode2);}
else
{continueLoading = true;loadIt(newTree, EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL);}
}
}
function loadIt(tree , name)
{var node = tree.getNode(name);if(node == null)
{var index = name.lastIndexOf("/");if(index < 0)
return;var newName = name.substring(0 , index);loadIt(tree , newName);
}
else
{node.getNodeDiv().getElementsByTagName("SPAN")[0].click();}
}
function selectNode()
{
var JSTree = SAP_getJSTree("DetailedNavigationTree");if(selectedNodeID != null && selectedNodeID != "")
{var nodeForSelection = JSTree.getNode(selectedNodeID);if(nodeForSelection != null)
{return JSTree.addToSelection(nodeForSelection);}
}
}
function selectNodeWrapper()
{try
{if(selectNode())
window.clearInterval(intervalRet);}
catch(e)
{return;}
}
function selectFirstInitialNodeWrapper()
{try
{selectFirstInitialNode();}
catch(e)
{return;}
window.clearInterval(intervalRet);}
function selectFirstInitialNode()
{var JSTree = SAP_getJSTree("DetailedNavigationTree");var roots = JSTree.roots;selectFirstNode(roots, JSTree);}
function selectFirstNode(nodes, JSTree)
{if(nodes.length >0 && nodes[0] != null && nodes[0].launchIn != "1")
{JSTree.addToSelection(nodes[0]);}
}
function selectFirstInitialPageNode()
{var JSTree = SAP_getJSTree("DetailedNavigationTree");var roots = JSTree.roots;selectFirstPageNode(roots, JSTree);}
function selectFirstPageNode(nodes, JSTree)
{var nodesLength = nodes.length;var i;var curNode;for(i=0; i < nodesLength; i++)
{
if( nodes[i].navNodeType == "0" || nodes[i].navNodeType == "1")
{JSTree.addToSelection(nodes[i]);break;}
}
}
var g_ContextMenuId = null;
function setContextmenuId(id)
{g_ContextMenuId = id;}
function resizeiView()
{if(EPCM.getUAType() != EPCM.MSIE)
{pageSupport.ivuRecalcTray(detailedNavTreeiViewID);}
}
/**
* clonning a node, by creating a new node and copying the original's node properties.
*/
function CloneNode(newTree, srcNode, newParent) {var newNode = new SAPTreeNode(srcNode.nodeID, srcNode.text, srcNode.type, srcNode.status);
newNode.iso = null;newNode.tree = newTree;newNode.parent = newParent;newNode.level = srcNode.level;newNode.unloaded = srcNode.unloaded;newNode.imageUrl = srcNode.imageUrl;newNode.pageStatusImageUrl	= srcNode.pageStatusImageUrl;newNode.launchURL = srcNode.launchURL;newNode.dynamicURL = srcNode.dynamicURL;newNode.folderOpenImageUrl = srcNode.folderOpenImageUrl;newNode.folderCloseImageUrl = srcNode.folderCloseImageUrl;newNode.onClickScript = srcNode.onClickScript;newNode.onDropScript = srcNode.onDropScript;newNode.onDragEnterScript = srcNode.onDragEnterScript;newNode.onDragOverScript = srcNode.onDragOverScript;newNode.onBeforePasteScript = srcNode.onBeforePasteScript;newNode.onPasteScript = srcNode.onPasteScript;newNode.navNodeType = srcNode.navNodeType;newNode.launchIn = srcNode.launchIn;newNode.folderLeaf = srcNode.folderLeaf;newNode.isLaunchable = srcNode.isLaunchable;newNode.isPortalPlace = srcNode.isPortalPlace;newNode.launchFirstNodeOnClick = srcNode.launchFirstNodeOnClick;newNode.title = srcNode.title;
newNode.children = new Array();for(var i=0; i<srcNode.children.length; i++) {newNode.children[i] = CloneNode(newTree, srcNode.children[i], newNode);}
return newNode;}
function CloneTree(srcTree)
{var newTree = new SAPTree(srcTree.ID, srcTree.nodeOnClick, srcTree.nodeOnDblClick,srcTree.nodeOnDragEnter, srcTree.nodeOnDragOver, srcTree.nodeOnDrop,srcTree.nodeOnDragStart, srcTree.nodeOnContextMenu, srcTree.noedOnKeyPress, srcTree.nodeOnAfterClick,srcTree.nodeOnPaste, srcTree.nodeOnBeforePaste);
newTree.roots = null;newTree.roots = new Array();for (var i=0 ; i< srcTree.roots.length ; i++)
{newTree.roots[i] = CloneNode(newTree, srcTree.roots[i]);}
newTree.levelArray = null;newTree.levelArray = new Array();for (var i=0 ; i< srcTree.levelArray.length ; i++)
{if (srcTree.levelArray[i])
{newTree.levelArray[i] = CloneNode(newTree, srcTree.levelArray[i], null);}
}
newTree.uiState = srcTree.uiState;newTree.toWrap = srcTree.toWrap;newTree.HighlightWholeLine = srcTree.HighlightWholeLine;newTree.openImage = srcTree.openImage;newTree.closeImage = srcTree.closeImage;newTree.documentImage = srcTree.documentImage;newTree.iso = null;newTree.rendered = null;
SAP_treeArray[ 0 ] = newTree;SAP_objectArray[ 0 ] = newTree;
var selectedNode = srcTree.selectedNodes[0];
if(selectedNode != null)
{selectedNodeID = selectedNode.nodeID;}
return newTree;}
function onDetailedNavigationTreeNodeContextMenu(event)
{if(! event)
event = window.event;
var obj = SAP_eventObject.srcElement;var anch = obj.getNodeAnchor();anch.id = obj.getID();
htmlb_ShowPopupMenu(anch.id , g_ContextMenuId , null , event);SAP_eventObject.returnValue = false;}
function RaiseFavouriteEvent ()
{var navTarget = SAP_eventObject.srcElement.getID();var additionalParams = SAP_eventObject.srcElement.additionalParams;if(additionalParams != null && additionalParams != "")
{navTarget += "&" + additionalParams;}
parent.AddToPortalFavorites(navTarget , SAP_eventObject.srcElement.getText(), SAP_eventObject.srcElement.launchIn, EPCM.getSAPTop().pageTitleBar.xsrfid);EPCM.raiseEvent("urn:com.sap.portal.navigation" , "DtnFavorites" , {Id:SAP_eventObject.srcElement.getID() , Text:SAP_eventObject.srcElement.getText()});}
function RaiseHelpEvent ()
{EPCM.raiseEvent("urn:com.sap.portal.navigation" , "DtnHelp" , {Id:SAP_eventObject.srcElement.getID() , Text:SAP_eventObject.srcElement.getText()});}
function onDetailedNavigationTreeNodeKeyPress(event)
{if(window.event && window.event.keyCode == 32)
{onDetailedNavigationTreeNodeClick();return;}
if(event && event.which == 32)
{onDetailedNavigationTreeNodeClick(event);return;}
}
function launchNavZoom(node){EPCM.raiseEvent("urn:com.sap.portal.navigation", "PortalPlace", node.nodeID)
}
function onDetailedNavigationTreeNodeClick(event)
{
var loClickedNode = SAP_eventObject.srcElement;EPCM.getSAPTop().DTNlastSelectedNodeId = loClickedNode.nodeID;
var tagName = "";if (event != null)
{
tagName = event.target.tagName;}
else
{
tagName = window.event.srcElement.tagName;}
if (SAP_eventObject.eventType == "TEXT_CLICKED")
{
if ((loClickedNode.folderLeaf == "true") && (loClickedNode.isPortalPlace == "true")){launchNavZoom(loClickedNode);return;}
if(loClickedNode.navNodeType == "2" || loClickedNode.navNodeType == "3")
{
if (loClickedNode.isPortalPlace == "true"){launchNavZoom(loClickedNode);return;}
var launchFirstNodeOnClick = loClickedNode.launchFirstNodeOnClick;
if ( launchFirstNodeOnClick == "false_without_clearing")
{
dynNavNodeRoot = null;dynamicLoad(loClickedNode);}
else
{
dynNavNodeRoot = loClickedNode;
if (dynNavNodeRoot.status == "c" &&
(dynNavNodeRoot.dynamicURL == null || dynNavNodeRoot.dynamicURL == ""))
{dynamicLoadDone = false;}
else
{dynamicLoadDone = true;}
dynamicLoad(dynNavNodeRoot);
if(dynNavNodeRoot.status == "o")
{
if(	dynNavNodeRoot != null && (dynNavNodeRoot.isLaunchable == "true" || (dynNavNodeRoot.children.length > 0
&& (dynNavNodeRoot.children[0].navNodeType == "0" || dynNavNodeRoot.children[0].navNodeType == "1"))) )
{NodeOnClickExecute(dynNavNodeRoot);}
}
}
}
else
{ 

NodeOnClickExecute(loClickedNode);}
}
else
{
dynNavNodeRoot = null;
if (loClickedNode.folderLeaf != "true")
{dynamicLoad(loClickedNode);}
}
SAP_eventObject.returnValue = false;}
var tmpTargetNode = null;
function NodeOnClickExecute(targetNode)
{if(targetNode==null)
{targetNode = tmpTargetNode;tmpTargetNode = null;}
while (targetNode.getNodeType()=='F' && ((dynamicLoadDone == false) || (targetNode.unloaded == true)))
{tmpTargetNode = targetNode;var func = "NodeOnClickExecute(null)";setTimeout(func,50);return;}
var JSTree = SAP_getJSTree("DetailedNavigationTree");
if(targetNode.launchIn == "0")
{
EPCM.getSAPTop().getDTNFocusFlag = true;}
setTreeForCaching();
var launchScript = targetNode.onClickScript;
if(EPCM.getGlobalDirty())
{launchScript = removeLaunchInParams(launchScript);}
eval(launchScript);}
function removeLaunchInParams(launchScript)
{var buildTreeParam = "buildTree=false";var navPathUpdateParam = "NavPathUpdate=false";
launchScript = launchScript.replace(buildTreeParam,"");launchScript = launchScript.replace(navPathUpdateParam,"");
return launchScript;}
function dynamicLoad(loClickedNode)
{var postParams = "parentNodeId=" + loClickedNode.getID().replace(/&/g,"~!~");
if(loClickedNode.additionalParams != null)
{postParams += "&" + loClickedNode.additionalParams;}
var tree = SAP_getJSTree("DetailedNavigationTree");dynamicRefresh(tree, loClickedNode.getID(), "detailedTreeDynamicHandler", postParams);tree.toggleTreeNode( loClickedNode );resizeiView();}
function onDetailedNavigationTreeNodeDrop(event)
{var loClickedNode = SAP_eventObject.srcElement;EPCM.getSAPTop().DTNlastSelectedNodeId = loClickedNode.nodeID;
if(loClickedNode.onDropScript != null)
{eval(loClickedNode.onDropScript);}
if(opener != null)
{if (typeof opener.EPCM != "undefined") {eval("opener.EPCM.getSAPTop().personalizePortalWindow_cacheTree = t");eval("opener.EPCM.getSAPTop().personalizePortalWindow_TLNPath = TLNPath");}
else
{eval("opener.top.personalizePortalWindow_cacheTree = t");eval("opener.top.personalizePortalWindow_TLNPath = TLNPath");}
}
else
{EPCM.getSAPTop().TLNPath = TLNPath;EPCM.getSAPTop().cacheTree = t;}
SAP_eventObject.returnValue = false;}
/**
* handling Drag Over event. If onDragOverScript exists, false is returned.
*/
function onDetailedNavigationTreeNodeDragOver(event)
{var loClickedNode = SAP_eventObject.srcElement;
if(loClickedNode.onDragOverScript != null)
{SAP_eventObject.returnValue = false;}
}
/**
* handling Drag Enter event. If onDragEnterScript exists, false is returned.
*/
function onDetailedNavigationTreeNodeDragEnter(event)
{var loClickedNode = SAP_eventObject.srcElement;
if(loClickedNode.onDragEnterScript != null)
{SAP_eventObject.returnValue = false;}
}
/**
* handling Drag Enter event. If onDragEnterScript exists, false is returned.
*/
function onDetailedNavigationTreeNodeBeforePaste(event)
{
SAP_eventObject.returnValue = false;
}
/**
* handling Drag Enter event. If onDragEnterScript exists, false is returned.
*/
function onDetailedNavigationTreeNodePaste(event)
{var loClickedNode = SAP_eventObject.srcElement;
SAP_eventObject.returnValue = false;eval(loClickedNode.onPasteScript);
}
/**
* Method handling the scripts update part hence forwarding the tree nodes part ot be handled by
* the xmlFileLoadedNodeHandler() method
*/
function detailedTreeDynamicHandler(xmlDoc)
{
dynamicLoadDone = true;
var root = xmlDoc.documentElement;
var treeUpdateNode = root.getElementsByTagName('treeupdate')[0];
xmlFileLoadedNodeHandler(treeUpdateNode);
if(	dynNavNodeRoot != null && dynNavNodeRoot.navNodeType != "0" && dynNavNodeRoot.navNodeType != "1" &&
dynNavNodeRoot.children.length > 0 &&
(dynNavNodeRoot.children[0].navNodeType == "0" || dynNavNodeRoot.children[0].navNodeType == "1"))
{NodeOnClickExecute(dynNavNodeRoot);}
var scriptsUpdateNode = root.getElementsByTagName('scripts')[0];
var children = scriptsUpdateNode.childNodes;var l = children.length;var output = "";
for (var i = 0; i < l; i++)
{if (children[i].tagName == "scriptupdate")
{eval(children[i].firstChild.xml);}
}
if(continueLoading)
{reselectNode(SAP_getJSTree("DetailedNavigationTree"));}
resizeiView();}
function getExternalCachedTree()
{if(opener == null)
return;
try
{if (typeof opener.EPCM != "undefined") {var s = " var cachedTree = opener.EPCM.getSAPTop().personalizePortalWindow_cacheTree";}
else {var s = " var cachedTree = opener.top.personalizePortalWindow_cacheTree";}
eval(s);if(cachedTree != null)
{t = CloneTree(cachedTree);t.render();reselectNode(t);}
if (typeof opener.EPCM != "undefined") {s = " var cachedTLNPath = opener.EPCM.getSAPTop().personalizePortalWindow_TLNPath";}
else {s = " var cachedTLNPath = opener.top.personalizePortalWindow_TLNPath";}
eval(s);
if(cachedTLNPath != null)
{TLNPath = cachedTLNPath;}
}
catch(e)
{
}
}
function getTLNEntries(){var navArray;var pathLength;if (opener != null){if (typeof opener.EPCM != "undefined") {if (typeof opener.EPCM.getSAPTop().gHistoryFrameworkObj != "undefined") {try {navArray = opener.EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().getPathIndexes();} catch(e) {return "";}
}
else
{return "";}
}
else
{return "";}
} else {if (typeof EPCM.getSAPTop().gHistoryFrameworkObj != "undefined" && typeof EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue() != "undefined"){navArray = EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().getPathIndexes();} else {return "";}
}
pathLength = navArray.length;
var min = displayLevel-1;if (min > pathLength)
min = pathLength;
var ret="";for (var i=0;i<min;i++){ret = ret+","+navArray[i];}
return ret;}
function getInternalCachedTree()
{try
{
if(EPCM.getSAPTop().TLNPath != null)
{lastTLNPath = EPCM.getSAPTop().TLNPath;}
if(EPCM.getSAPTop().cacheTree != null)
{t = CloneTree(EPCM.getSAPTop().cacheTree);TLNPath = getTLNEntries();var roots = t.roots;var treeOk = (TLNPath == lastTLNPath);if (!treeOk)	{EPCM.getSAPTop().gHistoryFrameworkObj.Navigate(0);}
t.render();reselectNode(t);}
}
catch(e)
{
}
}
function setTreeForCaching(secondTime)
{
if(opener != null)
{if (typeof opener.EPCM != "undefined") {eval("opener.EPCM.getSAPTop().personalizePortalWindow_cacheTree = t");eval("opener.EPCM.getSAPTop().personalizePortalWindow_TLNPath = getTLNEntries()");}
else
{if (!secondTime){setTimeout("setTreeForCaching(true)",50);}
else
{eval("opener.top.personalizePortalWindow_cacheTree = t");eval("opener.top.personalizePortalWindow_TLNPath = getTLNEntries()");}
}
}
else
{EPCM.getSAPTop().TLNPath = getTLNEntries();if(t)
EPCM.getSAPTop().cacheTree = t;}
}
function setFocusOnDtn()
{var JSTree = SAP_getJSTree("DetailedNavigationTree");var roots = JSTree.getSelectedNodes();if(roots[0] != null && roots[0]!="undefined") {try	{roots[0].getNodeAnchor().focus();} catch (e)	{}
}
}
EPCM.subscribeEvent("urn:com.sap.portal.navigation" , "DtnFocus" , setFocusOnDtn);
function setAccessKeyOnFirstNode()
{
var str = pageSupport._getIvuPageId(DetailedivuId);var str2= "trayCover_" + str;var sp=document.getElementById(str2);var trays = sp.getElementsByTagName("table");var table = trays[0];var tbodys = table.getElementsByTagName("tbody");var tbody = tbodys[0];var myTd = tbody.children[0].children[0];myTd.accessKey="n";}
EPCM.subscribeEvent("urn:com.sapportals.portal:browser","load", setAccessKeyOnFirstNode);