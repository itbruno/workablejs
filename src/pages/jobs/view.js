import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import HeaderNav from '../../components/partials/HeaderNav';
import iconBriefcase from '../../assets/images/icons/briefcase.svg';
import iconLocation from '../../assets/images/icons/pin-location.svg';

class ViewJob extends Component {

    state = {
        id: this.props.match.params.id,
        job: {},
        jobLocation: {},
        fail: false,
        loadingData: true
    }

    async componentDidMount() {
        await api.get(`/jobs/view/${this.state.id}`)
            .then(res => {
                this.setState({ job: res.data, jobLocation: res.data.location });
                this.setState({ loadingData: false })
            })
            .catch(err => this.setState({ fail: true }));
    }

    render() {
        const { job } = this.state;
        const { jobLocation } = this.state;
        const { loadingData } = this.state;

        return(
            <>
                <Helmet>
                    <title>{ `${job.full_title} | WorkableJS` || 'aa' }</title>
                    <link rel="canonical" href={job.url} />
                    
                </Helmet>
                <header id="header" class="reset-bg">
                    <div className="container">
                        <HeaderNav />
                        <h1 data-loading={loadingData} className="h1-medium">{ job.full_title }</h1>
                        <ul className="horizontal-features list-unstyled">
                            <li>
                                <img src={iconBriefcase} width="20" alt="icon department"/>
                                <span data-loading={loadingData}>
                                    { job.department !== null ? job.department : 'Não especificado' }
                                </span>
                            </li>
                            <li>
                                <img src={iconLocation} width="20" alt="icon department"/>
                                <span data-loading={loadingData}>{jobLocation.region} - {jobLocation.country_code}</span>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="container">
                    <div className="content">
                        <div className="job-view">
                            <h3>Description:</h3>
                            <div data-loading={loadingData} dangerouslySetInnerHTML={ {__html: job.description} } />
                            
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>
                            <span data-loading={loadingData} className="full-data"></span>

                            <br/>
                            <Link to="/" className="btn btn-default btn-small has-shadow">voltar</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ViewJob;