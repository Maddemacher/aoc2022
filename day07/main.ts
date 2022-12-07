import { orderBy } from 'https://cdn.skypack.dev/lodash-es@4.17.21';
import { lodash } from 'https://deno.land/x/deno_ts_lodash/mod.ts';

interface Folder {
	[key: string]: number | Folder
}

interface SizedFolder {
	[key: string]: number | SizedFolder
	size: number;
}

const CD = "$ cd "
const LS = "$ ls"

const getFolder = (folder: Folder, path: string[]): Folder | undefined => {
	const [current, ...rest] = path;

	if (current === undefined) {
		return folder;
	}

	const next = folder[current];

	if (next === undefined) {
		return undefined;
	}

	return getFolder(next as Folder, rest)
}

const buildTree = (lines: string[], state: Folder, currentPath: string[]) => {
	const [line, ...rest] = lines;
	const path = [...currentPath];

	if (!line) {
		return;
	}

	if (line.startsWith(LS)) {
		const files = lodash.takeWhile(rest, line => line.startsWith(LS) === false && line.startsWith(CD) === false)
		const folder = getFolder(state, path);

		if (folder === undefined) {
			throw new Error(`Unable to find folder with path ${JSON.stringify(path)}`)
		}

		files.forEach(file => {
			const [prefix, name] = file.split(" ")

			if (prefix === "dir") {
				folder[name] = folder[name] || {}
				return;
			}

			const size = parseInt(prefix);
			folder[name] = folder[name] || size
		})
	}

	if (line.startsWith(CD)) {
		const folderName = line.replace(CD, "");

		if (folderName === "..") {
			path.pop();
		} else {
			const folder = getFolder(state, [...path, folderName]);

			if (folder === undefined) {
				const parent = getFolder(state, path);
				if (parent === undefined) {
					throw new Error("Unable to find parent")
				}

				parent[folderName] = parent[folderName] || {}
			}

			path.push(folderName);
		}
	}

	buildTree(rest, state, path)
}

const evaluateTree = (state: Folder): number => {
	let size = 0;

	for (const key in state) {
		const item = state[key];

		if (typeof (item) === typeof ({})) {
			size = size + evaluateTree(item as Folder);
			continue;
		}

		size = size + (item as number);
		delete state[key]
	}

	state.size = size;
	return size;
}

const flattenFolders = (state: SizedFolder, folders: { name: string, size: number }[]): { name: string, size: number }[] => {
	for (const key in state) {
		const item = state[key];

		if (typeof (item) === typeof ({})) {
			folders.push({
				name: key,
				size: (item as SizedFolder).size
			})

			flattenFolders(item as SizedFolder, folders)
			continue;
		}
	}

	return folders;
}

export const main = async () => {
	const raw = await Deno.readTextFile("./input.txt");
	const lines = raw.split("\n");

	const state: Folder = {};

	buildTree(lines, state, []);
	evaluateTree(state);
	const folders = flattenFolders(state as SizedFolder, []);

	const smallFolders = folders.filter(f => f.size <= 100000);
	const sum = smallFolders.reduce((acc, f) => acc + f.size, 0);

	console.log(sum)

	const currentSize = (state["/"] as SizedFolder).size;
	const neededSize = 30000000 + currentSize - 70000000;

	const dirsToDelete = orderBy(folders.filter(f => f.size >= neededSize), (f: SizedFolder) => f.size);

	console.log(dirsToDelete[0].size)
}

main();


