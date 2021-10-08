import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import { getAllProjects } from "../api";

export const ProjectsContext = createContext();

let noFilters = {
	studyYear: "",
	specification: "",
	tool: "",
	supervisor: "",
};

export function ProjectsProvider({ children }) {
	const [filters, setFilters] = useState(noFilters);

	const updateFilters = (filters) => setFilters(filters);
	const resetFilters = () => setFilters(noFilters);

	const projectsQuery = useQuery(["projects", filters], getAllProjects, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
	});

	let value = {
		filters,
		updateFilters,
		resetFilters,
		projectsQuery,
	};

	return (
		<ProjectsContext.Provider value={value}>
			{children}
		</ProjectsContext.Provider>
	);
}
