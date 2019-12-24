
// --- IMPORTS

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
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

const Button = ({
	sData,
	uData,
	clickHandler,
	buttonHeight,
	iconPosition,
	iconContent,
	contentHeight,
	text,
	textInvisible,
	defaultBackgroundColor,
	defaultContentColor,
	activeBackgroundColor,
	activeContentColor,
}) => (
	<ButtonBase
		onClick={clickHandler}
		buttonHeight={buttonHeight || contentHeight}
		contentHeight={contentHeight || Style.FontSize('m', sData.size)}
		defaultBackgroundColor={defaultBackgroundColor || 'transparent'}
		defaultContentColor={
			defaultContentColor || 
			Style.Color('ux-interactive-default', uData.user.preferences.darkMode)
		}
		activeBackgroundColor={activeBackgroundColor || 'transparent'}
		activeContentColor={
			activeContentColor || 
			Style.Color('interactive-active', uData.user.preferences.darkMode)
		}
	>
		{
			iconPosition === 'before' && iconContent && 

			<Icon
				iconPosition="before"
				iconContent={iconContent}
				iconSize={contentHeight}
			/>
		}
		{
			!textInvisible &&

			<VisibleTextWrapper
				textSize={contentHeight}
				iconContent={iconContent}
			>
				{text}
			</VisibleTextWrapper>
		}
		{
			textInvisible &&

			<InvisibleTextWrapper>{text}</InvisibleTextWrapper>
		}
		{
			iconPosition === 'after' && iconContent &&

			<Icon
				iconPosition="after"
				iconContent={iconContent}
				iconSize={contentHeight}
			/>
		}
	</ButtonBase>
);

export default connect(state => state)(Button);
