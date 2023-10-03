var HELP_PANEL = "help";var NAV_PANEL = "nav";var HELP_PANEL_WIDTH = 360;var hasHelpPanel = false;var percentDiff = 15;var msDiff = 1;var intervalHandle;var defaultExpWidth = 220;var defaultNavPanelStatus = "exp";var collapseWidth = 8;var navPanelLocked = null;
function setExpWidth(expWidth)
{try
{EPCM.getSAPTop().expNavPanelWidth = expWidth;}
catch(e){}
}
function getExpWidth(panel)
{try
{if (panel == NAV_PANEL)
{var expWidth = EPCM.getSAPTop().expNavPanelWidth;if (expWidth == null)
expWidth = defaultExpWidth;return expWidth;}
else if (panel == HELP_PANEL)
{return HELP_PANEL_WIDTH;}
}
catch(e)
{return defaultExpWidth;}
}
function getHelpPanelWidth()
{return HELP_PANEL_WIDTH;}
function getNavPanelStatus()
{var navPanelStatus;try
{navPanelStatus = EPCM.getSAPTop().navPanelStatus;if (navPanelStatus == null)
{navPanelStatus = defaultNavPanelStatus;}
}
catch(e)
{navPanelStatus = defaultNavPanelStatus;}
return navPanelStatus;}
function resizePanel(direction)
{
var panelWidth = document.getElementById("nav_panel_div").style.width;panelWidth = pixelsToNum(panelWidth) + (direction * percentDiff);
if((panelWidth >= 50) && (panelWidth <= getDocWidth()))
{resizePanelToWidth(panelWidth);setExpWidth(panelWidth);adjustNN7Divs();}
}
function resizeHelpPanel(direction)
{
var panelWidth = document.getElementById("help_panel_div").style.width;panelWidth = pixelsToNum(panelWidth) + (direction * percentDiff);
if((panelWidth >= 50) && (panelWidth <= getDocWidth()))
{resizeHelpPanelToWidth(panelWidth);adjustNN7Divs();}
}
function resizePanelToWidth(panelWidth)
{if (EPCM.getUAType() == EPCM.MSIE)
{document.getElementById("nav_panel_td").style.width = numToPixels(panelWidth);document.getElementById("nav_panel_div").style.width = numToPixels(panelWidth);}
if (isNN7() || isStandardsMode())
{document.getElementById("nav_panel_td").style.width = numToPixels(panelWidth);var panelDiv = document.getElementById("nav_panel_div");if (panelDiv.scrollWidth > panelDiv.clientWidth)
{document.getElementById("nav_panel_div").style.width = panelDiv.scrollWidth;}
else
{document.getElementById("nav_panel_div").style.width = "100%";}
}
document.getElementById("nav_panel_div").style.width = numToPixels(panelWidth);document.getElementById("nav_container_div").style.width = "100%"
adjustContentWidth(NAV_PANEL, panelWidth);
}
function resizeHelpPanelToWidth(panelWidth)
{if (EPCM.getUAType() == EPCM.MSIE)
{document.getElementById("help_panel_td").style.width = numToPixels(panelWidth);document.getElementById("help_panel_div").style.width = numToPixels(panelWidth);}
if (isNN7() || isStandardsMode())
{document.getElementById("help_panel_td").style.width = numToPixels(panelWidth);var panelDiv = document.getElementById("help_panel_div");if (panelDiv.scrollWidth > panelDiv.clientWidth)
{document.getElementById("help_panel_div").style.width = panelDiv.scrollWidth;}
else
{document.getElementById("help_panel_div").style.width = "100%";}
}
document.getElementById("help_panel_div").style.width = numToPixels(panelWidth);adjustContentWidth(HELP_PANEL, panelWidth);}
function adjustContentWidth(panel, panelWidth)
{var docWidth = getDocWidth();if(panel == NAV_PANEL)
{if(!hasHelpPanel)
{if (docWidth != null && docWidth >= panelWidth)
{var divWidth = (docWidth - panelWidth);document.getElementById("desk_td").style.width = numToPixels(divWidth) ;document.getElementById("desk_div").style.width = numToPixels(divWidth);
}
}
else
{var helpPanelWidth = getHelpPanelWidth();if (docWidth != null && docWidth >= (panelWidth + helpPanelWidth) )
{var divWidth = (docWidth - panelWidth - helpPanelWidth);document.getElementById("desk_td").style.width = numToPixels(divWidth) ;document.getElementById("desk_div").style.width = numToPixels(divWidth);
}
}
}
else if(panel == HELP_PANEL)
{var navPanelWidth = getExpWidth(NAV_PANEL);if (docWidth != null && docWidth >= (panelWidth + navPanelWidth) )
{var divWidth = (docWidth - panelWidth - navPanelWidth);document.getElementById("desk_td").style.width = numToPixels(divWidth) ;document.getElementById("desk_div").style.width = numToPixels(divWidth);
}
}
}
function adjustPanelAndContentHeight()
{var docHeight = getDocHeight();var deskDocHeight = docHeight;var navDocHeight = docHeight;var helpDocHeight = docHeight;if (docHeight != null)
{if (EPCM.getUAType() == EPCM.MSIE)
{navDocHeight -= document.getElementById("nav_panel_buttons_table").clientHeight;navDocHeight -= 2;helpDocHeight -=2;}
if (isNN7())
{navDocHeight -= document.getElementById("nav_panel_buttons_table").clientHeight;navDocHeight -= 2;helpDocHeight -=2;}
document.getElementById("nav_panel_div").style.height = numToPixels(navDocHeight);document.getElementById("help_panel_div").style.height = numToPixels(helpDocHeight);document.getElementById("desk_div").style.height = numToPixels(deskDocHeight) ;
}
}
function getPanelHeight()
{var docHeight = getDocHeight();var navDocHeight = docHeight;if (docHeight != null)
{if (EPCM.getUAType() == EPCM.MSIE)
{if(isStandardsMode())
{navDocHeight -= 14;}
else
{navDocHeight -= document.getElementById("nav_panel_buttons_table").clientHeight;navDocHeight -= 12;}
}
if (isNN7())
{navDocHeight -= 14;}
return numToPixels(navDocHeight);}
return "";}
function getContentHeight()
{var docHeight = getDocHeight();var deskDocHeight = docHeight;if (docHeight != null)
{if(isNN7() || isStandardsMode())
{deskDocHeight -= 6;}
return numToPixels(deskDocHeight) ;}
return "";}
function adjustPageOnResize()
{adjustPanelAndContentHeight();var navPanelStatus = getNavPanelStatus();var navPanelWidth = collapseWidth;if ( navPanelStatus == "exp"){navPanelWidth = getExpWidth(NAV_PANEL);}
adjustContentWidth(NAV_PANEL,navPanelWidth );adjustNN7Divs();}
function expandPanel(panel)
{if (panel == NAV_PANEL)
{resizePanelToWidth(getExpWidth(NAV_PANEL));document.getElementById("colNavPanel").style.display = "";document.getElementById("reduceNavPanel").style.display = "";document.getElementById("enlargeNavPanel").style.display = "";document.getElementById("expNavPanel").style.display = "none";document.getElementById("nav_container_div").style.display = "";document.getElementById("nav_panel_div").className = "navPanFooter";
if (EPCM.getUAType() == EPCM.MSIE)
{if(isStandardsMode())
{adjustNN7Divs();pageSupport.ivuRecalcAllTrays();}
else
{document.getElementById("nav_panel_div").className = "navPanFooter";}
}
else
{adjustNN7Divs();pageSupport.ivuRecalcAllTrays();}
EPCM.raiseEvent("urn:com.sap.portal.uitree", "renderTree", null);
try
{EPCM.getSAPTop().navPanelStatus = "exp";}
catch (e) {}
}
else if(panel == HELP_PANEL)
{resizeHelpPanelToWidth(getHelpPanelWidth());document.getElementById("help_panel_td").style.display = "block";
}
}
function collapsePanel(panel)
{if (panel == NAV_PANEL)
{resizePanelToWidth(collapseWidth);document.getElementById("expNavPanel").style.display = "";document.getElementById("colNavPanel").style.display = "none";document.getElementById("reduceNavPanel").style.display = "none";document.getElementById("enlargeNavPanel").style.display = "none";document.getElementById("nav_container_div").style.display = "none";document.getElementById("nav_panel_div").className = "navPanCol";
adjustNN7Divs();try
{EPCM.getSAPTop().navPanelStatus = "col";}
catch (e) {}
}
else if(panel == HELP_PANEL)
{document.getElementById("help_panel_td").style.width = "0px";document.getElementById("help_panel_div").style.width = "0px";document.getElementById("help_panel_td").style.display = "none";resizeHelpPanelToWidth(0);}
}
function checkAndcollapsePanel()
{if(navPanelLocked == null)
collapsePanel(NAV_PANEL);}
function restoreNavPanelStatus()
{var navPanelStatus = getNavPanelStatus();if (navPanelStatus == "exp")
{expandPanel(NAV_PANEL);}
else
{collapsePanel(NAV_PANEL);}
}
function checkAndrestoreNavPanelStatus()
{if(navPanelLocked == null)
restoreNavPanelStatus();}
function adjustNN7Divs()
{if(isNN7() || isStandardsMode())
{var left = document.getElementById("nav_panel_div");var middle = document.getElementById("desk_div");var right = document.getElementById("help_panel_div");if (isRtL)
{right.style.right = left.style.width;}
else
{right.style.left = left.style.width;}
if (EPCM.getUAPlatform() == EPCM.MAC_PLATFORM)
{adjustMac();}
}
}
function adjustNN7Position()
{if(isNN7() || isStandardsMode())
{var left = document.getElementById("nav_panel_div");var middle = document.getElementById("desk_div");var right = document.getElementById("help_panel_div");left.style.position = "absolute";middle.style.position = "absolute";right.style.position = "absolute";}
}
function reduceHelpPanel_onmouseout()
{window.clearInterval(intervalHandle);}
function reduceHelpPanel_onmouseup()
{window.clearInterval(intervalHandle);}
function reduceHelpPanel_onmousedown()
{intervalHandle = window.setInterval("resizeHelpPanel(-1)",msDiff);}
function enlargeHelpPanel_onmouseout()
{window.clearInterval(intervalHandle);}
function enlargeHelpPanel_onmouseup()
{window.clearInterval(intervalHandle);}
function enlargeHelpPanel_onmousedown()
{intervalHandle = window.setInterval("resizeHelpPanel(1)",msDiff);}
function reduceHelpPanel_onkeypress()
{resizeHelpPanel(-1);}
function enlargeHelpPanel_onkeypress()
{resizeHelpPanel(1);}
function reduceNavPanel_onmouseout()
{if(!CostumNavPanelLocked)
{window.clearInterval(intervalHandle);}
}
function reduceNavPanel_onmouseup()
{if(!CostumNavPanelLocked)
{window.clearInterval(intervalHandle);}
}
function reduceNavPanel_onmousedown()
{if(!CostumNavPanelLocked)
{intervalHandle = window.setInterval("resizePanel(-1)",msDiff);}
}
function enlargeNavPanel_onmouseout()
{if(!CostumNavPanelLocked)
{window.clearInterval(intervalHandle);}
}
function enlargeNavPanel_onmouseup()
{if(!CostumNavPanelLocked)
{window.clearInterval(intervalHandle);}
}
function enlargeNavPanel_onmousedown()
{if(!CostumNavPanelLocked)
{intervalHandle = window.setInterval("resizePanel(1)",msDiff);}
}
function colNavPanel_onclick()
{if(!CostumNavPanelLocked)
{collapsePanel(NAV_PANEL);EPCM.raiseEvent('urn:com.sapportals:navigation','setNavTargetPanel', "collapse");}
}
function expNavPanel_onclick()
{if(!CostumNavPanelLocked)
{expandPanel(NAV_PANEL);EPCM.raiseEvent('urn:com.sapportals:navigation','setNavTargetPanel', "expand");}
}
function reduceNavPanel_onkeypress()
{if(!CostumNavPanelLocked)
{resizePanel(-1);}
}
function enlargeNavPanel_onkeypress()
{if (!CostumNavPanelLocked) {resizePanel(1);}
}
function expHelpPanel_onclick()
{expandPanel(HELP_PANEL);
hasHelpPanel = true;
}
function colHelpPanel_onclick()
{collapsePanel(HELP_PANEL);
hasHelpPanel = false;}
function pixelsToNum(per){return (parseInt(per.substr(0,(per.length-2))));
}
function numToPixels(num){return (num + "px");}
function getDocWidth(){var docWidth = null;if (EPCM.getUAType() == EPCM.MSIE) {if(isStandardsMode() && window.innerWidth)
{
docWidth = window.innerWidth -1;}
else
{docWidth = document.body.clientWidth;}
}
else if (isNN7())
{
docWidth = window.innerWidth-1;}
return docWidth;}
function getDocHeight(){var docHeight = null;if (EPCM.getUAType() == EPCM.MSIE) {if(isStandardsMode())
{if(window.innerHeight && window.innerHeight != 0)
{docHeight = window.innerHeight;}
else
{docHeight = window.screen.availHeight;}
}
else
{docHeight = document.body.clientHeight;}
}
else if (isNN7())
{docHeight = window.innerHeight;
}
return docHeight;}
function onCollapsePanel()
{navPanelStatusHis = "col";navPanelLocked = true;}
function onExpandPanel()
{navPanelStatusHis = "exp";navPanelLocked = true;}
function checkNavPanelStatus(mode)
{if(typeof(navPanelStatusHis) != 'undefined' && mode != navPanelStatusHis)
{if(navPanelStatusHis == "exp")
expandPanel(NAV_PANEL);else
collapsePanel(NAV_PANEL);}
}
function adjustMac()
{var decrease = document.getElementById("reduceNavPanel");var increase = document.getElementById("enlargeNavPanel");if(isRtL){increase.style.backgroundPosition = "right";decrease.style.width = "10%";}
else{increase.style.backgroundPosition = "left";decrease.style.width = "10%";}
}
function isStandardsMode()
{return (document.compatMode==='CSS1Compat');}
EPCM.subscribeEvent('urn:com.sapportals:framework','CollapseNavPanel', onCollapsePanel);EPCM.subscribeEvent('urn:com.sapportals:framework','ExpandNavPanel', onExpandPanel);