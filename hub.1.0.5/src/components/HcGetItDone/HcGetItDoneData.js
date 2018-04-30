
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import shortID from 'shortid';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';

// ----- DATA

export default class HcGetItDoneData {
	static ReturnHRDocsForHcGetItDone() {
		const hrDocsWeb = new Web('https://bmos.sharepoint.com');
		return hrDocsWeb.lists.getByTitle('HR Docs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'Title')
			.filter("Category eq 'Request Forms'")
			.get();
	}

	static ReturnNesoDataForHcGetItDone() {
		return NesoHTTPClient
			.ReturnNesoData('https://neso.mos.org/hcGetItDone/allItems');
	}

	static ReturnAllGetItDoneData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// collect data async from multiple sources
				const listItemQueryPromises = [
					this.ReturnHRDocsForHcGetItDone(),
					this.ReturnNesoDataForHcGetItDone(),
				];
				// wait for all queries to be completed
				Promise.all(listItemQueryPromises)
					// if the promise is resolved with the settings
					.then((resultsReturnArray) => {
						// set up var to receive all list items
						const allListItemsAlpha = [];
						const allListItemsGroupedTempHolder = {};
						const allListItemsGroupedTempHolderKeys = [];
						const allListItemsGrouped = [];
						// iterate over the results and push them to allListItemsAlpha
						resultsReturnArray.forEach((listValue) => {
							listValue.forEach((itemValue) => {
								const itemFormatted = {
									url: '',
									anchorText: '',
									type: '',
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText = itemValue.FileLeafRef.toString();
									itemFormatted.description = itemValue.Title;
									itemFormatted.groups = ['HR'];
									itemFormatted.type = 'file';
									itemFormatted.key = shortID.generate();

									allListItemsAlpha.push(itemFormatted);
								}
								if (itemValue.URL) {
									itemFormatted.url = itemValue.URL;
									itemFormatted.anchorText = itemValue.Name;
									itemFormatted.description = itemValue.Description;
									itemFormatted.groups = itemValue.Groups;
									itemFormatted.type = 'swf';
									itemFormatted.key = shortID.generate();

									allListItemsAlpha.push(itemFormatted);
								}
							});
						});

						// sort allListItemsAlpha by anchorText properties
						allListItemsAlpha.sort((a, b) => {
							if (a.anchorText < b.anchorText) return -1;
							if (a.anchorText > b.anchorText) return 1;
							return 0;
						});

						// for each item in allListItemsAlpha
						allListItemsAlpha.forEach((itemValue) => {
							// for each group in the item
							itemValue.groups.forEach((groupValue) => {
								// if this group isn't already in the container, add it with 
								// 		a key and an empty items array
								if (!allListItemsGroupedTempHolder[groupValue]) {
									allListItemsGroupedTempHolder[groupValue] = {};
									allListItemsGroupedTempHolder[groupValue].key = shortID.generate();
									allListItemsGroupedTempHolder[groupValue].items = [];
								}
								// add the item to the group
								allListItemsGroupedTempHolder[groupValue].items.push(itemValue);
							});
						});

						/* // note: what we're doing next is essentially converting an object to an array

						// extract into array from object its "child" / first level keys;
						// 		these keys correspond to group names
						allListItemsGroupedTempHolderKeys = Object.keys(this.props.listItemsGroupedArray);
						// sort groups key alphabetically
						allListItemsGroupedTempHolderKeys.sort();
						// for each group key
						allListItemsGroupedTempHolderKeys.forEach((keyValue) => {
							allListItemsGrouped.push({
								name: keyValue,
								key: allListItemsGroupedTempHolder[keyValue].key,
								items: allListItemsGroupedTempHolder[keyValue].items,
							});
						});
						console.log({
							allListItemsAlpha,
							allListItemsGrouped,
						}); */
						// resolve this promise with the requested items
						resolve({
							allListItemsAlpha,
							allListItemsGrouped,
						});
					})
					.catch((queryError) => {
						reject({
							error: true,
							queryError,
						});
					});
			} else {
				// resolve the promise with mock data
				resolve({
					allListItemsAlpha: [
						{
							url: 'https://bmos.sharepoint.com/sites/mea-interpreter/SitePages/My%20ASL%20Interpreter%20Requests.aspx',
							anchorText: 'ASL Interpreter Request',
							type: 'swf',
							description: 'Request an ASL interpreter to aid visitors.',
							groups: [
								'Accessibility',
							],
							key: 'rJaeUPCbrpG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={dc9895f3-4cd2-4293-8250-158820a90511}&action=interactivepreview',
							anchorText: 'Accident Report Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'SJ2IPCWB6M',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-admin-access/SitePages/My%20Admin%20Access%20Requests.aspx',
							anchorText: 'Admin Access Request',
							type: 'swf',
							description: 'Get administrative access to your Museum computer.',
							groups: [
								'IIT',
							],
							key: 'SkefIv0-raG',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-archives-use/SitePages/My%20Archives%20Use%20Requests.aspx',
							anchorText: 'Archives Use Request',
							type: 'swf',
							description: "Request access, use, or reproduction of materials from the Museum's archives.",
							groups: [
								'Collections',
							],
							key: 'Sk1ZIPC-BTM',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/Business%20Card%20Requests.aspx',
							anchorText: 'Business Card Requests',
							type: 'swf',
							description: '',
							groups: [
								'MarCom',
							],
							key: 'By8MLDAbBTf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/hr-direct-deposit/SitePages/My%20Direct%20Deposit%20Requests.aspx',
							anchorText: 'Direct Deposit Application',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'B1YW8DC-HTz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-equipment-loan/SitePages/My%20Equipment%20Loan%20Requests.aspx',
							anchorText: 'Equipment Loan Request',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'BJ0bIwAbSTf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-event-av/SitePages/App.aspx',
							anchorText: 'Event AV Request (Tech Services Request)',
							type: 'swf',
							description: 'Audio and/or visual equipment and staff for meetings and events.',
							groups: [
								'IIT',
								'Events',
							],
							key: 'ryVWUDRZBpf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/vxo-event-space/SitePages/My%20Event%20Space%20Requests.aspx',
							anchorText: 'Event Space Request',
							type: 'swf',
							description: 'Request Museum space for an event.',
							groups: [
								'Event and Conference Services',
								'Events',
							],
							key: 'H1GWLwAWSTz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={153c19bd-cbbc-4794-8222-bf2f3b79de59}&action=interactivepreview',
							anchorText: 'Eye Med Claim Form.pdf',
							type: 'file',
							description: 'Use this document for reimbursement of out of network services.',
							groups: [
								'HR',
							],
							key: 'BJZx8v0bSpM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={19db1d95-389a-4b54-ba73-5a292e21da76}&action=interactivepreview',
							anchorText: 'Fidelity 401(a) Beneficiary Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'B1CUPAbSTM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={fa2b5383-ee2a-420a-8aa9-59a3d002b785}&action=interactivepreview',
							anchorText: 'Fidelity 403(b) Beneficiary Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'B1aLDR-rpz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={881ea6ad-dc5f-4329-9f59-9dd0163427f8}&action=interactivepreview',
							anchorText: 'Fidelity Rollover Form.pdf',
							type: 'file',
							description: 'Use this form to rollover, transfer, or exchange retirement funds.',
							groups: [
								'HR',
							],
							key: 'rJXxLDAZH6G',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-firewall-change/SitePages/My%20Firewall%20Change%20Requests.aspx',
							anchorText: 'Firewall Change Request',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'SJ-fUPAZrpG',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/gpc-concept/SitePages/App.aspx',
							anchorText: 'GPC Initial Concept Approval Request',
							type: 'swf',
							description: 'Step 1: Request vetting of your concept before developing the full proposal. (This approval must be obtained prior to beginning Step 2.)',
							groups: [
								'Grants Planning Committee',
							],
							key: 'SJ3z8vCbBpf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/gpc-submission/SitePages/App.aspx',
							anchorText: 'GPC Submission Approval Request',
							type: 'swf',
							description: 'Step 2: Request approval of your full proposal. (This approval must be obtained prior to submitting a proposal to a funder.)',
							groups: [
								'Grants Planning Committee',
							],
							key: 'Hkpf8D0Wr6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-garage-access/SitePages/My%20Garage%20Access%20Requests.aspx',
							anchorText: 'Garage Access Request',
							type: 'swf',
							description: 'Get approval to park a vehicle in the garage during normal operations hours.',
							groups: [
								'Public Safety',
							],
							key: 'HJdzLPAbB6G',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx',
							anchorText: 'Garage Discount Request',
							type: 'swf',
							description: 'Request a discount on or waiver of parking fees at the garage for groups of 20 or more.',
							groups: [
								'Public Safety',
							],
							key: 'rktfLD0ZSpz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={992ef31d-8e66-4359-b8fc-e6b6698e7cb7}&action=interactivepreview',
							anchorText: 'Goals and Objectives Planning Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'r1elUwC-HTG',
						},
						{
							url: 'http://quark.mos.org/getitdone/gse/approval/',
							anchorText: 'Guest Service Experience (GSE) – Approval',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'SJdW8DRZSpz',
						},
						{
							url: 'http://quark.mos.org/getitdone/gse/signup/',
							anchorText: 'Guest Service Experience (GSE) – Signup',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'BkP-LwCWHpM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={2a78b896-2e1b-4506-b5d6-cbb480c59fab}&action=interactivepreview',
							anchorText: 'Health Care-Dependant Care Reimbursement Form.pdf',
							type: 'file',
							description: 'Use this form to submit Health Care Spending Account claims',
							groups: [
								'HR',
							],
							key: 'B1sIvR-Haf',
						},
						{
							url: 'http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp',
							anchorText: 'IIT Work Order',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'HkMfUvRZHaM',
						},
						{
							url: 'https://bmos.sharepoint.com/ECSDocs/In%20House%20Need%20Sheet.docx',
							anchorText: 'In-House Needs Sheet',
							type: 'swf',
							description: 'Request what you need for your event.',
							groups: [
								'Event and Conference Services',
								'Events',
							],
							key: 'B17W8v0brpM',
						},
						{
							url: 'https://bmos.sharepoint.com/AdvDMSFiles/In-Kind-Donation-Report.docx',
							anchorText: 'In-Kind Gift Report',
							type: 'swf',
							description: 'Report donations of goods or services from individuals, vendors, and other organizations.',
							groups: [
								'Advancement',
							],
							key: 'HkAxLwA-S6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-incoming-loan/SitePages/My%20Incoming%20Loan%20Requests.aspx',
							anchorText: 'Incoming Loan Request',
							type: 'swf',
							description: 'Request a loan of objects from outside individuals or institutions for program or exhibit use.',
							groups: [
								'Collections',
							],
							key: 'rJlbLPRWB6G',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-interdepartmental-loan/SitePages/My%20Interdepartmental%20Loan%20Requests.aspx',
							anchorText: 'Interdepartmental Loan Request',
							type: 'swf',
							description: 'Request use of Collections objects for programs or lectures.',
							groups: [
								'Collections',
							],
							key: 'HJWWIvRZrpG',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-key/SitePages/My%20Key%20Requests.aspx',
							anchorText: 'Key Request',
							type: 'swf',
							description: 'Staff and interns: gain access to parts of the Museum.',
							groups: [
								'Public Safety',
							],
							key: 'SyofLD0bBTz',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/My%20Logo%20Requests.aspx',
							anchorText: 'Logo Request',
							type: 'swf',
							description: 'Get a Museum logo. (If sending to vendor, use the Project Request, instead.)',
							groups: [
								'MarCom',
							],
							key: 'BkXfLwCbB6M',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={939abdfe-9b93-41fc-a0ff-f5e9026c3500}&action=interactivepreview',
							anchorText: 'MBTA Pass Request.docx',
							type: 'file',
							description: 'MBTA Pass Program Request Form',
							groups: [
								'HR',
							],
							key: 'rJdl8PAbHaf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={c02e26fc-c15d-4083-b475-025dfca8f094}&action=interactivepreview',
							anchorText: 'MOS Emergency Alert Contact Form 1.docx',
							type: 'file',
							description: 'MOS Emergency Alert Contact Form',
							groups: [
								'HR',
							],
							key: 'r1UeIw0Wrpz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx',
							anchorText: 'MarCom Project Request',
							type: 'swf',
							description: 'Submit a request for signs, slides, Colorvision, logos for vendors, or print projects.',
							groups: [
								'MarCom',
							],
							key: 'SJrzUD0-Spf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/hr-contact-change/SitePages/My%20Name%20and%20Personal%20Contact%20Change%20Requests.aspx',
							anchorText: 'Name and Personal Contact Change',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'BJ9-IPCbS6f',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/Nameplate%20Requests.aspx',
							anchorText: 'Nameplate Requests',
							type: 'swf',
							description: '',
							groups: [
								'MarCom',
							],
							key: 'rJDzIP0bH6z',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-network-access/SitePages/App.aspx',
							anchorText: 'Network Access Request',
							type: 'swf',
							description: 'Add / modify access to the Museum network for an employee, volunteer, or contractor.',
							groups: [
								'IIT',
							],
							key: 'Sy2-Lw0WSpG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7d45258-cbcc-459d-8f6a-9b3b5e0b897f}&action=interactivepreview',
							anchorText: 'Outside Employment Disclosure Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'rJYxLwA-HTz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-overnight-parking/SitePages/My%20Overnight%20Parking%20Requests.aspx',
							anchorText: 'Overnight Parking Request',
							type: 'swf',
							description: 'Get approval to park a vehicle in the Museum garage overnight.',
							groups: [
								'Public Safety',
							],
							key: 'HkqMLPAWHaf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={2ea90936-b3c7-4665-a2a0-6489f8e7e10e}&action=interactivepreview',
							anchorText: 'Performance Evaluation Process (PEP).docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'r14eUvAZBTf',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/My%20Photo%20Requests.aspx',
							anchorText: 'Photo Request',
							type: 'swf',
							description: 'Get a photo from a recent shoot or from our archive.',
							groups: [
								'MarCom',
							],
							key: 'HkNGIPA-rTf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={622fb550-1227-4fd1-a02b-78c69e5e04ac}&action=interactivepreview',
							anchorText: 'Professional Development Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'S15lLvRWSpf',
						},
						{
							url: 'https://quark.mos.org/getitdone/avrequest/avrequest.php',
							anchorText: 'Promotion Request',
							type: 'swf',
							description: 'Get a Museum offering promoted.',
							groups: [
								'Marketing',
								'IIT',
							],
							key: 'r16bUDC-Bpf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={325bbcc2-e399-4258-93cd-dbf3b3bdd0f5}&action=interactivepreview',
							anchorText: 'Prudential Beneficiary Form.pdf',
							type: 'file',
							description: 'Complete this form to change your life insurance beneficiaries.',
							groups: [
								'HR',
							],
							key: 'BJJeUD0WHaM',
						},
						{
							url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Conference%20Catering%20Form.docx',
							anchorText: 'Puck Catering Request',
							type: 'swf',
							description: 'Dropoff-style catering. Designed for internal groups of 1 – 50.',
							groups: [
								'Wolfgang Puck Catering',
								'Events',
							],
							key: 'ByIZ8DAWSpG',
						},
						{
							url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Catering%20Quick%20Pick.doc',
							anchorText: 'Puck Quick Pick Request',
							type: 'swf',
							description: 'Café selections are available for pick up. Designed for internal groups of 10 or fewer.',
							groups: [
								'Wolfgang Puck Catering',
								'Events',
							],
							key: 'HJr-IPCZHTf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7842f3b-de57-4b89-8ecf-1912230d2c70}&action=interactivepreview',
							anchorText: 'Staffing Agreement Form.docx',
							type: 'file',
							description: 'This is the staffing agreement form for project managers',
							groups: [
								'HR',
							],
							key: 'Skox8v0bBpz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={4588d99b-3aaf-4b4a-8275-042144a41d88}&action=interactivepreview',
							anchorText: 'Tax Form - State.pdf',
							type: 'file',
							description: 'm-4 rev. 2012',
							groups: [
								'HR',
							],
							key: 'SyzgUDC-SpM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={6308a135-66af-4a04-a5f1-8056835f659a}&action=interactivepreview',
							anchorText: 'Tax From- Federal.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'ryDxUDCWHTf',
						},
						{
							url: 'https://bmos.sharepoint.com/MWLib/Tessitura%20Access%20Agreement.docx',
							anchorText: 'Tessitura Access Agreement',
							type: 'swf',
							description: "For current staff members, this agreement should be signed and submitted prior to requesting Tessitura access via the Network Access Request. For staff members who have not yet started, request Tessitura access via the Network Access Request and have this agreement signed and submitted on the staff member's first day.",
							groups: [
								'IIT',
							],
							key: 'Bko-8PAbr6f',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={7916b410-d3f4-4cc7-8159-27ab175c274b}&action=interactivepreview',
							anchorText: 'Tuition Assistance Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'BJ3gLPAWHaz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={cbdbcdeb-2b47-4376-9ccf-55e40ba75816}&action=interactivepreview',
							anchorText: 'Unemployment Insurance Benefits.pdf',
							type: 'file',
							description: 'Unemployment Insurance Benefits',
							groups: [
								'HR',
							],
							key: 'ryBxLwAWrpz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx',
							anchorText: 'VPN Access Request',
							type: 'swf',
							description: 'Request access to the Museum network from other locations.',
							groups: [
								'IIT',
							],
							key: 'By1GUPR-STM',
						},
					],
					allListItemsGroupedTempHolder: {
						Accessibility: {
							key: 'ry0fLvCZSpf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/mea-interpreter/SitePages/My%20ASL%20Interpreter%20Requests.aspx',
									anchorText: 'ASL Interpreter Request',
									type: 'swf',
									description: 'Request an ASL interpreter to aid visitors.',
									groups: [
										'Accessibility',
									],
									key: 'rJaeUPCbrpG',
								},
							],
						},
						HR: {
							key: 'ByyXLvAbH6z',
							items: [
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={dc9895f3-4cd2-4293-8250-158820a90511}&action=interactivepreview',
									anchorText: 'Accident Report Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'SJ2IPCWB6M',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/hr-direct-deposit/SitePages/My%20Direct%20Deposit%20Requests.aspx',
									anchorText: 'Direct Deposit Application',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'B1YW8DC-HTz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={153c19bd-cbbc-4794-8222-bf2f3b79de59}&action=interactivepreview',
									anchorText: 'Eye Med Claim Form.pdf',
									type: 'file',
									description: 'Use this document for reimbursement of out of network services.',
									groups: [
										'HR',
									],
									key: 'BJZx8v0bSpM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={19db1d95-389a-4b54-ba73-5a292e21da76}&action=interactivepreview',
									anchorText: 'Fidelity 401(a) Beneficiary Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'B1CUPAbSTM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={fa2b5383-ee2a-420a-8aa9-59a3d002b785}&action=interactivepreview',
									anchorText: 'Fidelity 403(b) Beneficiary Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'B1aLDR-rpz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={881ea6ad-dc5f-4329-9f59-9dd0163427f8}&action=interactivepreview',
									anchorText: 'Fidelity Rollover Form.pdf',
									type: 'file',
									description: 'Use this form to rollover, transfer, or exchange retirement funds.',
									groups: [
										'HR',
									],
									key: 'rJXxLDAZH6G',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={992ef31d-8e66-4359-b8fc-e6b6698e7cb7}&action=interactivepreview',
									anchorText: 'Goals and Objectives Planning Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'r1elUwC-HTG',
								},
								{
									url: 'http://quark.mos.org/getitdone/gse/approval/',
									anchorText: 'Guest Service Experience (GSE) – Approval',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'SJdW8DRZSpz',
								},
								{
									url: 'http://quark.mos.org/getitdone/gse/signup/',
									anchorText: 'Guest Service Experience (GSE) – Signup',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'BkP-LwCWHpM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={2a78b896-2e1b-4506-b5d6-cbb480c59fab}&action=interactivepreview',
									anchorText: 'Health Care-Dependant Care Reimbursement Form.pdf',
									type: 'file',
									description: 'Use this form to submit Health Care Spending Account claims',
									groups: [
										'HR',
									],
									key: 'B1sIvR-Haf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={939abdfe-9b93-41fc-a0ff-f5e9026c3500}&action=interactivepreview',
									anchorText: 'MBTA Pass Request.docx',
									type: 'file',
									description: 'MBTA Pass Program Request Form',
									groups: [
										'HR',
									],
									key: 'rJdl8PAbHaf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={c02e26fc-c15d-4083-b475-025dfca8f094}&action=interactivepreview',
									anchorText: 'MOS Emergency Alert Contact Form 1.docx',
									type: 'file',
									description: 'MOS Emergency Alert Contact Form',
									groups: [
										'HR',
									],
									key: 'r1UeIw0Wrpz',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/hr-contact-change/SitePages/My%20Name%20and%20Personal%20Contact%20Change%20Requests.aspx',
									anchorText: 'Name and Personal Contact Change',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'BJ9-IPCbS6f',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7d45258-cbcc-459d-8f6a-9b3b5e0b897f}&action=interactivepreview',
									anchorText: 'Outside Employment Disclosure Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'rJYxLwA-HTz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={2ea90936-b3c7-4665-a2a0-6489f8e7e10e}&action=interactivepreview',
									anchorText: 'Performance Evaluation Process (PEP).docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'r14eUvAZBTf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={622fb550-1227-4fd1-a02b-78c69e5e04ac}&action=interactivepreview',
									anchorText: 'Professional Development Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'S15lLvRWSpf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={325bbcc2-e399-4258-93cd-dbf3b3bdd0f5}&action=interactivepreview',
									anchorText: 'Prudential Beneficiary Form.pdf',
									type: 'file',
									description: 'Complete this form to change your life insurance beneficiaries.',
									groups: [
										'HR',
									],
									key: 'BJJeUD0WHaM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7842f3b-de57-4b89-8ecf-1912230d2c70}&action=interactivepreview',
									anchorText: 'Staffing Agreement Form.docx',
									type: 'file',
									description: 'This is the staffing agreement form for project managers',
									groups: [
										'HR',
									],
									key: 'Skox8v0bBpz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={4588d99b-3aaf-4b4a-8275-042144a41d88}&action=interactivepreview',
									anchorText: 'Tax Form - State.pdf',
									type: 'file',
									description: 'm-4 rev. 2012',
									groups: [
										'HR',
									],
									key: 'SyzgUDC-SpM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={6308a135-66af-4a04-a5f1-8056835f659a}&action=interactivepreview',
									anchorText: 'Tax From- Federal.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'ryDxUDCWHTf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={7916b410-d3f4-4cc7-8159-27ab175c274b}&action=interactivepreview',
									anchorText: 'Tuition Assistance Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'BJ3gLPAWHaz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={cbdbcdeb-2b47-4376-9ccf-55e40ba75816}&action=interactivepreview',
									anchorText: 'Unemployment Insurance Benefits.pdf',
									type: 'file',
									description: 'Unemployment Insurance Benefits',
									groups: [
										'HR',
									],
									key: 'ryBxLwAWrpz',
								},
							],
						},
						IIT: {
							key: 'rklXUwCbrpz',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/iit-admin-access/SitePages/My%20Admin%20Access%20Requests.aspx',
									anchorText: 'Admin Access Request',
									type: 'swf',
									description: 'Get administrative access to your Museum computer.',
									groups: [
										'IIT',
									],
									key: 'SkefIv0-raG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-equipment-loan/SitePages/My%20Equipment%20Loan%20Requests.aspx',
									anchorText: 'Equipment Loan Request',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'BJ0bIwAbSTf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-event-av/SitePages/App.aspx',
									anchorText: 'Event AV Request (Tech Services Request)',
									type: 'swf',
									description: 'Audio and/or visual equipment and staff for meetings and events.',
									groups: [
										'IIT',
										'Events',
									],
									key: 'ryVWUDRZBpf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-firewall-change/SitePages/My%20Firewall%20Change%20Requests.aspx',
									anchorText: 'Firewall Change Request',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'SJ-fUPAZrpG',
								},
								{
									url: 'http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp',
									anchorText: 'IIT Work Order',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'HkMfUvRZHaM',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-network-access/SitePages/App.aspx',
									anchorText: 'Network Access Request',
									type: 'swf',
									description: 'Add / modify access to the Museum network for an employee, volunteer, or contractor.',
									groups: [
										'IIT',
									],
									key: 'Sy2-Lw0WSpG',
								},
								{
									url: 'https://quark.mos.org/getitdone/avrequest/avrequest.php',
									anchorText: 'Promotion Request',
									type: 'swf',
									description: 'Get a Museum offering promoted.',
									groups: [
										'Marketing',
										'IIT',
									],
									key: 'r16bUDC-Bpf',
								},
								{
									url: 'https://bmos.sharepoint.com/MWLib/Tessitura%20Access%20Agreement.docx',
									anchorText: 'Tessitura Access Agreement',
									type: 'swf',
									description: "For current staff members, this agreement should be signed and submitted prior to requesting Tessitura access via the Network Access Request. For staff members who have not yet started, request Tessitura access via the Network Access Request and have this agreement signed and submitted on the staff member's first day.",
									groups: [
										'IIT',
									],
									key: 'Bko-8PAbr6f',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx',
									anchorText: 'VPN Access Request',
									type: 'swf',
									description: 'Request access to the Museum network from other locations.',
									groups: [
										'IIT',
									],
									key: 'By1GUPR-STM',
								},
							],
						},
						Collections: {
							key: 'BJb7LP0br6M',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/ed-archives-use/SitePages/My%20Archives%20Use%20Requests.aspx',
									anchorText: 'Archives Use Request',
									type: 'swf',
									description: "Request access, use, or reproduction of materials from the Museum's archives.",
									groups: [
										'Collections',
									],
									key: 'Sk1ZIPC-BTM',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-incoming-loan/SitePages/My%20Incoming%20Loan%20Requests.aspx',
									anchorText: 'Incoming Loan Request',
									type: 'swf',
									description: 'Request a loan of objects from outside individuals or institutions for program or exhibit use.',
									groups: [
										'Collections',
									],
									key: 'rJlbLPRWB6G',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-interdepartmental-loan/SitePages/My%20Interdepartmental%20Loan%20Requests.aspx',
									anchorText: 'Interdepartmental Loan Request',
									type: 'swf',
									description: 'Request use of Collections objects for programs or lectures.',
									groups: [
										'Collections',
									],
									key: 'HJWWIvRZrpG',
								},
							],
						},
						MarCom: {
							key: 'B1fXUPCbHpf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/SitePages/Business%20Card%20Requests.aspx',
									anchorText: 'Business Card Requests',
									type: 'swf',
									description: '',
									groups: [
										'MarCom',
									],
									key: 'By8MLDAbBTf',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/My%20Logo%20Requests.aspx',
									anchorText: 'Logo Request',
									type: 'swf',
									description: 'Get a Museum logo. (If sending to vendor, use the Project Request, instead.)',
									groups: [
										'MarCom',
									],
									key: 'BkXfLwCbB6M',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx',
									anchorText: 'MarCom Project Request',
									type: 'swf',
									description: 'Submit a request for signs, slides, Colorvision, logos for vendors, or print projects.',
									groups: [
										'MarCom',
									],
									key: 'SJrzUD0-Spf',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/Nameplate%20Requests.aspx',
									anchorText: 'Nameplate Requests',
									type: 'swf',
									description: '',
									groups: [
										'MarCom',
									],
									key: 'rJDzIP0bH6z',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/My%20Photo%20Requests.aspx',
									anchorText: 'Photo Request',
									type: 'swf',
									description: 'Get a photo from a recent shoot or from our archive.',
									groups: [
										'MarCom',
									],
									key: 'HkNGIPA-rTf',
								},
							],
						},
						Events: {
							key: 'B177Iv0ZSaz',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/iit-event-av/SitePages/App.aspx',
									anchorText: 'Event AV Request (Tech Services Request)',
									type: 'swf',
									description: 'Audio and/or visual equipment and staff for meetings and events.',
									groups: [
										'IIT',
										'Events',
									],
									key: 'ryVWUDRZBpf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/vxo-event-space/SitePages/My%20Event%20Space%20Requests.aspx',
									anchorText: 'Event Space Request',
									type: 'swf',
									description: 'Request Museum space for an event.',
									groups: [
										'Event and Conference Services',
										'Events',
									],
									key: 'H1GWLwAWSTz',
								},
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/In%20House%20Need%20Sheet.docx',
									anchorText: 'In-House Needs Sheet',
									type: 'swf',
									description: 'Request what you need for your event.',
									groups: [
										'Event and Conference Services',
										'Events',
									],
									key: 'B17W8v0brpM',
								},
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Conference%20Catering%20Form.docx',
									anchorText: 'Puck Catering Request',
									type: 'swf',
									description: 'Dropoff-style catering. Designed for internal groups of 1 – 50.',
									groups: [
										'Wolfgang Puck Catering',
										'Events',
									],
									key: 'ByIZ8DAWSpG',
								},
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Catering%20Quick%20Pick.doc',
									anchorText: 'Puck Quick Pick Request',
									type: 'swf',
									description: 'Café selections are available for pick up. Designed for internal groups of 10 or fewer.',
									groups: [
										'Wolfgang Puck Catering',
										'Events',
									],
									key: 'HJr-IPCZHTf',
								},
							],
						},
						'Event and Conference Services': {
							key: 'ryNmUwA-STz',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/vxo-event-space/SitePages/My%20Event%20Space%20Requests.aspx',
									anchorText: 'Event Space Request',
									type: 'swf',
									description: 'Request Museum space for an event.',
									groups: [
										'Event and Conference Services',
										'Events',
									],
									key: 'H1GWLwAWSTz',
								},
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/In%20House%20Need%20Sheet.docx',
									anchorText: 'In-House Needs Sheet',
									type: 'swf',
									description: 'Request what you need for your event.',
									groups: [
										'Event and Conference Services',
										'Events',
									],
									key: 'B17W8v0brpM',
								},
							],
						},
						'Grants Planning Committee': {
							key: 'ByBXIPCZBaG',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/gpc-concept/SitePages/App.aspx',
									anchorText: 'GPC Initial Concept Approval Request',
									type: 'swf',
									description: 'Step 1: Request vetting of your concept before developing the full proposal. (This approval must be obtained prior to beginning Step 2.)',
									groups: [
										'Grants Planning Committee',
									],
									key: 'SJ3z8vCbBpf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/gpc-submission/SitePages/App.aspx',
									anchorText: 'GPC Submission Approval Request',
									type: 'swf',
									description: 'Step 2: Request approval of your full proposal. (This approval must be obtained prior to submitting a proposal to a funder.)',
									groups: [
										'Grants Planning Committee',
									],
									key: 'Hkpf8D0Wr6f',
								},
							],
						},
						'Public Safety': {
							key: 'ryLm8D0brpG',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/ps-garage-access/SitePages/My%20Garage%20Access%20Requests.aspx',
									anchorText: 'Garage Access Request',
									type: 'swf',
									description: 'Get approval to park a vehicle in the garage during normal operations hours.',
									groups: [
										'Public Safety',
									],
									key: 'HJdzLPAbB6G',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx',
									anchorText: 'Garage Discount Request',
									type: 'swf',
									description: 'Request a discount on or waiver of parking fees at the garage for groups of 20 or more.',
									groups: [
										'Public Safety',
									],
									key: 'rktfLD0ZSpz',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-key/SitePages/My%20Key%20Requests.aspx',
									anchorText: 'Key Request',
									type: 'swf',
									description: 'Staff and interns: gain access to parts of the Museum.',
									groups: [
										'Public Safety',
									],
									key: 'SyofLD0bBTz',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-overnight-parking/SitePages/My%20Overnight%20Parking%20Requests.aspx',
									anchorText: 'Overnight Parking Request',
									type: 'swf',
									description: 'Get approval to park a vehicle in the Museum garage overnight.',
									groups: [
										'Public Safety',
									],
									key: 'HkqMLPAWHaf',
								},
							],
						},
						Advancement: {
							key: 'SkwmIw0-BaG',
							items: [
								{
									url: 'https://bmos.sharepoint.com/AdvDMSFiles/In-Kind-Donation-Report.docx',
									anchorText: 'In-Kind Gift Report',
									type: 'swf',
									description: 'Report donations of goods or services from individuals, vendors, and other organizations.',
									groups: [
										'Advancement',
									],
									key: 'HkAxLwA-S6f',
								},
							],
						},
						Marketing: {
							key: 'B1u7IvA-STz',
							items: [
								{
									url: 'https://quark.mos.org/getitdone/avrequest/avrequest.php',
									anchorText: 'Promotion Request',
									type: 'swf',
									description: 'Get a Museum offering promoted.',
									groups: [
										'Marketing',
										'IIT',
									],
									key: 'r16bUDC-Bpf',
								},
							],
						},
						'Wolfgang Puck Catering': {
							key: 'ryt78PRbrpG',
							items: [
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Conference%20Catering%20Form.docx',
									anchorText: 'Puck Catering Request',
									type: 'swf',
									description: 'Dropoff-style catering. Designed for internal groups of 1 – 50.',
									groups: [
										'Wolfgang Puck Catering',
										'Events',
									],
									key: 'ByIZ8DAWSpG',
								},
								{
									url: 'https://bmos.sharepoint.com/ECSDocs/Puck%20Catering%20Quick%20Pick.doc',
									anchorText: 'Puck Quick Pick Request',
									type: 'swf',
									description: 'Café selections are available for pick up. Designed for internal groups of 10 or fewer.',
									groups: [
										'Wolfgang Puck Catering',
										'Events',
									],
									key: 'HJr-IPCZHTf',
								},
							],
						},
					},
				});
			}
		}));
	}
}
