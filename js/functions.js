/* placeholder */
function placeholder(objInputs){
	if (objInputs.length) objInputs.placeholder();
}
/* placeholder end */

function checkForSliders() {
	if ( $('.preview ul').length ) {
		previewSlider = new Array();
		$('.preview ul').each(function(i, k) {
			previewSlider[i] = $(k).bxSlider(featuresToysSlideConfig);
		});
	}
}

/* autoFooter */
function autoFooter() {
	var wrapper = $('.wrapper'),
		  footer = $('.footer'),
	 		footerHeight = footer.outerHeight();
	footer.css('margin-top',-footerHeight);
	wrapper.css('padding-bottom',footerHeight);
}
/* autoFooter end */

//Popup 
function popup(popupClass, popupConfig){
	if (popupClass.length) {
		r_popup = popupClass.fancybox(popupConfig);
		return r_popup;
	}
}

popupCfg = {
	wrapCSS: 'popup',
	padding: ['0','0','0','0'],
	scrolling: 'visible',
}

function mobileNav() {
	
	
}

function yandexMap(){
	if ($('#map').length) {
		$.getScript("http://api-maps.yandex.ru/2.0/?load=package.full&amp;lang=ru-RU", function (){
			var myMap, 
					myPlacemark;

			function init(){ 
				myMap = new ymaps.Map("map", {
					center: [55.75396, 37.620393],
					zoom: 10
				}); 
				
				myPlacemark = new ymaps.Placemark([37.620393, 37.620393], {
					hintContent: 'Москва!',
					balloonContent: 'Москва'
				});
				
				myMap.geoObjects.add(myPlacemark);
			}
			ymaps.ready(init);
		});
	}
}

function mobileZoom() {
	if($(window).width() <= 1240) {
		$('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1, user-scalable=no');
	}
}



function bannerSlider() {
	var $sliders = $('.js-banner-slider');
	var $slider_mob = $('.js-banner-slider-mobile');
	if ( $sliders.length ) {
		$sliders.each(function() {
			$(this).slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  speed: 1000,
			  draggable: false,
			  swipe: true,
			  dots: true,
			  arrows: false
			})
		})
	};
	if ( $slider_mob.length ) {
		$slider_mob.each(function() {
			$(this).slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  speed: 1000,
			  draggable: true,
			  swipe: true,
			  dots: false,
			  arrows: false
			})
		})
	}
}

function productSldier() {
	var $slider = $('.js-default-slider');
	if ( $slider.length ) {
		$slider.each(function() {
			$(this).slick({
			  slidesToShow: 4,
			  slidesToScroll: 1,
			  speed: 1000,
			  dots: false,
			  arrows: true,
			  swipeToSlide: true,
			  prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
			  nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
			  responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
		         slidesToShow: 3
			      }
			    }
			  ]
			})
		})
	}
}

