document.addEventListener('DOMContentLoaded', () => {
	// SELECT LINKS
	let aboutLink = document.querySelector('.about-link');
	let contactLink = document.querySelector('.contact-link');

	// CREATE ARRAY OF LINKS
	let linkArray = [aboutLink, contactLink];

	// LOOP THROUGH LINKS, ATTACH EVENTLISTENERS AND FIRE FETCH
	linkArray.forEach((eachLink) => {
		eachLink.addEventListener('click', () => {
			switch (eachLink) {
				case aboutLink:
					fetchPage('about.html');
					break;

				case contactLink:
					fetchPage('contact.html');
					break;
			}
		})
	});

	// FETCH FUNCTION
	function fetchPage(page) {
		// GET BASE URL
		let baseURL = `${window.location.protocol}//${window.location.hostname}`;

		// ADD PORT TO URL IF AVAILABLE
		if (window.location.port) {
			baseURL += `:${window.location.port}`;
		}

		// FETCH API
		fetch(`${baseURL}/${page}`)
			.then((response) => {
				// CONVERT FETCH RESPONSE TO STRING
				return response.text();
			})
			.then((html) => {
				// PARSE STRING TO HTML
				let doc = new DOMParser().parseFromString(html, 'text/html');

				// CREATE ANIME.JS TIMELINE
				let transitionTimeline = anime.timeline({
					targets: '.transition-element',
					easing: 'easeOutExpo',
				})

				// TRANSITION ANIMATION
				transitionTimeline
					.add({
						left: '0vw',
						complete: (anim) => {
							document.querySelector('.home-wrapper').remove();
						},
					})
					.add({
						left: '100vw',
					})

				// USE TIMEOUT TO DELAY CONTENT INSERTION UNTIL ANIMATION IS FINISHED
				setTimeout(() => {
					document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('body div'));

					// ANIMATE NEW CONTENT
					anime({
						targets: '.new-content *',
						translateX: [-1000, 0],
						delay: (el, i) => 100 * i,
						opacity: [0, 1],
						easing: 'easeOutExpo',
					})
				}, 1300)
		})
	}
})
