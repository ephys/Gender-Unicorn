'use strict';

$(function() {
	var ShareLink = {
		parse: function(b64data) {
			try {
				var data = atob(b64data).split(',');

				var ranges = document.querySelectorAll('input[type="range"]');
				for (var i = 0; i < ranges.length; i++) {
					ranges[i].value = data[i];
				}

				var selectedRadio = data[i];
				var radio = document.querySelector('input[name="assigned_sex"][value="'+selectedRadio+'"]');
				if (radio != null) {
					radio.checked = true;
				}
			} catch(e) {
				console.error(e);
			}
		},
		generate: function() {
			var data = [];

			var ranges = document.querySelectorAll('input[type="range"]');
			for (var i = 0; i < ranges.length; i++) {
				data.push(ranges[i].value);
			}

			var radio = document.querySelector('input[name="assigned_sex"]:checked');
			if (radio != null) {
				data.push(radio.value);
			}

			return btoa(data.join(','));
		}
	};

	var footer = document.querySelector('body footer');

	var shareButton = document.createElement('button');
	shareButton.textContent = 'Share';

	shareButton.addEventListener('click', function() {
		var data = ShareLink.generate();

		var path = document.location.protocol + '//' + document.location.host + document.location.pathname + '#' + data;
		document.location.hash = '#' + data;

		prompt('Here is your share link:', path);
	});

	var buttonWrapper = document.createElement('div');
	buttonWrapper.appendChild(shareButton);
	footer.appendChild(buttonWrapper);

	if (document.location.hash.length > 1) {
		ShareLink.parse(document.location.hash.substring(1));
	}
});