var headerComponent = (function() {

	var search = {
		changeState: function(e, $this) {
			if ( !$this.parents('.header-search').hasClass('active') ) {
				$this.parents('.header-search').addClass('active');
				$this.parent().find('.header-search__input').addClass('active').focus();
				console.log('1');
			}else {
				$this.parents('.header-search').removeClass('active');
				$this.parent().find('.header-search__input').removeClass('active');
			}
		},

		replacePos: function() {
			var inputBlock = $('.header-search');
			var input = inputBlock.find('.header-search__input');
			var inputPlaceholder = input.attr('placeholder');
			var rightCont = $('.header__top-right');
			var leftCont = $('.header__top-left');
			var inputChange = function () {
				if ( $(window).width() <= 1023 ) {
					input.attr('placeholder', '');
					rightCont.prepend(inputBlock);
				}else {
					input.attr('placeholder', inputPlaceholder);
					leftCont.append(inputBlock);
				}
			}
			//inputChange();
			$(window).on('resize', function() {
				//inputChange();
			})
			
		},

		closeInput: function() {
			return $('.header-search').removeClass('active').find('.header-search__input').removeClass('active');
		},

		events: function() {
			var link = $('.js-mob-search-button');
			var closeLink = $('.header-search__close');
			var input = $('#header-search');
			link.on('click', function(e) {
				if ($(window).width() <= 1023) {
					search.changeState(e, $(this));
				}
				
			});
			closeLink.on('click', function() {
				search.closeInput();
			})
			input.on('change blur', function() {
				console.log('1');
				if ( $(this).val() ) {
					$(this).parent().addClass('is-value');
				}else {
					$(this).parent().removeClass('is-value');
				}
			})
			$(window).on('click', function(e) {
				if ( !$(e.target).closest('.header-search').length && !$(e.target).closest('.ui-menu').length ) {
					if ($(window).width() <= 1023) {
						search.closeInput();
					}
				}
			});

		},

		init: function() {
			search.events();
			search.replacePos();
		}
	};

	var navigationMenu = {

		addHeight: function( $box ) {
			var windowH = $(window).outerHeight();
			var boxP = $box.offset().top;
			var boxH = $box.outerHeight();
			$box.css('height', windowH - boxP);
		},

		openNavBar: function() {
			var menu = $('.header-catalog__drop');
			$('.parent-active').removeClass('parent-active');
			menu.addClass('active');
			$('html').addClass('overlay-overflow');
			$('.overlay').addClass('active');
			navigationMenu.addHeight( $('.js-scroll-panel-nav') );
			console.log('openNavBar');
		},

		closeNavBar: function() {
			var menu = $('.header-catalog__drop');
			
			if ( menu.hasClass('active') && $('html').hasClass('overlay-overflow') && $('.overlay').hasClass('active') ) {
				menu.removeClass('active');
				$('html').removeClass('overlay-overflow');
				$('.overlay').removeClass('active');
			}
			
		},

		openSubmenu: function($this) {
			var drop = $this.parent().find('.header-nav-submenu');
			$this.addClass('active');
			drop.addClass('active');
		},

		changeStateSubmenu2: function($this) {
			var drop = $this.parent().find('.header-nav-submenu2');
			$this.toggleClass('active');
			drop.slideToggle();
		},

		closeSubmenu: function($this) {
			var drop = $this.parents('.header-nav-submenu.active');
			return drop.removeClass('active');
		},

		hideNav: function() {
			var menu = $('.header-catalog__drop');
			if ( menu.hasClass('active') ) {
				menu.removeClass('active');
			}
		},

		changeMenuBlock: function( $this ) {
			var block = $('.header-nav__list');
			var linkId = $this.attr('href');
			var links = $('.header-nav__navigation-link');
			var textBlock = $('.header-nav__head-title');
			var textLink = $this.data('text');

			links.removeClass('header-nav__navigation-link--active');
			block.removeClass('active');

			block.each(function(index, el) {
				if ( '#' + $(this).attr('id') == linkId ) {
					$(this).addClass('active');
					$this.addClass('header-nav__navigation-link--active');
					textBlock.text(textLink);
				}
			});
		},

		eventClick: function() {
			var openSubmenuLink = $('.header-nav__list-link');
			var backLink = $('.header-nav-submenu__back-link');
			var openSubmenu2Link = $('.header-nav-submenu__list-link');
			var openNavLink = $('.header-catalog__link');
			var changeMenuLink = $('.header-nav__navigation-link');
			var closeLink = $('.header-nav .modal__close, .js-clsoe-navBar');

			//open submenu
			openSubmenuLink.on('click', function(e) {
				if ( $(this).parent().find('.header-nav-submenu').length ) {
					navigationMenu.openSubmenu( $(this) );
					e.preventDefault();
				}
			});

			//back submenu
			backLink.on('click', function(e) {
				navigationMenu.closeSubmenu( $(this) );
				e.preventDefault();
			});

			//open submenu2
			openSubmenu2Link.on('click', function(e) {
				if ( $(this).parent().find('.header-nav-submenu2').length ) {
					navigationMenu.changeStateSubmenu2( $(this) );
					e.preventDefault();
				}
			});

			//open nav menu
			openNavLink.on('click', function(e) {
				navigationMenu.openNavBar();
				e.preventDefault();
			});

			//close nav menu
			$(window).on('click', function(event) {
				if ( $('.header-catalog__drop').hasClass('active') && !$(event.target).closest('.header-catalog').length && !$(event.target).closest('.js-overlay').length ) {
					navigationMenu.closeNavBar();
				}else if ($('.header-catalog__drop').hasClass('active') && !$(event.target).closest('.header-catalog').length && $(event.target).closest('.js-overlay').length ) {
					navigationMenu.hideNav();
				}
			});
			closeLink.on('click', function(e) {
				navigationMenu.closeNavBar();
				e.preventDefault()
			})

			//change menu
			changeMenuLink.on('click', function(e) {
				navigationMenu.changeMenuBlock( $(this) );
				e.preventDefault();
			}).filter(':first').trigger('click');
			
		},

		init: function() {
			navigationMenu.eventClick();
		}
	}


	return {
		init: function() {
			search.init();
			navigationMenu.init();
		},
		addHeight: navigationMenu.addHeight
	}

}());

