
/* eslint-disable  react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneLinkListItem from '../HcGetItDoneLinkListItem/HcGetItDoneLinkListItem';
import HcGetItDoneLinkDiv from '../HcGetItDoneLinkDiv/HcGetItDoneLinkDiv';

// ----- COMPONENT

export default class HcGetItDoneViewByGroup extends React.Component {
	render() {
		return (
			<div id={`hc-get-it-done-group_${this.props.groupId}`} className="hc-get-it-done-group mos-react-component-root">
				<h3>{this.props.groupContent.name}</h3>
				{
					this.props.groupContent.items[1] && 

					<ul>
						{
							this.props.groupContent.items.map((itemValue) => {
								if (itemValue.restrictedToRoles) {
									let userPermitted = false;
									itemValue.restrictedToRoles.forEach((permittedRole) => {
										this.props.uData.roles.forEach((userRole) => {
											if (permittedRole === userRole) {
												userPermitted = true;
											}
										});
									});
									if (userPermitted) {
										return (
											<HcGetItDoneLinkListItem
												key={itemValue.key}
												listItemId={itemValue.key}
												listItemContent={itemValue}
											/>
										);
									}
									return (undefined);
								}
								return (
									<HcGetItDoneLinkListItem
										key={itemValue.key}
										listItemId={itemValue.key}
										listItemContent={itemValue}
									/>
								);
							})
						}
					</ul>
				}
				{
					!this.props.groupContent.items[1] &&

					<HcGetItDoneLinkDiv
						key={this.props.groupContent.items[0].key}
						listItemId={this.props.groupContent.items[0].key}
						listItemContent={this.props.groupContent.items[0]}

					/>
				}
			</div>
		);
	}
}
