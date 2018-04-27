import React, { Component } from 'react';
import store from '../index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createStudent } from '../../reducers/studentReducer'

class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: {}
    };
  }

  render() {
    const {campus, student} = this.props;

    return(<div>
      { student ? (
      <div>
      <h1>{student.name}</h1>
      <img src={student.image} />
      <h2>{student.description}</h2>
      <h3>{student.location}</h3>

      <NavLink to={`/students/${student.id}/edit`}>edit</NavLink>
    </div>)
    : (<div>Loading</div>)
  }
    </div>)
}
}


const mapState = ({ campuses, students }, ownProps) => {
  const studentId = Number(ownProps.match.params.studentId);
    return {
      student: students.find(student=> student.id === studentId), campuses, students}
    }

const mapDispatch = { createStudent };
export default connect(mapState, mapDispatch)(Student);
