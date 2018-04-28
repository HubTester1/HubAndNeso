/* eslint-disable */
// ----- IMPORTS

import * as React from 'react';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import HcStaffLookupPicker from './components/HcStaffLookupPicker/HcStaffLookupPicker';
import HcContainerData from '../../HcContainerData';

// ----- COMPONENT

export default class HcStaffLookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			personas: [],
		};
		this.setSelectedPersonas = this.setSelectedPersonas.bind(this);
	}
	setSelectedPersonas(personaPickerData) {
		console.log(personaPickerData);
		const newPersonaData = HcContainerData.ReturnUserDataUsingEmail(personaPickerData[0]._user.EntityData.Email);
		this.setState(prevState => ({
			personas: [newPersonaData, ...prevState.personas],
		}));
	}
	render() {
		console.log('parent state personas');
		console.log(this.state.personas);

		return (
			<div id="hc-staff-lookup" className="mos-react-component-root">
				<h2>Staff Lookup</h2>
				<HcStaffLookupPicker
					peopleOptions={this.state.peopleOptions}
					setSelectedPersonas={this.setSelectedPersonas}
					principalTypeUser
				/>
			</div>
		);
	}
}
