
// ----- IMPORTS

import * as React from 'react';
import HcStaffLookupData from './HcStaffLookupData';
import HcStaffLookupPicker from './components/HcStaffLookupPicker/HcStaffLookupPicker';
import HcStaffLookupPersonaCard from './components/HcStaffLookupPersonaCard/HcStaffLookupPersonaCard';

// ----- COMPONENT

export default class HcStaffLookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			personas: [],
		};
		this.setSelectedPersonasFromPeoplePickerData = 
			this.setSelectedPersonasFromPeoplePickerData.bind(this);
	}
	setSelectedPersonasFromPeoplePickerData(peoplePickerData) {
		console.log('peoplePickerData');
		console.log(peoplePickerData);
		HcStaffLookupData.ReturnPersonaDataUsingPeoplePickerData(peoplePickerData)
			.then((newPersonaData) => {
				this.setState(prevState => ({
					personas: [newPersonaData, ...prevState.personas],
				}));
			});
	}
	render() {
		console.log('personas on render');
		console.log(this.state.personas);
		return (
			<div id="hc-staff-lookup" className="mos-react-component-root">
				<h2>Staff Lookup</h2>
				<HcStaffLookupPicker
					peopleOptions={this.state.peopleOptions}
					setSelectedPersonasFromPeoplePickerData={this.setSelectedPersonasFromPeoplePickerData}
					principalTypeUser
				/>
				{
					this.state.personas[0] && 
					<h3>Staff Lookup Results</h3>
				}
				{
					this.state.personas[0] && 
						this.state.personas.map(personaValue => (
							<HcStaffLookupPersonaCard
								key={personaValue.key}
								personaId={personaValue.key}
								personaContent={personaValue}
							/>
						))
				}
			</div>
		);
	}
}
