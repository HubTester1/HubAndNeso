
// ----- IMPORTS

import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
// import XXX from '../XXX/XXX';

// ----- DEFINE INTERFACES





// ----- COMPONENT

const DayPickerStrings: IDatePickerStrings = {
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],

	shortMonths: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	],

	days: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	],

	shortDays: [
		'S',
		'M',
		'T',
		'W',
		'T',
		'F',
		'S'
	],

	goToToday: 'Go to today',
	prevMonthAriaLabel: 'Go to previous month',
	nextMonthAriaLabel: 'Go to next month',
	prevYearAriaLabel: 'Go to previous year',
	nextYearAriaLabel: 'Go to next year'
};


class HcMessagesExpirationDate extends React.Component<any, any> {

	public constructor(props: {}) {
		super(props);

		this.state = {
			firstDayOfWeek: DayOfWeek.Sunday
		};
	}


	public render() {
		const { firstDayOfWeek } = this.state;
		return (
			<div className="hc-messages-expiration-date mos-react-component-root">
				<DatePicker
					label='Expiration Date'
					firstDayOfWeek={firstDayOfWeek}
					strings={DayPickerStrings}
				// 	placeholder='Select a date...'
				// 	// tslint:disable:jsx-no-lambda
				// 	onAfterMenuDismiss={() => console.log('onAfterMenuDismiss called')}
				// // tslint:enable:jsx-no-lambda
				/>
			</div>
		);
	}
}

export default HcMessagesExpirationDate;