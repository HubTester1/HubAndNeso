
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

export default ({
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
		contentHeight={contentHeight || '1.8'} // TO DO - get font size from Style; need screenSize - Style.FontSize()
		defaultBackgroundColor={defaultBackgroundColor || 'transparent'}
		defaultContentColor={defaultContentColor || 'red'}
		activeBackgroundColor={activeBackgroundColor || 'transparent'}
		activeContentColor={activeContentColor || 'red'}
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
