
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sass/main.sass';

class HcContainer extends React.Component {
	render() {
		return (
			<div>
				<p>hcTopCommandBar here</p>
				<p>hcGetItDone here</p>
				<p>hcStaffLookup here</p>
				<p>hcPushedItems here</p>
				<p>hcMessage here</p>
				<p>hcOrganization here</p>
				<p>hcCalendarsSchedules here</p>
			</div>
		);
	}
}
ReactDOM.render(<HcContainer />, document.getElementById('DeltaPlaceHolderMain'));
