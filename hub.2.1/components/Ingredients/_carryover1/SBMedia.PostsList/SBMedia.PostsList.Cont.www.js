
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import PostOption from '../SBMedia.PostOption/SBMedia.PostOption.Cont.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

const PostsListsData = require('./SBMedia.PostsList.Data');

// --- COMPONENT

const PostList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	background-color: ${StylePatterns.Color('blue1')};
`;

export default class PostsList extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	postOptionsSelected: [],
		// };
		// this.handlePostOptionClick = this.handlePostOptionClick.bind(this);
	}
	/* returnThisTumblrIDInThisElement(tumblrID, arrayElement) {
		if (arrayElement.tumblrID) {
			return arrayElement.tumblrID === tumblrID;
		}
		return arrayElement.id === tumblrID;
	}
	returnPostOptionFromProps(tumblrID) {
		let neededPostOption = null;
		this.props.posts.forEach((postOption) => {
			if (this.returnThisTumblrIDInThisElement(tumblrID, postOption)) {
				neededPostOption = postOption;
			}
		});
		return neededPostOption;
	}
	returnPostOptionIsSelected(tumblrID) {
		let selected = false;
		this.state.postOptionsSelected.forEach((selectedOption) => {
			if (this.returnThisTumblrIDInThisElement(tumblrID, selectedOption)) {
				selected = true;
			}
		});
		return selected;
	}
	handlePostOptionClick(tumblrID, selected) {
		if (selected) {
			this.deletePostOptionFromDatabase(tumblrID);
		} else {
			this.addPostOptionToDatabaseAndState(tumblrID);
		}
	}
	addPostOptionToDatabaseAndState(tumblrID) {
		// get a promise to post the post data to the API
		this.addPostOptionToDatabase(tumblrID)
			// if the promise is resolved with a result
			.then((result) => {
				console.log('addPostOptionToDatabaseAndState - result');
				console.log(result);
				// add the tumblrID and the mongoID to state
				// this.addPostOptionToState(tumblrID, result.id);
			});
	}
	addPostOptionToDatabase(tumblrID) {
		// return a new promise
		return new Promise((resolve, reject) => {
			// get the post's raw data from props
			const post = this.returnPostOptionFromProps(tumblrID);
			// extract only the data needed
			const postExtract = {
				post_tumblr_post_url: post.post_url,
				tumblrID: post.id,
				tumblrReblogKey: post.reblog_key,
				photoURL: post.photos[0].original_size.url,
				// tags: XXXXXX,
				// addedCaption: XXXXXX,
				season: 'summer',
			};
			// get a promise to post the post data to the API
			PostsListsData.AddPostOptionToDatabaseAndReturnID(postExtract)
				// if the promise is resolved with a result, then resolve this promise with the result
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, 
				// 		then reject this promise with the error
				.catch((error) => { reject(error); });
		});
	}
	addPostOptionToState(tumblrID, mongoID) {
		console.log('addPostOptionToState');
		console.log(tumblrID);
	}
	deletePostOptionFromDatabase(tumblrID) {
		console.log('deletePostOptionToDatabase');
		console.log(tumblrID);
	} */
	render() {
		// console.log(this.props.posts);
		if (this.props.posts && this.props.posts[0]) {
			return (
				<PostList>
					{
						this.props.posts.map(postValue => (
							<PostOption
								key={postValue.id}
								postOptionContent={postValue}
								// postOptionSelected={this.returnPostOptionIsSelected(postValue.id)}
								// handlePostOptionClick={this.handlePostOptionClick}
								allSeasons={this.props.allSeasons}
								currentSeason={this.props.currentSeason}
							/>
						))
					}
				</PostList>
			);
		}
		return (
			<p>Sorry, I can&apos;t find any posts to show you.</p>
		);
	}
}
