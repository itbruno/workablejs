import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import JobCard from '../../components/jobCard';

import HeaderNav from '../../components/partials/HeaderNav';
import iconBriefcase from '../../assets/images/icons/briefcase.svg';
import iconLocation from '../../assets/images/icons/pin-location.svg';

class ViewJob extends Component {

    state = {
        id: this.props.match.params.id,
        job: {},
        jobLocation: {},
        fail: false,
        loadingData: true,
        relatedJobs: []
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        await api.get(`/jobs/view/${this.state.id}`)
            .then(res => {
                this.setState({ job: res.data, jobLocation: res.data.location });
                this.setState({ loadingData: false });
            })
            .catch(err => {this.setState({ fail: true });  console.error(err); });

            this.getRelatedJobs();
    }

    getRelatedJobs() {
        const lcJobs = window.localStorage.getItem('jobs');
        
        if(lcJobs) {
            const lcJobsParsed = JSON.parse(lcJobs);
            const currentJob = this.state.job;
            
            const relatedJobs = lcJobsParsed.filter( e => {
                return e.id != currentJob.id && e.department === currentJob.department
            });
            
            this.setState({ relatedJobs: relatedJobs.slice(0,3) });
        }
    }

    render() {
        const { 
            job, 
            jobLocation,
            loadingData,
            relatedJobs } = this.state;
        
        return(
            <>
                <Helmet>
                    <title>{ `${job.full_title} | WorkableJS` || 'aa' }</title>
                    <link rel="canonical" href={job.url} />
                </Helmet>

                <header id="header" className="reset-bg">
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

                <div id="related-jobs">
                    <div className="container">
                        <h2>Related jobs</h2>
                        <div id="jobsList">
                            {
                                relatedJobs.map(e => (
                                    <JobCard 
                                        key={ e.id }
                                        title={e.title}
                                        department={e.department}
                                        location={e.location.region}
                                        country={e.location.country_code}
                                        link={e.shortcode}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ViewJob;