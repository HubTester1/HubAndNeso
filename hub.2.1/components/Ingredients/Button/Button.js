/**
 * @name Button
 * @component
 * @category Components - Ingredients
 * @description Button. Connected to Redux store.
 * @returns {Component} &lt;Button />
 *
 * @todo params, types, required or optional
 */

import { connect } from 'react-redux';
import { ReturnScreenSize } from '../../../services/State/Selectors';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import Plane from '../Plane/Plane';
import Style from '../../../services/Style';

const ReturnContentHeightInRem = (contentHeightInRem, screenSize) => 
	(contentHeightInRem || Style.FontSize('m', screenSize).slice(0, -3));

const ReturnButtonVerticalPadding = (heightInRem, contentHeightInRem, topOrBottom) => {
	const timesTen = 
		parseFloat(((heightInRem - contentHeightInRem) / 2).toFixed(2)) * 10;
	const rounded = topOrBottom === 'top' ? Math.ceil(timesTen) : Math.floor(timesTen);
	return rounded / 10;
};

const ReturnVisibleTextWrapperHorizontalPadding =
	iconPosition => (iconPosition === 'before' ? 'padding-left: 1rem;' : 'padding-right: 1rem;');

const ButtonBase = styled.button`
	border: 0;
	padding: 0;
	background-color: transparent;
	${({ widthInRem }) => (widthInRem && `width: ${widthInRem}rem`)};
	${({ heightInRem }) => (heightInRem && `height: ${heightInRem}rem`)};
	${({ marginInRem }) => (marginInRem && `margin: ${marginInRem}rem`)};
	cursor: pointer;
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
	screenSize,
	iconPosition,
	iconContent,
	clickHandler,
	contentHeightInRem,
	text,
	textInvisible,
	elevationLevel,
	backgroundColor,
	contentColor,
	heightInRem,
	widthInRem,
	marginInRem,
}) => (
	<ButtonBase
		onClick={clickHandler}
		heightInRem={heightInRem}
		widthInRem={widthInRem}
		marginInRem={marginInRem}
		role="button"
	>
		<Plane
			elevationLevel={elevationLevel}
			backgroundColor={backgroundColor}
			contentColor={contentColor}
			widthInRem={widthInRem}
			heightInRem={heightInRem}
			contentHeightInRem={ReturnContentHeightInRem(contentHeightInRem, screenSize)}
			paddingInRem={{
				top: ReturnButtonVerticalPadding(heightInRem, ReturnContentHeightInRem(contentHeightInRem, screenSize), 'top'),
				right: 1,
				bottom: ReturnButtonVerticalPadding(heightInRem, ReturnContentHeightInRem(contentHeightInRem, screenSize), 'bottom'),
				left: 1,
			}}
			horizontallyCenterContent
			verticallyCenterContent
			interactive
			tabindex="0"
		>
			{
				iconContent && iconPosition === 'before' && 

				<Icon
					iconPosition={iconPosition}
					iconContent={iconContent}
					contentColor={contentColor}
					contentHeightInRem={ReturnContentHeightInRem(contentHeightInRem, screenSize)}
				/>
			}
			{
				!textInvisible &&

				<VisibleTextWrapper
					textSize={contentHeightInRem}
					iconPosition={iconPosition}
				>
					{text}
				</VisibleTextWrapper>
			}
			{
				textInvisible &&

				<InvisibleTextWrapper>{text}</InvisibleTextWrapper>
			}
			{
				iconContent && iconPosition === 'after' && 

				<Icon
					iconPosition={iconPosition}
					iconContent={iconContent}
					contentColor={contentColor}
					contentHeightInRem={ReturnContentHeightInRem(contentHeightInRem, screenSize)}
				/>
			}
		</Plane>
	</ButtonBase>
);

const mapStateToProps = state => ({
	screenSize: ReturnScreenSize(state),
});

export default connect(
	mapStateToProps,
)(Button);
