
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sass/main.sass';

import HcTopCommandBar from './components/HcTopCommandBar/HcTopCommandBar';
import HcStaffLookup from './components/HcStaffLookup/HcStaffLookup';
import HcGetItDone from './components/HcGetItDone/HcGetItDone';
import HcPushedItems from './components/HcPushedItems/HcPushedItems';
import HcMessages from './components/HcMessages/HcMessages';

// ----- COMPONENT

/* class HcContainer extends React.Component {
	render() {
		return (
			<div>
				<HcTopCommandBar />
				<p>hcGetItDone here</p>
				<p>hcStaffLookup here</p>
				<p>hcPushedItems here</p>
				<p>hcMessage here</p>
				<p>hcOrganization here</p>
				<p>hcCalendarsSchedules here</p>
			</div>
		);
	}
} */

const HcContainer = () => (
	<div>
		<HcTopCommandBar />
		<HcGetItDone />
		<HcStaffLookup />
		<HcPushedItems />
		<HcMessages />		
		<p>hcOrganization here</p>
		<p>hcCalendarsSchedules here</p>
	</div>
);

ReactDOM.render(<HcContainer />, document.getElementById('DeltaPlaceHolderMain'));
