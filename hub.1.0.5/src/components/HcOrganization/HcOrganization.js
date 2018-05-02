
// ----- IMPORTS

import * as React from 'react';
import HcOrganizationData from './HcOrganizationData';
import HcOrganizationCommandBar from './components/HcOrganizationCommandBar/HcOrganizationCommandBar';
import HcOrganizationTeams from './components/HcOrganizationTeams/HcOrganizationTeams';
import HcStaffLookup from '../HcStaffLookup/HcStaffLookup';
import HcOrganizationOtherContacts from './components/HcOrganizationOtherContacts/HcOrganizationOtherContacts';
import HcOrganizationMission from './components/HcOrganizationMission/HcOrganizationMission';

// ----- COMPONENT

export default class HcOrganization extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTeams: true,
			showStaffLookup: false,
			showOtherContacts: false,
			showMission: false,
			divDeptWTeamsArray: [],
			nonDivDeptTeamsArray: [],
			otherContactsArray: [],
			queryError: false,
		};
		this.handleClickShowTeams = this.handleClickShowTeams.bind(this);
		this.handleClickShowStaffLookup = this.handleClickShowStaffLookup.bind(this);
		this.handleClickOtherContacts = this.handleClickOtherContacts.bind(this);
		this.handleClickShowMission = this.handleClickShowMission.bind(this);
	}
	componentDidMount() {
		HcOrganizationData.ReturnAllOrganizationData()
			.then((allOrganizationData) => {
				console.log('allOrganizationData');
				console.log(allOrganizationData);
				this.setState(() => ({
					divDeptWTeamsArray: allOrganizationData.divDeptWTeams,
					nonDivDeptTeamsArray: allOrganizationData.nonDivDeptTeams,
					otherContactsArray: allOrganizationData.otherContacts,
				}));
			})
			.catch((error) => {
				this.setState(() => ({
					queryError: true,
				}));
			});
	}
	handleClickShowTeams(e) {
		e.preventDefault();
		this.setState(() => ({
			showTeams: true,
			showStaffLookup: false,
			showOtherContacts: false,
			showMission: false,
		}));
	}
	handleClickShowStaffLookup(e) {
		e.preventDefault();
		this.setState(() => ({
			showTeams: false,
			showStaffLookup: true,
			showOtherContacts: false,
			showMission: false,
		}));
	}
	handleClickOtherContacts(e) {
		e.preventDefault();
		this.setState(() => ({
			showTeams: false,
			showStaffLookup: false,
			showOtherContacts: true,
			showMission: false,
		}));
	}
	handleClickShowMission(e) {
		e.preventDefault();
		this.setState(() => ({
			showTeams: false,
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
							handleClickShowTeams={this.handleClickShowTeams}
							handleClickShowStaffLookup={this.handleClickShowStaffLookup}
							handleClickOtherContacts={this.handleClickOtherContacts}
							handleClickShowMission={this.handleClickShowMission}
						/>
						{
							this.state.showTeams &&

							<HcOrganizationTeams
								divDeptWTeamsArray={this.state.divDeptWTeamsArray}
								nonDivDeptTeamsArray={this.state.nonDivDeptTeamsArray}
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

							<HcOrganizationMission />
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
