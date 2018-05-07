
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';

import EnvironmentDetector from '../../services/EnvironmentDetector';
import MOSUtilities from '../../services/MOSUtilities';
import ScreenSizes from '../../services/ScreenSizes';

import HcContainerData from './HcContainerData';
import HcHeader from '../../components/HcHeader/HcHeader';
import HcStaffLookup from '../../components/HcStaffLookup/HcStaffLookup';
import HcGetItDone from '../../components/HcGetItDone/HcGetItDone';
import HcPushedItems from '../../components/HcPushedItems/HcPushedItems';
import HcMessages from '../../components/HcMessages/HcMessages';
import HcOrganization from '../../components/HcOrganization/HcOrganization';

// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

// ----- COMPONENT

class HcContainer extends React.Component {
	state = {
		uData: {},
	};
	componentDidMount() {
		if (EnvironmentDetector.ReturnIsHCScreen()) {
			HcContainerData.ReturnUData()
				.then((response) => {
					const accountBrief = 
						MOSUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', MOSUtilities.ReplaceAll('@mos.org', '', response.LoginName.toLowerCase()));
					this.setState(() => ({
						uData: {
							email: response.Email,
							account: accountBrief,
							displayName: response.Title,
						},
					}));
				})
				.catch((error) => {
					// 
				});
		}
	}
	render() {
		if (EnvironmentDetector.ReturnIsHCScreen()) {
			return (
				<div>
					<HcHeader />
					<MediaQuery maxDeviceWidth={ScreenSizes.ReturnSmallMax()}>
						<HcStaffLookup />
					</MediaQuery>
					<MediaQuery minDeviceWidth={ScreenSizes.ReturnMediumMin()}>
						<div id="hc-staff-lookup-and-top-messages">
							<HcStaffLookup />
							<HcMessages
								uData={this.state.uData}
								allOrTop="top"
							/>
						</div>
					</MediaQuery>
					<HcGetItDone />
					<HcMessages
						uData={this.state.uData}
						allOrTop="all"
					/>
					<HcPushedItems />
					<HcOrganization />
					{/* <p>HcCalendarsSchedules here</p> */}
				</div>
			);
		}
		return null;
	}
}


ReactDOM.render(<HcContainer />, document.getElementById('s4-bodyContainer'));
