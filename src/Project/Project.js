import "devicon/devicon.min.css";
import "./Project.css";
import { useContext, useEffect } from "react";
import { ProjectContext } from "./ProjectContext";
import { tools } from "../data";
import Loader from "react-loader-spinner";

function ToolWidget({ name, iconName }) {
	return (
		<div className="tool-wrapper p-2 ms-2">
			<i className={iconName + " colored ms-2 fs-4"}></i>
			<div className="tool-title" style={{ direction: "ltr" }}>
				{name}
			</div>
		</div>
	);
}

export default function Project() {
	const context = useContext(ProjectContext);

	const project = context.project;

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0 });
	}, []);

	if (context.isLoading) {
		return (
			<div
				className="d-flex align-items-center justify-content-center flex-column tajawal"
				style={{ height: "70vh" }}
			>
				<Loader type="Rings" color="blue" height="100px" width="100px" />
				<div className="mt-1 fw-bold">جاري التحميل</div>
			</div>
		);
	}

	if (context.isError) {
		return (
			<div
				className="d-flex align-items-center justify-content-center flex-column tajawal"
				style={{ height: "70vh" }}
				onClick={context.refetch}
			>
				<i
					className="bi bi-exclamation-octagon p-4"
					style={{ fontSize: "5em" }}
				></i>
				<div className="mt-1">عذرا حدث خطأ اضغط لاعادة المحاولة</div>
			</div>
		);
	}

	return (
		<div className="all">
			<div className="container mt-5">
				<div className="row align-items-center mb-5">
					<div className="col">
						<h2 className="tajawal">{project.projectName}</h2>
						<div className="d-flex">
							<div className="badge bg-success fs-6 p-2 rounded-3">
								<span className="tajawal">{project.studyYear}</span>
							</div>
							<div className="badge bg-success p-2 fs-6 rounded-3 me-2">
								<span className="tajawal">{project.specification}</span>
							</div>
							<div className="badge bg-success p-2 fs-6 rounded-3 me-2 align-items-center d-flex">
								<i className="bi bi-star-fill"></i>
								<span className="tajawal me-1">{project.mark}%</span>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-8">
						<div
							id="carouselExampleControls"
							className="carousel slide"
							data-bs-ride="carousel"
						>
							<div className="carousel-inner">
								{project.photos.map((photo, idx) => {
									return (
										<div
											key={idx}
											className={"carousel-item " + (idx === 0 ? "active" : "")}
										>
											<img
												src={photo.image}
												className="d-block w-100 test"
												alt="..."
											/>
										</div>
									);
								})}
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#carouselExampleControls"
								data-bs-slide="prev"
							>
								<span
									className="carousel-control-prev-icon bg-black"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#carouselExampleControls"
								data-bs-slide="next"
							>
								<span
									className="carousel-control-next-icon bg-black"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>

						<div className="bg-white shadow-sm w-100 p-3">
							<h5 className="tajawal my-2">تفاصيل المشروع</h5>
							<hr />
							<p className="tahoma">{project.description}</p>
						</div>

						<div className="bg-white shadow-sm w-100 p-3  mt-3">
							<h5 className="tajawal my-2">التقنيات</h5>
							<hr />
							<div className="d-flex flex-wrap">
								{project.tools.map((tool) => {
									return (
										<ToolWidget key={tool} name={tool} iconName={tools[tool]} />
									);
								})}
							</div>
						</div>

						<div className="bg-white shadow-sm w-100 p-3 mt-3">
							<h5 className="tajawal my-2">المرفقات</h5>
							<hr />

							<a
								href={project.documentation}
								className="btn btn-primary ms-2 rounded-2"
							>
								<i className="bi bi-download ms-2"></i>
								كتاب التوثيق
							</a>

							<a
								href={project.presentation}
								className="btn btn-primary rounded-2"
							>
								<i className="bi bi-download ms-2"></i>
								العرض التقديمي
							</a>
						</div>
					</div>

					<div className="col-md-4">
						<div className="bg-white shadow-sm w-100 p-3 mt-md-0 mt-3">
							<h5 className="tajawal my-2">المشرفين</h5>
							<hr />
							{project.supervisors.map((supervisor) => (
								<p className="tahoma" key={supervisor}>
									{supervisor}
								</p>
							))}
						</div>

						<div className="bg-white shadow-sm w-100 p-3 mt-3">
							<h5 className="tajawal my-2">الطلاب</h5>
							<hr />
							{project.students.map((student) => (
								<p className="tahoma" key={student}>
									{student}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
