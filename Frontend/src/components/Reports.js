import { useContext, useEffect, useRef, useState } from "react";
import ReportContext from "../context/reports/ReportContext";
import Reportitem from "./Reportitem";
import AddReport from "./AddReport";
import { useNavigate } from "react-router-dom";

const Reports = (props) => {
  const context = useContext(ReportContext);
  const { reports=[], getReports, editReport } = context;
  let navigate = useNavigate();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getReports();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [report, setReport] = useState({ id: "",title: "",imageData: ""});

  const updateReport = (currentReport) => {
    if (ref.current) {
      ref.current.click();
      setReport({id: currentReport._id ,title: currentReport.title });
      console.log("This is updateReport from Report.js");
      console.log(report.id);
    }
  };

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = await imageBase64(file);
      setImage(img);
      setReport((prevReport) => ({ ...prevReport, imageData: img }));
      console.log("This is handleFileChange from Report.js");
      console.log(report);
    }
  };

  const handleClick = (e) => {
    editReport(report.id, report.title, report.imageData);
    if (refClose.current) {
      refClose.current.click();
    }
    setReport({title: "", imageData:""})  
    setImage("");
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    console.log("This on change in Report.js")
    setReport({...report, [e.target.name]: e.target.value})
  };

  return (
    <>
      <AddReport showAlert={props.showAlert} />
      {/* modal element starts... */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* model dialog that is called when launched demo modal button is clicked by ReportItem edit icon */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Report
              </h1>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input value={report.title} onChange={onChange}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    minLength={5} required  
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Image
                </label>
                {image ? (
                  <img src={image} alt="Preview" height="100%" width="100%" />
                  ) : (
                  <input onChange={handleFileChange} name="imageData" type="file" className="form-control" accept="image/*" id="imageData"
                  />
                )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {/* this close button is clicked by handleClick to call editReport, close modal and show alert. */}
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={report.title.length<5 || !image }
                onClick={handleClick}
                type="button"
                className="btn btn-primary" 
              >
                Update Report
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* model element ends... */}
      <div className="row my-3">
        <h2>Your Reports</h2>
        <div className="container">
          {Array.isArray(reports) && reports.length === 0 && "No reports to display"}
        </div>
        {Array.isArray(reports) && reports.map((report) => {
          return (
            <Reportitem key={report._id} updateReport={updateReport} showAlert={props.showAlert} report={report} />
          );
        })}
      </div>
    </>
  );
};

export default Reports;
