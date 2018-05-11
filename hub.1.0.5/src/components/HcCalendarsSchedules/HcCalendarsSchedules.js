
// ----- IMPORTS

import * as React from 'react';

import './HcCalendarsSchedules.sass';
import './HcCalendarsSchedulesMediumLarge.sass';
import './HcCalendarsSchedulesSmall.sass';

// ----- COMPONENT

const HcCalendarsSchedules = props => (
	<div id="hc-calendars-and-schedules" className="mos-react-component-root">
		<h2>Calendars & Schedules</h2>
		<ul>
			<li>
				<a href="/sites/mwec/SitePages/Museum-wide%20Event%20Calendar.aspx" target="_blank">
					Museumwide Event Calendar
				</a>
			</li>
			<li>
				<a href="/sites/wpc-cafe/SitePages/Riverview Café.aspx" target="_blank">
					Riverview Caf&eacute;
				</a>
			</li>
			<li>
				<a href="/sites/pt/SitePages/Product%20Timeline.aspx" target="_blank">
					Product Timeline
				</a>
			</li>
		</ul>
	</div>
);

export default HcCalendarsSchedules;
