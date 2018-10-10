
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import shortID from 'shortid';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';
import MOSUtilities from '../../services/MOSUtilities';

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
						let allListItemsGroupedTempHolderKeys;
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
									itemFormatted.anchorText = 
										MOSUtilities.ReplaceAll('.pdf', '', MOSUtilities.ReplaceAll('.docx', '', itemValue.FileLeafRef.toString()));
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

						// note: what we're doing next is essentially converting an object to an array

						// extract into array from object its "child" / first level keys;
						// 		these keys correspond to group names
						// eslint-disable-next-line
						allListItemsGroupedTempHolderKeys = Object.keys(allListItemsGroupedTempHolder);
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
							key: 'SkDWDK6MSTG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={dc9895f3-4cd2-4293-8250-158820a90511}&action=interactivepreview',
							anchorText: 'Accident Report Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'SJ8lPYpGSTf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-admin-access/SitePages/My%20Admin%20Access%20Requests.aspx',
							anchorText: 'Admin Access Request',
							type: 'swf',
							description: 'Get administrative access to your Museum computer.',
							groups: [
								'IIT',
							],
							key: 'r1cGwFaGBTM',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-archives-use/SitePages/My%20Archives%20Use%20Requests.aspx',
							anchorText: 'Archives Use Request',
							type: 'swf',
							description: "Request access, use, or reproduction of materials from the Museum's archives.",
							groups: [
								'Collections',
							],
							key: 'HJYWDtTGSTG',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/Business%20Card%20Requests.aspx',
							anchorText: 'Business Card Requests',
							type: 'swf',
							description: '',
							groups: [
								'MarCom',
							],
							key: 'ByemDtpMr6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/hr-direct-deposit/SitePages/My%20Direct%20Deposit%20Requests.aspx',
							anchorText: 'Direct Deposit Application',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'HkQzDYpMSpz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-equipment-loan/SitePages/My%20Equipment%20Loan%20Requests.aspx',
							anchorText: 'Equipment Loan Request',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'B1dGvYpMBpz',
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
							key: 'HyCZwYazS6z',
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
							key: 'rynWDYpfrTf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={153c19bd-cbbc-4794-8222-bf2f3b79de59}&action=interactivepreview',
							anchorText: 'Eye Med Claim Form.pdf',
							type: 'file',
							description: 'Use this document for reimbursement of out of network services.',
							groups: [
								'HR',
							],
							key: 'H1igvKTMHpG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={19db1d95-389a-4b54-ba73-5a292e21da76}&action=interactivepreview',
							anchorText: 'Fidelity 401(a) Beneficiary Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'Sk_lvKaMHpM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={fa2b5383-ee2a-420a-8aa9-59a3d002b785}&action=interactivepreview',
							anchorText: 'Fidelity 403(b) Beneficiary Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'HJvlPtpfHpz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={881ea6ad-dc5f-4329-9f59-9dd0163427f8}&action=interactivepreview',
							anchorText: 'Fidelity Rollover Form.pdf',
							type: 'file',
							description: 'Use this form to rollover, transfer, or exchange retirement funds.',
							groups: [
								'HR',
							],
							key: 'rkTxwYTzH6z',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-firewall-change/SitePages/My%20Firewall%20Change%20Requests.aspx',
							anchorText: 'Firewall Change Request',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'BkiGwY6fBpM',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/gpc-concept/SitePages/App.aspx',
							anchorText: 'GPC Initial Concept Approval Request',
							type: 'swf',
							description: 'Step 1: Request vetting of your concept before developing the full proposal. (This approval must be obtained prior to beginning Step 2.)',
							groups: [
								'Grants Planning Committee',
							],
							key: 'HJI7PK6GSpz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/gpc-submission/SitePages/App.aspx',
							anchorText: 'GPC Submission Approval Request',
							type: 'swf',
							description: 'Step 2: Request approval of your full proposal. (This approval must be obtained prior to submitting a proposal to a funder.)',
							groups: [
								'Grants Planning Committee',
							],
							key: 'SJPQPKpzH6z',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-garage-access/SitePages/My%20Garage%20Access%20Requests.aspx',
							anchorText: 'Garage Access Request',
							type: 'swf',
							description: 'Get approval to park a vehicle in the garage during normal operations hours.',
							groups: [
								'Public Safety',
							],
							key: 'BkzmvFpGH6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx',
							anchorText: 'Garage Discount Request',
							type: 'swf',
							description: 'Request a discount on or waiver of parking fees at the garage for groups of 20 or more.',
							groups: [
								'Public Safety',
							],
							key: 'SJX7vt6zBpz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={992ef31d-8e66-4359-b8fc-e6b6698e7cb7}&action=interactivepreview',
							anchorText: 'Goals and Objectives Planning Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'By5lPK6MS6f',
						},
						{
							url: 'http://quark.mos.org/getitdone/gse/approval/',
							anchorText: 'Guest Service Experience (GSE) – Approval',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'BJzzPt6fSpz',
						},
						{
							url: 'http://quark.mos.org/getitdone/gse/signup/',
							anchorText: 'Guest Service Experience (GSE) – Signup',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'B1bGPt6zBaM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={2a78b896-2e1b-4506-b5d6-cbb480c59fab}&action=interactivepreview',
							anchorText: 'Health Care-Dependant Care Reimbursement Form.pdf',
							type: 'file',
							description: 'Use this form to submit Health Care Spending Account claims',
							groups: [
								'HR',
							],
							key: 'BJBxPK6fBaz',
						},
						{
							url: 'http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp',
							anchorText: 'IIT Work Order',
							type: 'swf',
							description: '',
							groups: [
								'IIT',
							],
							key: 'By2fvFTfHpG',
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
							key: 'SJpWDtTzBpf',
						},
						{
							url: 'https://bmos.sharepoint.com/AdvDMSFiles/In-Kind-Donation-Report.docx',
							anchorText: 'In-Kind Gift Report',
							type: 'swf',
							description: 'Report donations of goods or services from individuals, vendors, and other organizations.',
							groups: [
								'Advancement',
							],
							key: 'Bk_-wKpGraf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-incoming-loan/SitePages/My%20Incoming%20Loan%20Requests.aspx',
							anchorText: 'Incoming Loan Request',
							type: 'swf',
							description: 'Request a loan of objects from outside individuals or institutions for program or exhibit use.',
							groups: [
								'Collections',
							],
							key: 'HyqWwFazB6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ed-interdepartmental-loan/SitePages/My%20Interdepartmental%20Loan%20Requests.aspx',
							anchorText: 'Interdepartmental Loan Request',
							type: 'swf',
							description: 'Request use of Collections objects for programs or lectures.',
							groups: [
								'Collections',
							],
							key: 'HysZDKpzSaf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-key/SitePages/My%20Key%20Requests.aspx',
							anchorText: 'Key Request',
							type: 'swf',
							description: 'Staff and interns: gain access to parts of the Museum.',
							groups: [
								'Public Safety',
							],
							key: 'rJH7PFazSpf',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/My%20Logo%20Requests.aspx',
							anchorText: 'Logo Request',
							type: 'swf',
							description: 'Get a Museum logo. (If sending to vendor, use the Project Request, instead.)',
							groups: [
								'MarCom',
							],
							key: 'Hk6GDYaMH6z',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={939abdfe-9b93-41fc-a0ff-f5e9026c3500}&action=interactivepreview',
							anchorText: 'MBTA Pass Request.docx',
							type: 'file',
							description: 'MBTA Pass Program Request Form',
							groups: [
								'HR',
							],
							key: 'H1GWDtpzrTM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={c02e26fc-c15d-4083-b475-025dfca8f094}&action=interactivepreview',
							anchorText: 'MOS Emergency Alert Contact Form 1.docx',
							type: 'file',
							description: 'MOS Emergency Alert Contact Form',
							groups: [
								'HR',
							],
							key: 'r1gZDKTGHTG',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx',
							anchorText: 'MarCom Project Request',
							type: 'swf',
							description: 'Submit a request for signs, slides, Colorvision, logos for vendors, or print projects.',
							groups: [
								'MarCom',
							],
							key: 'Bky7PtTGS6f',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/hr-contact-change/SitePages/My%20Name%20and%20Personal%20Contact%20Change%20Requests.aspx',
							anchorText: 'Name and Personal Contact Change',
							type: 'swf',
							description: '',
							groups: [
								'HR',
							],
							key: 'B1Vfvt6fHTz',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/Nameplate%20Requests.aspx',
							anchorText: 'Nameplate Requests',
							type: 'swf',
							description: '',
							groups: [
								'MarCom',
							],
							key: 'rk-7PK6zr6M',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-network-access/SitePages/App.aspx',
							anchorText: 'Network Access Request',
							type: 'swf',
							description: 'Add / modify access to the Museum network for an employee, volunteer, or contractor.',
							groups: [
								'IIT',
							],
							key: 'HkLfPtpfSaM',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7d45258-cbcc-459d-8f6a-9b3b5e0b897f}&action=interactivepreview',
							anchorText: 'Outside Employment Disclosure Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'r1QZvYpfB6z',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/ps-overnight-parking/SitePages/My%20Overnight%20Parking%20Requests.aspx',
							anchorText: 'Overnight Parking Request',
							type: 'swf',
							description: 'Get approval to park a vehicle in the Museum garage overnight.',
							groups: [
								'Public Safety',
							],
							key: 'BJEmDYaMS6f',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={2ea90936-b3c7-4665-a2a0-6489f8e7e10e}&action=interactivepreview',
							anchorText: 'Performance Evaluation Process (PEP).docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'ByAxwtTMrpf',
						},
						{
							url: 'https://bmos.sharepoint.com/SitePages/My%20Photo%20Requests.aspx',
							anchorText: 'Photo Request',
							type: 'swf',
							description: 'Get a photo from a recent shoot or from our archive.',
							groups: [
								'MarCom',
							],
							key: 'SkAzwKTGrpf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={622fb550-1227-4fd1-a02b-78c69e5e04ac}&action=interactivepreview',
							anchorText: 'Professional Development Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'r1NbvKazSTz',
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
							key: 'H1wfwFpfraG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={325bbcc2-e399-4258-93cd-dbf3b3bdd0f5}&action=interactivepreview',
							anchorText: 'Prudential Beneficiary Form.pdf',
							type: 'file',
							description: 'Complete this form to change your life insurance beneficiaries.',
							groups: [
								'HR',
							],
							key: 'HJKlwtpfBaG',
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
							key: 'B1xGPt6GraG',
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
							key: 'S1yGvY6MBTG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7842f3b-de57-4b89-8ecf-1912230d2c70}&action=interactivepreview',
							anchorText: 'Staffing Agreement Form.docx',
							type: 'file',
							description: 'This is the staffing agreement form for project managers',
							groups: [
								'HR',
							],
							key: 'ryHZwYpGSaz',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={4588d99b-3aaf-4b4a-8275-042144a41d88}&action=interactivepreview',
							anchorText: 'Tax Form - State.pdf',
							type: 'file',
							description: 'm-4 rev. 2012',
							groups: [
								'HR',
							],
							key: 'rJ3xwtazSpG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={6308a135-66af-4a04-a5f1-8056835f659a}&action=interactivepreview',
							anchorText: 'Tax From- Federal.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'Hk--PKaMB6z',
						},
						{
							url: 'https://bmos.sharepoint.com/MWLib/Tessitura%20Access%20Agreement.docx',
							anchorText: 'Tessitura Access Agreement',
							type: 'swf',
							description: "For current staff members, this agreement should be signed and submitted prior to requesting Tessitura access via the Network Access Request. For staff members who have not yet started, request Tessitura access via the Network Access Request and have this agreement signed and submitted on the staff member's first day.",
							groups: [
								'IIT',
							],
							key: 'H1rzvt6GSpG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={7916b410-d3f4-4cc7-8159-27ab175c274b}&action=interactivepreview',
							anchorText: 'Tuition Assistance Form.docx',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'ryUZDYaMrpf',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={cbdbcdeb-2b47-4376-9ccf-55e40ba75816}&action=interactivepreview',
							anchorText: 'Unemployment Insurance Benefits.pdf',
							type: 'file',
							description: 'Unemployment Insurance Benefits',
							groups: [
								'HR',
							],
							key: 'Hk1WvFaMSpz',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx',
							anchorText: 'VPN Access Request',
							type: 'swf',
							description: 'Request access to the Museum network from other locations.',
							groups: [
								'IIT',
							],
							key: 'rkYMDFpzBaz',
						},
					],
					allListItemsGrouped: [
						{
							name: 'Accessibility',
							key: 'HyO7DFTMSTM',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/mea-interpreter/SitePages/My%20ASL%20Interpreter%20Requests.aspx',
									anchorText: 'ASL Interpreter Request',
									type: 'swf',
									description: 'Request an ASL interpreter to aid visitors.',
									groups: [
										'Accessibility',
									],
									key: 'SkDWDK6MSTG',
								},
							],
						},
						{
							name: 'Advancement',
							key: 'r1WVvY6zr6M',
							items: [
								{
									url: 'https://bmos.sharepoint.com/AdvDMSFiles/In-Kind-Donation-Report.docx',
									anchorText: 'In-Kind Gift Report',
									type: 'swf',
									description: 'Report donations of goods or services from individuals, vendors, and other organizations.',
									groups: [
										'Advancement',
									],
									key: 'Bk_-wKpGraf',
								},
							],
						},
						{
							name: 'Collections',
							key: 'Hks7vFTMBpf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/ed-archives-use/SitePages/My%20Archives%20Use%20Requests.aspx',
									anchorText: 'Archives Use Request',
									type: 'swf',
									description: "Request access, use, or reproduction of materials from the Museum's archives.",
									groups: [
										'Collections',
									],
									key: 'HJYWDtTGSTG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-incoming-loan/SitePages/My%20Incoming%20Loan%20Requests.aspx',
									anchorText: 'Incoming Loan Request',
									type: 'swf',
									description: 'Request a loan of objects from outside individuals or institutions for program or exhibit use.',
									groups: [
										'Collections',
									],
									key: 'HyqWwFazB6f',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-interdepartmental-loan/SitePages/My%20Interdepartmental%20Loan%20Requests.aspx',
									anchorText: 'Interdepartmental Loan Request',
									type: 'swf',
									description: 'Request use of Collections objects for programs or lectures.',
									groups: [
										'Collections',
									],
									key: 'HysZDKpzSaf',
								},
							],
						},
						{
							name: 'Event and Conference Services',
							key: 'SyAXDFTGB6M',
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
									key: 'rynWDYpfrTf',
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
									key: 'SJpWDtTzBpf',
								},
							],
						},
						{
							name: 'Events',
							key: 'SkpQvtpGSTf',
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
									key: 'HyCZwYazS6z',
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
									key: 'rynWDYpfrTf',
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
									key: 'SJpWDtTzBpf',
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
									key: 'B1xGPt6GraG',
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
									key: 'S1yGvY6MBTG',
								},
							],
						},
						{
							name: 'Grants Planning Committee',
							key: 'H1JVvFTfSTz',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/gpc-concept/SitePages/App.aspx',
									anchorText: 'GPC Initial Concept Approval Request',
									type: 'swf',
									description: 'Step 1: Request vetting of your concept before developing the full proposal. (This approval must be obtained prior to beginning Step 2.)',
									groups: [
										'Grants Planning Committee',
									],
									key: 'HJI7PK6GSpz',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/gpc-submission/SitePages/App.aspx',
									anchorText: 'GPC Submission Approval Request',
									type: 'swf',
									description: 'Step 2: Request approval of your full proposal. (This approval must be obtained prior to submitting a proposal to a funder.)',
									groups: [
										'Grants Planning Committee',
									],
									key: 'SJPQPKpzH6z',
								},
							],
						},
						{
							name: 'HR',
							key: 'r1YmvFpfrTf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={dc9895f3-4cd2-4293-8250-158820a90511}&action=interactivepreview',
									anchorText: 'Accident Report Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'SJ8lPYpGSTf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/hr-direct-deposit/SitePages/My%20Direct%20Deposit%20Requests.aspx',
									anchorText: 'Direct Deposit Application',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'HkQzDYpMSpz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={153c19bd-cbbc-4794-8222-bf2f3b79de59}&action=interactivepreview',
									anchorText: 'Eye Med Claim Form.pdf',
									type: 'file',
									description: 'Use this document for reimbursement of out of network services.',
									groups: [
										'HR',
									],
									key: 'H1igvKTMHpG',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={19db1d95-389a-4b54-ba73-5a292e21da76}&action=interactivepreview',
									anchorText: 'Fidelity 401(a) Beneficiary Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'Sk_lvKaMHpM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={fa2b5383-ee2a-420a-8aa9-59a3d002b785}&action=interactivepreview',
									anchorText: 'Fidelity 403(b) Beneficiary Form.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'HJvlPtpfHpz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={881ea6ad-dc5f-4329-9f59-9dd0163427f8}&action=interactivepreview',
									anchorText: 'Fidelity Rollover Form.pdf',
									type: 'file',
									description: 'Use this form to rollover, transfer, or exchange retirement funds.',
									groups: [
										'HR',
									],
									key: 'rkTxwYTzH6z',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={992ef31d-8e66-4359-b8fc-e6b6698e7cb7}&action=interactivepreview',
									anchorText: 'Goals and Objectives Planning Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'By5lPK6MS6f',
								},
								{
									url: 'http://quark.mos.org/getitdone/gse/approval/',
									anchorText: 'Guest Service Experience (GSE) – Approval',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'BJzzPt6fSpz',
								},
								{
									url: 'http://quark.mos.org/getitdone/gse/signup/',
									anchorText: 'Guest Service Experience (GSE) – Signup',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'B1bGPt6zBaM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={2a78b896-2e1b-4506-b5d6-cbb480c59fab}&action=interactivepreview',
									anchorText: 'Health Care-Dependant Care Reimbursement Form.pdf',
									type: 'file',
									description: 'Use this form to submit Health Care Spending Account claims',
									groups: [
										'HR',
									],
									key: 'BJBxPK6fBaz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={939abdfe-9b93-41fc-a0ff-f5e9026c3500}&action=interactivepreview',
									anchorText: 'MBTA Pass Request.docx',
									type: 'file',
									description: 'MBTA Pass Program Request Form',
									groups: [
										'HR',
									],
									key: 'H1GWDtpzrTM',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={c02e26fc-c15d-4083-b475-025dfca8f094}&action=interactivepreview',
									anchorText: 'MOS Emergency Alert Contact Form 1.docx',
									type: 'file',
									description: 'MOS Emergency Alert Contact Form',
									groups: [
										'HR',
									],
									key: 'r1gZDKTGHTG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/hr-contact-change/SitePages/My%20Name%20and%20Personal%20Contact%20Change%20Requests.aspx',
									anchorText: 'Name and Personal Contact Change',
									type: 'swf',
									description: '',
									groups: [
										'HR',
									],
									key: 'B1Vfvt6fHTz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7d45258-cbcc-459d-8f6a-9b3b5e0b897f}&action=interactivepreview',
									anchorText: 'Outside Employment Disclosure Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'r1QZvYpfB6z',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={2ea90936-b3c7-4665-a2a0-6489f8e7e10e}&action=interactivepreview',
									anchorText: 'Performance Evaluation Process (PEP).docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'ByAxwtTMrpf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={622fb550-1227-4fd1-a02b-78c69e5e04ac}&action=interactivepreview',
									anchorText: 'Professional Development Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'r1NbvKazSTz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={325bbcc2-e399-4258-93cd-dbf3b3bdd0f5}&action=interactivepreview',
									anchorText: 'Prudential Beneficiary Form.pdf',
									type: 'file',
									description: 'Complete this form to change your life insurance beneficiaries.',
									groups: [
										'HR',
									],
									key: 'HJKlwtpfBaG',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={e7842f3b-de57-4b89-8ecf-1912230d2c70}&action=interactivepreview',
									anchorText: 'Staffing Agreement Form.docx',
									type: 'file',
									description: 'This is the staffing agreement form for project managers',
									groups: [
										'HR',
									],
									key: 'ryHZwYpGSaz',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={4588d99b-3aaf-4b4a-8275-042144a41d88}&action=interactivepreview',
									anchorText: 'Tax Form - State.pdf',
									type: 'file',
									description: 'm-4 rev. 2012',
									groups: [
										'HR',
									],
									key: 'rJ3xwtazSpG',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={6308a135-66af-4a04-a5f1-8056835f659a}&action=interactivepreview',
									anchorText: 'Tax From- Federal.pdf',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'Hk--PKaMB6z',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={7916b410-d3f4-4cc7-8159-27ab175c274b}&action=interactivepreview',
									anchorText: 'Tuition Assistance Form.docx',
									type: 'file',
									description: null,
									groups: [
										'HR',
									],
									key: 'ryUZDYaMrpf',
								},
								{
									url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={cbdbcdeb-2b47-4376-9ccf-55e40ba75816}&action=interactivepreview',
									anchorText: 'Unemployment Insurance Benefits.pdf',
									type: 'file',
									description: 'Unemployment Insurance Benefits',
									groups: [
										'HR',
									],
									key: 'Hk1WvFaMSpz',
								},
							],
						},
						{
							name: 'IIT',
							key: 'rJ5mwtTfraG',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/iit-admin-access/SitePages/My%20Admin%20Access%20Requests.aspx',
									anchorText: 'Admin Access Request',
									type: 'swf',
									description: 'Get administrative access to your Museum computer.',
									groups: [
										'IIT',
									],
									key: 'r1cGwFaGBTM',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-equipment-loan/SitePages/My%20Equipment%20Loan%20Requests.aspx',
									anchorText: 'Equipment Loan Request',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'B1dGvYpMBpz',
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
									key: 'HyCZwYazS6z',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-firewall-change/SitePages/My%20Firewall%20Change%20Requests.aspx',
									anchorText: 'Firewall Change Request',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'BkiGwY6fBpM',
								},
								{
									url: 'http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp',
									anchorText: 'IIT Work Order',
									type: 'swf',
									description: '',
									groups: [
										'IIT',
									],
									key: 'By2fvFTfHpG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-network-access/SitePages/App.aspx',
									anchorText: 'Network Access Request',
									type: 'swf',
									description: 'Add / modify access to the Museum network for an employee, volunteer, or contractor.',
									groups: [
										'IIT',
									],
									key: 'HkLfPtpfSaM',
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
									key: 'H1wfwFpfraG',
								},
								{
									url: 'https://bmos.sharepoint.com/MWLib/Tessitura%20Access%20Agreement.docx',
									anchorText: 'Tessitura Access Agreement',
									type: 'swf',
									description: "For current staff members, this agreement should be signed and submitted prior to requesting Tessitura access via the Network Access Request. For staff members who have not yet started, request Tessitura access via the Network Access Request and have this agreement signed and submitted on the staff member's first day.",
									groups: [
										'IIT',
									],
									key: 'H1rzvt6GSpG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx',
									anchorText: 'VPN Access Request',
									type: 'swf',
									description: 'Request access to the Museum network from other locations.',
									groups: [
										'IIT',
									],
									key: 'rkYMDFpzBaz',
								},
							],
						},
						{
							name: 'MarCom',
							key: 'rk27DFTzBaf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/SitePages/Business%20Card%20Requests.aspx',
									anchorText: 'Business Card Requests',
									type: 'swf',
									description: '',
									groups: [
										'MarCom',
									],
									key: 'ByemDtpMr6f',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/My%20Logo%20Requests.aspx',
									anchorText: 'Logo Request',
									type: 'swf',
									description: 'Get a Museum logo. (If sending to vendor, use the Project Request, instead.)',
									groups: [
										'MarCom',
									],
									key: 'Hk6GDYaMH6z',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx',
									anchorText: 'MarCom Project Request',
									type: 'swf',
									description: 'Submit a request for signs, slides, Colorvision, logos for vendors, or print projects.',
									groups: [
										'MarCom',
									],
									key: 'Bky7PtTGS6f',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/Nameplate%20Requests.aspx',
									anchorText: 'Nameplate Requests',
									type: 'swf',
									description: '',
									groups: [
										'MarCom',
									],
									key: 'rk-7PK6zr6M',
								},
								{
									url: 'https://bmos.sharepoint.com/SitePages/My%20Photo%20Requests.aspx',
									anchorText: 'Photo Request',
									type: 'swf',
									description: 'Get a photo from a recent shoot or from our archive.',
									groups: [
										'MarCom',
									],
									key: 'SkAzwKTGrpf',
								},
							],
						},
						{
							name: 'Marketing',
							key: 'HJz4wFaGH6G',
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
									key: 'H1wfwFpfraG',
								},
							],
						},
						{
							name: 'Public Safety',
							key: 'ryl4DKTfr6M',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/ps-garage-access/SitePages/My%20Garage%20Access%20Requests.aspx',
									anchorText: 'Garage Access Request',
									type: 'swf',
									description: 'Get approval to park a vehicle in the garage during normal operations hours.',
									groups: [
										'Public Safety',
									],
									key: 'BkzmvFpGH6f',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx',
									anchorText: 'Garage Discount Request',
									type: 'swf',
									description: 'Request a discount on or waiver of parking fees at the garage for groups of 20 or more.',
									groups: [
										'Public Safety',
									],
									key: 'SJX7vt6zBpz',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-key/SitePages/My%20Key%20Requests.aspx',
									anchorText: 'Key Request',
									type: 'swf',
									description: 'Staff and interns: gain access to parts of the Museum.',
									groups: [
										'Public Safety',
									],
									key: 'rJH7PFazSpf',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ps-overnight-parking/SitePages/My%20Overnight%20Parking%20Requests.aspx',
									anchorText: 'Overnight Parking Request',
									type: 'swf',
									description: 'Get approval to park a vehicle in the Museum garage overnight.',
									groups: [
										'Public Safety',
									],
									key: 'BJEmDYaMS6f',
								},
							],
						},
						{
							name: 'Wolfgang Puck Catering',
							key: 'HJQ4wYazHaG',
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
									key: 'B1xGPt6GraG',
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
									key: 'S1yGvY6MBTG',
								},
							],
						},
					],
				});
			}
		}));
	}
}
