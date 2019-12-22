
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import Plane from '../Plane/Plane';
import Style from '../../../services/Style';

const ReturnButtonVerticalPadding = (buttonHeight, contentHeight, topOrBottom) => {
	const timesTen = parseFloat(((buttonHeight - contentHeight) / 2).toFixed(2)) * 10;
	const rounded = topOrBottom === 'top' ? Math.ceil(timesTen) : Math.floor(timesTen);
	return rounded / 10;
};

const ReturnVisibleTextWrapperHorizontalPadding =
	iconPosition => (iconPosition === 'before' ? 'padding-left: 1rem;' : 'padding-right: 1rem;');

const ReturnButtonWidth = fullWidth => (fullWidth ? '100%' : 'auto');
/* 
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

*/
const ButtonBase = styled.button`
	border: 0;
	padding: 0;
	background-color: transparent;
	&:not(.default)::-moz-focus-inner {
		border-style: none;
	}
	&:focus {
		border: 2px solid ${({ backgroundColor, darkMode }) => (Style.Color(`${backgroundColor}`, darkMode))};
		outline: 2px solid ${({ contentColor, darkMode }) => (Style.Color(`${contentColor}`, darkMode))};
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
	// sData,
	// uData,
	clickHandler,
	// buttonHeight,
	// iconPosition,
	// iconContent,
	contentHeight,
	text,
	textInvisible,
	// defaultBackgroundColor,
	// defaultContentColor,
	// activeBackgroundColor,
	// activeContentColor,
	elevationLevel,
	backgroundColor,
	contentColor,
	heightInRem,
	widthInRem,
	paddingInRem,
}) => (
	<ButtonBase
		onClick={clickHandler}
		backgroundColor={backgroundColor}
		contentColor={contentColor}
		darkMode={false}
		/* buttonHeight={buttonHeight || contentHeight}
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
		} */
	>
		<Plane
			elevationLevel={elevationLevel}
			backgroundColor={backgroundColor}
			contentColor={contentColor}
			heightInRem={heightInRem}
			widthInRem={widthInRem}
			paddingInRem={paddingInRem}
			interactive
		>
			{/* {
				iconPosition === 'before' && iconContent && 

				<Icon
					iconPosition="before"
					iconContent={iconContent}
					iconSize={contentHeight}
				/>
			} */}
			{
				!textInvisible &&

				<VisibleTextWrapper
					textSize={contentHeight}
					// iconContent={iconContent}
					className="VisibleTextWrapper"
				>
					{text}
				</VisibleTextWrapper>
			}
			{
				textInvisible &&

				<InvisibleTextWrapper>{text}</InvisibleTextWrapper>
			}
			{/* {
				iconPosition === 'after' && iconContent &&

				<Icon
					iconPosition="after"
					iconContent={iconContent}
					iconSize={contentHeight}
				/>
			} */}
		</Plane>
	</ButtonBase>
);

export default Button;
