import React from 'react';
import './workExperience.scss';

const CreateForm = ({newWorkExp, setNewWorkExp, error }) => {
  return (
    <div className="form create-form">
      {error && (    
        <p className="subtitle has-text-danger">
          Please fill in all values
        </p>
      )}
      <div className="field my-5">
        <label className="label">Company Name</label>
        <label className="label label-subtitle">Concise and clear, name the role. Omit location or job type.</label>
        <div className="control">
          <input 
            className="input"
            type="text"
          placeholder="e.g. Facebook, Spotify etc."
            value={newWorkExp.companyName}
            onChange={(e) => setNewWorkExp({...newWorkExp, companyName: e.target.value})} required/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">Job Title</label>
        <div className="control">
          <input className="input" type="text"
          placeholder="Job title at the company"
          value={newWorkExp.jobTitle}
          onChange={(e) => setNewWorkExp({...newWorkExp, jobTitle: e.target.value})} required/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">A short description of your role</label>
        <div className="control">
          <textarea className="textarea" type="text"
          placeholder="Short description of your role at this company" 
            value={newWorkExp.shortDesc}
            onChange={(e) => setNewWorkExp({...newWorkExp, shortDesc: e.target.value})} required/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">From</label>
        <div className="control">
          <input className="input" type="date"
            value={newWorkExp.started}
            onChange={(e) => setNewWorkExp({...newWorkExp, started: e.target.value})} required/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">Till</label>
        <div className="control">
          <input className="input" type="date"
            value={newWorkExp.ended}
            onChange={(e) => setNewWorkExp({...newWorkExp, ended: e.target.value})} required/>
        </div>
      </div>
    </div>
  )
}

export default CreateForm;