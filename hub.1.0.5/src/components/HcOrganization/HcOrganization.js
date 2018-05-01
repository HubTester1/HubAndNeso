
// ----- IMPORTS

import * as React from 'react';
import HcOrganizationData from './HcOrganizationData';
import HcOrganizationCommandBar from './components/HcOrganizationCommandBar/HcOrganizationCommandBar';
import HcOrganizationGroups from './components/HcOrganizationGroups/HcOrganizationGroups';
import HcStaffLookup from '../HcStaffLookup/HcStaffLookup';
import HcOrganizationOtherContacts from './components/HcOrganizationOtherContacts/HcOrganizationOtherContacts';
import HcOrganizationMission from './components/HcOrganizationMission/HcOrganizationMission';

// ----- COMPONENT

export default class HcOrganization extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showGroups: true,
			showStaffLookup: false,
			showOtherContacts: false,
			showMission: false,
			groupsArray: [],
			otherContactsArray: [],
			mission: '',
			queryError: false,
		};
		this.handleClickShowGroups = this.handleClickShowGroups.bind(this);
		this.handleClickShowStaffLookup = this.handleClickShowStaffLookup.bind(this);
		this.handleClickOtherContacts = this.handleClickOtherContacts.bind(this);
		this.handleClickShowMission = this.handleClickShowMission.bind(this);
	}
	componentDidMount() {
		HcOrganizationData.ReturnAllGetItDoneData()
			.then((allOrganizationData) => {
				this.setState(() => ({
					groupsArray: allOrganizationData.groupsArray,
					otherContactsArray: allOrganizationData.otherContactsArray,
					mission: allOrganizationData.mission,
				}));
			})
			.catch((error) => {
				this.setState(() => ({
					queryError: true,
				}));
			});
	}
	handleClickShowGroups(e) {
		e.preventDefault();
		this.setState(() => ({
			showGroups: true,
			showStaffLookup: false,
			showOtherContacts: false,
			showMission: false,
		}));
	}
	handleClickShowStaffLookup(e) {
		e.preventDefault();
		this.setState(() => ({
			showGroups: false,
			showStaffLookup: true,
			showOtherContacts: false,
			showMission: false,
		}));
	}
	handleClickOtherContacts(e) {
		e.preventDefault();
		this.setState(() => ({
			showGroups: false,
			showStaffLookup: false,
			showOtherContacts: true,
			showMission: false,
		}));
	}
	handleClickShowMission(e) {
		e.preventDefault();
		this.setState(() => ({
			showGroups: false,
			showStaffLookup: false,
			showOtherContacts: false,
			showMission: true,
		}));
	}
	render() {
		return (
			<div id="hc-organization" className="mos-react-component-root">
				<h2>Organization, Teams, & Staff</h2>
				{
					!this.state.queryError &&

					<div id="hc-organization-body">
						<HcOrganizationCommandBar
							handleClickShowGroups={this.handleClickShowGroups}
							handleClickShowStaffLookup={this.handleClickShowStaffLookup}
							handleClickOtherContacts={this.handleClickOtherContacts}
							handleClickShowMission={this.handleClickShowMission}
						/>
						{
							this.state.showGroups &&

							<HcOrganizationGroups
								groupsArray={this.state.groupsArray}
							/>
						}
						{
							this.state.showStaffLookup &&

							<HcStaffLookup />
						}
						{
							this.state.showOtherContacts &&

							<HcOrganizationOtherContacts
								otherContactsArray={this.state.otherContactsArray}
							/>
						}
						{
							this.state.showMission &&

							<HcOrganizationMission
								mission={this.state.mission}
							/>
						}
					</div>
				}
				{
					this.state.queryError &&

					<p id="hc-get-it-done-body">I can&apos;t show you this information right now.</p>
				}
			</div>
		);
	}
}