/* dropDown menu */
var dropMenu = (function() {

	var popupObj = {

		changeState: function( $this, setting) {
			var modals = setting.drop,
				parentBlocks = $(setting.parent),
				$modal = parentBlocks.find(modals),
				titleLink = $this.parent();


			if ($modal.hasClass('active') && setting.overlay) {
				$('.parent-active').removeClass('parent-active');
				$modal.removeClass('active');
				titleLink.removeClass('active');
				$(parentBlocks).removeClass('active').parent().removeClass('parent-active').parent().removeClass('parent-active');
				$('html').removeClass('overlay-overflow');
				$(setting.overlay).removeClass('active');
				
				popupObj.removeHeight(setting);

			} else if (!$modal.hasClass('active') && setting.overlay) {
				$('.parent-active').removeClass('parent-active').parent().removeClass('parent-active');
				$modal.addClass('active');
				titleLink.addClass('active');
				$(parentBlocks).addClass('active').parent().addClass('parent-active').parent().addClass('parent-active');
				$('html').addClass('overlay-overflow');
				$(setting.overlay).addClass('active');

				popupObj.fixHeight($this, setting);

			} else if ($modal.hasClass('active') && !setting.overlay) {
				$modal.removeClass('active');
				$(parentBlocks).removeClass('active').parent().removeClass('aparent-ctive');
				titleLink.removeClass('active');
			} else if (!$modal.hasClass('active') && !setting.overlay) {
				$modal.addClass('active');
				$(parentBlocks).addClass('active').parent().addClass('parent-active').parent().addClass('parent-active');
				titleLink.addClass('active');
			}
			console.log('changeState popup');
		},

		closePopup: function(setting) {

			if ( $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active') && $('html').hasClass('overlay-overflow')) && !setting.noMenu ) {
				$(setting.drop).removeClass('active');
				$(setting.overlay).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active').parent().removeClass('parent-active').parent().removeClass('parent-active');
				$('html').removeClass('overlay-overflow');
				popupObj.removeHeight(setting);
			}else if ( setting.noMenu &&  $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active')  ) ) {
				$(setting.drop).removeClass('active');
				$(setting.overlay).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active').parent().removeClass('parent-active').parent().removeClass('parent-active');
				popupObj.removeHeight(setting);
			}else if ( !setting.overlay && $(setting.drop).hasClass('active') ) {
				$(setting.drop).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active').parent().removeClass('parent-active').parent().removeClass('parent-active');
			}
		},

		fixHeight: function($this, setting) {
			var windowHeight = $(window).outerHeight(),
					box = $(setting.drop),
					boxHeight = box.outerHeight();
					boxTop = box.offset().top

			function checkHeight() {
				if ( windowHeight < boxHeight + boxTop ) {
					box.css('height', windowHeight - boxTop );
				}else {
					box.css('height', '');
				}
			}
			checkHeight();

			
		},

		removeHeight: function(setting) {
			var box = $(setting.drop);
			box.css('height', '');
		},

		changePopup: function( $this ) {
			var $popupBlocks = $('.modal-lk-block');
			var linkId = $this.attr('href');
			$popupBlocks.each(function() {
				if ( '#' + $(this).attr('id') == linkId ) {
					$popupBlocks.css('display', 'none');
					$popupBlocks.find('.modal-lk__form-input').val('');
					$(this).css('display', 'block');
				}
			})
		},

		hidePopup: function(setting) {
			if ( $(setting.drop).hasClass('active') ) {
				$(setting.drop).removeClass('active');
				$(setting.parent).removeClass('active');
				popupObj.removeHeight(setting);
				console.log('hidePopup popup');
			}

		},

		changePos: function( $this, setting ) {
			var parentBox = $this.parents(setting.parent);
			var dropBox = parentBox.find(setting.drop);
			var windW = $(window).outerWidth();
			var parentBoxW = parentBox.outerWidth();
			var parentBoxL = parentBox.offset().left;
			var parentBoxR = windW - parentBoxL - parentBoxW;

			var dropBoxW = dropBox.outerWidth();
			
			if ( parentBoxR < dropBoxW ) {
				dropBox.addClass('position-right');
			}else {
				dropBox.removeClass('position-right');
			}
		},

		eventClick: function(setting) {
			var openLink = $(setting.link);
			var closeLink = $(setting.drop).find('.modal__close');

			//open popup
			openLink.on('click', function(e) {

				var modal = setting.drop,
						parentBlock = setting.parent;



				if ( $(this).parents(parentBlock).find(modal).length ) {
					popupObj.changeState( $(this), setting );
					if ( setting.changePos ) {
						popupObj.changePos( $(this), setting );
					}
					e.preventDefault();
				}

			});
			//close popup
			closeLink.on('click', function(e) {
				popupObj.closePopup(setting);
				e.preventDefault();
			});
			
			//change popup
			$('.modal-lk__bottom-link').on('click', function(e) {
				popupObj.changePopup( $(this) );
				e.preventDefault();
			});

			//close popup
			$(window).on('click resize', function(e) {
				var $this = $(e.target);
				//console.log($this);
				if ( $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && !$this.closest('.js-overlay').length ) {
					popupObj.closePopup(setting);
				}else if (  $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && $this.closest('.js-overlay').length ) {
					popupObj.hidePopup(setting);
				}
				if ( $this.hasClass('overlay2') ) {
					//popupObj.closePopup(setting);
					//$('.js-clsoe-navBar').trigger('click');
				}
				if ( $(setting.drop).hasClass('active') && $this.closest('.js-overlay').length && !$this.closest('.header-mob-menu__list-item') ) {
					console.log('12');
				}
			});

			// close modal
			$('.js-close-modal').on('click', function(e) {
				popupObj.closePopup(setting);
				e.preventDefault();
			});

			// mob close modal nav
			$('.header-mob-menu__drop-lk .modal__close, .header-mob-menu__messengers .modal__close, .js-mob-search-parent .header-search__close').on('click', function(e) {
				$('.js-clsoe-navBar').trigger('click');
				e.preventDefault();
			});

			//mob search nav focus
			$('.js-mob-search-nav-btn').on('click', function(e) {
				$(this).parents('.header-search').find('.header-search__input').focus();
				e.preventDefault();
			});

		}

	};

	return {
		drop: function(setting) {
			popupObj.eventClick(setting);
		}
	}

}());
/* dropDown menu end*/

/* mask inputs */
function maskInputs() {
	var inputsP = $('.js-mask-phone');
	inputsP.inputmask({
		mask: '+7 (999) 999 99 99',
		showMaskOnHover: false
	});
}
/* mask inputs end */

