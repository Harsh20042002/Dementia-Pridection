import React, { useContext, useState, useEffect } from "react";
import ReportContext from "../context/reports/ReportContext";

const Reportitem = (props) => {
  const context = useContext(ReportContext);
  const { deleteReport,predictReport } = context;
  const { report, updateReport } = props;
  const [image, setImage] = useState("");


  const handlePredict = async (id) => {
    const result = await predictReport(id);
    if (result) {
      props.showAlert(result, "info");
    } else {
      props.showAlert("Prediction Failed", "danger");
    }
  };


  useEffect(() => {
    setImage(report.imageData);
  }, [report.imageData]);

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{report.title}</h5>
            <button
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteReport(report._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></button>
            <button
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateReport(report);
                props.showAlert("Updated Successfully", "success");
              }}
            ></button>

          </div>
          
          {image && <img src={image} height='100%' width="100%" alt="Report" />}
          <div className="d-flex align-items-center" align ="center">
            <button
                align = "center"
                onClick={() => {
                  handlePredict(report._id);
                }}
              >Predict</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Reportitem;

