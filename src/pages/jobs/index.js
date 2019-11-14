import React, { Component } from 'react';

import List from '../../components/jobs/list';
import JobsFilter from "../../components/jobs/filter";
import api from '../../services/api';
import HeaderNav from '../../components/partials/HeaderNav';

import heroImage from '../../assets/images/hero-image.png';

class Jobs extends Component {
    state = {
        companyData: {}
    }
  
    componentDidMount() {
        this.companyInfo();
    }

    companyInfo = async () => {
        const companyData = await api.get('/company').then(res => res.data).catch(err => err);
        this.setState({ companyData });
    }

    render() {
        
        return (
            <>
                <header id="header" className="page-home">
                    <div className="container">
                        <HeaderNav type="light"/>
                    </div>

                    <div className="container">
                        
                        <h1 className="hero-title">Work at <strong className="block">MyCompany</strong></h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit praesentium similique beatae.
                        </p>

                        <a href="#jobsFilter" className="mouse hidden-sm"></a>

                        <img src={heroImage} alt="resume illustration" className="hero-image"/>
                    </div>
                </header>

                <div className="container">
                    <JobsFilter />
                </div>

                <List />
            </>
        )
    }
}

export default Jobs;