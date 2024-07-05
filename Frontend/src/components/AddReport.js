import React, {useContext, useState} from "react";
import ReportContext from "../context/reports/ReportContext";

const AddReport = (props) => {
  const context = useContext(ReportContext);
  const { addReport } = context;
  const [report, setReport] = useState({ title: "", imageData: "" });
  const [image, setImage] = useState("");

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
    }
  };
  
  const handleClick = (e)=>{
    e.preventDefault()
    //report.imageData=imageBase64(image)
    addReport(report.title, report.imageData)
    setReport({title: "", imageData:""})  
    setImage("");
    props.showAlert("Added Successfully", "success")
  }
  
  const onChange =(e)=>{
    setReport({...report, [e.target.name]: e.target.value})
  }
  
  return ( 
    <div className="container my-3">
      <h2>Add a Report</h2>
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
        
        <button disabled={report.title.length<5 || !image } onClick={handleClick} type="submit" className="btn btn-primary">
          Add Report
        </button>
      </form>
    </div>
  );
};

export default AddReport;