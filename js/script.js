var landingFunctions = {
	init: function() {
		this.initLibraris()
		this.time()
		this.modal()
		// this.paralax()
	}, 

	initLibraris: function() {
		
		$('[href*="#"]').on('click', function (e) {
			var fixedOffset = 0;
			var cardHeight = $(".card").outerHeight(false)
			var windowHeight = $(window).height()

			$('html, body')
				.stop()
				.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
				// .animate({ scrollTop: $(this.hash).offset().top + fixedOffset}, 1000);
			e.preventDefault();
		})

		function showBtn() {
			var $element = $('.header_section');
	
			$(window).scroll(function() {
				var scroll = $(window).scrollTop() + $(window).height();
				var offset = $element.offset().top + $element.height();
				var bodyOffset = $("body").offset().top + $("body").height() - 700;

				if ((scroll < bodyOffset) && (scroll > offset)) {
					$(".fixed").fadeIn(500);
				} else {
					$(".fixed").fadeOut(500)
				}
			});
		}

		if($(window).width() <= 540) {
			showBtn()
		}
	

		// function copyTitle(selector) {
		// 	if($(window).width() <= 1080) {
		// 		var title = $(selector + " .prod_1__info-title-1").clone()
		// 		$(selector + " .prod_1__info-title-1").hide()
		// 		title.addClass("info__title-clone")
		// 		if($(selector + " .info__title-clone").length) {
		// 			return false
		// 		} else {
		// 			$(selector + " .prod_1__info").prepend(title)
		// 		}
		// 	} else {
		// 		$(selector + " .prod_1__info-title-1").show()
		// 		$(selector + " .info__title-clone").remove()
		// 	}
		// }

		// copyTitle(".prod_1")
		// copyTitle(".prod_2")

		// $(window).resize(function() {
		// 	copyTitle(".prod_1")
		// 	copyTitle(".prod_2")
		// })
		

		var owl = $(".review_slider").owlCarousel({
			loop: true,
			nav: false,
			dots: false,
			dotsEach: true,
			items: 3,
			margin: 30,
			autoHeight: true,
			// responsive:{
			// 	0:{
			// 		items:1,
			// 		dots: true,
			// 	},
			// 	541:{
			// 		items:1,
			// 		dots: false,
			// 	},
			// 	1081:{
			// 		items:2,
			// 	}
			// }
		});

		// $('.prev_btn').click(function() {
		// 	owl.trigger('next.owl.carousel');
		// })

		// $('.next_btn').click(function() {
		// 	owl.trigger('prev.owl.carousel');
		// })

		$.raty.path = $("body").data("path") +  '/img/raty';

		$('.modal__raiting').raty({
			half: true,
			space: false,
			number: 5,
		});
	
		AOS.init({
			disable : 'mobile',
			once: true,
			duration: 1000,
			offset : 0,
		});
	
		$(window).resize(function() {
			AOS.refresh();
		})

		$('[data-fancybox]').fancybox({
			loop: true,
			infobar: false,
			animationEffect: false,
			backFocus: false,
			hash: false,
		});
	},

	time: function() {
		Date.prototype.daysInMonth = function () {
			return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
		};
		
		if (!String.prototype.padStart) {
			String.prototype.padStart = function padStart(targetLength, padString) {
				targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
				padString = String((typeof padString !== 'undefined' ? padString : ' '));
				if (this.length > targetLength) {
					return String(this);
				}
				else {
					targetLength = targetLength - this.length;
					if (targetLength > padString.length) {
						padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
					}
					return padString.slice(0, targetLength) + String(this);
				}
			};
		}

		function timer () {
			function runMultiple(hoursSelector, minutesSelector, secondsSelector, milisecondsSelector) {
				var d = new Date();
				var h = String(23 - d.getHours()).padStart(2, "0");
				var m = String(59 - d.getMinutes()).padStart(2, "0");
				var s = String(60 - d.getSeconds()).padStart(2, "0");
				// var ms = String(1000 - d.getMilliseconds()).padStart(3, "0");
				$(hoursSelector).text(h)
				$(minutesSelector).text(m)
				$(secondsSelector).text(s)
				// $(milisecondsSelector).text(ms)
			}
			setInterval(function () {
				runMultiple(".hours", ".minutes", ".seconds")
			}, 1000);
		}
	
		timer()

		function getDate(plusDays) {
			var today = new Date();
			var dd = String(today.getDate() + plusDays).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			if (+dd < 0) {
				mm = String(today.getMonth()).padStart(2, '0');
			}
			
			var yyyy = String(today.getFullYear());
			yyyy = yyyy.substr(yyyy.length - 2);
			var currentDaysInMonth = new Date().daysInMonth()
			if (+dd > currentDaysInMonth) {
				dd = String(dd - currentDaysInMonth).padStart(2, '0');
				mm = String(+mm + 1).padStart(2, '0');
			}
			if (+dd < 0) {
				dd = String(currentDaysInMonth + +dd).padStart(2, '0');
			}
			if (+dd == 0) {
				dd = "01"
			}
			return dd + "." + mm + "." + yyyy
		}

		// $(".date__1").text(getDate(-5));
    	// $(".date__2").text(getDate(2));

		// $(".date").text(getDate(2))
		// $(".card__date .date").text(getDate(2))
		
		// $(".year").text(new Date().getFullYear())
	},

	modal: function() {
		function modal() {
			$(".add_review").click(function () {
				$(".modal__review").addClass("active")
			})
	
			function close() {
				$(".modal__review").removeClass("active")
			}
	
			$(".modal__review").click( function(e) {
				var target = e.target;
				if(target.classList.contains("modal__close")) {
					close()
				}
				if(target.classList.contains("modal")) {
					close()
				}
			})
	
			function readURL(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					console.log(reader)
					reader.onload = function (e) {
						$('.file img').attr('src', e.target.result).css("display", "block");
					};
					reader.readAsDataURL(input.files[0]);
				}
			}
	
			$(".modal__review .input__file").on("change", function () {
				readURL(this);
			});
	
			$(".modal__review form").submit(function (e) {
				e.preventDefault()
				$(this).removeClass("active");
				$(".send__window").addClass("active");
				$(".modal__review .name__input").val("")
				$(".modal__review .modal__area").val("")
				$(".modal__review .file img").attr("src", "").css("display", "none")
				delayClose()
			})
			function delayClose() {
				setTimeout(function () {
					$(".modal__review form").addClass("active");
					$(".send__window").removeClass("active");
					close();
				}, 5000);
			}
		}
	
		modal()
	},

	paralax: function() {
		var scenesParallax = [];

		mQ("(max-width: 1023px)", function () {
		if (!scenesParallax.length) return
		scenesParallax.forEach(function (scene) {
			scene.disable();
			scene.element.removeAttribute('style');
		})
		}, function () {
		if (scenesParallax.length === 0) {
			$('.parallax').each(function (i) {
				scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
					frictionX: 0.0005,
					frictionY: 0.0005,
					invertX: Math.random() >= 0.1,
					invertY: Math.random() >= 0.1
				});
			})
		} else {
			scenesParallax.forEach(function (scene) {
				scene.enable();
			})
		}
		});
	
		function randomNum(min, max) {
		var numLow = min, numHigh = max,
			adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
		return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
		}
	
		function mQ(mqStr, match, mismatch) {
			var mq = matchMedia(mqStr);
			mq.addListener(widthChange);
			widthChange(mq);
			function widthChange(mq) {
				if (mq.matches) {
					match();
				} else {
					mismatch();
				}
			}
		}
	}
}

$(document).ready(function() {
	landingFunctions.init();
});

