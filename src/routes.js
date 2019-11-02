import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Jobs from './pages/jobs';
import ViewJob from './pages/jobs/view';

class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Route exact path="/" component={Jobs}></Route>
                <Route path="/jobs/view/:id" component={ViewJob}></Route>
            </BrowserRouter>
        )
    }
}

export default Routes;