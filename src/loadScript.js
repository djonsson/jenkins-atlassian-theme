jQuery(function($){

	var dependencies = [	'login.js',
							'progressCircle.js',
							'gravatar.js'];

	returnSrcDir( dependencies, function ( srcDir ) {
		injectDepenencies ( srcDir, dependencies, function () {
			//console.log("A cookie should be written here");
			//console.log(srcDir);
			//console.log(dependencies);
		});
	});

	function returnSrcDir( depencencies, callback ) {
		var loadScript = 'loadScript.js';
		$( 'script' ).each( function () {
			var src = $( this ).attr( 'src' );
			if( typeof src !== 'undefined' ) {
				if ( src.match( loadScript + '$' ) ) {
					src = src.replace( loadScript , '' );
					callback ( src );
				}
			}
		});
	}

	function injectDepenencies( srcDir, dependencies, callback ) {
		dependencies.forEach( function ( entry ) {
			$.getScript( srcDir + entry );
		});
		callback();
	}	
});