/* change path in product items */
function changePathProduct() {
	var mainLink = $('.product-slider__link');
	mainLink.on('click', function(e) {
		var mainImg = $(this).parents('.product__list-item').find('.product__list-img');
		var thisPath = $(this).find('img').data('path');
		mainImg.attr('src', thisPath);
		e.preventDefault();
	})
}
/* change path in product items end */

/* change position for product items */
function changePostitionProduct() {
	var productItem = $('.product__list-item');
	productItem.on('mouseenter', function(e) {

		var productBox = $(this).find('.product__list-box');
		if ( productBox.length && $(window).width() > 1023 ) {
			var productBoxW = productBox.outerWidth();
			var productItemL = $(this).offset().left
			console.log(productBoxW);
			if ( productItemL < productBoxW ) {
				$(this).addClass('product__list-item--right');
			}else {
				$(this).removeClass('product__list-item--right');
			}
		}
		
	})

}
/* change position for product items end */

/* tabs for grid popup */
function tabsGridPopup() {
	var tabContainers = $('.js-modal-grid-block'); 
	var tabLink = $('.js-modal-grid-link');
	var tabContainersMin = $('.js-modal-grid-min-block'); 
	var tabLinkMin = $('.js-modal-grid-min-link');

  tabContainers.hide().filter(':first').show(); 
  tabContainersMin.hide().filter(':first').show();
  
  tabLink.click(function () {
      tabContainers.hide(); 
      tabContainers.filter(this.hash).show();
      tabLink.removeClass('modal-grid-nav__link--active'); 
      $(this).addClass('modal-grid-nav__link--active'); 
      return false;
  }).filter(':first').click();

  tabLinkMin.click(function () {
      tabContainersMin.hide(); 
      tabContainersMin.filter(this.hash).show();
      tabLinkMin.removeClass('modal-grid-nav__link--active'); 
      $(this).addClass('modal-grid-nav__link--active'); 
      return false;
  }).filter(':first').click();
}
/* tabs for grid popup end */

/* productFullSliders */
function productFullSliders(){
	if ( $('.js-product-full-images-slider').length ){
		$('.js-product-full-images-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			asNavFor: '.js-product-full-images-pager',
			prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
			nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
			appendArrows: $('.product-full__images')
		})
	}

	if ( $('.js-product-full-images-pager').length ){
		$('.js-product-full-images-pager').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			asNavFor: '.js-product-full-images-slider',
			focusOnSelect: true
		})
	}

	if ( $('.js-watched-slider').length ){
		$('.js-watched-slider').slick({
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			variableWidth: true,
			infinite: false,
			appendArrows: $('.watched-slider-wrap'),
			prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
			nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
		})
	}

	if ( $('.js-side-buywith-slider').length ){
		$('.js-side-buywith-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			dots: false,
			arrows: true,
			appendArrows: $('.side-buywith-slider-wrap'),
			prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
			nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
		})
	}

	if ( $('.js-side-alsolike-slider').length ){
		$('.js-side-alsolike-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			appendArrows: $('.side-alsolike-slider-wrap'),
			prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
			nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
		})
	}
}
/* productFullSliders end */

/* productFullTabs */
function productFullTabs(){
	if ( $('.js-product-full-tab-link').length ) {
		$('.js-product-full-tab-link').on('click',function(e){
			var cur = $(this);
			var cur_li = cur.parents('li:eq(0)');
			if ( !cur_li.hasClass('current') ){
				cur_li.addClass('current').siblings('.current').removeClass('current');
				var cur_attr = cur.attr('data-product-full-tab');
				var block = $('#'+cur_attr);
				block.fadeIn().siblings('.js-product-full-tab').fadeOut(0);
			}
			e.preventDefault();
		});
	}
}
/* productFullTabs end */

/* tooltips */
function tooltips(){
	if ( $('.js-tooltip').length ) {
		$('.js-tooltip').hover(
			function(){
				var cur = $(this);
				var cur_left = cur.offset().left;
				var cur_top = cur.offset().top;
				var cur_text = cur.attr('data-tooltip');

				var cur_top_indent = 37;
				var cur_left_indent = 55;


				$('body').append('<div class="tooltip-drop">'+cur_text+'</div>');
				$('.tooltip-drop').css({'left':cur_left-cur_left_indent,'top':cur_top+cur_top_indent}).fadeIn(200);
			},
			function(){
				$('.tooltip-drop').fadeOut(200,function(){
					$(this).remove();
				});
			});
	}
}
/* tooltips end */

