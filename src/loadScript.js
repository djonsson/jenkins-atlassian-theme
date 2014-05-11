jQuery(function($){

	returnSrcDir( function ( srcDir ) {
		var dependencies = [ 	'login.js',
								'progressCircle.js',
								'gravatar.js'];

		function injectDepenencies( srcDir, dependencies ) {
			dependencies.forEach( function ( entry ) {
				$.getScript( srcDir + entry );
			});
		}
		injectDepenencies ( srcDir, dependencies );
	});

	function returnSrcDir(callback) {
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
});