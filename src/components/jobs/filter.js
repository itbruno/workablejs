import React, { Component } from 'react';
import api from '../../services/api';
import iconDepartment from '../../assets/images/icons/briefcase.svg';
import iconPin from '../../assets/images/icons/pin.svg';
import '../../assets/css/components/jobs-filter.css';

class JobsFilter extends Component {
    state = {
        locations: [],
        departments: [],
        activeLocation: null,
        ativeDeparment: null
    }

    componentDidMount() {
        this.getDepartments();
        this.getLocations();
    }

    // Get all locations from company
    getLocations = async () => {
        const locations = await api.get('/jobs/locations').then(res => res.data);

        this.setState({ locations });
    }
    
    // Get all Deparments from company
    getDepartments = async () => {
        const departments = await api.get('/jobs/departments').then(res => res.data);

        this.setState({ departments });
    }

    render() {
        const locations = this.state.locations;
        const departments  = this.state.departments;

        return(
            <div id="jobsFilter" className="has-shadow">
                <div className="filter-field">
                    <label htmlFor="jobs-locations">
                    <img src={iconPin} alt="icon-pin-map" height="24" /> Location
                    </label>
                    <select name="jobs-locations" id="jobsfilter-locations">
                        <option value="">All locations</option>
                        { 
                            locations.map(el => (
                                <option key={el.code} value={el.code}>{ el.name }</option>
                            ))
                        }
                    </select>
                </div>
                    
                <div className="filter-field">
                    <label htmlFor="jobs-locations">
                        <img src={iconDepartment} alt="icon-department" height="24" /> Department
                    </label>
                    <select name="jobs-departments" id="jobsfilter-departments">
                        <option value="">All departments</option>
                        { 
                            departments.map(el => (
                                <option key={el.name} value={el.name}>{ el.name }</option>
                            ))
                        }
                    </select>
                    </div>

                <button id="jobsfilter-submit" className="btn btn-primary">Filter jobs</button>
            </div>
        )
    }
}

export default JobsFilter;