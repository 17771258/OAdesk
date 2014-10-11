ZUI.MASK = (function(){
return {
	desk	: function(){
		if(!TEMP.maskdesk){
			TEMP.maskdesk = $("<div id='maskdesk'></div>");	
		}
		$('body').append(TEMP.maskdesk);
		return TEMP.maskdesk;
	}
}
})();
