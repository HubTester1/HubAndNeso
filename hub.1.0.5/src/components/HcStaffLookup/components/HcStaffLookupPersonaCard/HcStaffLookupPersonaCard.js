

let dialogHeader = '<span id="persona-card-dialog-header"> \n' +
	'	<span id="avatar" \n';

if (userProfileValues.PictureURL != '') {
	dialogHeader += `		 style="background-image: url('${userProfileValues.PictureURL}')"> \n`;
} else {
	userProfileValues.firstInitial = userProfileValues.FirstName.slice(0, 1).toUpperCase();
	userProfileValues.lastInitial = userProfileValues.LastName.slice(0, 1).toUpperCase();
	dialogHeader += `		 ><span id="avatar-initials">${userProfileValues.firstInitial}${userProfileValues.lastInitial}</span> \n`;
}

dialogHeader += '	</span> \n' +
	'	<span id="name_title_department"> \n';

if (typeof (userProfileValues.PreferredName) !== 'undefined' && userProfileValues.PreferredName != '') {
	dialogHeader += `		 <span id="name">${userProfileValues.PreferredName}</span> \n`;
}

if (typeof (userProfileValues.Title) !== 'undefined' && userProfileValues.Title != '') {
	dialogHeader += `		 <span id="title">${userProfileValues.Title}</span> \n`;
}

if (typeof (userProfileValues.Department) !== 'undefined' && userProfileValues.Department != '') {
	dialogHeader += `		 <span id="department">${userProfileValues.Department}</span> \n`;
}

dialogHeader += '	</span></span> \n';

$("div[aria-describedby='persona-card-dialog'] div.ui-dialog-titlebar span.ui-dialog-title").append(dialogHeader);

// create and insert body

let dialogBody = '<ul id="persona-card-dialog-body"> \n';

if (typeof (userProfileValues.WorkPhone) !== 'undefined' && typeof (userProfileValues.CellPhone) !== 'undefined' && userProfileValues.WorkPhone != '' && userProfileValues.CellPhone != '') {
	dialogBody += `${'	<li id="phone-numbers">\n' +
		'		 <ul>\n' +
		'			  <li id="business-phone-number">Business: '}${userProfileValues.WorkPhone}</li> \n` +
		`			  <li id="mobile-phone-number">Mobile: ${userProfileValues.CellPhone}</li> \n` +
		'		 </ul>\n' +
		'	</li> \n';
} else if (typeof (userProfileValues.WorkPhone) !== 'undefined' && userProfileValues.WorkPhone != '') {
	dialogBody += `	<li id="business-phone-number">Business: ${userProfileValues.WorkPhone}</li> \n`;
} else if (typeof (userProfileValues.WorkPhone) !== 'undefined' && userProfileValues.WorkPhone != '') {
	dialogBody += `	<li id="mobile-phone-number">Mobile: ${userProfileValues.CellPhone}</li> \n`;
}

if (typeof (userProfileValues.WorkEmail) !== 'undefined' && userProfileValues.WorkEmail != '') {
	dialogBody += `	<li id="email"><a href="mailto:${userProfileValues.WorkEmail}">${userProfileValues.WorkEmail}</a></li> \n`;
}

if (typeof (userProfileValues['SPS-PersonalSiteCapabilities']) !== 'undefined' && userProfileValues['SPS-PersonalSiteCapabilities'] != '') {
	dialogBody += `	<li id="profile"><a href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=${userProfileValues['msOnline-ObjectId']}" target="_blank">Profile</a></li> \n`;
}
