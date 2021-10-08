import { useRef, useState } from "react";
import "./AddProjects.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewProject, getAllProjects } from "../api";

import { useForm, reg, Controller } from "react-hook-form";

import InputList from "../components/InputList/InputList";

import MultipleImageInput from "../components/MultipleImageInput/MultipleImageInput";
import { useMutation, useQuery } from "react-query";
import Loader from "react-loader-spinner";
import { supervisors, tools } from "../data";
import { useHistory } from "react-router";

let initialValues = {
	projectName: "",
	studyYear: "",
	specification: "",
	mark: "",
	supervisors: [],
	students: [],
	tools: [],
	description: "",
	documentation: null,
	presentation: null,
	image: [],
};

let ar = {
	required: "هذا الحقل مطلوب",
	minLen: "هذا النص قصير للغاية",
	maxLen: "لقد تجاوزت الحد المسموح من الحروف",
	maxSize: "لقد تجاوزت الحجم المسموح",
	requiredList: "يجب اضافة واحد على الاقل",
	mustChoose: "يجب عليك الاختيار",
	invalidList: "احدى الخيارات غير صالح قم بحذفه",
	invalidPDF: "الرجاء اختيار الملف بصيغة PDF",
};

export default function AddProject() {
	let {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: initialValues,
	});

	const mutation = useMutation((project) => addNewProject(project));

	async function handler(vals, actions) {
		mutation.mutate(vals);
	}

	if (mutation.isLoading) {
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
	if (mutation.isSuccess) {
		return (
			<div
				className="d-flex align-items-center justify-content-center flex-column tajawal"
				style={{ height: "70vh" }}
			>
				<div className="success mb-3">
					<i
						className="bi bi-check2-circle text-success "
						style={{ fontSize: "100px" }}
					></i>
				</div>
				<div className="mt-1 fw-bold">تم ارسال الطلب بنجاح</div>
				<div className="mt-1" style={{ fontSize: "14px" }}>
					سيتم اضافة مشروعك بعد مراجعة الطلب في اقرب وقت
				</div>
			</div>
		);
	}
	if (mutation.isError) {
		setError(mutation.data);
	}

	return (
		<div className="all">
			<div className="container-fluid">
				<div className="row justify-content-center mb-3">
					<div className="col-md-8 p-4">
						{mutation.isLoading && <Loader type="Rings"></Loader>}
						{mutation.isError && (
							<div>{JSON.stringify(mutation.error, null, 2)}</div>
						)}
						<form onSubmit={handleSubmit(handler)}>
							<div className="row mb-3">
								<div className="col">
									<label htmlFor="projectName" className="form-label">
										اسم المشروع
									</label>
									<input
										{...register("projectName", {
											minLength: {
												value: 20,
												message: ar.minLen,
											},
											maxLength: {
												value: 200,
												message: ar.maxSize,
											},
											required: {
												value: true,
												message: ar.required,
											},
										})}
										type="text"
										className={`form-control ${
											errors?.projectName ? "is-invalid" : ""
										}`}
										id="projectName"
										placeholder="تطبيق ادارة ..الخ"
									/>
									{errors?.projectName && (
										<div className="invalid-feedback">
											{errors.projectName.message}
										</div>
									)}
								</div>
							</div>

							<div className="row mb-3">
								<div className="col g-3">
									<label htmlFor="studyYear" className="form-label">
										السنة الدراسية
									</label>
									<select
										{...register("studyYear", {
											required: {
												value: true,
												message: ar.required,
											},
											validate: (val) => {
												if (val === "-1") return ar.mustChoose;
											},
										})}
										id="studyYear"
										className={`form-select pe-5 ${
											errors?.studyYear ? "is-invalid" : ""
										}`}
									>
										<option value="-1">اختر السنة</option>
										<option value="الرابعة">الرابعة</option>
										<option value="الخامسة">الخامسة</option>
									</select>
									{errors?.studyYear && (
										<div className="invalid-feedback">
											{errors.studyYear.message}
										</div>
									)}
								</div>

								<div className="col g-3">
									<label htmlFor="specefication" className="form-label">
										التخصص
									</label>
									<select
										{...register("specification", {
											required: {
												value: true,
												message: ar.required,
											},
											validate: (val) => {
												if (val === "-1") return ar.mustChoose;
											},
										})}
										id="specefication"
										className={`form-select pe-5 ${
											errors?.specification ? "is-invalid" : ""
										}`}
									>
										<option value="-1">اختر التخصص</option>
										<option value="برمجيات">برمجيات</option>
										<option value="شبكات">شبكات</option>
									</select>
									{errors?.specification && (
										<div className="invalid-feedback">
											{errors.specification.message}
										</div>
									)}
								</div>
							</div>

							<div className="mb-3">
								<label htmlFor="mark" className="form-label">
									العلامة
								</label>
								<input
									{...register("mark", {
										required: {
											value: true,
											message: ar.required,
										},
										validate: (val) => {
											if (
												!yup.number().integer().max(100).min(0).isValidSync(val)
											)
												return "الرجاء ادخال علامة صحيحة";
										},
									})}
									className={`form-control ${errors?.mark ? "is-invalid" : ""}`}
									id="mark"
									placeholder="العلامة من 100 مثل 80"
								/>
								{errors?.mark && (
									<div className="invalid-feedback">{errors.mark.message}</div>
								)}
							</div>

							<Controller
								rules={{
									required: { value: true, message: ar.required },
									validate: (val) => {
										if (!val || val.length === 0) return ar.requiredList;
										for (let x of val) if (x === "-1") return ar.invalidList;
									},
								}}
								control={control}
								name="supervisors"
								render={(obj) => {
									return (
										<InputList
											onChange={obj.field.onChange}
											value={obj.field.value}
											state={obj.fieldState}
											render={(ref) => {
												return (
													<div className="w-100">
														<label htmlFor="supervisor" className="form-label">
															المشرفين
														</label>
														<select
															onBlur={obj.field.onBlur}
															id="supervisor"
															className="form-select pe-5"
															ref={ref}
														>
															<option value="-1">اختر المشرف</option>
															{supervisors.map((val, idx) => {
																return (
																	<option key={idx} value={val}>
																		{val}
																	</option>
																);
															})}
														</select>
													</div>
												);
											}}
										/>
									);
								}}
							/>

							<Controller
								rules={{
									required: { value: true, message: ar.required },
									validate: (val) => {
										if (!val || val.length === 0) return ar.requiredList;
										for (let x of val) if (x === "") return ar.invalidList;
									},
								}}
								control={control}
								name="students"
								render={(obj) => {
									return (
										<InputList
											state={obj.fieldState}
											onChange={obj.field.onChange}
											value={obj.field.value}
											render={(ref) => {
												return (
													<div className="w-100">
														<label htmlFor="students" className="form-label">
															الطلاب
														</label>
														<input
															placeholder="اسم الطالب"
															className="form-control"
															ref={ref}
														/>
													</div>
												);
											}}
										/>
									);
								}}
							/>

							<Controller
								rules={{
									required: { value: true, message: ar.required },
									validate: (val) => {
										if (!val || val.length === 0) return ar.requiredList;
										for (let x of val) if (x === "-1") return ar.invalidList;
									},
								}}
								control={control}
								name="tools"
								render={(obj) => {
									return (
										<InputList
											state={obj.fieldState}
											onChange={obj.field.onChange}
											value={obj.field.value}
											render={(ref) => {
												return (
													<div className="w-100">
														<label htmlFor="supervisor" className="form-label">
															التقنيات
														</label>
														<select
															id="supervisor"
															className="form-select pe-5 "
															ref={ref}
														>
															<option value="-1">اختر تقنية</option>
															{Object.entries(tools).map((entry) => {
																return (
																	<option key={entry[1]} value={entry[0]}>
																		{entry[0]}
																	</option>
																);
															})}
														</select>
													</div>
												);
											}}
										/>
									);
								}}
							/>

							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									الوصف
								</label>
								<textarea
									{...register("description", {
										required: {
											value: true,
											message: ar.required,
										},
										minLength: {
											value: 40,
											message: ar.minLen,
										},
									})}
									name="description"
									className={`form-control ${
										errors?.description ? "is-invalid" : ""
									}`}
									id="description"
									rows="3"
									style={{ resize: "none" }}
								></textarea>
								{errors?.description && (
									<div className="invalid-feedback">
										{errors.description.message}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="documentation" className="form-label">
									كتاب التوثيق
								</label>
								<input
									{...register("documentation", {
										required: {
											value: true,
											message: ar.required,
										},
										validate: (val) => {
											if (val[0].type !== "application/pdf")
												return ar.invalidPDF;
											if (val[0].size >= 10 * 1024 * 1024) return ar.maxSize;
										},
									})}
									className={`form-control ${
										errors?.documentation ? "is-invalid" : ""
									}`}
									type="file"
									id="documentation"
									accept="application/pdf"
								/>
								{errors?.documentation && (
									<div className="invalid-feedback">
										{errors.documentation.message}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="presentation" className="form-label">
									العرض التقديمي
								</label>
								<input
									{...register("presentation", {
										required: {
											value: true,
											message: ar.required,
										},
										validate: (val) => {
											if (val[0].type !== "application/pdf")
												return ar.invalidPDF;
											if (val[0].size >= 10 * 1024 * 1024) return ar.maxSize;
										},
									})}
									className={`form-control ${
										errors?.presentation ? "is-invalid" : ""
									}`}
									type="file"
									name="presentation"
									id="presentation"
									accept="application/pdf,.ppt,.pptx"
								/>
								{errors?.presentation && (
									<div className="invalid-feedback">
										{errors.presentation.message}
									</div>
								)}
							</div>

							<Controller
								rules={{
									required: {
										value: true,
										message: ar.required,
									},
									validate: (val) => {
										let size = 0;
										for (let x of val) size += x.size;
										if (size > 15 * 1024 * 1024) return ar.maxSize;
									},
								}}
								control={control}
								name="image"
								render={(obj) => {
									return (
										<MultipleImageInput
											value={obj.field.value}
											onChange={obj.field.onChange}
											onBlur={obj.field.onBlur}
											state={obj.fieldState}
										/>
									);
								}}
							/>

							<div className="d-grid">
								<button type="submit" className="btn btn-primary p-2">
									اضافة
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
