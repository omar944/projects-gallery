import "./Projects.css";

import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";
import { useContext } from "react";

import { tools, supervisors } from "../data";
import { useForm } from "react-hook-form";

import { ProjectsContext } from "./ProjectsContext";

function FiltersCardHeader({ submit, reset }) {
	return (
		<div className="card-header">
			<div className="row align-items-center">
				<div className="col">فلترة</div>

				<div className="col justify-content-end d-flex">
					<button className="btn btn-secondary ms-2" onClick={() => reset()}>
						الافتراضي
					</button>
					<button className="btn btn-primary" onClick={() => submit()}>
						تطبيق
					</button>
				</div>
			</div>
		</div>
	);
}

function FilterCard() {
	const context = useContext(ProjectsContext);

	let form = useForm({
		defaultValues: context.filters,
	});

	const handleFilterSubmit = (vals, actions) => {
		console.log(vals);
		context.updateFilters(vals);
	};

	const handleReset = () => {
		let keys = Object.keys(form.getValues());
		let val = {};
		keys.forEach((key) => (val[key] = ""));
		form.reset(val);
		context.updateFilters(val);
	};

	return (
		<div className="card mt-3">
			<FiltersCardHeader
				submit={form.handleSubmit(handleFilterSubmit)}
				reset={handleReset}
			/>

			<div className="card-body">
				<form>
					<div className="row">
						<div className="col-md-3  col-sm-6 p-2">
							<select
								{...form.register("studyYear")}
								className="form-select text-center"
							>
								<option value="">اختر السنة ( الكل )</option>
								<option value="4">السنة الرابعة</option>
								<option value="5">السنة الخامسة</option>
							</select>
						</div>
						<div className="col-md-3 col-sm-6 p-2">
							<select
								{...form.register("specification")}
								className="form-select text-center"
							>
								<option value="">اختر الاختصاص ( الكل )</option>
								<option value="برمجيات">برمجيات</option>
								<option value="شبكات">شبكات</option>
							</select>
						</div>
						<div className="col-md-3 p-2">
							<select
								{...form.register("tool")}
								className="form-select text-center"
							>
								<option value="">اختر التقنية ( الكل )</option>
								{Object.entries(tools).map((entry) => {
									return (
										<option key={entry[1]} value={entry[0]}>
											{entry[0]}
										</option>
									);
								})}
							</select>
						</div>
						<div className="col-md-3 p-2">
							<select
								{...form.register("supervisor")}
								className="form-select text-center"
							>
								<option value="">اختر المشرف ( الكل )</option>
								{supervisors.map((val, idx) => {
									return (
										<option key={idx} value={val}>
											{val}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

function Card(props) {
	let project = props.project;
	return (
		<div className="col-md-6 col-lg-4 p-3">
			<div className="card  h-100 shadow">
				<div className="the-mark shadow tajawal">{project.mark}%</div>
				<img
					src={project.photos[0].thumbnail}
					className="card-img-top img-fluid cover-img"
					alt=""
				/>
				<div className="card-body">
					<h5 className="card-title tajawal">{project.projectName}</h5>
					<div className="level subtitle">
						{project.tools.map((tool) => {
							return (
								<i
									key={tool}
									className={` ${tools[tool]} colored fs-5 ms-1`}
								></i>
							);
						})}
					</div>
					<p className="card-text tahoma">
						{project.description.substring(0, 200)}
					</p>
				</div>
				<div className="card-footer">
					<div className="row justify-content-between">
						<div className="col-8 tajawal d-flex">
							<Link
								className="btn btn-primary w-100"
								to={`/projects/${project.id}`}
							>
								عرض التفاصيل
							</Link>
						</div>
						<div className="col-4 d-flex align-items-center justify-content-end ">
							<i className="bi bi-eye p-1"></i>
							<small>{project.visits_count}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Projects() {
	const context = useContext(ProjectsContext);

	if (context.projectsQuery.isLoading) {
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

	if (context.projectsQuery.isError) {
		return (
			<div
				className="d-flex align-items-center justify-content-center flex-column tajawal"
				style={{ height: "70vh" }}
				onClick={context.projectsQuery.refetch}
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
			<div className="container">
				<FilterCard />

				{context.projectsQuery.isSuccess && (
					<div id="successRes">
						<div className="row">
							{context.projectsQuery.data.results.map((p) => (
								<Card key={p.id} project={p} />
							))}
						</div>
					</div>
				)}

				{/* <div className="pagination justify-content-center my-5">
                <div className="page-item"><a className="page-link tahoma" href="#s">الصفحة السابقة</a></div>
                <div className="page-item"><a className="page-link" href="#s">1</a></div>
                <div className="page-item active"><a className="page-link" href="#s">2</a></div>
                <div className="page-item"><a className="page-link" href="#s">3</a></div>
                <div className="page-item"><Link to ="/" className="page-link tahoma">الصفحة التالية</Link></div>
            </div>
             */}
			</div>
		</div>
	);
}
