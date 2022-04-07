import React, { useState } from 'react';
import './pageTwo.scss';

const PageTwo = ({ page, setPage, job, setJob }) => {
  const [jobTitleError, setJobTitleError] = useState(false);
  const [jobLengthError, setJobLengthError] = useState(false);
  const [jobLevelError, setJobLevelError] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [bonusSkillsError, setBonusSkillsError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const [minSalaryError, setMinSalaryError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const nextPage = (e) => {
    e.preventDefault();

    if (job.jobTitle.length < 3) {
      console.log("Job title must be more than 3 chars");
      setJobTitleError(true);
    } else {
      setJobTitleError(false);
      if (!job.jobLength || job.jobLength == "") {
        console.log("Choose a job length");
        setJobLengthError(true);
      } else {
        setJobLengthError(false);
        if (!job.jobLevel || job.jobLevel == "") {
          console.log("Choose a job level")
          setJobLevelError(true);
        } else {
          setJobLevelError(false);
          if (job.jobDetails.responsibilities.length < 100) {
            setResponsibilitiesError(true);
            console.log("Responsibilities must be more than 100 chars");
          } else {
            setResponsibilitiesError(false);
            if (!job.jobDetails.requirements || job.jobDetails.requirements.length < 100) {
              setRequirementsError(true);
              console.log("Requirements must be more than 100 char")
            } else {
              setRequirementsError(false);
              if (!job.jobDetails.bonusSkills || job.jobDetails.bonusSkills.length < 30) {
                setBonusSkillsError(true);
                console.log("Bonus skills must be more than 30 char")
              } else {
                setBonusSkillsError(false);
                if (!job.currency || job.currency == "") {
                  setCurrencyError(true);
                  console.log("Please select a currency");
                } else {
                  setCurrencyError(false);
                  if (!job.minSalary) {
                    setMinSalaryError(true);
                    console.log("Please enter the minimum salary");
                  } else {
                    setMinSalaryError(false);
                    if (!job.date) {
                      setDateError(true);
                      console.log("Please select a date");
                    } else {
                      setDateError(false);
                      if (!job.time) {
                        setTimeError(true)
                        console.log("Please select a time");
                      } else {
                        console.log(job);
                        setPage(page + 1)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="page-two">
      <h1 className="page-two-title">Create job</h1>
      <p className="page-two-subtitle has-text-left">Use the form to get started – you will have a chance to preview your job listing in the next step. Questions? Contact us.
        </p>
      <form className="form has-text-left">
        <div className="field my-5">
          <label className="label">Job title <span className="required">(required)</span></label>
          <label className="label label-subtitle">Concise and clear, name the role. Omit location or job type.</label>
          {jobTitleError && (
            <span className="error-text has-text-danger has-text-light">
              Job title must be more than 3 characters
            </span>
          )}
          <div className="control">
            <input className={jobTitleError ? "input is-danger" : "input"} type="text"
              value={job.jobTitle}
              onChange={(e) => setJob({ ...job, jobTitle: e.target.value })} />
          </div>
        </div>
        <div className="columns">

          <div className="field column">
            <label className="label">Job type <span className="required">(required)</span></label>
            <div className="control" style={{ minWidth: "100%" }}>
              <div className={jobLengthError ? "select is-normal is-danger" : "select is-normal"} style={{ minWidth: "100%" }}>
                <select style={{ minWidth: "100%" }}
                  onChange={(e) => setJob({ ...job, jobLength: e.target.value })}
                  value={job.jobLength}
                >
                  <option value={null}>Select from dropdown</option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                </select>
              </div>
              {jobLengthError && (
                <span className="error-text has-text-danger has-text-light">
                  Select a job length from dropdown
            </span>
              )}
            </div>
          </div>
          <div className="field column">
            <label className="label">Job level <span className="required">(required)</span></label>
            <div className={jobLevelError ? "select is-normal is-danger" : "select is-normal"} style={{ minWidth: "100%" }}>
              <select style={{ minWidth: "100%" }}
                onChange={(e) => setJob({ ...job, jobLevel: e.target.value })}
                value={job.jobLevel}
              >
                <option value={null}>Select level</option>
                <option value="junior">Junior</option>
                <option value="mid-level">Mid-level</option>
                <option value="senior">Senior</option>
              </select>
            </div>
            {jobLevelError && (
              <span className="error-text has-text-danger has-text-light">
                Select a job level from dropdown
            </span>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Responsibilities <span className="required">(required)</span></label>
          {responsibilitiesError && (
            <span className="error-text has-text-danger has-text-light">
              Responsibilities must have more than 100 chars
            </span>
          )}
          <div className="control">
            <textarea className={responsibilitiesError ? "textarea is-danger" : "textarea"} rows="5" value={job.jobDetails.responsibilities}
              onChange={(e) => setJob({ ...job, jobDetails: { ...job.jobDetails.requirements, responsibilities: e.target.value } })}></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Essential Skills & Requirements <span className="required">(required)</span></label>
          {requirementsError && (
            <span className="error-text has-text-danger has-text-light">
              Requirements must have more than 100 chars
            </span>
          )}
          <div className="control">
            <textarea className={requirementsError ? "textarea is-danger" : "textarea"} rows="5"
              value={job.jobDetails.requirements}
              onChange={(e) => setJob({ ...job, jobDetails: { ...job.jobDetails, requirements: e.target.value } })}></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Bonus Skills <span className="required">(required)</span></label>
          {bonusSkillsError && (
            <span className="error-text has-text-danger has-text-light">
              Bonus skills must be more than 30 chars
            </span>
          )}
          <div className="control">
            <textarea className={bonusSkillsError ? "textarea is-danger" : "textarea"} rows="5"
              value={job.jobDetails.bonusSkills}
              onChange={(e) => setJob({ ...job, jobDetails: { ...job.jobDetails, bonusSkills: e.target.value } })}></textarea>
          </div>
        </div>
        <hr className="hr" />
        <label className="label">Compensation <span className="required">(required)</span></label>
        <div className="columns">

          <div className="field column is-3">
            <label className="label">Currency <span className="required">(required)</span></label>
            <div className="control" style={{ minWidth: "100%" }}>
              <div className={currencyError ? "select is-normal is-danger" : "select is-normal"} style={{ minWidth: "100%" }}>
                <select style={{ minWidth: "100%" }}
                  onChange={(e) => setJob({ ...job, currency: e.target.value })}
                  value={job.currency}>
                  <option value={null}>Select a currency</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
              {currencyError && (
                <span className="error-text has-text-danger">
                  Please select a currency from the dropdown
            </span>
              )}
            </div>
          </div>
          <div className="field column is-3">
            <label className="label">Min salary <span className="required">(required)</span></label>
            <div className="control">
              <input className={minSalaryError ? "input is-danger" : "input"} type="number" value={job.minSalary} onChange={(e) => setJob({ ...job, minSalary: e.target.value })} />
            </div>
            {minSalaryError && (
              <span className="error-text has-text-danger">
                Please enter a minimum salary
            </span>
            )}
          </div>
        </div>

        <div className="columns">

          <div className="field column">
            <label className="label">Select interview date <span className="required">(required)</span></label>
            <div className="control" style={{ minWidth: "100%" }}>
              <input className={dateError ? "input is-danger" : "input"} type="date" value={job.date} onChange={(e) => setJob({ ...job, date: e.target.value })} />
              {dateError && (
                <span className="error-text has-text-danger has-text-light">
                  Select a date
            </span>
              )}
            </div>
          </div>
          <div className="field column">
            <label className="label">Select an interview time <span className="required">(required)</span></label>
            <div className="control" style={{ minWidth: "100%" }}>
              <input className={timeError ? "input is-danger" : "input"} type="time" value={job.time} onChange={(e) => setJob({ ...job, time: e.target.value })} />
              {timeError && (
                <span className="error-text has-text-danger has-text-light">
                  Select a time
            </span>
              )}
            </div>
          </div>
        </div>
      </form>
      <button className="button is-primary back-button" onClick={() => setPage(page - 1)}
      style={{backgroundColor: "#03071e", fontSize: ".9rem"}}>Go back</button>
      <button className="button is-primary next-button" onClick={(e) => nextPage(e)}
      style={{backgroundColor: "#03071e", fontSize: ".9rem"}}>Next</button>
    </div>
  )
};

export default PageTwo;