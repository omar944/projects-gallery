import { Link } from 'react-router-dom'

export default function Navbar() {




    return <>
        <nav className="navbar navbar-expand-md navbar-light bg-white p-2 shadow-sm sticky-top">
            <div className="container align-items-baseline">
                <Link to="/" className="navbar-brand"><span className="main-title tahoma">المشروع</span></Link>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#testId" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between tajawal me-3" id="testId">

                    <div className="navbar-nav">
                        <Link to="/" className="nav-link navbar-entry active">الرئيسية</Link>
                        <Link to="/projects" className="nav-link navbar-entry">المشاريع</Link>
                        <Link to="/faq" className="nav-link navbar-entry">الاسئلة الشائعة</Link>
                    </div>

                    <div className="navbar-nav">
                        <Link to="/projects/add-project" className="nav-link bg-primary text-white rounded-3 p-2">أضف مشروعك</Link>
                    </div>
                </div>
            </div>

        </nav>
    </>;
}