'use strict';

/** modal:
<div class="modal hidden">
 <div class="modal_content">
	 <h3>Share your unicorn!</h3>
	 <fieldset>
	 <label><span>Here is your share link:</span> <input type="text"></label>
	 </fieldset>
	 <button>Ok!</button>
 </div>
</div>
 */

$(function() {
	var Modal = {
		modal: null,
		state: 0, // 0: not created, 1: use dom, -1: use prompt
		init: function() {
			var modal = document.createElement('div');
			modal.classList.add('modal');
			modal.classList.add('hidden');

			document.body.appendChild(modal);
			var cssEnabled = getComputedStyle(modal).display === 'none';
			if (!cssEnabled) {
				this.state = -1;
				document.body.removeChild(modal);
			} else {
				this.state = 1;
				this.modal = modal;

				var modalContent = document.createElement('div');
				modalContent.classList.add('modal_content');
				modal.appendChild(modalContent);

				modalContent.innerHTML = '<fieldset>' +
					'<label><span></span><input type="text"></label>' +
					'</fieldset>';

				var button = document.createElement('button');
				button.textContent = 'Ok!';
				button.addEventListener('click', function(e) {
					e.preventDefault();
					Modal.close();
				});

				modalContent.appendChild(button);

				modal.addEventListener('click', function() {
					Modal.close();
				});

				modalContent.addEventListener('click', function(e) {
					e.stopPropagation();
				});
			}
		},
		show: function(title, content) {
			if (this.state === 0) {
				this.init();
			}

			if (this.state === 1) {
				this.modal.querySelector('span').textContent = title;
				var input = this.modal.querySelector('input');

				input.value = content;
				input.focus();
				input.setSelectionRange(0, content.length);

				document.body.classList.add('modal_active');

				this.modal.classList.remove('hidden');
			} else {
				prompt(title, content);
			}
		},
		close: function() {
			document.body.classList.remove('modal_active');
			this.modal.classList.add('hidden');
		}
	};

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

	var controls = document.createElement('div');
	controls.classList.add('controls');

	var shareButton = document.createElement('button');
	shareButton.innerHTML = '<img src="assets/img/share_icon.svg"> Share Unicorn';

	shareButton.addEventListener('click', function(e) {
		var data = ShareLink.generate();

		var path = document.location.protocol + '//' + document.location.host + document.location.pathname + '#' + data;
		document.location.hash = '#' + data;

		Modal.show('Here is your share link:', path);

		e.preventDefault();
	});

	controls.appendChild(shareButton);
	document.querySelector('#unicorn_selection').appendChild(controls);

	if (document.location.hash.length > 1) {
		ShareLink.parse(document.location.hash.substring(1));
	}

	Modal.init();

//	window.print();
});