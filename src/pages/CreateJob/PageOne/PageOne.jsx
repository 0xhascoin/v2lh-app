import React, { useState } from 'react';
import './pageOne.scss';

const PageOne = ({ page, setPage, job, setJob }) => {
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyDescError, setCompanyDescError] = useState(false);

  const nextPage = (e) => {
    e.preventDefault();

    if (job.companyName.length < 3) {
      setCompanyNameError(true);
      console.log("Company Name INVALID", companyNameError);
    } else {
      setCompanyNameError(false);
      console.log("Company Name VALID", companyNameError)

      if (job.companyDescription.length < 100) {
        setCompanyDescError(true);
        console.log("Company description INVALID", companyDescError);
        console.log(companyDescError);
      } else {
        setCompanyDescError(false);
        console.log("Company description VALID", companyDescError);
        setPage(page+1);
      }

    }
  };

  return (
    <div className="page-one has-text-left">
      <h1 className="page-one-title">Company details</h1>
      <form className="form">
        <p className="page-one-subtitle">Fill the form below and let us know about your company. This information is required before posting a new job.
        </p>
        <div className="field my-5">
          <label className="label">Company name</label>
          {companyNameError && (
            <span className="error-text has-text-danger has-text-light">
              Company Name must be more than 3 characters
            </span>
          )}
          <div className="control">
            <input className={companyNameError ? "input is-danger" : "input"} type="text" placeholder="Your company name" value={job.companyName}
              onChange={(e) => setJob({ ...job, companyName: e.target.value })} />
          </div>
        </div>
        <div className="field my-3">
          <label className="label">Company logo</label>
          {/*
          <div class="control">
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Upload logo
                  </span>
                </span>
              </label>
            </div>
          </div>
          */}
          <div className="control">
            <input className="input" type="text" placeholder="Logo url" value={job.companyLogo}
              onChange={(e) => setJob({ ...job, companyLogo: e.target.value })} />
          </div>
        </div>
        <div className="field my-5">
          <label className="label">Company Description</label>
          {companyDescError && (
            <span className="error-text has-text-danger">
              Company description must be more than 100 characters
            </span>
          )}
          <div className="control">
            <textarea className={companyDescError ? "textarea is-danger" : "textarea"} placeholder="Company description" rows="10" value={job.companyDescription}
              onChange={(e) => setJob({ ...job, companyDescription: e.target.value })}></textarea>
          </div>
        </div>
        <div className="field has-text-centered">
          <button className="button is-primary next-button" onClick={(e) => nextPage(e)}>Next -></button>
        </div>
      </form>
    </div>
  )
};

export default PageOne;