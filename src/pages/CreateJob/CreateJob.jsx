import React, {useState, useEffect} from 'react';
import './createJob.scss';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "../../components/Navbar/Navbar";
import PageOne from './PageOne/PageOne';
import PageTwo from './PageTwo/PageTwo';
import PageThree from './PageThree/PageThree';
import SuccessPage from './SuccessPage/SuccessPage';

const CreateJob = () => {
  const [page, setPage] = useState(1);
  const [job, setJob] = useState({
    companyName: "",
    companyLogo: "",
    companyDescription: "",
    jobTitle: "",
    jobLength: "",
    jobLevel: "",
    jobDescription: "",
    jobDetails: {
      responsibilities: "",
      requirements: "",
      bonusSkills: ""
    },
    currency: "",
    minSalary: "",
    date: "",
    time: ""
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if(!userInfo || userInfo.userType.toLowerCase() != "employer") {
    //   history.push("/")
    // }
    if(!userInfo) {
      history.push("/login")
    } else if(userInfo?.userType.toLowerCase() != "employer") {
      history.push("/");
    }
  }, []);
  return (
    <>
    <Navbar />
    <div className="column">
      <div className="create-job has-text-centered">
        <h1 className="title">Create job listing</h1>
        <p className="subtitle">Quick, simple and easy!</p>

        <div className="steps-content">
          {page == 1 && <PageOne page={page} setPage={setPage} job={job} setJob={setJob} />}
          {page == 2 && <PageTwo page={page} setPage={setPage} job={job} setJob={setJob} />}
          {page == 3 && <PageThree page={page} setPage={setPage} job={job} setJob={setJob} />}

          {page == 4 && <SuccessPage page={page} setPage={setPage} />}

        </div>
      </div>
    </div>
    </>
  )
}

export default CreateJob;