jQuery(function($){
    var toggle = '<div class="toggle"></div><input id="cmn-toggle-7" class="cmn-toggle cmn-toggle-yes-no" type="checkbox"><label for="cmn-toggle-7" data-on="Hide" data-off="Show"></label>';
    $('#description-link').text('Edit');
    $('#description').before( toggle );
    $('.cmn-toggle').prop('checked', true);
    $('.cmn-toggle').change(function() {
        $('#description').slideToggle('fast');
    });
});