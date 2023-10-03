var isHoveringOn;var userAgent = navigator.userAgent.toLowerCase();var isIE = ((userAgent.indexOf("msie") != -1) && (userAgent.indexOf("opera") == -1));var isSF = (EPCM.getUAType() == EPCM.SAFARI);var isFF = (EPCM.getUAType() == EPCM.MOZILLA);
var gIsPreviewMode = false;var gIsLoaded = false;var gHoverMode = false;var localScrollLeft = 0;var gLeftPos = 0;var gNumOfTLNs = 0;var gTLNNum = 1;var gLevelOneActiveID = 0;var gLevelTwoActiveID = 0;var gLevelOneHoverID = -1;var gLevelTwoHoverID = -1;var gTimerID = -1;var curNode;
var currentPagePersonalizationUrl;
function TLN_getElementById(id) {if(gNumOfTLNs==1) {return document.getElementById(id);}
var elem = document.getElementsByName(id)[gTLNNum-1];if(elem) {return elem;}
return document.getElementById(id);}
function OpenHoverMenu(myTLNHoverMenu,event) {if(gTimerID==-1) {gTimerID = window.setInterval("OpenHoverMenu("+myTLNHoverMenu+","+event+")", 20);}
}
function StartScrollTLN(side) {if(gTimerID==-1) {gTimerID = window.setInterval("ScrollTLN('" + side + "')", 20);}
}
function StopScrollTLN() {if(gTimerID!=-1) {window.clearInterval(gTimerID);}
gTimerID = -1;}
function adjustLeftAndWidth(divElement) {if(localScrollLeft!=0) {if(isRtL) {
} else {divElement.scrollLeft = 0;divElement.style.width = parseInt(divElement.style.width) + localScrollLeft;divElement.style.left = parseInt(divElement.style.left) - localScrollLeft;}
}
return true;}
function adjustFocusToNode(node) {
if(node==null || node.tagName!="A") {return;}
var divElement = TLN_getElementById("TLNDiv");var nodeParentOffsetLeft = node.parentNode.offsetLeft;
var leftPosition;var widthInteger;var divRight;
if (!isIE)
{leftPosition = parseInt(divElement.style.left);widthInteger = parseInt (divElement.style.width);divRight = parseInt(divElement.style.right);}
else
{leftPosition = divElement.style.posLeft;widthInteger = divElement.style.posWidth;divRight = divElement.style.posRight;}
if(isRtL) {if (isFF){nodeParentOffsetLeft = node.parentNode.scrollLeft;}
var nodeRight = divElement.scrollWidth - nodeParentOffsetLeft - node.scrollWidth;var relRight = divElement.scrollWidth - (divElement.scrollLeft + divElement.offsetWidth);if(nodeRight < relRight) {divElement.scrollLeft += relRight - nodeRight + 4;
} else if(nodeRight + node.scrollWidth > relRight + divElement.offsetWidth) {divElement.scrollLeft -= nodeRight + node.scrollWidth - (relRight + divElement.offsetWidth) + 4;}
} else {
if(leftPosition + nodeParentOffsetLeft + node.offsetWidth > widthInteger + leftPosition) {localScrollLeft = nodeParentOffsetLeft + node.offsetWidth - widthInteger + (2 * node.offsetLeft);adjustLeftAndWidth(divElement);
} else if(leftPosition + nodeParentOffsetLeft < gLeftPos) {localScrollLeft = leftPosition + nodeParentOffsetLeft - node.offsetLeft;adjustLeftAndWidth(divElement);}
}
return true;}
function setTLNSizeWithResetOnRtL()
{
if(isRtL) {SetTLNSize(true);} else {SetTLNSize(false);}
}
function SetTLNSize(reset) {if(reset==null) {reset = false;}
var divElement = TLN_getElementById("TLNDiv" );var notchElement = TLN_getElementById("NotchTD");gLeftPos = notchElement.offsetWidth - 2;if(isRtL)
{notchElement.style.posLeft = document.body.offsetWidth - notchElement.offsetWidth - 4;if(reset)
{if(divElement.offsetLeft < TLN_getElementById("LeftScroll").offsetWidth +
TLN_getElementById("RightScroll").offsetWidth +
TLN_getElementById("MenuScroll").offsetWidth)
{divElement.style.right = gLeftPos - 1; 

divElement.style.right = gLeftPos;}
else
{divElement.style.right = gLeftPos;}
}
setTLNWidth(reset); 

}
else
{if(reset)
{divElement.style.left = gLeftPos;}
}
SetScrollbars();
if(isRtL)
{setTLNWidth(reset); 

setTLNWidth(reset); 

if(!isIE)
{
divElement.style.width = TLN_getElementById('TLNTable').offsetWidth - TLN_getElementById('NotchTD').offsetWidth - TLN_getElementById('LeftScroll').offsetWidth - TLN_getElementById('RightScroll').offsetWidth + 1;}
}
else
{if (!isIE)
{if (isSF)
{document.body.style.overflowY="hidden";divElement.style.width = divElement.parentNode.offsetWidth - parseInt(divElement.style.left)+ TLN_getElementById('NotchTD').offsetWidth -1;document.body.style.overflowY="inherit";
}
else
{
setTimeout('setTLNDivWidthNonIE()',100);setTLNDivWidthNonIE();}
}
else
{divElement.style.width = divElement.parentNode.offsetWidth - parseInt(divElement.style.left);}
}
}
function setTLNDivWidthNonIE()
{var divElement = TLN_getElementById("TLNDiv" );var tableWidth = TLN_getElementById('TLNTable').offsetWidth;var notchWidth = TLN_getElementById('NotchTD').offsetWidth;var leftScrollWidth = TLN_getElementById('LeftScroll').offsetWidth;var rightScrollWidth = TLN_getElementById('RightScroll').offsetWidth;var overflowMenuWidth = TLN_getElementById('MenuScroll').offsetWidth;
var scrollLeftRelativeOffset = parseInt(divElement.style.left)-6;
var firefoxOffset = 1
if (overflowMenuWidth)
{divElement.style.width = tableWidth - notchWidth - leftScrollWidth - rightScrollWidth - scrollLeftRelativeOffset - overflowMenuWidth +firefoxOffset;}
else
{divElement.style.width = tableWidth - notchWidth - leftScrollWidth - rightScrollWidth - scrollLeftRelativeOffset +firefoxOffset;}
}
var lastTDOnLevel1 = null;var lastTDOnLevel2 = null;
function setTLNWidth(reset)
{var divElement = TLN_getElementById("TLNDiv");var div1 = TLN_getElementById("Level1DIV");var div2 = TLN_getElementById("Level2DIV");
if(isRtL)
{var notchElement = TLN_getElementById("NotchTD" );divElement.style.posWidth = divElement.parentNode.offsetWidth - gLeftPos - 1;if(lastTDOnLevel1!=null)
{var levelsMaxRightSideOffset = (lastTDOnLevel1.offsetLeft < lastTDOnLevel2.offsetLeft?
divElement.scrollWidth - lastTDOnLevel1.offsetLeft :
divElement.scrollWidth - lastTDOnLevel2.offsetLeft) + 10;var neededWidth = (levelsMaxRightSideOffset > divElement.style.posWidth ?
levelsMaxRightSideOffset : divElement.style.posWidth) - 1;if(isIE) {div1.style.posWidth = neededWidth;div2.style.posWidth = neededWidth;}else {
div1.style.width = neededWidth;div2.style.width = neededWidth;}
}
else
{var levelsMaxRightSideOffset = divElement.scrollWidth - lastTDOnLevel2.offsetLeft;if(isIE) {div2.style.posWidth = (levelsMaxRightSideOffset > divElement.style.posWidth ?
levelsMaxRightSideOffset : divElement.style.posWidth) -1;}else {div2.style.width = (levelsMaxRightSideOffset > divElement.style.posWidth ?
levelsMaxRightSideOffset : divElement.style.posWidth) -1;}
}
if(isIE) {divElement.style.posWidth = (divElement.style.posWidth < div2.style.posWidth ?
divElement.style.posWidth : div2.style.posWidth);}else {divElement.style.width = (divElement.style.posWidth < div2.style.posWidth ?
divElement.style.posWidth : div2.style.posWidth);}
}
else
{div1Width = parseInt(div1.style.width);div2Width = parseInt(div2.style.width);if(div1Width>div2Width)
{div2.style.width = div1Width;}
else
{div1.style.width = div2Width;}
if(isIE)
{divElement.style.posWidth = divElement.parentNode.offsetWidth - divElement.style.posLeft;}
else
{divElement.style.width = divElement.parentNode.offsetWidth - parseInt(divElement.style.left) + gLeftPos - 1;}
}
}
function SetTLNHeightAndSize() {var divElement = TLN_getElementById("TLNDiv");var scrollHeight = divElement.scrollHeight;var heightAdjustment = (isIE)? 0:2;if(scrollHeight!=parseInt(divElement.style.height)) {divElement.style.height = scrollHeight;TLN_getElementById("NotchTD" ).style.height = scrollHeight - heightAdjustment;TLN_getElementById("LeftScroll" ).style.height = scrollHeight;TLN_getElementById("RightScroll").style.height = scrollHeight;TLN_getElementById("MenuScroll" ).style.height = scrollHeight;TLN_getElementById("TLNTable" ).style.height = scrollHeight + 1;SetTLNSize(true);AdjustFrameworkPage();}
}
function AdjustFrameworkPage() {try {
pageSupport.adjustFullPageIViews();} catch(e) {}
}
function SetScrollbars() {var levelOneEndElem = TLN_getElementById("LevelOneEnd");var levelTwoEndElem = TLN_getElementById("LevelTwoEnd");var divElement = TLN_getElementById("TLNDiv" );var parentOffsetWidth = divElement.parentNode.offsetWidth;var leftPosition;
if (!isIE)
{leftPosition = parseInt(divElement.style.left);}
else
{leftPosition = divElement.style.posLeft;}
if(levelOneEndElem==null)
{levelOneEndElem = levelTwoEndElem;}
var displayMode = 'none';var visibleMode = (isIE? 'block' : '');
if(gIsPreviewMode)
{displayMode = visibleMode;}
else if(divElement.offsetWidth > 0)
{if(isRtL )
{if(divElement.scrollWidth > divElement.offsetWidth)
{displayMode = visibleMode;}
}
else if(levelTwoEndElem.offsetLeft + gLeftPos > parentOffsetWidth ||
levelOneEndElem.offsetLeft + gLeftPos > parentOffsetWidth ||
leftPosition < gLeftPos)
{displayMode = visibleMode;}
}
TLN_getElementById("LeftScroll" ).style.display = displayMode;TLN_getElementById("RightScroll").style.display = displayMode;
if((displayOverflow==1&&levels==1)||(displayOverflow==2))
TLN_getElementById("MenuScroll").style.display = displayMode;else
TLN_getElementById("MenuScroll").style.display = 'none';}
function SetTopPosition() {var divElement = TLN_getElementById("TLNDiv");if(isIE) {var notchElem = TLN_getElementById("NotchTD");var offsetTop = notchElem.offsetTop;var myParent = notchElem.offsetParent;while(myParent.tagName!="BODY") {offsetTop += myParent.offsetTop;myParent = myParent.offsetParent;}
divElement.style.top = offsetTop;} else {var tableElem = TLN_getElementById("TLNTable");var offsetTop = tableElem.offsetTop;var myParent = tableElem.offsetParent;while(myParent.tagName!="BODY") {offsetTop += myParent.offsetTop;myParent = myParent.offsetParent;}
divElement.style.top = offsetTop + 1; 

}
}
function NavNode(name, title, showType, windowName, windowHeight, windowWidth, windowFeatures, tooltip) {this.name = name;this.title = title;this.showType = showType;this.windowName = windowName;this.windowHeight = windowHeight;this.windowWidth = windowWidth;this.windowFeatures = windowFeatures;this.tooltip = tooltip;this.children = new Array(arguments.length - 8);for(var i=8 ; i<arguments.length ; i++) {this.children[i-8] = arguments[i];}
this.render = render;}
function doOnMouseEnter(level, id) {
if(gIsPreviewMode) {return;}
if((level == 2) || (gLevelOneActiveID != id)) {gHoverMode = true;}
if(level==1) {gLevelOneHoverID = id;printLevel1Table(gNavTree, gLevelOneActiveID, id);printLevel2Table(gNavTree.children[id], gLevelTwoActiveID, id);SetTLNSize();}
gHoverMode = false;}
function printLevel(navNodes, level, activeID, hoverID, firstLevelStyle) {var str = "";var rightTDClassSuffix = "";var numOfNodes = navNodes.children.length;for(var i=0; i<numOfNodes; i++) {str += navNodes.children[i].render(level, i, (i == activeID), (i == hoverID), (i == numOfNodes-1), firstLevelStyle, gHoverMode);}
if(gHoverMode) {rightTDClassSuffix = "Hover";}
if(level==1) {str += "<TD id=LevelOneEnd width=0></TD><TD id='LevelOneEndSpace' nowrap class=\"prtlTopNav1stLvl-right\">&nbsp;</TD>";} else if(firstLevelStyle) {str += "<TD id=LevelTwoEnd width=0></TD><TD id='LevelTwoEndSpace' nowrap class=\"prtlTopNav1stLvl-right\">&nbsp;</TD>"
} else {str += "<TD id=LevelTwoEnd width=0></TD><TD id='LevelTwoEndSpace' nowrap class=\"prtlTopNav2ndLvlRight" + rightTDClassSuffix + "\">&nbsp;</TD>";}
return str;}
function printLevel1Table(navNodes, levelOneActiveID, levelOneHoverID) {
var levelContent = printLevel(navNodes, 1, levelOneActiveID, levelOneHoverID);if(isIE) {TLN_getElementById("level1").outerHTML = "<TABLE id=level1 border=0 cellspacing=0 cellpadding=0 onresize='SetTLNHeightAndSize()' style=\"width:100%;\"><TR>" + levelContent + "</TR></TABLE>";} else {TLN_getElementById("level1").innerHTML = "<TR>" + levelContent + "</TR>";}
if(isRtL) {lastTDOnLevel1 = TLN_getElementById("navNode_1_" + (navNodes.children.length-1));}
gLevelOneActiveID = levelOneActiveID;}
function printLevel2Table(navNodes, levelTwoActiveID, levelOneHoverID, firstLevelStyle) {var levelContent = printLevel(navNodes, 2, levelTwoActiveID, levelOneHoverID, firstLevelStyle);if(isIE) {TLN_getElementById("level2").outerHTML = "<TABLE id=level2 border=\"0\"cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%;\"><TR>" + levelContent + "</TR></TABLE>";} else {if(firstLevelStyle==true)
TLN_getElementById("level2").innerHTML = "<TR>" + levelContent + "<TD nowrap class=\"prtlTopNav1stLvl-right\" style=\"width:100%;\">&nbsp;</TD></TR>";else
TLN_getElementById("level2").innerHTML = "<TR>" + levelContent + "<TD nowrap class=\"prtlTopNav2ndLvlRight\" style=\"width:100%;\">&nbsp;</TD></TR>";}
if(isRtL) {lastTDOnLevel2 = TLN_getElementById("navNode_2_" + (navNodes.children.length-1));}
gLevelTwoActiveID = levelTwoActiveID;}
function onNewHistoryObj(evt) {var target = evt.dataObject.URL;EPCM.getSAPTop().amirselected = target;EPCM.raiseEvent("urn:com.sapportals:navigation", "UpdateTLNByBrowser", target);}
EPCM.subscribeEvent("urn:com.sapportals.portal:browser" , "resize" , setTLNSizeWithResetOnRtL);EPCM.subscribeEvent("urn:com.sapportals:navigation" , "AddNavTarget" , onNewHistoryObj);EPCM.subscribeEvent("urn:com.sapportals:navigation" , "AddNavTargetAllowDuplicate", onNewHistoryObj);EPCM.subscribeEvent("urn:com.sapportals.portal:navigation", "setTlnSize" , setTLNSizeWithResetOnRtL);