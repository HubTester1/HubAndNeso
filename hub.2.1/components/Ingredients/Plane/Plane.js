/**
 * @name Plane
 * @component
 * @category Components - Ingredients
 * @description Every two-dimensional space within app. Connected to Redux store.
 * @returns {Component} &lt;Plane />
 * 
 * @todo params, types, required or optional
 */

import { connect } from 'react-redux';
import { ReturnScreenSize } from '../../../services/State/Selectors';
import { ReturnDarkMode } from '../../../services/State/Selectors';
import styled from 'styled-components';
import Style from '../../../services/Style';

const ReturnElevationValues = (elevationString) => {
	const elevationBase = parseInt(elevationString, 10);
	const elevationUp = (elevationBase + 4 > 16) ? 16 : (elevationBase + 4);
	const elevationDown = (elevationBase - 4 < 0) ? 0 : (elevationBase - 4);
	return {
		base: elevationBase,
		up: elevationUp,
		down: elevationDown,
	};
};
const ReturnDimensionValues = (dimensionInRem) => {
	const dimensionBase = parseInt(dimensionInRem, 10);
	const dimensionUp = dimensionBase + 0.4;
	const dimensionDown = dimensionBase - 0.4;
	return {
		base: dimensionBase,
		up: dimensionUp,
		down: dimensionDown,
	};
};
const Container = styled.div`
	${({ widthInRem }) => (widthInRem && `width: ${widthInRem}rem`)};
	${({ heightInRem }) => (heightInRem && `height: ${heightInRem}rem`)};
	${({ marginInRem }) => (marginInRem && `margin: ${marginInRem}rem`)};
`;
const BaseAndLight = styled.div`
	position: relative;
	${({ widthInRem }) => (widthInRem && `width: ${widthInRem}rem`)};
	${({ heightInRem }) => (heightInRem && `height: ${heightInRem}rem`)};
	background-color: ${({ backgroundColor, darkMode }) => {
		if (backgroundColor) {
			return (Style.Color(backgroundColor, darkMode));
		}
		return (Style.Color('ux-base', darkMode));
	}};
	box-shadow: ${({ elevationLevel, darkMode }) => (Style.Shadow(`ux-l-${elevationLevel}`, darkMode))};
	transition: all ${Style.StandardTransitionTime()};

	&::before {
		box-sizing: border-box;
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${({ elevationLevel, darkMode }) => (Style.Color(`ux-l-${elevationLevel}`, darkMode))};
		border-width: .5rem;
		border-style: solid;
		border-color: transparent;
		transition: all ${Style.StandardTransitionTime()};
	}

	${({
		interactive, contentColor, darkMode, elevationLevel, widthInRem, heightInRem,
	}) => {
		let returnValue = '';
		if (interactive) {
			returnValue += 
				`&:hover {
					width: ${ReturnDimensionValues(widthInRem).up}rem;
					height: ${ReturnDimensionValues(heightInRem).up}rem;
					margin: -.2rem;
					box-shadow: ${Style.Shadow(`ux-l-${ReturnElevationValues(elevationLevel).up}`, darkMode)};


					&::before {
						width: ${ReturnDimensionValues(widthInRem).up}rem;
						height: ${ReturnDimensionValues(heightInRem).up}rem;
						background-color: ${(Style.Color(`ux-l-${ReturnElevationValues(elevationLevel).up}`, darkMode))};
					};
				}`;
			returnValue += 
				`&:focus,
				&:active {
					width: ${ReturnDimensionValues(widthInRem).down}rem;
					height: ${ReturnDimensionValues(heightInRem).down}rem;
					margin: .2rem
					box-shadow: ${Style.Shadow(`ux-l-${ReturnElevationValues(elevationLevel).up}`, darkMode)};	
				`;
			if (contentColor) {
				returnValue +=
					`border-color: ${Style.Color(contentColor, darkMode)};`;
			} else {
				returnValue +=
					`border-color: ${Style.Color('ux-base-text', darkMode)};`;
			}
			returnValue +=
				`&::before {
					width: ${ReturnDimensionValues(widthInRem).down}rem;
					height: ${ReturnDimensionValues(heightInRem).down}rem;
					background-color: ${(Style.Color(`ux-l-${ReturnElevationValues(elevationLevel).down}`, darkMode))};
					border-color: ${Style.Color(contentColor, darkMode)};
				};
			}`;
		}
		return returnValue;
	}}
`;
const Content = styled.div`
	${({ paddingInRem }) => (typeof (paddingInRem) === 'string' && `padding: ${paddingInRem}rem`)};
	${({ paddingInRem }) => (typeof (paddingInRem) === 'object' && `padding: ${paddingInRem.top}rem ${paddingInRem.right}rem ${paddingInRem.bottom}rem ${paddingInRem.left}rem`)};
	color: ${({ contentColor, darkMode }) => {
		if (contentColor) {
			return Style.Color(contentColor, darkMode);
		}
		return Style.Color('ux-base-text', darkMode);
	}};
	${({ verticallyCenterContent }) => {
		if (verticallyCenterContent) {
			return Style.VerticalAlignMiddle();
		}
		return '';
	}};
	${({ horizontallyCenterContent }) => {
		if (horizontallyCenterContent) {
			return 'text-align: center;';
		}
		return '';
	}};
`;
const Plane = ({
	elevationLevel,
	darkMode,
	screenSize,
	children,
	backgroundColor,
	contentColor,
	interactive,
	widthInRem,
	heightInRem,
	contentHeightInRem,
	paddingInRem,
	verticallyCenterContent,
	horizontallyCenterContent,
	marginInRem,
}) => (
	<Container
		widthInRem={widthInRem}
		heightInRem={heightInRem}
		marginInRem={marginInRem}
	>
		<BaseAndLight
			elevationLevel={elevationLevel || 0}
			backgroundColor={backgroundColor}
			contentColor={contentColor}
			darkMode={darkMode}
			interactive={interactive}
			widthInRem={widthInRem}
			heightInRem={heightInRem}
		>
			<Content
				contentColor={contentColor}
				paddingInRem={paddingInRem}
				darkMode={darkMode}
				verticallyCenterContent={verticallyCenterContent}
				horizontallyCenterContent={horizontallyCenterContent}
				contentHeightInRem={contentHeightInRem || Style.FontSize('m', screenSize).slice(0, -3)}
			>
				{children}
			</Content>
		</BaseAndLight>
	</Container>
);

const mapStateToProps = state => ({
	screenSize: ReturnScreenSize(state),
	darkMode: ReturnDarkMode(state)
});

export default connect(
	mapStateToProps,
)(Plane);
