var pageSupport={EMBEDDED:0,URL:1,PUMPED:2,IVU_IFRM_PREFIX:"ivuFrm_",IVU_IFRM_OBJ_PREFIX:"ivuFrmObj_",IVU_FORM_OBJ_PREFIX:"ivuFormObj_",IVU_XMP_PREFIX:"ivuXmp_",IVU_IFRM_SPAN_PREFIX:"ivuFrmSpan_",TRAY_BOTTOM_BORDER_PREFIX:"trayBottomBorder_",TRAY_COVER_PREFIX:"trayCover_",TIME_OUT_CACHE_CONTENT:3,TIME_OUT_NO_CACHE_CONTENT:4,TIME_OUT_CACHE_CONTENT_CACHE_REF:5,TIME_OUT_NO_CACHE_CONTENT_CACHE_REF:6,iviews:[],iviewsBank:[],iviewsIDs:[],menuOptions:[],pageIds:[],pageGPs:[],pageId:"",isLoaded:false,IE5AutoHeightMaxLoops:360,workArea:null};pageSupport.getIvuId=function(a){if(pageSupport.workArea&&pageSupport.workArea.wnd==a){return pageSupport.workArea.id}var b=pageSupport._getIframeObj(a);return pageSupport._getIvuIdByIframe(b)};pageSupport.getIvuFrameObj=function(c){try{var b=this._getIvuPageId(c);var a=this._getIViewBank(b).getIsolation();if((a==this.URL)||(a==this.PUMPED)){var f=pageSupport.IVU_IFRM_PREFIX+b;return document.getElementById(f)}else{return null}}catch(d){return null}};pageSupport.getIvuFrameWindow=function(c){try{var b=this._getIvuPageId(c);var a=this._getIViewBank(b).getIsolation();if((a==this.URL)||(a==this.PUMPED)){var f=pageSupport.IVU_IFRM_PREFIX+b;return window.frames[f]}else{return null}}catch(d){return null}};pageSupport.ivuExpand=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.expand()}var a=this._getIvuPageId(b);return(this._ivuExpand(a))};pageSupport.ivuRefresh=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.refresh()}var a=this._getIvuPageId(b);if(!a){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","RefreshPage",b)}}else{return(this._ivuRefresh(a))}};pageSupport.ivuReload=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.reload()}var a=this._getIvuPageId(b);if(!a){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","RefreshPage",b)}}else{return(this._ivuReload(a))}};pageSupport.ivuPersonalize=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.personalize()}var a=this._getIvuPageId(b);return(this._ivuPersonalize(a))};pageSupport.ivuHelp=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.help()}var a=this._getIvuPageId(b);return(this._ivuHelp(a))};pageSupport.ivuAbout=function(b){if(pageSupport.workArea&&pageSupport.workArea.id==b){return pageSupport.workArea.about()}var a=this._getIvuPageId(b);return(this._ivuAbout(a))};pageSupport.ivuRemove=function(b){var a=this._getIvuPageId(b);return(this._ivuRemove(a))};pageSupport.ivuToogle=function(b){var a=pageSupport._getIvuPageId(b);return(pageSupport._ivuToogle(a))};pageSupport.ivuRecalcTray=function(b){var a=this._getIvuPageId(b);this._recalcTray(a)};pageSupport.ivuRecalcAllTrays=function(){for(var a in pageSupport.iviewsIDs){var c=pageSupport.iviewsIDs[a];try{pageSupport._recalcTray(c)}catch(b){}}this.adjustFullPageIViews()};pageSupport.ivuAdjustHeight=function(c,a,b){var d=pageSupport.getIvuFrameObj(c);if(d){return pageSupport.adjustHeight(d,a,b)}else{return false}};pageSupport.ivuAddTrayOption=function(a,f,b){try{if(!a){return false}if(this._checkRepeatedOption(a,f)){if(!pageSupport.isLoaded){pageSupport.menuOptions[pageSupport.menuOptions.length]=new MenuOption(a,f,b)}else{var d=new MenuOption(a,f,b);pageSupport.menuOptions[pageSupport.menuOptions.length]=d;pageSupport._addTrayOption(d.id,d.caption,d.func)}}}catch(c){return false}};pageSupport.adjustFullPageIViews=function(){pageSupport._adjustFullPageIViews()};function isNN7(){if(typeof EPCM!="undefined"){return(EPCM.getUAType()==EPCM.MOZILLA||EPCM.getUAType()==EPCM.NETSCAPE||EPCM.getUAType()==EPCM.SAFARI||EPCM.getUAType()==EPCM.CHROME)}else{return(navigator.appName=="Netscape")}}function isStandardsMode(){return EPCM.isStandardsMode()}pageSupport._addIViewBank=function(b,a){a.setIvuId(this._getIvuId(b));this.iviewsBank[b]=a};pageSupport._getIViewBank=function(a){return this.iviewsBank[a]};pageSupport._addIvuPageId=function(b,a){this.iviews[this.iviews.length]=a;this.iviewsIDs[b]=a};pageSupport._getIvuPageId=function(a){return this.iviewsIDs[a]};pageSupport._getIvuId=function(b){for(var a in this.iviewsIDs){if(this.iviewsIDs[a]==b){return a}}return null};pageSupport._setHtmlbIds=function(a,c,b){pageSupport._getIViewBank(a).setHtmlbIds(c,b)};pageSupport._getIvuIdByIframe=function(d){try{if(d!=null){var b=d.id.substring(this.IVU_IFRM_PREFIX.length);var a=pageSupport._getIViewBank(b);return a.getIvuId()}else{return""}}catch(c){return""}};pageSupport._calculateModeUrl=function(b,a){return pageSupport.__calculateModeUrl(b.getIvuId(),b.getParams(),a,b)};pageSupport.__calculateModeUrl=function(c,a,e,f){var b="local";if(f){b=pageSupport.pageGPs[f.getPageIndex()]}if(b=="remote"){var d=pageSupport.proxyModesUrl_gp}else{var d=pageSupport.proxyModesUrl}if(d.indexOf("?")!=-1){d+="&"}else{d+="?"}d+="iview_id=";d+=encodeURIComponent(c);d+="&iview_mode=";d+=e;if(a!=null&&a!=""){d+="&";d+=a}return d};pageSupport._ivuExpand=function(b){try{var i=this._getIViewBank(b);var a=this._calculateModeUrl(i,"default");a=a.replace(/\?windowId=[^&\n]*&/,"?");a=a.replace(/(\?windowId=[^&\n]*)|(&?windowId=[^&\n]*)/,"");if((i.getMethod()=="GET")&&(i.isUseForm()==false)){window.open(a)}else{var g=pageSupport.IVU_FORM_OBJ_PREFIX+b;var h=document.getElementById(g);normalizeForm(h);if(i.getMethod()!="POST"){aboutUrl=moveGetParamsToForm(h,a)}h.action=a;var c=h.target;var f=h.method;h.target="_blank";h.method="post";h.submit();h.target=c;h.method=f}return true}catch(d){return false}};pageSupport._ivuRefresh=function(b){try{var h=this._getIViewBank(b);var d=h.getIsolation();if(d==this.EMBEDDED){var k=h.getRefreshUrl();if(k==null||k==""){alert("The property 'Write Tray API' of the page must be set to 'true'!");return}window.location.href=k}else{if(d==this.URL){var c=h.getRefreshUrl();if(c==""){c=this._calculateModeUrl(h,"refresh")}if((h.getMethod()=="GET")&&(h.isUseForm()==false)){var i=pageSupport.IVU_IFRM_PREFIX+b;if(typeof EPCM!="undefined"){if(EPCM.getUAType()!=EPCM.MSIE){document.getElementById(i).src="about:blank"}}else{if((navigator.appName!="Microsoft Internet Explorer")&&(EPCM.getUAType()!==EPCM.MSIE)){document.getElementById(i).src="about:blank"}}document.getElementById(i).src=c}else{var j=pageSupport.IVU_FORM_OBJ_PREFIX+b;var f=document.getElementById(j);normalizeForm(f);if(h.getMethod()!="POST"){moveGetParamsToForm(f,c)}f.action=c;var a=f.method;f.method="post";f.submit();f.method=a}}}return true}catch(g){return false}};pageSupport._ivuReload=function(a){try{var h=this._getIViewBank(a);var b=h.getIsolation();if(b==this.EMBEDDED){var c=h.getReloadUrl();if(c==null||c==""){alert("The property 'Write Tray API' of the page must be set to 'true'!");return}window.location.href=h.getReloadUrl()}else{if(b==this.URL){var g=h.getReloadUrl();if(g==""){g=this._calculateModeUrl(h,"default")}if((h.getMethod()=="GET")&&(h.isUseForm()==false)){var i=pageSupport.IVU_IFRM_PREFIX+a;if(typeof EPCM!="undefined"){if(EPCM.getUAType()!=EPCM.MSIE){document.getElementById(i).src="about:blank"}}else{if((navigator.appName!="Microsoft Internet Explorer")&&(EPCM.getUAType()!==EPCM.MSIE)){document.getElementById(i).src="about:blank"}}document.getElementById(i).src=g}else{var j=pageSupport.IVU_FORM_OBJ_PREFIX+a;var d=document.getElementById(j);normalizeForm(d);if(h.getMethod()!="POST"){moveGetParamsToForm(d,g)}d.action=g;d.submit()}}}return true}catch(f){return false}};pageSupport._ivuPersonalize=function(b){try{var h=this._getIViewBank(b);var a=this._calculateModeUrl(h,"edit");if((h.getMethod()=="GET")&&(h.isUseForm()==false)||h.getIsolation()==this.EMBEDDED){window.open(a,"personalize","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var f=pageSupport.IVU_FORM_OBJ_PREFIX+b;var g=document.getElementById(f);normalizeForm(g);if(h.getMethod()!="POST"){moveGetParamsToForm(g,a)}g.action=a;window.open("about:blank","personalize","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var c=g.target;g.target="personalize";g.submit();g.target=c}return true}catch(d){return false}};pageSupport._ivuSM=function(b,c){try{var a=this.__calculateModeUrl(b,c,"default",null);window.open(a,"solutionManager","width=420,height=480,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");return true}catch(d){return false}};pageSupport._ivuHelp=function(b){try{var h=this._getIViewBank(b);var a=this._calculateModeUrl(h,"help");if((h.getMethod()=="GET")&&(h.isUseForm()==false)||h.getIsolation()==this.EMBEDDED){window.open(a,"help","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var f=pageSupport.IVU_FORM_OBJ_PREFIX+b;var g=document.getElementById(f);normalizeForm(g);if(h.getMethod()!="POST"){aboutUrl=moveGetParamsToForm(g,a)}g.action=a;window.open("about:blank","help","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var c=g.target;g.target="help";g.submit();g.target=c}return true}catch(d){return false}};pageSupport._ivuAbout=function(b){try{var h=this._getIViewBank(b);var a=this._calculateModeUrl(h,"about");if((h.getMethod()=="GET")&&(h.isUseForm()==false)||h.getIsolation()==this.EMBEDDED){window.open(a,"about","width=640,height=150,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var f=pageSupport.IVU_FORM_OBJ_PREFIX+b;var g=document.getElementById(f);normalizeForm(g);if(h.getMethod()!="POST"){a=moveGetParamsToForm(g,a)}g.action=a;window.open("about:blank","about","width=640,height=150,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var c=g.target;g.target="about";g.submit();g.target=c}return true}catch(d){return false}};pageSupport._ivuRemove=function(b){try{var a=pageSupport.removeIviewAlertPath+"?msg="+pageSupport.removeMessage+"&IsIe="+(navigator.appName=="Microsoft Internet Explorer"||EPCM.getUAType()==EPCM.MSIE)+"&pageId="+b;if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(window.showModalDialog(a,"","dialogHeight:140px; dialogWidth:400px; help:no; status=no; resizable=no; edge=no;")=="yes"){pageSupport._removeIview(b)}}else{window.open(a,null,"height=140, width=400, status=0, resizable=0, toolbar=0, menubar=0, location=0")}this.adjustFullPageIViews();return true}catch(c){return false}};pageSupport._setRemoveQuestionReturnValue=function(b,a){if(b=="yes"){pageSupport._removeIview(a)}};pageSupport._removeIview=function(c){try{var h=this._getIViewBank(c);h.setRemove();var f=pageSupport.TRAY_COVER_PREFIX+c;var g=document.getElementById(f);g.style.display="none";g.innerHTML="";var a=pageSupport.pageIds[h.getPageIndex()];var b=pageSupport.pageGPs[h.getPageIndex()];if(b=="remote"){var f=pageSupport.pageHelperUrl_gp}else{var f=pageSupport.pageHelperUrl}pageSupport.submitHiddenForm(f+"?remove="+encodeURIComponent(a+";"+h.getIvuId()))}catch(d){}};pageSupport._ivuToogle=function(a){try{adjustNN7Position()}catch(h){}try{var i=this._getIViewBank(a);var d=true;if(!i.isLoaded()){var b=i.getSrc();var j=pageSupport.IVU_IFRM_PREFIX+a;var c=document.getElementById(j);if((i.getMethod()=="GET")&&(i.isUseForm()==false)){c.setAttribute("src",b)}else{var k=pageSupport.IVU_FORM_OBJ_PREFIX+a;var g=document.getElementById(k);g.action=b;g.submit()}var f=c.getAttribute("fixedHeight");if(f!=null){c.style.height=f;pageSupport._recalcTray(a)}d=false}i.setToogle();pageSupport.submitHiddenForm(pageSupport.pageHelperUrl+"?toogle="+escape(i.getIvuId()+","+i.getToogle()+";"));if(d){this._adjustHeightAfterToogle(i.getIvuId())}this.adjustFullPageIViews();LayoutService.doRefresh()}catch(h){}};pageSupport.submitHiddenForm=function(b){var a=document.getElementById("pageSupportIframe");if(!a){var a=document.createElement("IFRAME");a.style.visibility="hidden";a.style.display="none";a.width=0;a.height=0;a.id="pageSupportIframe";if(emptyDocumentUrl!="undefined"){a.src=emptyDocumentUrl}a=document.body.appendChild(a)}a.src=b};pageSupport._setSrc=function(b,a){var c=this._getIViewBank(b);c.setSrc(a)};pageSupport.HandleFullPageIviewsForCop=function(){pageSupport.adjustFullPageIViews();if(typeof EPCM!="undefined"){EPCM.subscribeEvent("urn:com.sapportals.portal:browser","resize",pageSupport.adjustFullPageIViews);EPCM.subscribeEvent("urn:com.sapportals.portal:browser","load",pageSupport.adjustFullPageIViews)}};pageSupport._culcElementOffsetTopBody=function(a){var b=0;while(a!=document.body){b+=a.offsetTop;a=a.offsetParent||a.parentElement}return b};pageSupport._adjustFullPageIViews=function(){var l=document.getElementsByTagName("IFRAME");var e=l.length;var b;var k=80;var o;var j=k;var f;if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(isStandardsMode()){if(window.innerHeight&&window.innerHeight!=0){o=window.innerHeight}else{o=window.screen.availHeight}}else{o=document.body.clientHeight}if(o==0){setTimeout("pageSupport._adjustFullPageIViews()",50);return}}else{if(isNN7()){o=window.innerHeight}}for(var h=0;h<e;h++){b=l[h];f=b.getAttribute("id");if(b.getAttribute("fullPage")=="true"){if(b.getAttribute("hasTray")=="true"){var c=pageSupport.TRAY_BOTTOM_BORDER_PREFIX+f;var p=document.getElementById("end_"+c);var n;var a=pageSupport._culcElementOffsetTopBody(p);var g;var d;if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(isStandardsMode()){n=document.getElementById("start_"+c);g=pageSupport._culcElementOffsetTopBody(n);d=a-g;j=o-pageSupport._culcElementOffsetTopBody(b)-d}else{if(a>0){j=o-pageSupport._culcElementOffsetTopBody(p)+b.clientHeight}else{j=o-pageSupport._culcElementOffsetTopBody(b)}}}else{if(isNN7()){n=document.getElementById("start_"+c);g=pageSupport._culcElementOffsetTopBody(n);d=a-g;j=o-pageSupport._culcElementOffsetTopBody(b)-d}}}else{j=o-pageSupport._culcElementOffsetTopBody(b)}if(j>k){if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(isStandardsMode()){b.height=j-8;if(b.getAttribute("hasTray")=="true"){var m=pageSupport.getIvuId(pageSupport._getContentWindow(b));pageSupport.ivuRecalcTray(m)}}else{if(typeof(parent.lightning)!=="undefined"){b.style.pixelHeight=j-34}else{b.style.pixelHeight=j-2}}}else{if(isNN7()){b.height=j-8;if(b.getAttribute("hasTray")=="true"){var m=pageSupport.getIvuId(pageSupport._getContentWindow(b));pageSupport.ivuRecalcTray(m)}}}}}}};pageSupport._adjustHeightAfterToogle=function(a){var b=pageSupport.getIvuFrameObj(a);if(b&&b.getAttribute("minAutoHeight")){pageSupport.adjustHeight(b)}};pageSupport.adjustHeight=function(d,b,l,i){try{if(!d){return false}if(!i){i=0}if(i>60){return false}if(typeof(l)=="undefined"){l=true}var h=pageSupport._getIvuIdByIframe(d);var g=pageSupport._getIViewBank(pageSupport._getIvuPageId(h));if(!g.isLoaded()){return true}if(l){var a=d.getAttribute("minAutoHeight");if((a==null)||(a=="")){return false}}var k=pageSupport._getContentWindow(d);var c=k.document.domain;var j=b;if(!j){j=pageSupport._getHeight(k)}if(j>0){var a=d.getAttribute("minAutoHeight");var e=d.getAttribute("maxAutoHeight");if((a!="")&&(a!=null)){j=Math.max(j,a)}if((e!="")&&(e!=null)){j=Math.min(j,e)}if(pageSupport._applyHeight(d,j)){setTimeout("pageSupport.adjustHeight(document.getElementById('"+d.id+"'),"+b+","+l+","+(i+1)+")",50)}}else{if(i==0){setTimeout("pageSupport.adjustHeight(document.getElementById('"+d.id+"'),"+b+","+l+",0)",50)}}}catch(f){var a=d.getAttribute("minAutoHeight");if((a=="")||(a==null)||(a==0)){pageSupport._applyHeight(d,"150")}else{pageSupport._applyHeight(d,a)}return false}return true};var previousHeightDelta=0;pageSupport._applyHeight=function(d,a){var c=pageSupport._getIvuIdByIframe(d);if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(isStandardsMode()){var f=pageSupport._getIViewBank(pageSupport._getIvuPageId(c));if(f.isLoaded()){d.height=a;d.style.height=a;pageSupport.ivuRecalcTray(c)}return false}else{var e=d.style.pixelHeight;var b=a-e;if((e==a)||(b==previousHeightDelta&&b==scrollSize)){return false}previousHeightDelta=b;d.style.pixelHeight=a;return true}}else{if(isNN7()){var f=pageSupport._getIViewBank(pageSupport._getIvuPageId(c));if(f.isLoaded()){d.height=a;d.style.height=a;pageSupport.ivuRecalcTray(c)}return false}}};pageSupport.IE5onload=function(a){pageSupport._IE5onload(a,0,0)};pageSupport._IE5onload=function(h,d,b){try{if(b>pageSupport.IE5AutoHeightMaxLoops){return}var g=document.getElementById(h);var c=pageSupport._getContentWindow(g);var a=pageSupport._getHeight(c);if(a>g.style.pixelHeight){pageSupport.adjustHeight(g);if(d<2){setTimeout('pageSupport._IE5onload("'+h+'" ,'+(d+1)+" , "+(b+1)+" )",500)}}else{setTimeout('pageSupport._IE5onload("'+h+'",'+d+", "+(b+1)+")",500)}}catch(f){setTimeout('pageSupport._IE5onload("'+h+'",'+d+","+(b+1)+")",100)}};pageSupport._getContentWindow=function(b){try{return b.contentWindow}catch(a){return null}};pageSupport._getIframeObj=function(f){try{var b=document.getElementsByTagName("IFRAME");for(var a=0;a<b.length;a++){var c=b[a];var d=window.frames[c.name];if(d==f){return c}}return null}catch(g){return null}};var scrollSize=0;pageSupport._getHeight=function(b){var a=0;try{if((navigator.appName=="Microsoft Internet Explorer")||(EPCM.getUAType()==EPCM.MSIE)){if(isStandardsMode()){var c=b.document.body;a=c.scrollHeight}else{var c=b.document.body;a=c.scrollHeight+c.offsetHeight-c.clientHeight;scrollSize=c.offsetHeight-c.clientHeight}}else{if(isNN7()){var c=b.document.body;a=c.scrollHeight}}}catch(d){a=0}return a};pageSupport._recalcTray=function(b){var c=pageSupport._getIViewBank(b);var a=c.getTrayId();if((navigator.appName!="Microsoft Internet Explorer")&&(EPCM.getUAType()!==EPCM.MSIE)){if(typeof sapUrMapi_Tray_create!="undefined"){sapUrMapi_Tray_create(a,false,false,null)}}};pageSupport._getScript=function(a){try{var b=new ActiveXObject("Microsoft.XMLHTTP");b.open("GET",a,false);b.setRequestHeader("Accept-Language",navigator.browserLanguage);b.send();return b.responseText}catch(c){return""}};pageSupport.completeIViewScripts=function(g){var j="";var b="";var f="";var e,a;var h=0;var c="";var d=0;var i=0;while((e=g.search(/<script/i))>=0){c+=g.substr(0,e);g=g.substr(e);h+=e;a=g.search(/<\/script>/i);j=g.substr(0,a+9);g=g.substr(a+9);h+=(a+9);i=j.indexOf(">");d=j.search(/defer/i);if((d>-1)&&(d<i)){c+=j;continue}d=j.search(/src=/i);if((d==-1)||(d>=i)){c+=j;continue}j=j.substr(0,i+1);e=j.search(/src=/i);b=j.substr(e+5);f="";f=j.substr(7,e-7);a=b.search(/('|")/);b=b.substr(0,a);f+=j.substr(e+5+a+1);f=f.replace(/[>]/g,"");c+="\n<script "+f+"> \n//fatched \n";c+=pageSupport._getScript(b);c+="\n<\/script>\n"}c+=g;return c};pageSupport.embedTimeoutMessage=function(b,e,c,g){var d=c;var a=pageSupport._getIViewBank(c);if(a){d=a.getIvuId()}else{a=pageSupport._getIViewBank(pageSupport._getIvuPageId(d))}if(g){a.setReloadUrl(g)}var f="";switch(e){case pageSupport.TIME_OUT_CACHE_CONTENT:f=document.getElementById("pageMsgTimeoutCacheContent").innerHTML;break;case pageSupport.TIME_OUT_NO_CACHE_CONTENT:f=document.getElementById("pageMsgTimeoutNoCacheContent").innerHTML;break;case pageSupport.TIME_OUT_CACHE_CONTENT_CACHE_REF:f=document.getElementById("pageMsgTimeoutCacheContent").innerHTML;break;case pageSupport.TIME_OUT_NO_CACHE_CONTENT_CACHE_REF:f=document.getElementById("pageMsgTimeoutNoCacheContent").innerHTML;break}f=f.replace(/IVU_ID_PLACE_HOLDER/g,"'"+d+"'");switch(b){case pageSupport.EMBEDDED:document.write(f);break}};function normalizeForm(c){var b=c.childNodes;var a=0;while(a<b.length){var d=b[a];if(d.name=="sap-ext-sid"||d.name=="sap-pp-producerid"||d.name=="sap-pp-consumerBaseURL"){c.removeChild(d)}else{a++}}}function moveGetParamsToForm(b,a){try{var o=a.split("?");var d=o[1].split("&");for(var l=0;l<d.length;l++){var f=d[l].split("=");var m=f[0];var g=f[1];var k=b.childNodes;for(var h=0;h<k.length;h++){if(k[h].name==m){b.removeChild(k[h])}}g=decodeURIComponent(g);m=decodeURIComponent(m);var c=document.createElement("input");c.type="hidden";c.name=m;c.value=g;b.appendChild(c)}return o[0]}catch(n){return a}return a}pageSupport.doLoad=function(){pageSupport.isLoaded=true;var b=pageSupport.menuOptions.length;for(var a=0;a<b;a++){var c=pageSupport.menuOptions[a];setTimeout("pageSupport._addTrayOption('"+c.id+"' ,'"+c.caption+"' , '"+c.func+"')",200)}};if(typeof EPCM!="undefined"){EPCM.subscribeEvent("urn:com.sapportals.portal:browser","load",pageSupport.doLoad)}pageSupport._checkRepeatedOption=function(d,a){for(var b=0;b<this.menuOptions.length;b++){var c=this.menuOptions[b];if(c.id==d&&c.caption==a){return false}}return true};pageSupport._addTrayOption=function(d,h,f){try{var c=this._getIvuPageId(d);var b=this._getIViewBank(c);var a=b.getHoverMenuId();if(a!=null){this._createNewItem(a,h,pageSupport._adjustFunc(f,b.getIsolation(),c));this._applyChanges(a)}}catch(g){}};pageSupport._adjustFunc=function(b,c,e){if(c==pageSupport.EMBEDDED){var a="parent.setTimeout('"+b+"' , 0)";return a}else{var d=pageSupport.IVU_IFRM_PREFIX+e;if((navigator.appName!="Microsoft Internet Explorer")&&(EPCM.getUAType()!==EPCM.MSIE)){d=document.getElementById(d).name}var a="try{parent.window.frames['"+d+"'].setTimeout('"+b+"' , 0)}catch(e){parent.setTimeout('"+b+"' , 0)}";return a}};pageSupport._createNewItem=function(g,f,b,c){var e=mf_PopupMenu_getObj(g);var d=g+"_"+e.items.length;var a=mf_PopupMenu_createItem(d);a.Text=ESCAPE_TO_HTML(f);a.Enabled=!c;a.CanCheck=false;a.Checked=false;a.HasIcon=false;a.HasSeparator=false;a.HasEllipsis=false;a.HasSubMenu=false;a.POPUPMENUITEMSELECT="me.sapUrMapi_PopupMenu_hideAll();event.cancelBubble=true;"+b;mf_PopupMenu_addItem(e,a)};pageSupport._createNewItemWithUnescapedText=function(g,f,b,c){var e=mf_PopupMenu_getObj(g);var d=g+"_"+e.items.length;var a=mf_PopupMenu_createItem(d);a.Text=f;a.Enabled=!c;a.CanCheck=false;a.Checked=false;a.HasIcon=false;a.HasSeparator=false;a.HasEllipsis=false;a.HasSubMenu=false;a.POPUPMENUITEMSELECT="me.sapUrMapi_PopupMenu_hideAll();event.cancelBubble=true;"+b;mf_PopupMenu_addItem(e,a)};pageSupport._applyChanges=function(b){var a=mf_PopupMenu_getObj(b);mf_PopupMenu_apply(a)};pageSupport._removeItem=function(f,b){try{var d=mf_PopupMenu_getObj(f);if(d==null){return}var a=mf_PopupMenu_getItemByIdx(d,b);mf_PopupMenu_removeItem(d,a)}catch(c){}};pageSupport.addPageId=function(b,a,c){this.pageIds[a]=b;this.pageGPs[a]=c};pageSupport._removeAllItems=function(b){try{mf_PopupMenu_removeAllItems(mf_PopupMenu_getObj(b))}catch(a){}};pageSupport.dispatch=function(evt,func){var id=evt.dataObject.Id;if(id==null||id==""){id=pageSupport.getIvuId(evt.dataObject.Window)}if(id==null||id==""){return}return eval("pageSupport."+func+"('"+id+"')")};pageSupport.onAdjustHeight=function(b){var d=b.dataObject.Id;if(d==null||d==""){d=pageSupport.getIvuId(b.dataObject.Window)}if(d==null||d==""){return}var a=b.dataObject.Height;var c=b.dataObject.CheckMode;return pageSupport.ivuAdjustHeight(d,a,c)};pageSupport.onAddTrayOption=function(a){var d=a.dataObject.Id;if(d==null||d==""){d=pageSupport.getIvuId(a.dataObject.Window)}if(d==null||d==""){return}var b=a.dataObject.Caption;var c=a.dataObject.Func;return pageSupport.ivuAddTrayOption(d,b,c)};if(typeof EPCM!="undefined"){EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","expand",function(a){pageSupport.dispatch(a,"ivuExpand")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","refresh",function(a){pageSupport.dispatch(a,"ivuRefresh")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","reload",function(a){pageSupport.dispatch(a,"ivuReload")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","remove",function(a){pageSupport.dispatch(a,"ivuRemove")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","personalize",function(a){pageSupport.dispatch(a,"ivuPersonalize")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","help",function(a){pageSupport.dispatch(a,"ivuHelp")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","recalcTray",function(a){pageSupport.dispatch(a,"ivuRecalcTray")});EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","adjustHeight",pageSupport.onAdjustHeight);EPCM.subscribeEvent("urn:com.sapportals:pagebuilder","addOption",pageSupport.onAddTrayOption)}function iviewBank(f,M,c,E,d,O,J,D){var S="";var N=M;var x=f;var s=c;var a=E;var y=E;var h=J;var b=(D=="true");var K=false;var P="";var v="";var R=null;var t=false;var i=d;var q=O;this.getIvuId=p;this.setIvuId=j;this.getRefreshUrl=L;this.getReloadUrl=z;this.setReloadUrl=Q;this.getIsolation=u;this.getMethod=B;this.isUseForm=m;this.getInitialToogle=I;this.getToogle=w;this.setToogle=C;this.getRemove=e;this.setRemove=n;this.setHtmlbIds=l;this.getTrayId=k;this.getHoverMenuId=o;this.setSrc=A;this.getSrc=r;this.isStateChanged=G;this.isLoaded=F;this.getPageIndex=g;this.getParams=H;function w(){return a}function C(){a=(a+1)%2;t=true}function I(){return y}function j(T){return S=T}function p(){return S}function L(){return N}function z(){return x}function Q(T){x=T}function u(){return s}function B(){return h}function m(){return b}function e(){return K}function n(){K=true}function l(T,U){P=T;v=U}function k(){return P}function o(){return v}function A(T){R=T}function r(){return R}function G(){return t}function F(){if(R==null){return true}if(t==true){return true}return false}function g(){return i}function H(){return q}}function MenuOption(c,a,b){this.id=c;this.caption=a;this.func=b}function WorkArea(b,a){this.id=b;this.wnd=a?a:null;this.pageId="workarea";this.refresh=function(){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","RefreshWorkArea","")}else{workArea.Refresh(workArea.refreshUrl)}};this.personalize=function(){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","PersonalizeWorkArea","")}else{workArea.PersonalizePage(workArea.isPage)}};this.expand=function(){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","ExpandWorkArea","")}else{workArea.OpenNewWindow()}};this.help=function(){if(typeof EPCM!="undefined"){EPCM.raiseEvent("urn:com.sapportals:navigation","HelpWorkArea","")}else{workArea.Help()}};this.reload=this.refresh}function ESCAPE_TO_HTML(a){if(a===undefined||a===null){return""}return(a+"").replace(/([\"\<\>\'])/g,ESCAPE_TO_HTML.rep)}ESCAPE_TO_HTML.map={'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;"};ESCAPE_TO_HTML.rep=function(d,c){return ESCAPE_TO_HTML.map[c]||c};function toggleOpen(a){document.getElementById(a+"Content").style.display="inline";document.getElementById(a+"ToggleOpen").style.display="none";document.getElementById(a+"ToggleClose").style.display="inline";pageSupport._ivuToogle(a)}function toggleClose(a){document.getElementById(a+"Content").style.display="none";document.getElementById(a+"ToggleOpen").style.display="inline";document.getElementById(a+"ToggleClose").style.display="none";pageSupport._ivuToogle(a)};