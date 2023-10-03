var SAP_eventObject = null;
function SAP_eventObjectPrototype( srcElement )
{
	this.srcElement = srcElement;
}
function SAP_createEvent( srcElement, evt )
{
	SAP_eventObject = new SAP_eventObjectPrototype( srcElement );

    if( evt != null )
    {
		var myEvent = null;
		if (SAPCB_NavigatorVersion == "NN6") myEvent = evt;
		else myEvent = window.event;
	
		var keyCode;
		if( SAPCB_NavigatorVersion == "IE5" )
		{
			keyCode = window.event.keyCode;
		}
		else
		{
			keyCode = myEvent.which;
		}
		SAP_eventObject.keyCode = keyCode;
		SAP_eventObject.ctrlKey = myEvent.ctrlKey;
		SAP_eventObject.shiftKey = myEvent.shiftKey;
	}
	else 
	{
		SAP_eventObject.keyCode = null;
		SAP_eventObject.ctrlKey = null;
		SAP_eventObject.shiftKey = null;
	}
}
function SAP_createEventByName( srcElementName )
{
	var srcElement = SAP_getObject( srcElementName );
	if( srcElement != null ) SAP_createEvent( srcElement );
}
/////////////////////////////////////////////////////////////////////////////////////
//object registry
var SAP_objectArray = new Array();
function SAP_getObject( ID )
{
	var i;
	var SAP_objectArrayLength = SAP_objectArray.length;
	for(i=0; i < SAP_objectArrayLength; i++)
	{
		var curObject = SAP_objectArray[i];
		if( curObject.id == ID ) return curObject;
	}
	return null;
}
function SAP_registerObject( ID )
{
	var obj = document.getElementById( ID );
	if( obj != null )
	{
		SAP_objectArray[ SAP_objectArray.length ] = obj;
		
	}
	return obj;
}
