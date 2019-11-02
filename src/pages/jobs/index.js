import React, { Component } from 'react';
import List from '../../components/jobs/list';
import JobsFilter from "../../components/jobs/filter";
import api from '../../services/api';
import HeaderNav from '../../components/partials/HeaderNav';
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
                        <HeaderNav />
                        

                        <h1>Work at <strong>MyCompany</strong></h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit praesentium similique beatae.
                        </p>

                        <div className="header-filter">
                            <JobsFilter />
                        </div>
                    </div>
                </header>

                <List />
            </>
        )
    }
}

export default Jobs;