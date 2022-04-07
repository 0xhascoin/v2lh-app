import React, {useEffect} from 'react';
import '../PageThree/pageThree.scss';
import { useDispatch, useSelector } from "react-redux";
import {getAllInterviews} from '../../../actions/interviewActions';

const SuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get all interviews using dispatch
    dispatch(getAllInterviews());
  },[dispatch]);

  return (
    <div className="page-three">
      <form className="form">
        <i className="far fa-check-circle"
        style={{fontSize: '30px', color: '#2a9d8f'}}></i>
        <div className="field" style={{marginTop: "15px"}}>
          <label className="label">Successfully created</label>
        </div>

      </form>
    </div>
  )
};

export default SuccessPage;