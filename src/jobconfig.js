jQuery(function($){
    var afterColor  = '#dfd';
    var beforeColor = '#fff';

    jQuery('.setting-input, input[type="checkbox"]').one("click", function ( e ) {
        storeValue( e );
    });

    jQuery('.setting-input').on('input propertychange paste', function ( e ) {
        if (compareValues( e )) {
            jQuery(e.target).css("background-color", beforeColor);
        } else {
            jQuery(e.target).css("background-color", afterColor);
        }        
    });

    jQuery('input[type="checkbox"]').change( function ( e ) {
        if (compareValues( e )) {
            jQuery(e.target.parentNode).css("background-color", beforeColor);
        } else {
            jQuery(e.target.parentNode).css("background-color", afterColor);
        }
    });

    function storeValue( e ) {
        var elem        = jQuery( e.target );
        var name        = elem.attr("name");
        var value       = elem.attr("value");
        var isChecked   = elem.is(':checked'); 

        if (value === "on") {
            isChecked = false;
        }
        document.cookie = name + "=" + textToBin(value + isChecked);
    } 

    function compareValues ( e ) {
        var elem        = jQuery( e.target );
        var name        = elem.attr("name");
        var value       = elem.attr("value");
        var isChecked   = elem.is(':checked');

        if (readCookie(name) === textToBin(value + isChecked)) {
            return true;
        } else {
            return false;
        }
    }

    function readCookie( name ) {
        var i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for(i=0;i < ca.length;i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return '';
    }

    function textToBin( text ) {
        var length = text.length, output = [];
        for (var i = 0;i < length; i++) {
            var bin = text[i].charCodeAt().toString(2);
            output.push(Array(8-bin.length+1).join("0") + bin);
        } 
        return output.join(" ");
    }
});