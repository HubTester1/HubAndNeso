
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon.Pres';
import Style from '../../../services/Style';

// --- COMPONENT

const ReturnButtonVerticalPadding = (buttonHeight, contentHeight, topOrBottom) => {
	const timesTen = parseFloat(((buttonHeight - contentHeight) / 2).toFixed(2)) * 10;
	const rounded = topOrBottom === 'top' ? Math.ceil(timesTen) : Math.floor(timesTen);
	return rounded / 10;
};

const ReturnVisibleTextWrapperHorizontalPadding = 
	iconPosition => (iconPosition === 'before' ? 'padding-left: 1rem;' : 'padding-right: 1rem;');

const ReturnButtonWidth = fullWidth => (fullWidth ? '100%' : 'auto');

const ButtonBase = styled.button`
	display: inline-block;
	width: ${props => ReturnButtonWidth(props.fullWidth)};
	padding: ${props => ReturnButtonVerticalPadding(props.buttonHeight, props.contentHeight, 'top')}rem 1rem ${props => ReturnButtonVerticalPadding(props.buttonHeight, props.contentHeight, 'bottom')}rem 1rem;
	border: 0;
	background-color: ${props => props.defaultBackgroundColor};
	color: ${props => props.defaultContentColor};
	cursor: pointer;
	transition: color ${Style.StandardTransitionTime()}, background-color ${Style.StandardTransitionTime()};

	&:hover {
		background-color: ${props => props.activeBackgroundColor};
		color: ${props => props.activeContentColor};
	}
`;

const VisibleTextWrapper = styled.span`
	font-size: ${props => props.textSize}rem;
	font-weight: normal;
	text-align: ${props => props.textAlignment || 'left'};
	${props => ReturnVisibleTextWrapperHorizontalPadding(props.iconPosition)}
`;

const InvisibleTextWrapper = styled.span`
	${Style.InlineHidden()}
`;

export default props => (
	<ButtonBase
		onClick={props.clickHandler}
		buttonHeight={props.buttonHeight}
		contentHeight={props.contentHeight}
		defaultBackgroundColor={props.defaultBackgroundColor}
		defaultContentColor={props.defaultContentColor}
		activeBackgroundColor={props.activeBackgroundColor}
		activeContentColor={props.activeContentColor}
	>
		{
			props.iconPosition === 'before' && props.iconContent && 

			<Icon
				iconPosition="before"
				iconContent={props.iconContent}
				iconSize={props.contentHeight}
			/>
		}
		{
			!props.textInvisible &&

			<VisibleTextWrapper
				textSize={props.contentHeight}
				iconContent={props.iconContent}
			>
				{props.text}
			</VisibleTextWrapper>
		}
		{
			props.textInvisible &&

			<InvisibleTextWrapper>{props.text}</InvisibleTextWrapper>
		}
		{
			props.iconPosition === 'after' && props.iconContent &&

			<Icon
				iconPosition="after"
				iconContent={props.iconContent}
				iconSize={props.contentHeight}
			/>
		}
	</ButtonBase>
);
