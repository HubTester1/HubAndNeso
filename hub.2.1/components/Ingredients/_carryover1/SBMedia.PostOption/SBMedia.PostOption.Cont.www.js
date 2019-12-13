
// --- IMPORTS

import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import ScreenSizes from '../../services/ScreenSizes';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import PostOptionForm from '../SBMedia.PostOptionForm/SBMedia.PostOptionForm.Cont.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

// --- COMPONENT

const PostContainer = styled.li`
	list-style: none;
	padding: 0;
	margin: 0 0 2rem 0;
`;

const PostImage = styled.img`
	display: block;
	width: 100%;
`;

const PostOptionsContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue2')};
`;

const PostOptionsHeaderContainer = styled.div`
	display: grid;
	grid-template-columns: 50px 1fr;
`;

const PostOptionsButtonContainer = styled.div`
`;

const PostBlogNameContainer = styled.div`
	padding-top: .3rem	
	text-align: right;
`;

const PostBlogName = styled.a`
	font-size: ${StylePatterns.FontSize('xs')};
	color: ${StylePatterns.Color('red5')};
	text-decoration: none;
`;

export default class PostsOption extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// added: false,
			showPostOptions: false,
		};
		this.handlePostOptionsButtonClick = this.handlePostOptionsButtonClick.bind(this);
	}
	handlePostOptionsButtonClick() {
		this.setState(prevState => ({
			showPostOptions: !prevState.showPostOptions,
		}));
	}

	render() {
		return (
			<PostContainer>
				<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
					<PostImage
						src={this.props.postOptionContent.pics.small}
						// postOptionID={this.props.postOptionContent.id}
						// postOptionSelected={this.props.postOptionSelected}
						// onClick={
						// 	e => 
						// 		props
						// 			.handlePostOptionClick
						// 			(this.props.postOptionContent.id, this.props.postOptionSelected, e)
						// }
					/>
				</MediaQuery>
				<MediaQuery
					minWidth={ScreenSizes.ReturnMediumMin()}
					maxWidth={ScreenSizes.ReturnMediumMax()}
				>
					<PostImage
						src={this.props.postOptionContent.pics.medium}
					/>
				</MediaQuery>
				<MediaQuery minWidth={ScreenSizes.ReturnLargeMin()}>
					<PostImage
						src={this.props.postOptionContent.pics.large}
					/>
				</MediaQuery>
				<PostOptionsContainer>
					<PostOptionsHeaderContainer>
						<PostOptionsButtonContainer>
							<Button
								buttonHeight="3"
								iconPosition="before"
								iconContent="ellipsis-h"
								contentHeight="2.2"
								text="Post Options"
								textInvisible
								defaultBackgroundColor="transparent"
								defaultContentColor={StylePatterns.Color('red5')}
								activeBackgroundColor="transparent"
								activeContentColor={StylePatterns.Color('red3')}
								clickHandler={this.handlePostOptionsButtonClick}
							/>
						</PostOptionsButtonContainer>
						<PostBlogNameContainer>
							<PostBlogName
								href={this.props.postOptionContent.post_url}
							>
								{this.props.postOptionContent.blog_name}
							</PostBlogName>
						</PostBlogNameContainer>
					</PostOptionsHeaderContainer>
					{
						this.state.showPostOptions &&

						<PostOptionForm
							allSeasons={this.props.allSeasons}
							currentSeason={this.props.currentSeason}
						/>
					}
				</PostOptionsContainer>
			</PostContainer>
		);
	}
}
