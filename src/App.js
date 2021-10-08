import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "devicon/devicon.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Project from "./Project/Project";
import Projects from "./Projects/Projects";
import AddProject from "./AddProject/AddProject";
import HomePage from "./HomePage/HomePage";
import Faq from "./Faq/Faq";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProjectsProvider } from "./Projects/ProjectsContext";
import { ProjectProvider } from "./Project/ProjectContext";
import "./global.css";
function App() {
	let queryClient = new QueryClient();

	return (
		<Router>
			<div className="d-flex flex-column min-vh-100 justify-content-between">
				<div>
					<QueryClientProvider client={queryClient}>
						<Navbar />

						<Switch>
							<Route path="/" exact component={HomePage} />

							<Route path="/projects" exact>
								<ProjectsProvider>
									<Projects />
								</ProjectsProvider>
							</Route>

							<Route
								path="/projects/add-project"
								exact
								component={AddProject}
							/>

							<Route path="/projects/:id" exact>
								<ProjectProvider>
									<Project />
								</ProjectProvider>
							</Route>

							{/* <Route path="" exact component={Project} /> */}

							<Route path="/faq" exact component={Faq} />
						</Switch>
					</QueryClientProvider>
				</div>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
