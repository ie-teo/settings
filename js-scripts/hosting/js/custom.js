$(function() {



    /* Smooth scroll to Plans Block
    ====================================*/

    $("#js-get-started").on("click", function(e) {

        e.preventDefault();
        var plansOffset = $("#js-plans").offset().top;

        $("html, body").animate({
            scrollTop: plansOffset
        }, 500);

    });




    /* Fixed header when scroll
    ====================================*/

    var headerH = $("#js-header").height(),
        navH = $("#js-nav-container").innerHeight();

    $(document).on("scroll", function() {

        var documentScroll = $(this).scrollTop();

        if(documentScroll > headerH) {
            $("#js-nav-container").addClass("fixed");

            $("#js-header").css({
                "paddingTop": navH
            });
        } else {
            $("#js-nav-container").removeClass("fixed");
            $("#js-header").removeAttr("style");
        }

    });




    /* Smooth scroll to the pages block
    ====================================*/

    $("#js-nav a").on("click", function(e) {

        e.preventDefault();

        var currentBlock = $(this).attr("href"),
            currentBlockOffset = $(currentBlock).offset().top;

        $("html, body").animate({
            scrollTop: currentBlockOffset - 20
        }, 500);

    });




    /* Modals
    ====================================*/

    $(".js-modal").each(function() {
        var modalWidth = $(this).innerWidth() / 2;

        $(this).css({
            "marginLeft": "-" + modalWidth + "px"
        });
    });

    $(".js-show-modal").on("click", function(e) {

        e.preventDefault();

        var currentModal = $(this).attr("href");

        $(currentModal).fadeIn(500);
        $("body").append("<div class='overlay' id='js-overlay'></div>").addClass("open-modal");

    });


    $(".js-modal-close").on("click", function(e) {

        e.preventDefault();
        $(".js-modal").fadeOut(100);
        $("body").removeClass("open-modal");
        $("#js-overlay").remove();

    });


    $("body").on("click", "#js-overlay", function() {
        $(".js-modal").fadeOut(100);
        $("body").removeClass("open-modal");
        $("#js-overlay").remove();
    });




    /* FAQ
    ========================*/

    /*$(".js-faq-title").on("click", function(e) {

        e.preventDefault();
        var $this = $(this);

        if( !$this.hasClass("active") ) {
            $(".js-faq-content").slideUp();
            $(".js-faq-title").removeClass("active");
        }

        $this.toggleClass("active");
        $this.next().slideToggle();

    });*/


    $(".js-faq-title").on("click", function(e) {

        e.preventDefault();
        var $this = $(this),
            answerId = $this.attr("href"),
            questionParent = $this.parents(".faq");

        questionParent.toggleClass("test");

        if( !$this.hasClass("active") ) {
            $(".js-faq-content").slideUp();
            $(".js-faq-title").removeClass("active");
        }

        $this.toggleClass("active");
        $(answerId).slideToggle();

    });



    /* Popup
    ========================*/

    $(".js-popup-hover").hover(function() {

        var $this = $(this),
            popupId = $this.attr("href");

        $(popupId).fadeIn();


    }, function() {

        $(".js-popup").fadeOut();
    });



    /* Company Blog text toggle
    ========================*/

    $(".js-read-more").on("click", function(e) {

        e.preventDefault();

        var $this = $(this),
            text = $this.text();

        if( text == "Read More" ) {
            $this.text("Hide");
        } else {
            $this.text("Read More");
        }

        $(this).prev(".js-blog-content").toggleClass("hidden");

    });






});
