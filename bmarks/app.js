/* eslint-disable */
const fs = require('fs');
const parseString = require('xml2js').parseString;

const readXML = fs.readFileSync('./src.xml', 'utf8');

let builtString = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>_Design Import</TITLE>
<H1>_Design Import</H1>
<DL><p>`;

parseString(readXML, (err, result) => {
	result.root.div[0].div.forEach((div1) => {
		div1.div.forEach((div2) => {
			const categoryTitle = div2.div[0].div[0].h2[0]['_'];
			builtString += `<DT><H3>${categoryTitle}</H3><DL><p>`;
			div2.div[0].ol[0]['li'].forEach((liObject, liIndex) => {
				const href = liObject['a'][0]['$']['href'];
				const anchor = liObject['a'][0].div[1]['_'];
				builtString += `<DT><A HREF="${href}">${anchor}</A>`;
			});
			builtString += `</DL><p>`;
		});
	});
	builtString += `</DL><p>`;
	fs.writeFile('./bmarks - design-import.html', builtString, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	}); 
});