/* productFullFn */
function productFullFn(){
	
		// MOBILE MOVES
		if ( $('.product-full-box__right').length ){
			if ( $('.mobile-res').is(':visible') ) {
				$('.product-full-box__right').insertAfter($('.product-full__images'));
			} else {
				$('.product-full-box__right').insertAfter($('.product-full-box__left'));
			}

			$(window).resize(function(){
				if ( $('.mobile-res').is(':visible') ) {
					$('.product-full-box__right').insertAfter($('.product-full__images'));
				} else {
					$('.product-full-box__right').insertAfter($('.product-full-box__left'));
				}
			});
		}

		// SLIDERS
		if ( $('.js-product-full-images-slider').length ){
			$('.js-product-full-images-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				asNavFor: '.js-product-full-images-pager',
				prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
				nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
				appendArrows: $('.product-full__images'),
				responsive: [
				    {
				      breakpoint: 768,
				      settings: {
				        dots: true
				      }
				    }
				  ]
			});
		}

		if ( $('.js-product-full-images-pager').length ){
			$('.js-product-full-images-pager').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				asNavFor: '.js-product-full-images-slider',
				focusOnSelect: true
			});
		}

		if ( $('.js-watched-slider').length ){
			$('.js-watched-slider').slick({
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				variableWidth: true,
				infinite: false,
				appendArrows: $('.watched-slider-wrap'),
				prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
				nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
			});
		}

		if ( $('.js-side-buywith-slider').length ){
			$('.js-side-buywith-slider').slick({
				slidesToShow: 3,
				slidesToScroll: 3,
				dots: false,
				arrows: true,
				appendArrows: $('.side-buywith-slider-wrap'),
				prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
				nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>',
				responsive: [
				    {
				      breakpoint: 1650,
				      settings: {
				        slidesToShow: 2,
						slidesToScroll: 2
				      }
				    },
				     {
				      breakpoint: 768,
				      settings: {
				        slidesToShow: 2,
						slidesToScroll: 2
				      }
				    }
				  ]
			});
		}

		if ( $('.js-side-alsolike-slider').length ){
			$('.js-side-alsolike-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				appendArrows: $('.side-alsolike-slider-wrap'),
				prevArrow: '<a href="#" class="arrow arrow--left"><i class="ico icon-angle-left"></i></a>',
				nextArrow: '<a href="#" class="arrow arrow--right"><i class="ico icon-angle-right"></i></a>'
			});
		}

		// TABS
		// if ( $('.js-product-full-tab-link').length ){
		// 	$('.js-product-full-tab-link').on('click',function(e){
		// 		var cur = $(this);
		// 		var cur_li = cur.parents('li:eq(0)');
		// 		if ( !cur_li.hasClass('current') ){
		// 			cur_li.addClass('current').siblings('.current').removeClass('current');
		// 			var cur_attr = cur.attr('data-product-full-tab');
		// 			var block = $('#'+cur_attr);
		// 			block.fadeIn().siblings('.js-product-full-tab').fadeOut(0);
		// 		}
		// 		e.preventDefault();
		// 	});
		// }

		if ( $('.js-product-full-tab-link').length ){
			$('.js-product-full-tab-link').on('click',function(e){
				var cur = $(this);
				var cur_li = cur.parents('li:eq(0)');
				
				cur_li.addClass('current').siblings('.current').removeClass('current');
					var cur_attr = cur.attr('data-product-full-tab');
					var block = $('#'+cur_attr);
					var posBlock = block.offset().top;
					$('html, body').animate({
						scrollTop: posBlock
				}, 1000);
				e.preventDefault();
			});
		}

		// TOGGLE REVIEW (MOBILE)
		if ( $('.js-product-full-reviews-toggle').length ){
			$('.js-product-full-reviews-toggle').on('click',function(e){
				var cur = $(this);
				var block = cur.parents('.product-full-reviews-list__inner:eq(0)').find('.product-full-reviews-list:eq(0)');
				if ( cur.hasClass('active') )
					cur.html('Свернуть');
				else
					cur.html('Развернуть');
				block.slideToggle();
				cur.toggleClass('active');
				e.preventDefault();
			});
		}

		// ACCORD MAIN-CONTENT ITEM (MOBILE)
		if ( $('.js-product-full-main-accord-head').length ){
			$('.js-product-full-main-accord-head').on('click',function(e){
				var cur = $(this);
				var parent = cur.parents('.js-product-full-main-accord-parent:eq(0)');
				var block = parent.find('.js-product-full-main-accord-content:eq(0)');
				block.slideToggle();
				cur.toggleClass('active');
				e.preventDefault();
			});
		}
	
}
/* productFullFn end */

/* add ckeckbox color */


function addCheckboxColor() {
	var labels = $('.js-filters-color-drop .filters-drop__label');
	
	var style = $('<style type="text/css"></style>');

	labels.each(function(i, val) {
		var color = $(this).data('color');

		if ( color ) {
			$(this).addClass('js-label-color' + i );
			style.append('.js-label-color'+i+':before {background: '+color+'} .js-filters-color-drop input[type="checkbox"]:checked + .js-label-color'+i+':before {background: '+color+'}');
		}
		
	});
	$('body').append(style);
}
/* add ckeckbox color end */

