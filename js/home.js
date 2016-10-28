var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
	spaceBetween: 100,
	loop: true,
	autoplay: 10000,
});

$(window).preloader({delay:100});
