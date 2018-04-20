interface IHcMessage {
	_id: string;
	messageCategory: string;
	messageSubject: string;
	messageCreated: string;
	messageModified: string;
	messageCreator: {
		displayName: string;
		account: string
	};
	messageBody: string;
	messageImage?: string;
	messageExpiration: string;
}

export default IHcMessage;