/* filters product */
var filtersProduct = (function() {

	var filters = {

		writeChanges: function($this) {
			var parentBlock = $this.parents('.filters-select__list-item');
			var allCheckbox = parentBlock.find('input[type="checkbox"]');
			var link = parentBlock.find('.filters-select__list-link');
			var linkText = link.data('text');
			var linkVal = link.find('.filters-select__list-link-val');
			var resetLink = parentBlock.find('.filters-drop__reset');
			var resetLink2 = parentBlock.find('.filters-select__list-reset');
			var j = 0;

			allCheckbox.each(function(i,val) {
				
				if ( $(this).is(':checked') ) {
					j++;
					linkVal.text(j+' '+linkText);
					resetLink2.addClass('active');
					parentBlock.addClass('ico-hidden');
				}
			});
			if ( !allCheckbox.is(':checked') ) {
				linkVal.text('');
				resetLink.removeClass('active');
				resetLink2.removeClass('active');
				parentBlock.removeClass('ico-hidden');
			}else {
				resetLink.addClass('active');
				resetLink2.addClass('active');
				parentBlock.addClass('ico-hidden');
			}
			
		},

		firstChecked: function() {
			var allBox = $('.filters-drop');

			allBox.each(function() {
				var j = 0;
				allCheckbox = $(this).find('input[type="checkbox"]');
				allCheckbox.each(function(i,val) {
				
					if ( $(this).is(':checked') ) {
							var parentBlock = $(this).parents('.filters-select__list-item');
							var link = parentBlock.find('.filters-select__list-link');
							var linkText = link.data('text');
							var linkVal = link.find('.filters-select__list-link-val');
							var resetLink = parentBlock.find('.filters-drop__reset');
							var resetLink2 = parentBlock.find('.filters-select__list-reset');
						j++;
						linkVal.text(j+' '+linkText);
						resetLink.addClass('active');
						resetLink2.addClass('active');
						parentBlock.addClass('ico-hidden');
					}
				});

			})
			
		},

		resetCheck: function($this) {
			var parentBlock = $this.parents('.filters-select__list-item');
			var allInputs = parentBlock.find('input[type="checkbox"]');
			allInputs.prop('checked', false);
			filters.writeChanges( $this );
		},

		events: function() {
			var inputs = $('.filters-drop input[type="checkbox"]');
			var resetLink = $('.filters-drop__reset');
			var resetLink2 = $('.filters-select__list-reset');

			inputs.on('change', function(e) {
				filters.writeChanges($(this));
			});
			resetLink.on('click', function(e) {
				filters.resetCheck( $(this) );
				e.preventDefault();
			});
			resetLink2.on('click', function(e) {
				filters.resetCheck( $(this) );
				e.preventDefault();
			})
		}

	}

	return {
		init: function() {
			filters.events();
			filters.firstChecked();
		}
	}
}())
/* filters product end */

/* autocomplete serach */
function autocompleteSearch() {
	var projects = [
    {
      value: "1",
      label: "Носки для малышей со скидками"
    },
    {
      value: "2",
      label: "Колготки и носки"
    },
    {
      value: "3",
      label: "Носки спортивные"
    },
    {
      value: "4",
      label: "Детские носки для двойняшек"
    },
    {
      value: "5",
      label: "Прогулочные носки"
    },
    {
    	value: "6",
    	label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, dolorem.',
    	pic: 'pic/search-img.jpg',
    	price: '110 руб'
    },
    {
    	value: "7",
    	label: 'Lorem ipsumelit. Nihil, dolorem.',
    	pic: 'pic/search-img.jpg',
    	price: '110 руб'
    }
  ];
 
  var count = 0;
  $( "#header-search" ).autocomplete({
    minLength: 0,
    source: projects,
    select: function( event, ui ) {
      $( "#header-search-id" ).val( ui.item.value );
      $( "#header-search" ).val( ui.item.label );

      count = 0;
      return false;
    },
    change: function() {
    	count = 0;
    },
    search: function() {
    	count = 0;
    }
  })
  .autocomplete( "instance" )._renderItem = function( ul, item ) {
  	var elem;
  	
  	if ( item.label && !item.pic ) {
  		elem = $( "<li class='search__list-item'>" ).append( item.label ).appendTo( ul );
  	}else if ( item.pic && item.label ) {
  		count++;
  		elem = $( "<li class='search__list-item search-drop counter"+count+"'>" ).append( 
  			"<div class='search-drop__img'><img src='"+item.pic+"'></div>" +
  			"<div class='search-drop__desc'>"+item.label+"</div>"+
  			"<div class='search-drop__price'>"+item.price+"</div>").appendTo( ul );
  	}
  	
    return elem;

  };

  var count2 = 0;
  $( "#header-search-mob" ).autocomplete({
    minLength: 0,
    source: projects,
    select: function( event, ui ) {
      $( "#header-search-mob-id" ).val( ui.item.value );
      $( "#header-search-mob" ).val( ui.item.label );

      count2 = 0;
      return false;
    },
    change: function() {
    	count2 = 0;
    },
    search: function() {
    	count2 = 0;
    }
  })
  .autocomplete( "instance" )._renderItem = function( ul, item ) {
  	var elem;
  	
  	if ( item.label && !item.pic ) {
  		elem = $( "<li class='search__list-item'>" ).append( item.label ).appendTo( ul );
  	}else if ( item.pic && item.label ) {
  		count++;
  		elem = $( "<li class='search__list-item search-drop counter"+count+"'>" ).append( 
  			"<div class='search-drop__img'><img src='"+item.pic+"'></div>" +
  			"<div class='search-drop__desc'>"+item.label+"</div>"+
  			"<div class='search-drop__price'>"+item.price+"</div>").appendTo( ul );
  	}
  	
    return elem;

  };
   
}
/* autocomplete serach end */

