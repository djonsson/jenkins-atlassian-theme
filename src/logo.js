jQuery(function($) {
    $('#header .logo').on('click', function() {
        window.location.href = $('#jenkins-home-link').attr('href');
    });
});
