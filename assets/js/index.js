(function ($) {
    'use strict';

    $(document).ready(function() {
        $('.post-date').each(function(i, date) {
            var $date = $(date);
            $date.html(moment(new Date($date.attr('datetime'))).format('dddd, MMMM DD, YYYY'));
        });
    });

}(jQuery));
