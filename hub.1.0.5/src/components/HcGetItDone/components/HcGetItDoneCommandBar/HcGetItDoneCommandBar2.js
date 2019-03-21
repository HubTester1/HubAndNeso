
// ----- IMPORTS

import * as React from 'react';
// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
// import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import CommandBar from '../../../CommandBar/CommandBar';

// ----- COMPONENT

const HcGetItDoneCommandBar = props => (
	<div id="hc-get-it-done-command-bar" className="mos-react-component-root">
		<CommandBar
			screenType={props.screenType}
			collapseOnScreenTypes={['medium']}
			items={[
				{
					type: 'button',
					key: 'grouped',
					name: 'Grouped',
					icon: 'GridViewSmall',
					ariaLabel: 'Grouped items',
					onClick: props.handleClickViewByGroupButton,
				}, {
					type: 'button',
					key: 'alphabetical',
					name: 'Alphabetical',
					icon: 'HalfAlpha',
					ariaLabel: 'Alphabetical list',
					onClick: props.handleClickViewByAlphaButton,
				}, {
					type: 'searchBox',
					key: 'search',
					placeholder: 'Filter',
					icon: 'Filter',
					onChange: props.handleFilterTextChange,
				},
			]}
		/>


		{/* <Fabric>
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
						}, {
							key: 'search',
							onRender: () => (<SearchBox
								placeholder="Filter"
								onChange={props.handleFilterTextChange}
							/>),
						},
					]
				}
			/>
		</Fabric> */}
	</div>
);

export default HcGetItDoneCommandBar;
