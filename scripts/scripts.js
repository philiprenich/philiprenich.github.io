var api = 'http://api.philiprenich.com/contact.php',
	url = 'contact.html';
$(document).ready(function() {
	$.get(url, function(page) {
		var $contact = $(page).find('#contact');
		$('#wrap').after($contact.addClass('popup'));


		$('a[href="contact.html"]').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			$contact.fadeIn();
		});
		$contact.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			if(e.target != e.currentTarget && e.target != $('[href=#cancel]')[0]) return;

			$contact.fadeOut('fast');
		});
		$contact.find('[name=send]').click(function(e) {
			var data = {
				'email': $contact.find('[name=email]').val(),
				'name': $contact.find('[name=name]').val(),
				'message': $contact.find('[name=message]').val(),
				'send': $(this).val(),
				'ajax': true
			};
			$.post(api, data, function(response) {
				response = JSON.parse(response);
				if(response.success) {
					var $form = $contact.find('form').clone();
					$contact.find('form').empty().append(response.text);
					setTimeout(function() {
						$contact.fadeOut(function() {
							$contact.empty().append($form);
						});
					}, 5000);
				}
			});
		});
	});
});