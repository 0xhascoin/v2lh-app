import React from 'react';
import '../WorkExperience/workExperience.scss';

const CreateForm = ({setNewEdu, newEdu, error}) => {
  return (
    <div className="form create-form">
      {error && (    
        <p className="subtitle has-text-danger">
          Please fill in all values
        </p>
      )}
      <div className="field my-5">
        <label className="label">Course / Degree</label>
        <div className="control">
          <input className="input" type="text"
            value={newEdu.companyName}
            onChange={(e) => setNewEdu({...newEdu, course: e.target.value})}/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">School / University</label>
        <div className="control">
          <input className="input" type="text"
          value={newEdu.jobTitle}
          onChange={(e) => setNewEdu({...newEdu, university: e.target.value})}/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">From</label>
        <div className="control">
          <input className="input" type="date"
            value={newEdu.from}
            onChange={(e) => setNewEdu({...newEdu, from: e.target.value})}/>
        </div>
      </div>
      <div className="field my-5">
        <label className="label">Till</label>
        <div className="control">
          <input className="input" type="date"
            value={newEdu.till}
            onChange={(e) => setNewEdu({...newEdu, till: e.target.value})}/>
        </div>
      </div>
    </div>
  )
}

export default CreateForm;