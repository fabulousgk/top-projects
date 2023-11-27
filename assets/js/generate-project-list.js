import path from 'node:path';
import fs from 'fs-extra';
import * as cheerio from 'cheerio';

const outputFile = 'projects.json';

const buildFile = () => {
	const contentFolder = path.resolve('projects');
	const projectFolders = fs.readdirSync(contentFolder);

	const newData = projectFolders.map((folder) => {
		const projectFile = path.resolve(contentFolder, folder, 'index.html');

		if (fs.pathExistsSync(projectFile)) {
			const fileContents = fs.readFileSync(projectFile);
			const $ = cheerio.load(fileContents);
			return {
				title: $('title').text(),
				order: $('meta[data-order]').data('order') || 0,
				slug: folder,
			};
		}

		return null;
	});

	const finalData = newData.filter(Boolean);

	fs.writeJSONSync(outputFile, finalData);
	console.log('Success!');
};

buildFile();
