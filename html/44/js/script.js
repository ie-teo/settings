document.addEventListener('DOMContentLoaded', function () {

	// Modal START
	$('.magnific-inline').magnificPopup({
		type: 'inline',
		showCloseBtn: false,
		removalDelay: 700,
		callbacks: {
			beforeOpen: function() {
			   this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
	});
	$('.modal-close').on('click', function() {
		$.magnificPopup.close();
	});
	// Modal END

	// Scroll up START
	function scrollUpShow() {
		if($(this).scrollTop() > 1700) {
			$('.scroll-arrow-up').addClass('is-active');
		}
		else {
			$('.scroll-arrow-up').removeClass('is-active');
		}
	}
	scrollUpShow();
	$(window).on('scroll', function() {
		scrollUpShow();
	});

	$('.scroll-arrow-up').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		},
		{
			duration: 1200
		}
		);
	});
	// Scroll up END

	// Header START
	$('.open-submenu').on('click', function() {
		var submenu = $(this).prev('.sub-menu');
		if(submenu.hasClass('is-active')) {
			submenu.slideUp();
			submenu.removeClass('is-active');
			$(this).removeClass('is-active');
		}
		else {
			submenu.slideDown();
			submenu.addClass('is-active');
			$(this).addClass('is-active');
		}
	});

	var mobilemenu = $('.header-mobile');
	$('.hamburger').on('click', function() {
		mobilemenu.addClass('is-active');
	});
	$('.header-mobile-close').on('click', function() {
		mobilemenu.removeClass('is-active');
	});
	// Header END
	
	// Banner START
	const swiperBanner = new Swiper('.swiper-banner', {
		speed: 700,
		spaceBetween: 0,
		navigation: {
			prevEl: '.swiper-banner .swiper-button-prev',
			nextEl: '.swiper-banner .swiper-button-next',
		},
		pagination: {
			el: '.swiper-banner .swiper-pagination',
			clickable: true
		},
	});
	// Banner END

	// Gallery START
	
	// init Masonry
	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true,
		gutter: 20
	})
	$grid.imagesLoaded().progress( function() {
		$grid.masonry('layout');
	});
	$('.magnific-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 500, 
			easing: 'ease-in-out',
			opener: function(openerElement) {
			  return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		  }
	});
	// Gallery END

	// FAQ START
	$('.faq-question').on('click', function() {
		var answer = $(this).next('.faq-answer');
		if($(this).hasClass('is-active')) {
			answer.slideUp();
			$(this).removeClass('is-active');
		}
		else {
			answer.slideDown();
			$(this).addClass('is-active');
		}
	});
	// FAQ END

	// Reviews START
	const swiperReviews = new Swiper('.swiper-reviews', {
		speed: 700,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-reviews .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
		}
	});
	// Reviews END

	// Video START
	$('.magnific-iframe').magnificPopup({
		type: 'iframe',
	});
	// Video END

}, false);