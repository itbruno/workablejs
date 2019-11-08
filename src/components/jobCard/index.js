import React, { Component } from 'react';
import iconPin from '../../assets/images/icons/pin-location.svg';
import iconBriefcase from '../../assets/images/icons/briefcase.svg';

class JobCard extends Component {
    render() {
        return (
            <div className="jobCard">
                <h2 className="jobCard-title">{ this.props.title }</h2>
                
                <ul className="jobCard-features">
                    <li>
                        <img src={iconBriefcase} alt="Department icon" height="18" />
                        { this.props.department == null ? 'Não especificado' : this.props.department }
                    </li>
                    <li>
                        <img src={iconPin} alt="Location icon" height="18" />
                        { `${ this.props.location } - ${ this.props.country }` }
                    </li>
                </ul>

                <div className="jobCard-actions">
                    <a className="btn" href={`/jobs/view/${this.props.link}`}>More details</a>
                </div>
            </div>
        )
    }
}

export default JobCard;