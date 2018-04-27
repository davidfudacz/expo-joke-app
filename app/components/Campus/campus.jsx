import React, { Component } from 'react';
import store from '../index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createCampus } from '../../reducers/campusReducer'

class Campus extends Component {
  constructor(props) {
  super(props)
  this.state = {
    campuses: {}
  };
}

  render() {
    console.log(this.props)
    const {campus, students} = this.props
    return( <div>{ campus ? (
      <div>
      <h1>{campus.name}</h1>
      <img src={campus.image} />
      <h2>{campus.description}</h2>
      <h3>{campus.location}</h3>

      <NavLink to={`/campuses/${campus.id}/edit`}>edit</NavLink>
      <div className="studentbar">
        <h2>Students on campus</h2>
        <NavLink to={`/campuses/${campus.id}/edit`}>Add Student</NavLink>
      </div>
      <div className="main">
      </div>
      </div>
    ) :'...Loading'}
    {students ? students.filter((student)=> student.campusId == campus.id)
      .map((student) =>
      ( <div className="box" key={student.id}>
          <img src={student.image} />
          <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
        </div>
      )
    ): '...Loading'
  }
    </div>)
  }
}


const mapState = ({ campuses, students }, ownProps) => {
  const campusId = Number(ownProps.match.params.campusId);
    return {
      campus: campuses.find(campus=> campus.id === campusId), campuses, students
      }
    }

const mapDispatch = { createCampus };
export default connect(mapState, mapDispatch)(Campus);
