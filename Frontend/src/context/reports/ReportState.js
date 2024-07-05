import { useState } from "react";
import ReportContext from "./ReportContext";

const ReportsState = (props) => {
  const host = "http://localhost:4000";
  const [reports, setReports] = useState([]);
 
  // get all Reports 
 
  const getReports = async () => {
    try {
      const response = await fetch(`${host}/api/report/fetchallreports/`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      if (response.ok) {
        setReports(json);
      } else {
        console.error("Failed to fetch reports:", json);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

   // Add a report
   const addReport = async (title, imageData) => {
    try {
      const response = await fetch(`${host}/api/report/addreport/`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageData }),
      });
      const report = await response.json();
      if (response.ok) {
        setReports(reports.concat(report));
      } else {
        console.error("Failed to add report:", report);
      }
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  // Delete a report
  const deleteReport = async (id) => {
    try {
      const response = await fetch(`${host}/api/report/deletereport/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newReports = reports.filter((report) => report._id !== id);
        setReports(newReports);
      } else {
        const errorData = await response.json();
        console.error("Failed to delete report:", errorData);
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // Edit a report
  const editReport = async (id, title, imageData) => {
    try {
      const response = await fetch(`${host}/api/report/updatereport/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageData }),
      });

      if (response.ok) {
        let newReports = JSON.parse(JSON.stringify(reports));
        for (let index = 0; index < newReports.length; index++) {
          const element = newReports[index];
          if (element._id === id) {
            newReports[index].title = title;
            newReports[index].imageData = imageData;
            break;
          }
        }
        setReports(newReports);
      } else {
        const errorData = await response.json();
        console.error("Failed to edit report:", errorData);
      }
    } catch (error) {
      console.error("Error editing report:", error);
    }
  };

  // Predict report
  const predictReport = async (id) => {
    try {
      const response = await fetch(`${host}/api/report/predictreport/${id}`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();
      if (response.ok) {
        console.log(text);
        return text;
      } else {
        console.error("Failed to predict report:", text);
      }
    } catch (error) {
      console.error("Error predicting report:", error);
    }
  };

  return (
    <ReportContext.Provider value={{ reports, addReport, deleteReport, editReport, getReports ,predictReport}}>
      {props.children}
    </ReportContext.Provider>
  );
};

export default ReportsState;
