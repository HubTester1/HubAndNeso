
// import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../Button/Button.Pres';
import Style from '../../../services/Style';

const LinkButton = ({ 
	newS,
	newP,
	handleClick,
}) => (
	<Button
		buttonHeight="3"
		iconPosition="before"
		iconContent="home"
		contentHeight="1.8"
		text="Home 5"
		defaultBackgroundColor="transparent"
		defaultContentColor={Style.Color('interactive-on-dark-default')}
		activeBackgroundColor="transparent"
		activeContentColor={Style.Color('interactive-on-dark-active')}
		clickHandler={() => handleClick('home', 'todayAndRecent')}
	/>
);

const mapStateToProps = state => state;// ownProps

const mapDispatchToProps = dispatch => ({// ownProps
	handleClick: (newS, newP) => {
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
