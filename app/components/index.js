import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import AllCampuses from './Campus/allcampuses';
import Campus from './Campus/campus';
import AllStudents from './Students/allstudents';
import Student from './Students/student';
import CampusForm from './Campus/campusForm';

import { fetchCampuses } from '../reducers/campusReducer';
import { fetchStudents } from '../reducers/studentReducer';
import { StudentForm } from './Students/studentForm';

class Index extends Component {
  componentDidMount() {
		this.props.fetchInitialData();
	}

  render() {
    return (
      <BrowserRouter>
      <div>
      <Header />
        <Switch>
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/campuses/add" component={CampusForm} />
          <Route exact path="/campuses/:campusId" component={Campus} />
          <Route exact path="/campuses/:campusId/edit" component={CampusForm} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/students/:studentId" component={Student} />
          <Route exact path="/students/:studentId/edit" component={StudentForm} />
          </Switch>
      </div>
      </BrowserRouter>
    )
  }
}


//CONTAINER
const mapState = ()=> ({});
const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }
});

export default connect(mapState, mapDispatch)(Index);
