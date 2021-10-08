import "./HomePage.css";

import { Link } from "react-router-dom";

export default function HomePage() {
	return (
		<>
			<section id="hero" className="d-flex align-items-center">
				<div className="container position-relative">
					<div className="row justify-content-center">
						<div className="col-xl-7 col-lg-9 text-center">
							<h1 className="tajawal">
								معرض المشاريع في كلية الهندسة المعلوماتية
							</h1>
							<h2 className="tahoma">
								مشاريع الطلاب في كل من السنة الرابعة والخامسة
							</h2>
						</div>
					</div>
					<div className="text-center">
						<Link to="/projects" className="btn-get-started tajawal">
							تصفح المشاريع
						</Link>
					</div>

					<div className="row mt-5">
						<div
							className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
							data-aos="zoom-in"
							data-aos-delay="200"
						>
							<div className="icon-box">
								<div className="icon">
									<i className="bi bi-puzzle"></i>
								</div>
								<h4 className="title tahoma">اعرف ما المطلوب</h4>
								<p className="description tahoma">
									من خلال اطلاعك على المشاربع الموجودة تسطتيع استنتاج حجم
									المشروع المطلوب وبذلك تستطيع انتقاء الافكار الواقعية
								</p>
							</div>
						</div>

						<div
							className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
							data-aos="zoom-in"
							data-aos-delay="300"
						>
							<div className="icon-box">
								<div className="icon">
									<i className="bi bi-emoji-smile"></i>
								</div>
								<h4 className="title tahoma">
									تعرف على احدث التقنيات المستخدمة
								</h4>
								<p className="description tahoma">
									اختصر الوقت الذي بذله من قبلك في اختيار الادوات المناسبة و
									الاقل تعقيد لانجاز ماهو مطلوب
								</p>
							</div>
						</div>

						<div
							className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
							data-aos="zoom-in"
							data-aos-delay="400"
						>
							<div className="icon-box">
								<div className="icon">
									<i className="bi bi-soundwave"></i>
								</div>
								<h4 className="title tahoma">تصفح الاسئلة الشائعة</h4>
								<p className="description tahoma">
									غالبا ما تجد اجابة استفساراتك بينها وان لم تجد اطرح سؤالا ليتم
									اضافته
								</p>
							</div>
						</div>

						<div
							className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
							data-aos="zoom-in"
							data-aos-delay="500"
						>
							<div className="icon-box">
								<div className="icon">
									<i className="bi bi-trophy"></i>
								</div>
								<h4 className="title tahoma">ساعد الاخرين باضافة مشروعك</h4>
								<p className="description tahoma">
									ان كنت قد انهيت مشروعك فبادر باضافته ليكون عونا للاخرين في
									اختيار مشاريعهم
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <section>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="counter-box colored"> <i className="fa fa-thumbs-o-up"></i> <span className="counter">2147</span>
                                <p>عضو مسجل</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="counter-box"> <i className="fa fa-group"></i> <span className="counter">3275</span>
                                <p>مشروع مضاف</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="counter-box"> <i className="fa fa-shopping-cart"></i> <span className="counter">289</span>
                                <p>اداة تطوير</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="counter-box">   <i className="fa fa-user"></i> <span className="counter">1563</span>
                                <p>سؤال شائع</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section> */}
		</>
	);
}
