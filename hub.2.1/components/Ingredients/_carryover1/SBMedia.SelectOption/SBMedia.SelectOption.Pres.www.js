
// --- IMPORTS

import * as React from 'react';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

// --- COMPONENT

export default props => (
	<Button
		buttonHeight="3"
		contentHeight="2.2"
		text={props.option.display}
		defaultBackgroundColor={StylePatterns.Color('blue1')}
		defaultContentColor={StylePatterns.Color('yellow')}
		activeBackgroundColor={StylePatterns.Color('blue2')}
		activeContentColor={StylePatterns.Color('yellow')}
		clickHandler={
			e => 
				props
					.selectHandler(props.option, e)
		}

	/>
);
