module.exports = {
	ReturnStringWithInitialCapital: string => (
		string.replace(/^\w/, c => c.toUpperCase())
	),
};