/* ajax send + popup */
function ajaxSend(idForm, idPopups, size, mob) {
	if ( mob && $(window).width() <= 1023 ) {

		idForm.submit(function(e) {
			$.ajax({
			  url: $(idForm).attr('action'),
			  data: $(idForm).serialize(),
			  success: function(){
			  	idForm.find('input').val('');
			  	
			  	if ( idPopups ) {
			  		idForm.parents('.modal').find('.modal__close').trigger('click');
			  		$.fancybox( idPopups, {
				    	padding: 0,
							autoSize: false,
							autoHeight: false,
							height: 'auto',
							width: '100%',
							scrolling: 'visible',
							width: '100%',
							wrapCSS: 'modal-mobile',
							helpers:  {
					      overlay : null
					    }
				    });
			  	}
			  }
			});    
			e.preventDefault();
		});

	}else {
		idForm.submit(function(e) {
			$.ajax({
			  url: $(idForm).attr('action'),
			  data: $(idForm).serialize(),
			  success: function(){
			  	idForm.find('input').val('');
			  	
			  	if ( idPopups ) {
			  		idForm.parents('.modal').find('.modal__close').trigger('click');
			  		$.fancybox( idPopups, {
				    	padding: 0,
							autoSize: false,
							autoHeight: false,
							height: 'auto',
							width: '100%',
							scrolling: 'visible',
							maxWidth: size
				    });
			  	}
			  }
			});    
			e.preventDefault();
		});
	}
	

}
/* ajax send + popup end */

/* scroll panel */
function scrollPanel() {
	var block = $('.js-scroll-panel');
	// block.jScrollPane();
	// block.scrollbar();
}
/* scroll panel end */

/* autocomplete delivery */
function autocompleteDelivery() {
	var projects = [
    {
      value: "1",
      label: "Носки для малышей со скидками"
    },
    {
      value: "2",
      label: "Колготки и носки"
    },
    {
      value: "3",
      label: "Носки спортивные"
    },
    {
      value: "4",
      label: "Детские носки для двойняшек"
    },
    {
      value: "5",
      label: "Прогулочные носки"
    },
     {
      value: "6",
      label: "Носки для малышей со скидками"
    },
    {
      value: "7",
      label: "Колготки и носки"
    },
    {
      value: "8",
      label: "Носки спортивные"
    },
    {
      value: "9",
      label: "Детские носки для двойняшек"
    },
    {
      value: "10",
      label: "Прогулочные носки"
    },
     {
      value: "11",
      label: "Колготки и носки"
    },
    {
      value: "12",
      label: "Носки спортивные"
    },
    {
      value: "13",
      label: "Детские носки для двойняшек"
    },
    {
      value: "14",
      label: "Прогулочные носки"
    }
  ];
	$( '.modal-delivery__search-input' ).autocomplete({
    minLength: 0,
    source: projects,
    select: function( event, ui ) {
      $( '.modal-delivery__search-input-id' ).val( ui.item.value );
      $( '.modal-delivery__search-input' ).val( ui.item.label );
      $( '.modal-delivery__search-input' ).trigger('keyup');
      return false;
    },
    change: function() {
    	
    },
    search: function() {
    	
    }
  })
  .autocomplete( "instance" )._renderItem = function( ul, item ) {
  	$(ul).addClass('modal-delivery-autocomplete');
  	var elem = $('<li class="modal-delivery-autocomplete__item">').append('<div>' + item.label + '</div>').appendTo( ul );
 
    return elem;
  }
}
/* autocomplete delivery end */

/* action popup */
function actionPopup() {
	var linkOpen = $('.js-action-open');
	var linkClsoe = $('.js-action-close');
	linkOpen.on('click', function(e) {
		var box = $(this).parents('.main-banner__list-item').find('.main-banner-drop');
		var slider = $(this).parents('.slick-list');
		slider.css({
			position: 'relative',
			zIndex: '99'
		})
		box.addClass('active');
		e.preventDefault();
	});
	linkClsoe.on('click', function(e) {
		var box = $(this).parents('.main-banner__list-item').find('.main-banner-drop');
		var slider = $(this).parents('.slick-list');
		slider.css({
			position: '',
			zIndex: ''
		})
		box.removeClass('active');
		e.preventDefault();
	})
}
/* action popup end */

