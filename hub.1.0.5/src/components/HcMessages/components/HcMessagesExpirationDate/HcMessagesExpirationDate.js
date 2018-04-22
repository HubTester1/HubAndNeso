
// ----- IMPORTS

import * as React from 'react';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';

// ----- COMPONENT

const DayPickerStrings = {
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
		'December',
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
		'Dec',
	],

	days: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	],

	shortDays: [
		'S',
		'M',
		'T',
		'W',
		'T',
		'F',
		'S',
	],

	goToToday: 'Go to today',
	prevMonthAriaLabel: 'Go to previous month',
	nextMonthAriaLabel: 'Go to next month',
	prevYearAriaLabel: 'Go to previous year',
	nextYearAriaLabel: 'Go to next year',
};


class HcMessagesExpirationDate extends React.Component {
	state = {
		firstDayOfWeek: DayOfWeek.Sunday,
	};


	render() {
		const { firstDayOfWeek } = this.state;
		return (
			<div className="hc-messages-expiration-date mos-react-component-root">
				<DatePicker
					label="Expiration Date"
					firstDayOfWeek={firstDayOfWeek}
					strings={DayPickerStrings}
					onSelectDate={this.props.onSelectDate}
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
