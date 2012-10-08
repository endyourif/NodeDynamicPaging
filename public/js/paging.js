var lastX = 0;
var currentX = 0;
var page = 1;
$(window).scroll(function () {
    if (page < maxPages) {
        currentX = $(window).scrollTop();
        if (currentX - lastX > 200 * page) {
            lastX = currentX;
            page++;
            $.get('/page/' + page, function(data) {
                $('#items').append(data);
            });
        }
    }
});