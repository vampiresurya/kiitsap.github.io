var workArea={iviewId:"",refreshUrl:"",expandUrl:"",helpUrl:"",personalizeUrl:"",smiViewUrl:"",isPage:true,isBBiView:false,method:"GET"};workArea.getPageSupport=function(){if(typeof(pageSupport)!="undefined"){return pageSupport}return EPCM.getSAPTop().pageSupport};workArea.getUrl=function(b){var a=EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().params;if(a==""){a="NavigationTarget="+EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL}else{a+="&NavigationTarget="+EPCM.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL}return workArea.getPageSupport().__calculateModeUrl(workArea.iviewId,a,b)};workArea.PersonalizePage=function(f,d){try{var a=workArea.getUrl("edit");if(f&&!d){if(a.indexOf("?")==-1){a=a+"?refreshToken="+encodeURIComponent(workArea.iviewId)}else{a=a+"&refreshToken="+encodeURIComponent(workArea.iviewId)}if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"&sapDocumentRenderingMode=standards"}else{a=a+"&sapDocumentRenderingMode=quirks"}if(workArea.method=="GET"){window.open(a,"PersonalizePage","toolbar=no,menubar=no,resizable=yes")}else{var g="isolatedWorkAreaForm";var h=document.getElementById(g);workArea.parseFormParameters(h);h.action=a;window.open("about:blank","PersonalizePage","toolbar=no,menubar=no,resizable=yes");var b=h.target;h.target="PersonalizePage";h.submit();h.target=b}}else{if(a.indexOf("?")==-1){if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"?sapDocumentRenderingMode=standards"}else{a=a+"?sapDocumentRenderingMode=quirks"}}else{if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"&sapDocumentRenderingMode=standards"}else{a=a+"&sapDocumentRenderingMode=quirks"}}if(workArea.method=="GET"){window.open(a,"PersonalizePage","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var g="isolatedWorkAreaForm";var h=document.getElementById(g);workArea.parseFormParameters(h);h.action=a;window.open("about:blank","PersonalizePage","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var b=h.target;h.target="PersonalizePage";h.submit();h.target=b}}}catch(c){}};workArea.OpenNewWindow=function(){try{var a=workArea.getUrl("default");a=a.replace(/\?windowId=[^&\n]*&/,"?");a=a.replace(/(\?windowId=[^&\n]*)|(&?windowId=[^&\n]*)/,"");try{var g=EPCM.getSAPTop();if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a+="&sapDocumentRenderingMode=standards"}}catch(d){}if(workArea.method=="GET"){window.open(a)}else{var h="isolatedWorkAreaForm";var i=document.getElementById(h);i.action=a;var c=i.target;i.target="_blank";var b=i.innerHTML;workArea.parseFormParameters(i);i.submit();i.target=c;i.innerHTML=b}}catch(f){}};workArea.OnProblemReport=function(a){workArea.reportProblem()};workArea.reportProblem=function(){try{var a=workArea.getSMiViewURL();window.open(a,"solutionManager","width=420,height=480,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");return true}catch(b){return false}};workArea.getSMiViewURL=function(){return workArea.getPageSupport().__calculateModeUrl(workArea.smiViewUrl,"requestSupportiView="+workArea.iviewId,"default",null)};workArea.Refresh=function(a){try{var g=document.getElementById("isolatedWorkArea");EPCM.DSM.terminateAll(EPCM.DSM.ABORT);if(workArea.method=="GET"){if(g!=null){g.src=a}else{location.href=a}}else{var f="isolatedWorkAreaForm";var h=document.getElementById(f);var c=h.target;if(g!=null){h.target="isolatedWorkArea"}else{h.target="_self"}var b=h.innerHTML;workArea.parseFormParameters(h);h.action=a;h.submit();h.target=c;h.innerHTML=b}}catch(d){}};workArea.parseFormParameters=function(d){var f=["sap-ext-sid","sap-pp-producerid","sap-pp-consumerBaseURL","sap-epcm-guid"];var a=d.childNodes;for(var c=0;c<a.length;c++){var e=a[c];if(typeof e.name=="undefined"){continue}for(var b=0;b<f.length;b++){if(e.name==f[b]){d.removeChild(e);c--;f.splice(b,1);if(f.length==0){return}}}}};workArea.refreshPage=function(b){try{var a=b.dataObject;if(a==null||a==workArea.iviewId||workArea.iviewId.indexOf(a)!=-1){workArea.Refresh(workArea.refreshUrl)}}catch(c){}};workArea.Help=function(){try{if(workArea.method=="GET"){window.open(workArea.getUrl("help"),"help","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var c="isolatedWorkAreaForm";var d=document.getElementById(c);d.action=workArea.getUrl("help");window.open("about:blank","help","width=340,height=500,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var a=d.target;d.target="help";d.submit();d.target=a}}catch(b){}};workArea.Details=function(){try{if(workArea.method=="GET"){var a=workArea.getUrl("about");if(a.indexOf("?")==-1){if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"?sapDocumentRenderingMode=standards"}else{a=a+"?sapDocumentRenderingMode=quirks"}}else{if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"&sapDocumentRenderingMode=standards"}else{a=a+"&sapDocumentRenderingMode=quirks"}}window.open(a,"details","width=640,height=150,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes")}else{var d="isolatedWorkAreaForm";var f=document.getElementById(d);var a=workArea.getUrl("about");if(a.indexOf("?")==-1){if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"?sapDocumentRenderingMode=standards"}else{a=a+"?sapDocumentRenderingMode=quirks"}}else{if((EPCM.getUAType()==EPCM.MSIE)&&EPCM.isStandardsMode()){a=a+"&sapDocumentRenderingMode=standards"}else{a=a+"&sapDocumentRenderingMode=quirks"}}f.action=a;window.open("about:blank","about","width=640,height=150,left=100,top=50,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");var b=f.target;f.target="about";f.submit();f.target=b}}catch(c){}};workArea.OnRefresh=function(a){workArea.Refresh(workArea.refreshUrl)};workArea.OnExpand=function(a){workArea.OpenNewWindow()};workArea.OnHelp=function(a){workArea.Help()};workArea.OnPersonalize=function(a){workArea.PersonalizePage(workArea.isPage,workArea.isBBiView)};workArea.OnDetails=function(a){workArea.Details()};workArea.UpdatePageSupport=function(){var b=null;workArea.SetStandardsAttributes();var a=document.getElementById("isolatedWorkArea");if(a){b=window.frames[a.id]}try{pageSupport.workArea=new WorkArea(workArea.iviewId,b)}catch(c){}workArea.confirmInplaceTermination()};workArea.confirmInplaceTermination=function(){EPCM.raiseEvent("urn:com.sapportals:navigation","clearDSMKeys",null)};workArea.SetStandardsAttributes=function(){var a=document.getElementById(("fullPageDiv"));if((EPCM!=null)&&(EPCM.getSAPTop()!=null)){if((EPCM.getSAPTop().document.compatMode=="CSS1Compat")&&a){a.style.width=""}}};EPCM.subscribeEvent("urn:com.sapportals.portal:browser","load",workArea.UpdatePageSupport);EPCM.subscribeEvent("urn:com.sapportals:navigation","RefreshPage",workArea.refreshPage);EPCM.subscribeEvent("urn:com.sapportals:navigation","RefreshWorkArea",workArea.OnRefresh);EPCM.subscribeEvent("urn:com.sapportals:navigation","PersonalizeWorkArea",workArea.OnPersonalize);EPCM.subscribeEvent("urn:com.sapportals:navigation","HelpWorkArea",workArea.OnHelp);EPCM.subscribeEvent("urn:com.sapportals:navigation","ExpandWorkArea",workArea.OnExpand);EPCM.subscribeEvent("urn:com.sapportals:navigation","DetailsWorkArea",workArea.OnDetails);EPCM.subscribeEvent("urn:com.sapportals:navigation","ReportAProblem",workArea.OnProblemReport);workArea.resizeIframe=function(){obj=document.getElementById("isolatedWorkArea");var b=3;if(document.getElementById("fullPageDiv")!=null){b+=9}var a;if(EPCM.getUAType()==EPCM.MSIE){if(document.documentMode>=9){a=window.innerHeight-b-4;obj.style.height=a+"px"}else{if(document.documentMode==8){a=document.documentElement.clientHeight-b;obj.style.height=a+"px"}else{a=document.body.clientHeight-b;obj.style.pixelHeight=a}}}else{if(EPCM.getUAVersion()<7){a=window.innerHeight-b-6;obj.style.height=a+"px"}else{var c=/iPad|iPhone|iPod/.test(navigator.platform);if(c){obj.style.position="absolute"}a=window.innerHeight-b;obj.style.height=a+"px"}}};