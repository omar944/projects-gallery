import { createContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { apiBaseUrl, getProjectById } from "../api";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
	const { id } = useParams();
	let projectQuery = useQuery(["project", id], getProjectById, {
		retry: 0,
		enabled: !!id,
	});

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token == null) {
			token = uuidV4();
			localStorage.setItem("token", token);
		}

		const req = async () => {
			await axios.post(apiBaseUrl + `/projects/${id}/visit`, {
				token: token,
			});
		};
		req();
	}, [id]);

	const value = {
		project: projectQuery.data,
		isLoading: projectQuery.isLoading,
		isError: projectQuery.isError,
		refetch: projectQuery.refetch,
	};

	return (
		<ProjectContext.Provider value={value}>{children} </ProjectContext.Provider>
	);
}
