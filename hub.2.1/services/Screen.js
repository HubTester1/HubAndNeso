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
				Home: {
					title: 'Home',
					defaultPartial: 'TodayAndRecent',
					partials: {
						TodayAndRecent: {
							title: 'Today & Recent',
						},
						Pinned: {
							title: 'Pinned',
						},
					},
				},
				Messages: {
					title: 'Messages',
					defaultPartial: 'Announcements',
					partials: {
						Announcements: {
							title: 'Announcements',
						},
						Classifieds: {
							title: 'Classifieds',
						},
					},
				},
			},
		}
	),
};
