$(document).on('pageshow', function() {
	if($('header .ui-collapsible-content').is(':visible')) {
		$('header .ui-collapsible-heading-toggle').trigger('click');
	}

	$(document).on('tap', 'html', function(e) {
		if($(e.target).parents('.ui-collapsible').length == 0 && $('header .ui-collapsible-content').is(':visible')) {
			$('header .ui-collapsible-heading-toggle').trigger('click');
		}
	}).on('tap', '.back-to-top', function() {
		$('html, body').animate({
			scrollTop: 0
		});
		return false;
	});

	if($('.slider').length) {
		$('.slider .container').flexslider({
			animation: 'slide',
			animationDuration: 300,
			slideshow: false,
			controlsContainer: '.slider nav',
			smoothHeight: true,
			prevText: '',
			nextText: ''
		});
	}

	if($('.portfolio-slider').length) {
		$('.portfolio-slider .container').flexslider({
			animation: 'slide',
			slideshow: false,
			controlsContainer: '.portfolio-slider nav',
			prevText: '',
			nextText: ''
		});
	}

	if($('#contact').length) {
		var name_field = new LiveValidation( "name_field" );
		var email_field = new LiveValidation( "email_field" );
		var msg_field = new LiveValidation( "message_field" );

		name_field.add( Validate.Presence );
		email_field.add( Validate.Presence );
		msg_field.add( Validate.Presence );

		name_field.add( Validate.Length, { minimum: 4 });
		email_field.add( Validate.Email );
		msg_field.add( Validate.Length, { minimum: 10 });

		$(document).on('submit', 'form#contact', function(e) {
			if($('#contact .LV_invalid_field').length == 0) {
				var target = $(this);
				submit_form(target);
			} else {
				$('.message').text('All fields are required!').fadeIn(400, function() {
					$(this).delay(1500).fadeOut(300, function() {
						$(this).text('');
					});
				});
			}
			return false;
		});
	}
});

$(document).on('mobileinit', function() {
	$.mobile.defaultPageTransition = 'slide';
});

$(document).on('orientationchange', function(event) {
	if($('.slider').length) {
		update_slider_height();
	}
})

// Fix slider resize on orientation change in Windows Phone 7
$(window).resize(function() {
	if($('.slider').length && navigator.userAgent.indexOf('Zune') != -1) {
		update_slider_height();
	}
});

function update_slider_height() {
	var current_height = $('.slider .flex-active-slide').height();
	if($(window).width() > $(window).height()) {
		current_height = current_height*1.5;
	} else {
		current_height = current_height*0.66;
	}
	setTimeout(function() {
		$('.slider .flex-viewport').css({
			height: current_height
		});
	}, 300);
}

function submit_form(target) {
	$.post(target.attr('action'), target.serialize(), function(data) {
		target.find('.message').html(data).fadeIn(500, function() {
			target.find('input[type!="submit"], textarea').each(function() {
				$(this).val('');
			});

			target.find('.message').delay(2000).fadeOut(300, function() {
				$(this).text('');
			});
		});
	});
}