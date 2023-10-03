var pageTitleBar = {showBack :	false,showBreadCrumb : false,showHistory : false,showFavorites	:	false,showPortalFavorites	:	false,showCollaborate: false,numBread : false,forwardTitle : "",backTitle : "",breadFocus : true,extendedOptions	: new Array(),backForwardLink : false,showSolman : false
};
pageTitleBar.Update = function()
{if(pageTitleBar.showBack)
{pageTitleBar.setBackForwordState();}
if(pageTitleBar.showBreadCrumb)
{pageTitleBar.BuildBread(pageTitleBar.numBread);}
else
{pageTitleBar.buildTitle();}
if(pageTitleBar.showHistory)
{pageTitleBar.buildHistoryList();}
pageTitleBar.setNavPanel();};
pageTitleBar.Back = function()
{if(pageTitleBar.Mode == "preview")
return;try
{var lastNavTarget = EPCM.getSAPTop().gHistoryFrameworkObj.TrackingEntryBack();if(lastNavTarget != null && lastNavTarget != "")
{lastNavTarget.navigate();focus();document.getElementById("back").focus();}
}
catch(e)
{}
};
pageTitleBar.Forward = function()
{if(pageTitleBar.Mode == "preview")
return;try
{var lastNavTarget = EPCM.getSAPTop().gHistoryFrameworkObj.TrackingEntryForward();if(lastNavTarget != null && lastNavTarget != "")
{lastNavTarget.navigate();}
}
catch(e){}
};
pageTitleBar.setBackForwordStatePreview = function()
{try
{var backLink = document.getElementById("back");backLink.className = "urLnkFunction";backLink.href = "javascript:pageTitleBar.Back();";var forwardLink = document.getElementById("forward");forwardLink.className = "urLnkFunction";forwardLink.href = "javascript:pageTitleBar.Forward();";}
catch(e){}
};
pageTitleBar.setBackForwordState = function()
{if(pageTitleBar.Mode == "preview")
{pageTitleBar.setBackForwordStatePreview();return;}
try
{
var backLink = document.getElementById("back");if(backLink != null)
{var backObject = EPCM.getSAPTop().gHistoryFrameworkObj.GetBackObject();if (backObject == null)
{backLink.className = "urLnkDsbl";backLink.href = "#";if(!pageTitleBar.acc)
{backLink.title = "";}
else
{backLink.title = pageTitleBar.backDisableTitle;}
}
else
{var title = pageTitleBar.backTitle + " " + GetUnescapedTitle(backObject.title);backLink.title = title;backLink.className = "urLnkFunction";backLink.href = "javascript:pageTitleBar.Back();";backLink.tabIndex = 0;}
}
var forwardLink = document.getElementById("forward");if(forwardLink != null)
{var forwardObject = EPCM.getSAPTop().gHistoryFrameworkObj.GetForwardObject();if (forwardObject==null)
{forwardLink.className = "urLnkDsbl";forwardLink.href = "#";if(!pageTitleBar.acc)
{forwardLink.title = "";}
else
{forwardLink.title = pageTitleBar.forwardDisableTitle
}
}
else
{var title = pageTitleBar.forwardTitle + " " + GetUnescapedTitle(forwardObject.title);forwardLink.title = title;forwardLink.className = "urLnkFunction";forwardLink.href = "javascript:pageTitleBar.Forward();";forwardLink.tabIndex = 0;}
}
}
catch(e){}
};
pageTitleBar.AddToFavorites = function(url)
{try
{var obj = EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue();var title = GetUnescapedTitle(obj.title);url = url + "?NavigationTarget=" + obj.URL + obj.params;var context = obj.context;if (context != null && context.length > 0)
url = url + "&NavigationContext="+context;if(EPCM.getUAType() == EPCM.MSIE)
{
url = url.replace("|",encodeURI("|"));window.external.AddFavorite(url , title);}
}
catch(e){}
};
pageTitleBar.buildOptionMenu = function(ev)
{try
{var menuId = pageTitleBar.OptionMenuId;var ps = pageSupport;var num = 0;
for(var i = 0 ; i < pageTitleBar.OptionMenuSize ; i++)
{ps._removeItem(menuId , 0);
}
pageTitleBar.extendedOptions = new Array();
if(typeof(ev.dataObject) == "string")
{var arr = ev.dataObject.split("%%");var dataObject = new Object();dataObject.expand = eval(arr[0]);dataObject.refresh = eval(arr[1]);dataObject.personalize = eval(arr[2]);dataObject.help = eval(arr[3]);dataObject.details = eval(arr[4]);dataObject.print = eval(arr[5]);dataObject.favorites = eval(arr[6]);dataObject.title = arr[7];dataObject.collaborate = arr[8];}
else
{var dataObject = ev.dataObject;}
if(dataObject.expand)
{ps._createNewItem(menuId , pageTitleBar.expandTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','ExpandWorkArea','');");num++;}
if(dataObject.refresh)
{ps._createNewItem(menuId , pageTitleBar.refreshTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','RefreshWorkArea','');");num++;}
if(dataObject.personalize)
{ps._createNewItem(menuId , pageTitleBar.personalizeTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','PersonalizeWorkArea','');");num++;}
if(dataObject.help)
{ps._createNewItem(menuId , pageTitleBar.helpTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','HelpWorkArea','');");num++;}
if(dataObject.details)
{ps._createNewItem(menuId , pageTitleBar.detailsTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','DetailsWorkArea','');");num++;}
if(dataObject.print)
{ps._createNewItem(menuId , pageTitleBar.printTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','PrintWorkArea','');");num++;}
if(dataObject.favorites && pageTitleBar.showFavorites)
{var toDisable = (EPCM.getUAType() == EPCM.MSIE)?false:true;ps._createNewItem(menuId , pageTitleBar.favoritesTitle , "parent.pageTitleBar.AddToFavorites('"+EPCM._private.uipPortalPath+"');" , toDisable);num++;}
if(dataObject.favorites && pageTitleBar.showPortalFavorites)
{ps._createNewItem(menuId , pageTitleBar.portalFavoritesTitle , "parent.AddToPortalFavorites(null,null,null,'"+pageTitleBar.xsrfid+"');");num++;}
if(pageTitleBar.showCollaborate && dataObject.details) 

{ps._createNewItem(menuId, pageTitleBar.collaborateTitle, "parent.CollaborateThisPage('"+pageTitleBar.CollaborateUrl+"');");num++;}
if (pageTitleBar.showSolman && dataObject.solman) {ps._createNewItem(menuId , pageTitleBar.solmanTitle , "parent.EPCM.raiseEvent('urn:com.sapportals:navigation','ReportAProblem','');"); 

num++;}
ps._applyChanges(menuId);pageTitleBar.OptionMenuSize = num;
pageTitleBar.setTitle(dataObject.title);
}
catch(e){}
};
pageTitleBar.addOptionMenu = function(ev)
{var str = ev.dataObject;var arr = str.split("%%");var title = arr[0];var id = arr[1];var parameter = arr[1];
var raiseStr = "parent.EPCM.raiseEvent(\"com.sap.portal.navigation\" , \"PageOptionClicked\" , \" " + parameter + "\")";
var menuId = pageTitleBar.OptionMenuId;var ps = pageSupport;
ps._createNewItem(menuId , title , raiseStr);ps._applyChanges(menuId);pageTitleBar.extendedOptions[id] = pageTitleBar.OptionMenuSize;pageTitleBar.OptionMenuSize++;
};
pageTitleBar.removeOptionMenu = function(ev)
{var menuId = pageTitleBar.OptionMenuId;var ps = pageSupport;
var id = ev.dataObject;var index = pageTitleBar.extendedOptions[id];if(index)
{pageTitleBar.extendedOptions[id] = null;ps._removeItem(menuId , index);ps._applyChanges(menuId);for(var id in pageTitleBar.extendedOptions)
{var oldInd = pageTitleBar.extendedOptions[id];if(oldInd && oldInd > index)
{pageTitleBar.extendedOptions[id] = oldInd - 1;}
}
pageTitleBar.OptionMenuSize--;}
};
EPCM.subscribeEvent('urn:com.sapportals:navigation' , 'setOptionMenu' , pageTitleBar.buildOptionMenu);EPCM.subscribeEvent('urn:com.sapportals:navigation' , 'updatePageTitleBar' , pageTitleBar.Update);EPCM.subscribeEvent('urn:com.sapportals:navigation' , 'addPageOptionMenu' , pageTitleBar.addOptionMenu);EPCM.subscribeEvent('urn:com.sapportals:navigation' , 'deletePageOptionMenu' , pageTitleBar.removeOptionMenu);
pageTitleBar.setTitle = function (hasTitle)
{if(! hasTitle)
{if(! pageTitleBar.showBreadCrumb)
{var obj = document.getElementById("BreadCrumbDiv");var page = document.getElementById('pageTitleBar');obj.innerHTML = "";var title = page.title;var dot = title.lastIndexOf(".");if (dot != null && dot > 0){if (title != null){title = title.substring(0,dot);page.title = title;}
}
}
}
};
pageTitleBar.buildHistoryUrl = function(index)
{return "parent.pageTitleBar.GoToHistory("+index + ")";};
pageTitleBar.buildHistoryList = function()
{if(pageTitleBar.Mode == "preview")
{return;}
try
{var menuId = pageTitleBar.HistoryMenuId;var ps = pageSupport;
ps._removeAllItems(menuId);
for(var i=EPCM.getSAPTop().gHistoryFrameworkObj.TrackingEntries.size()-1 ; i >=0 ; i--)
{unescapedTitle = GetUnescapedTitle(EPCM.getSAPTop().gHistoryFrameworkObj.TrackingEntries.TrackingStackContainer[i].title);
if (ps._createNewItemWithUnescapedText)
{ps._createNewItemWithUnescapedText(menuId , unescapedTitle , pageTitleBar.buildHistoryUrl(i));}
else
{ps._createNewItem(menuId , unescapedTitle , pageTitleBar.buildHistoryUrl(i));}
}
ps._applyChanges(menuId);}
catch(e){}
};
pageTitleBar.GoToHistory = function(index)
{try
{EPCM.getSAPTop().gHistoryFrameworkObj.SetActiveTrackingEntryIndex(index);EPCM.getSAPTop().gHistoryFrameworkObj.AddToLastVisitedList(EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue());EPCM.getSAPTop().gHistoryFrameworkObj.Navigate(0);}
catch(e){}
};
pageTitleBar.GoToBread = function(breadIndex , historyIndex)
{try
{pageTitleBar.breadFocus = true;EPCM.getSAPTop().gHistoryFrameworkObj.CutLastVisitedListByIndex(breadIndex);EPCM.getSAPTop().gHistoryFrameworkObj.SetActiveTrackingEntryIndex(historyIndex);EPCM.getSAPTop().gHistoryFrameworkObj.Navigate(0, true);}
catch(e){}
};
pageTitleBar.BuildBreadPreview = function(depth)
{if(depth <= 0)
return;try
{
var str = "";for(var i = 0 ; i <= depth ; i++ )
{if(i == depth)
{str = '<span class="urBrcDiv">&nbsp;...&nbsp;</span>' + str;break;}
if( i == 0)
{str = '<span class="urBrcDiv">&nbsp;</span>'+
'<span class="urBrcAct"> Item '+depth +'</span>';}
else
{
var tmp = '<a class="urBrcIna" href="javascript:void(false)"> Item'+
(depth - i )+
'</a><span class="urBrcDiv">&nbsp;&gt;&nbsp;</span>';str = tmp + str;}
}
var obj = document.getElementById("BreadCrumbDiv");obj.innerHTML = str;}
catch(e){}
};
pageTitleBar.buildTitle = function()
{var title = EPCM.getSAPTop().gHistoryFrameworkObj.getLastVisitedTitle();var firstSpan = document.createElement('span');firstSpan.className = "urBrcDiv";
var secondSpan = document.createElement('span');secondSpan.className = "urBrcAct";secondSpan.tabIndex = "0";secondSpan.ti = "0";
var strongTitle = document.createElement('strong');strongTitle.innerText = title;strongTitle.textContent = title;secondSpan.appendChild(strongTitle);
var obj = document.getElementById(pageTitleBar.breadId);var page = document.getElementById('pageTitleBar');dot = page.title.indexOf('.');if(dot == -1){if (pageTitleBar.acc){page.title = page.title + '. ' + title;}
else{page.title = title;}
}
else
{page.title = page.title.substring(0,dot) + '. ' + title;}
obj.innerText="";obj.textContent="";obj.appendChild(firstSpan);obj.appendChild(secondSpan);};
pageTitleBar.BuildBread = function(depth)
{if(pageTitleBar.Mode == "preview")
{pageTitleBar.BuildBreadPreview(depth);return;}
try
{var arr = EPCM.getSAPTop().gHistoryFrameworkObj.GetLastVisitedList();var j = 0;var str = "";for(var i = arr.length -1; i >= 0 ; i-- )
{if(j++ >= depth)
{str = '<span class="urBrcDiv">&nbsp;...&nbsp;</span>' + str;break;}
if( i == arr.length -1)
{str = '<span class="urBrcDiv">&nbsp;</span>';str += '<span id="activeBread" class="urBrcAct" tabindex="0"';if(pageTitleBar.acc)
{str += ' title="'+pageTitleBar.breadActivePre + ' ' + GetUnescapedTitle(arr[i].title) + ' ' + pageTitleBar.breadActivePost + '"';}
str += '>'+GetUnescapedTitle(arr[i].title)+'</span>';}
else
{
var hisIndex = EPCM.getSAPTop().gHistoryFrameworkObj.GetEntryIndexByValue(arr[i]);var tmp = '<a class="urBrcIna" href="javascript:pageTitleBar.GoToBread('+i+','+hisIndex+')">'+
GetUnescapedTitle(arr[i].title)+
'</a><span class="urBrcDiv">&nbsp;&gt;&nbsp;</span>';str = tmp + str;
}
}
var obj = document.getElementById(pageTitleBar.breadId);
if(pageTitleBar.acc)
{var length = obj.childNodes.length;for(var i = 0 ; i < length ; i++)
{var node = obj.childNodes[0];obj.removeChild(node);}
obj.insertAdjacentHTML("afterBegin" , str);var newTitle = pageTitleBar.breadTitle.replace(/0/g,new String(arr.length));obj.title = newTitle;
if(pageTitleBar.breadFocus)
{pageTitleBar.breadFocus = false;try
{document.getElementById("activeBread").focus();}
catch(e){}
}
}
else
{obj.innerHTML = str;}
pageSupport.adjustFullPageIViews();}
catch(e){}
};
pageTitleBar.setNavPanel = function()
{try
{var activeObject = EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue();if(activeObject.getNavPanelMode() == null)
return;if(activeObject.getNavPanelMode() == "collapse")
EPCM.raiseEvent('urn:com.sapportals:framework','CollapseNavPanel', "");else
EPCM.raiseEvent('urn:com.sapportals:framework','ExpandNavPanel', "");}
catch(e){}
};
pageTitleBar.showBread = function()
{var obj = document.getElementById(pageTitleBar.breadId);if(obj != null)
{if(obj.style.display == "none")
obj.style.display = "";else
obj.style.display = "none";}
};
pageTitleBar.showList = function()
{var obj = document.getElementById("HistoryListCover");if(obj != null)
{if(obj.style.display == "none")
obj.style.display = "";else
obj.style.display = "none";}
};
pageTitleBar.showBack = function()
{var obj = document.getElementById("back");var obj2 = document.getElementById("forward");if(obj != null)
{if(obj.style.display == "none")
{obj.style.display = "";obj2.style.display = "";}
else
{obj.style.display = "none";obj2.style.display = "none";}
}
};
function GetUnescapedTitle(oldTitle)
{var newTitle = oldTitle.replace(/\\\'/g,"'");newTitle = newTitle.replace(/\\\"/g,'"');newTitle = newTitle.replace(/\\u003e/g,"");newTitle = newTitle.replace(/\\u003c/g,"");newTitle = newTitle.replace(/%20/g," ");
return newTitle;}