/* basket page */
var basketPage = (function() {
	var couponLink = $('.basket-coupon__open');
	var app = {
		changeAmountPos: function() {
			var blocks = $('.basket-table__row');
			blocks.each(function() {
				var elem = $(this).find('.basket-table__amount');
				if ( $(window).width() < 1024 ) {
					var innerBox = $(this).find('.basket-table__image').parent();
					innerBox.append(elem);
				}else {
					var innerBox = $(this).find('.basket-table__box .basket-table__cell').eq(0);
					innerBox.append(elem);
				}
			});
		},
		openHideCoupon: function($this) {
			var dataLink = $this.data('drop');
			var drop = $this.parent().find('.basket-coupon__drop[data-drop="'+dataLink+'"]');

			drop.slideToggle();
			$this.toggleClass('active');
		},
		events: function() {
			$(window).on('resize', function() {
				app.changeAmountPos();
			});

			// open/hide coupon
			couponLink.on('click', function(e) {
				app.openHideCoupon( $(this) );
				e.preventDefault();
			})
		}
	}

	return {
		init: function() {
			app.events();
			app.changeAmountPos();
		}
	}
}())
/* basket page end */
$(document).on('ready', function() {

	ajaxSend( $('#modal-onlyReg__form'), $('#modal-thx'), '640px' );
	ajaxSend( $('#subscription__form'), $('#modal-thx-subscribe'), '320px' );
	ajaxSend( $('#modal-lk-changedPass__form-mob'), $('#modal-successful'), '640px' );
	ajaxSend( $('#modal-lk-changedPass__form-desktop'), $('#modal-successful'), '640px' );
	ajaxSend( $('#modal-basket-subscription__form'), $('#modal-thx-subscribe'), '640px', true );

	actionPopup();
	autoFooter();
	bannerSlider();
	productSldier();
	autocompleteSearch();
	scrollPanel();
	autocompleteDelivery();

	productFullFn();
	tooltips();

	headerComponent.init();
	filtersProduct.init();
	basketPage.init();

	dropMenu.drop({
		link: '.js-login-modal', 
		drop: '.header-login__drop',
		parent: '.header-login',
		noMenu: false,
		overlay: '.overlay'
	});
	dropMenu.drop({
		link: '.js-basket-modal', 
		drop: '.header-basket__drop',
		parent: '.header-basket',
		noMenu: false,
		overlay: '.overlay'
	});

	dropMenu.drop({
		link: '.js-mob-lk', 
		drop: '.header-mob-menu__drop-lk',
		parent: '.js-mob-lk-parent',
		noMenu: true,
		overlay: '.overlay2'
	});
	dropMenu.drop({
		link: '.js-mob-messengers', 
		drop: '.header-mob-menu__messengers',
		parent: '.js-mob-messengers-parent',
		noMenu: true,
		overlay: '.overlay2'
	});
	dropMenu.drop({
		link: '.js-mob-search-nav-btn', 
		drop: '.header-search__form',
		parent: '.js-mob-search-parent',
		noMenu: true,
		overlay: '.overlay2'
	});

	dropMenu.drop({
		link: '.js-related-category-open', 
		drop: '.related-category__drop',
		parent: '.related-category',
		noMenu: false,
		overlay: '.overlay'
	});
	dropMenu.drop({
		link: '.js-filters-color', 
		drop: '.js-filters-color-drop',
		parent: '.js-filters-color-parent',
		noMenu: false,
		overlay: false,
		changePos: true
	});
	dropMenu.drop({
		link: '.js-filters-size', 
		drop: '.js-filters-size-drop',
		parent: '.js-filters-size-parent',
		noMenu: false,
		overlay: false,
		changePos: true
	});
	dropMenu.drop({
		link: '.js-filters-price', 
		drop: '.js-filters-price-drop',
		parent: '.js-filters-price-parent',
		noMenu: false,
		overlay: false,
		changePos: true
	});
	dropMenu.drop({
		link: '.js-filters-style', 
		drop: '.js-filters-style-drop',
		parent: '.js-filters-style-parent',
		noMenu: false,
		overlay: false,
		changePos: true
	});
	dropMenu.drop({
		link: '.js-filters-brand', 
		drop: '.js-filters-brand-drop',
		parent: '.js-filters-brand-parent',
		noMenu: false,
		overlay: false,
		changePos: true
	});

	dropMenu.drop({
		link: '.filters-mob__open', 
		drop: '.filters__container',
		parent: '.filters--drop',
		noMenu: false,
		overlay: '.overlay'
	});


	
	maskInputs();
	tabsGridPopup();
	changePathProduct();
	addCheckboxColor();
	changePostitionProduct();

	//popups
	var POPUPSETTINGS = function(width) {
		return {
			padding: 0,
			autoSize: false,
			autoHeight: false,
			height: 'auto',
			width: '100%',
			scrolling: 'visible',
			fitToView   : false,
			maxWidth: width,
			helpers: {
		    overlay: {
		      locked: true
		    }
		  },
			afterShow: function() {
				var cur_pos = $(window).scrollTop();
				// $(document.body).bind('touchmove', function(e) {
				//   $('body, html').scrollTop(cur_pos);
				// });

				

			},
			afterClose: function() {
				// $(document.body).unbind('touchmove');
			}
		}
	};
	var popup_settings_menium = new POPUPSETTINGS('640px');
	var popup_settings_min = new POPUPSETTINGS('320px');
	var popup_settings_large = new POPUPSETTINGS('960px');
	var popup_settings_little = new POPUPSETTINGS('960px');

	$('.js-popup-medium').fancybox(popup_settings_menium);
	$('.js-popup-min').fancybox(popup_settings_min);
	$('.js-popup-large').fancybox(popup_settings_large);
	$('.js-popup-little').fancybox(popup_settings_little);


	
	

	// close popups
	$('.modal__close').on('click', function(e) {
		var fancyboxxx = $(this).parents('.fancybox-wrap');
		if ( fancyboxxx.length ) {
			fancyboxxx.find('.fancybox-close').trigger('click');
			e.preventDefault();
		}
		
	})

	$('.js-filter-delivery').liveFilter('basic'); //filter
	$('.js-filter-delivery-min').liveFilter('basic'); //filter

	//IE9
	placeholder($('input[placeholder], textarea[placeholder]'));


	$(window).on('resize', function() {
		autoFooter();
	})



});