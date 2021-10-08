import "./Faq.css";

function Question(props) {
	let resId = `#${props.id}`;
	return (
		<div className="accordion-item">
			<h2 className="accordion-header">
				<button
					className="accordion-button tajawal collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={resId}
					data-bs-parent="#accordionExample"
					aria-expanded="false"
					aria-controls={props.id}
				>
					<div className="p-1 ms-3">{props.title}</div>
				</button>
			</h2>

			<div id={props.id} className="accordion-collapse collapse">
				<div className="accordion-body tahoma">{props.body}</div>
			</div>
		</div>
	);
}

export default function Faq() {
	return (
		<>
			<div className="container mt-3 p-4">
				<div className="row">
					<h2 className="tajawal">الاسئلة الشائعة</h2>
				</div>
				<div className="row mt-3">
					<div className="accordion" id="accordionExample">
						<Question
							id="q1"
							title="  كم طالب يمكن ان يعمل على المشروع ؟"
							body=" يمكن ثلاثة او اربعة طلاب .. يسمح بطالبين فقط او خمسة بموافقة الدكتور المشرف و عدد المجموعات في الدفعة"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
