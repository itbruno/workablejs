import React, { Component } from 'react';
import api from '../../services/api';
import JobCard from '../../components/jobCard';
import notFoundIcon from '../../assets/images/icons/not-found.svg';

class List extends Component {
    state = {
        jobs: [],
        allJobs: [],
        notFound: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        var lcJobs = window.localStorage.getItem('jobs');

        if(lcJobs) {
            var lcJobsParsed = JSON.parse(lcJobs);
            this.setState({ jobs: lcJobsParsed, allJobs: lcJobsParsed })
        } else {
            this.getList();
        }
        
        const btnFilter = document.getElementById('jobsfilter-submit');

        btnFilter.onclick = () => this.filter();
    }

    getList = async () => {
        const jobs = await api.get('/jobs/published').then(res => res.data);
        this.setState({ jobs, allJobs: jobs })

        window.localStorage.setItem('jobs', JSON.stringify(jobs));
    }

    filter = () => {
        const getLocation = document.getElementById('jobsfilter-locations').value;
        const getDepartment = document.getElementById('jobsfilter-departments').value;
        
        const filtered = this.state.allJobs.filter(e => {
            this.setState({ notFound: false }); 
            
            if(getLocation !== '' && getDepartment !== '') {
                return e.location.country_code === getLocation && e.department === getDepartment;
            } else if(getDepartment  !== '') {
                return e.department === getDepartment;
            } else if(getLocation  !== '') {
                return e.location.country_code === getLocation;
            } else {
                return e;
            }
        });
        
        if(filtered.length === 0) {
            this.setState({ notFound: true })
        }

        this.setState({ jobs: filtered });
    }

    render() {
        const { jobs, notFound } = this.state;
        const result = notFound ? '' : 'hide'; 

        return (
            <>
            <div className={`container result-not-found ${result}`}>
                <img src={notFoundIcon} alt="Result not found" height="120" />
                <h2>Nenhuma vaga encontrada para o filtro!</h2>
                <p>Não desista, continue sua busca!</p>
            </div>
            <div className="container">
                <div id="jobsList" className="padding-md">
                    {jobs.map((j) => (
                        <JobCard 
                            key={ j.id }
                            title={j.title}
                            department={j.department}
                            location={j.location.region}
                            country={j.location.country_code}
                            link={j.shortcode}
                        />
                        )
                    )}
                </div>
            </div>
            </>
        )
    }
}

export default List;