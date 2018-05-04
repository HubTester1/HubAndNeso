
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sass/main.sass';

import MOSUtilities from './services/MOSUtilities';

import HcContainerData from './HcContainerData';
import HcTopCommandBar from './components/HcTopCommandBar/HcTopCommandBar';
import HcStaffLookup from './components/HcStaffLookup/HcStaffLookup';
import HcGetItDone from './components/HcGetItDone/HcGetItDone';
import HcPushedItems from './components/HcPushedItems/HcPushedItems';
import HcMessages from './components/HcMessages/HcMessages';
import HcOrganization from './components/HcOrganization/HcOrganization';
// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

// ----- COMPONENT

class HcContainer extends React.Component {
	state = {
		uData: {},
	};
	componentDidMount() {
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
	render() {
		return (
			<div>
				<HcTopCommandBar />
				<HcStaffLookup />
				<HcPushedItems />
				<HcGetItDone />
				<HcOrganization />
				<HcMessages
					uData={this.state.uData}
				/>		
				{/* <p>HcCalendarsSchedules here</p> */}
			</div>
		);
	}
}


ReactDOM.render(<HcContainer />, document.getElementById('DeltaPlaceHolderMain'));
