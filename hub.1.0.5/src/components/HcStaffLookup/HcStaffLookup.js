
// ----- IMPORTS

import * as React from 'react';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import HcStaffLookupPicker from './components/HcStaffLookupPicker/HcStaffLookupPicker';


// ----- COMPONENT


export default class HcStaffLookup extends React.Component {
	constructor(props) {
		super(props);
		const basePeopleData = [
			{
				imageUrl: './images/persona-female.png',
				imageInitials: 'PV',
				primaryText: 'Annie Lindqvist',
				secondaryText: 'Designer',
				tertiaryText: 'In a meeting',
				optionalText: 'Available at 4:00pm',
			},
			{
				imageUrl: './images/persona-male.png',
				imageInitials: 'AR',
				primaryText: 'Aaron Reid',
				secondaryText: 'Designer',
				tertiaryText: 'In a meeting',
				optionalText: 'Available at 4:00pm',
			},
			{
				imageUrl: './images/persona-male.png',
				imageInitials: 'AL',
				primaryText: 'Alex Lundberg',
				secondaryText: 'Software Developer',
				tertiaryText: 'In a meeting',
				optionalText: 'Available at 4:00pm',
			},
			{
				imageUrl: './images/persona-male.png',
				imageInitials: 'RK',
				primaryText: 'Roko Kolar',
				secondaryText: 'Financial Analyst',
				tertiaryText: 'In a meeting',
				optionalText: 'Available at 4:00pm',
			},
		];
		const peopleOptions = [];
		basePeopleData.forEach((persona) => {
			const target = {};
			assign(target, persona);
			peopleOptions.push(target);
		});
		this.state = {
			selectedPersonas: [],
			peopleOptions,
		};
		this.setSelectedPersonas = this.setSelectedPersonas.bind(this);
	}
	setSelectedPersonas(personData) {
		this.setState(prevState => ({
			selectedPersonas: [personData, ...prevState.selectedPersonas],
		}));
	}
	render() {
		return (
			<div id="hc-staff-lookup" className="mos-react-component-root">
				<h2>Staff Lookup</h2>
				<HcStaffLookupPicker
					peopleOptions={this.state.peopleOptions}
					setSelectedPersonas={this.setSelectedPersonas}
				/>
			</div>
		);
	}
}
