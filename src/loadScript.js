jQuery(function($){
	var srcDirectory = 'http://develop.source.test.do/src/'
	
	$.getScript(srcDirectory + "login.js", function(){
		loadLogin(srcDirectory) 
	});

	$.getScript(srcDirectory + "script.js", function(){ });
});
