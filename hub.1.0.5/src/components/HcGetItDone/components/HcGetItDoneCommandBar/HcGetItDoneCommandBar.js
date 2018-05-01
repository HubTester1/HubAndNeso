
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';


// ----- COMPONENT

const HcGetItDoneCommandBar = props => (
	<div id="hc-get-it-done-command-bar" className="mos-react-component-root">
		<Fabric>
			<CommandBar
				isSearchBoxVisible={false}
				items={
					[
						{
							key: 'grouped',
							name: 'Grouped',
							icon: 'GridViewSmall',
							ariaLabel: 'Grouped items',
							onClick: props.handleClickViewByGroupButton,
						}, {
							key: 'alphabetical',
							name: 'Alphabetical',
							icon: 'HalfAlpha',
							ariaLabel: 'Alphabetical list',
							onClick: props.handleClickViewByAlphaButton,
						},
					]
				}
			/>
		</Fabric>
	</div>
);

export default HcGetItDoneCommandBar;
