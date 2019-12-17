module.exports = {
	ReturnLargeMin: () => 1121,
	// ReturnLargeMin: () => 1025,
	ReturnMediumMin: () => 768,
	// ReturnMediumMax: () => 1024,
	ReturnMediumMax: () => 1120,
	ReturnSmallMax: () => 767,
	ReturnSData: (s, p) => {
		const screens = {
			home: {
				title: 'Home',
				defaultPartial: 'todayAndRecent',
				partials: {
					todayAndRecent: {
						title: 'Today & Recent',
					},
					pinned: {
						title: 'Pinned',
					},
				},
			},
			messages: {
				title: 'Messages',
				defaultPartial: 'announcements',
				partials: {
					announcements: {
						title: 'Announcements',
					},
					classifieds: {
						title: 'Classifieds',
					},
				},
			},
		};
		// select home screen if one isn't specified; do so here
		// 		to keep logic near selection of partial screen
		// eslint-disable-next-line no-unneeded-ternary
		const selectedScreen = s ? s : 'home';
		// if partial isn't specified or if partial isn't actually 
		// 		possible for (a child of) selected screen, then use
		// 		screen's default partial
		const selectedPartialScreen = 
			(!p || !screens[selectedScreen].partials[p]) ? 
				screens[selectedScreen].defaultPartial :
				p;
		return (
			{
				s: selectedScreen,
				p: selectedPartialScreen,
				size: '',
				screens,
			}
		);
	},
};
