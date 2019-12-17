
// import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../Button/Button.Pres';
// import Style from '../../../services/Style';

const LinkButton = ({ 
	newS,
	newP,
	handleClick,
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
	<Button
		buttonHeight
		iconPosition
		iconContent
		iconHeight
		text
		textInvisible
		defaultBackgroundColor
		defaultContentColor
		activeBackgroundColor
		activeContentColor
		clickHandler={() => handleClick(newS, newP)}
	/>
);

const mapStateToProps = state => state;// ownProps

const mapDispatchToProps = dispatch => ({// ownProps
	handleClick: (newS, newP) => {
		// window.history.pushState(null, null, 'index?s=home');
		dispatch({
			type: 'UPDATE_SELECTED_SCREEN_AND_PARTIAL',
			s: newS,
			p: newP,
		});
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LinkButton);
