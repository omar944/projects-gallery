var axios = require("axios").default;

export let apiBaseUrl = "http://omar942.pythonanywhere.com/api";

export async function addNewProject(project) {
	let formData = new FormData();
	let files = ["documentation", "presentation", "image"];
	let lists = ["supervisors", "students", "tools"];

	for (let [key, value] of Object.entries(project)) {
		if (files.includes(key) || lists.includes(key)) continue;
		formData.append(key, value);
	}

	lists.forEach((list) => {
		for (let item of project[list]) formData.append(list, item);
	});

	if (project.documentation)
		formData.append(files[0], project?.documentation[0]);
	if (project.presentation) formData.append(files[1], project?.presentation[0]);
	project.image.forEach((file) => formData.append(files[2], file));

	let res = await axios.post(apiBaseUrl + "/projects", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
}

export async function getAllProjects({ queryKey: [_, filters] }) {
	let query = "";
	Object.entries(filters).forEach((entry) => {
		if (!!entry[1] && entry[1] !== "")
			query = query + "&" + entry[0] + "=" + entry[1];
	});
	let url = apiBaseUrl + "/projects?limit=10000" + query;
	let res = await axios.get(url);
	return res.data;
}

export async function getProjectById({ queryKey: [_, id] }) {
	const url = apiBaseUrl + "/projects/" + id;
	const res = await axios.get(url);
	return res.data;
}
