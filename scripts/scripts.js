var url = 'http://api.philiprenich.com/contact.php';
$(document).ready(function() {
	$.get(url, function(page) {
		var $contact = $(page).find('#contact');
		$('#wrap').after($contact);


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
				'email': $contact.find('email').val(),
				'name': $contact.find('name').val(),
				'message': $contact.find('message').val(),
				'send': $(this).val()
			};
			$.post(url, data, function(response) {
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