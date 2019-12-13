module.exports = {
	ReturnLargeMin: () => 1121,
	// ReturnLargeMin: () => 1025,
	ReturnMediumMin: () => 768,
	// ReturnMediumMax: () => 1024,
	ReturnMediumMax: () => 1120,
	ReturnSmallMax: () => 767,
	ReturnSData: (s = 'home', p) => (
		{
			s,
			p,
			screens: {
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
			},
		}
	),
};
