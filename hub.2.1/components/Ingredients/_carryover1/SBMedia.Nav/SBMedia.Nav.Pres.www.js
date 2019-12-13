
// --- IMPORTS

import * as React from 'react';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import FixedContainer from '../SBMedia.FixedContainer/SBMedia.FixedContainer.Pres.www';
import FlexContainer from '../SBMedia.FlexContainer/SBMedia.FlexContainer.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

// --- COMPONENT

export default props => (
	<FixedContainer
		bottom="0"
		right="0"
		left="0"
		padding="1rem 0"
		margin="0"
		backgroundColor={StylePatterns.Color('blue1')}
	>
		<FlexContainer
			justifyContent="space-around"
		>
			<Button
				buttonHeight="3"
				iconPosition="before"
				iconContent="tachometer"
				contentHeight="2.2"
				text="Dash"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor={StylePatterns.Color('red5')}
				activeBackgroundColor="transparent"
				activeContentColor={StylePatterns.Color('red3')}
				clickHandler={props.handleButtonDashClick}
			/>
			<Button
				buttonHeight="3"
				iconPosition="before"
				iconContent="list-ul"
				contentHeight="2.2"
				text="Blogs"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor={StylePatterns.Color('red5')}
				activeBackgroundColor="transparent"
				activeContentColor={StylePatterns.Color('red3')}
				clickHandler={props.handleButtonBlogsClick}
			/>
			<Button
				buttonHeight="3"
				iconPosition="before"
				iconContent="user"
				contentHeight="2.2"
				text="Skip Baker"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor={StylePatterns.Color('red5')}
				activeBackgroundColor="transparent"
				activeContentColor={StylePatterns.Color('red3')}
				clickHandler={props.handleButtonSBClick}
			/>
			<Button
				buttonHeight="3"
				iconPosition="before"
				iconContent="cog"
				contentHeight="2.2"
				text="Administration"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor={StylePatterns.Color('red5')}
				activeBackgroundColor="transparent"
				activeContentColor={StylePatterns.Color('red3')}
				clickHandler={props.handleButtonAdminClick}
			/>
		</FlexContainer>
	</FixedContainer>
);
