
export default class MockHttpClient {

	private static _hcMessagesSettings = {
		error: false,
		docs: [
			{
				categories: [
					{
						camlName: 'announcements',
						name: 'Announcements'
					}, {
						camlName: 'departmentNews',
						name: 'Department News'
					}, {
						camlName: 'events',
						name: 'Events'
					}, {
						camlName: 'reportsFromTheOutside',
						name: 'Reports from the Outside'
					}, {
						camlName: 'goodIdeas',
						name: 'Good Ideas'
					}, {
						camlName: 'kudos',
						name: 'Kudos'
					}, {
						camlName: 'qAndA',
						name: 'Q & A'
					}, {
						camlName: 'lostAndFound',
						name: 'Lost & Found'
					}, {
						camlName: 'coolScience',
						name: 'Cool Science'
					}, {
						camlName: 'classifieds',
						name: 'Classifieds'
					}, {
						camlName: 'welcomeMat',
						name: 'Welcome Mat'
					}, {
						camlName: 'museumInTheNews',
						name: 'Museum in the News'
					}
				]
			},
		]
	};

	private static _hcMessages = [
		{
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Announcements',
			messageSubject: 'Message Subject 1',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Sheryl White Vincent', account: 'swvincent' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageImage: 'https://images.unsplash.com/photo-1518495230660-7ae273cd1366?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12731bebedfafc5e9c8957292b387103&auto=format&fit=crop&w=400&q=80',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Events',
			messageSubject: 'This is a great Message Subject 2',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'James Baker', account: 'jbaker' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageImage: 'https://images.unsplash.com/photo-1471513671800-b09c87e1497c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=263d1948dcd0e71c59c4929e8fcf3f46&auto=format&fit=crop&w=400&q=80',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Announcements',
			messageSubject: 'What an even better Message Subject 3',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Jeannette Amazeen-Thomas', account: 'jthomas' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageImage: 'https://images.unsplash.com/photo-1444465693019-aa0b6392460d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f085fc9ac3af45f1498607ab047305c0&auto=format&fit=crop&w=400&q=80',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Events',
			messageSubject: 'Message Subject 4',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Kathryn Bartholomew', account: 'kbartholomew' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageImage: 'https://images.unsplash.com/photo-1446080501695-8e929f879f2b?ixlib=rb-0.3.5&s=86ca1d4b7444404d412fb12a4f25c5de&auto=format&fit=crop&w=400&q=80',
			messageExpiration: '2018-10-05'



		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Announcements',
			messageSubject: 'This is a great Message Subject 5',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Jason Barone-Cichocki', account: 'jbcichocki' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Events',
			messageSubject: 'What an even better Message Subject 6',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Jason Barone-Cichocki', account: 'jbcichocki' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Announcements',
			messageSubject: 'Message Subject 7',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Kathryn Bartholomew', account: 'kbartholomew' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'



		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Events',
			messageSubject: 'This is a great Message Subject 8',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Jeannette Amazeen-Thomas', account: 'jthomas' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Announcements',
			messageSubject: 'What an even better Message Subject 9',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'James Baker', account: 'jbaker' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'
		}, {
			_id: '59fb5bb89df7b4d52d9e8c35',
			messageCategory: 'Events',
			messageSubject: 'Message Subject 10',
			messageCreated: '2018-04-05',
			messageModified: '2018-04-05',
			messageCreator: { displayName: 'Sheryl White Vincent', account: 'swvincent' },
			messageBody: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
			messageExpiration: '2018-10-05'
		}
	];

	public static getMessages() {
		return new Promise((resolve) => {
			resolve(this._hcMessages);
		});
	}

	public static getMessagesSettings() {
		return new Promise((resolve) => {
			resolve(this._hcMessagesSettings.docs[0].categories);
		});
	}
}