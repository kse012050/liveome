$(document).ready(function(){
    $('header > div div').click(function(){
        $('header').toggleClass('active');
        $('body').toggleClass('active');
    })
})