jQuery(function($){
	var srcDirectory = 'http://develop.source.test.do/src/'


	$.getScript(srcDirectory + "login.js", function(){ });

	$.getScript(srcDirectory + "script.js", function(){ });
});
