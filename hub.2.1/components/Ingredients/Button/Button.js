
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
	clickHandler,
	buttonHeight,
	contentHeight,
	// iconPosition,
	// iconContent,
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
		contentColor={contentColor}
		marginInRem={marginInRem}
		buttonHeight={buttonHeight || contentHeight}
		/* 
		contentHeight={contentHeight || Style.FontSize('m', sData.size)}
		
		*/
	>
		<Plane
			elevationLevel={elevationLevel}
			backgroundColor={backgroundColor}
			contentColor={contentColor}
			heightInRem={heightInRem}
			widthInRem={widthInRem}
			paddingInRem={{
				top: ReturnButtonVerticalPadding(buttonHeight, contentHeight, 'top'),
				right: 1,
				bottom: ReturnButtonVerticalPadding(buttonHeight, contentHeight, 'bottom'),
				left: 1,
			}}
			verticallyCenterContent
			interactive
			role="button"
			tabindex="0"
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
