import React, { Component } from 'react';
import store from '../index';
import { createStudent, removeStudent } from '../../reducers/studentReducer'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


export class AllStudents extends Component {
  constructor(props) {
    super(props)

    this.renderAddStudentWidget=this.renderAddStudentWidget.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
  }


  render() {
    const { students, campus, createStudent, removeStudent } = this.props
    return(
    <div>
      <h1>All Students</h1>

      <div className="main">
      <div className="box">
      { this.renderAddStudentWidget() }
      </div>
      {students[0] ? students.map(student =>
        (
        <div key={student.id} className="box">
          <img src={student.image} />
          <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
          <h3>{student.location}</h3>
          <div className="bottom">
          <NavLink className="button" to={`/students/${student.id}/edit`}>edit</NavLink>

          <button
            className="button"
              onClick={ () => removeStudent(student.id)}>
              delete
            </button>
          </div>
      </div>
      )
        ) : <div />}
      </div>
    </div>)
      }


  renderAddStudentWidget() {
    return (
      <form onSubmit={this.onSubmit} className="list-group-item student-item">
      <h2>Add a Student</h2>

        <ul className="list-inline">
          <li>
            <input
              name="name"
              type="text"
              className="form-like large-font"
              placeholder="student name here"
            />
          </li>
          <li>
          <input
          name="GPA"
          type="text"
          className="form-like large-font"
          placeholder="GPA"
        />
          </li>
          <li>
          <input
          name="image"
          type="text"
          className="form-like large-font"
          placeholder="image Url"
        />
          </li>
        </ul>
        <button
            type="submit"
            className="btn btn-warning btn-xs pull-right">
            Add Student
         </button>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { createStudent } = this.props;
    const { name, GPA, image } = event.target;
    const newStudent = {
      name: name.value,
      GPA: GPA.value,
      image: image.value,
    };

    createStudent(newStudent);
    name.value =''
    GPA.value=''
    image.value=''
  }
}

//CONTAINER
const mapState = ({ campuses, students }) => ({ campuses, students });
const mapDispatch = { createStudent, removeStudent};
export default connect(mapState, mapDispatch)(AllStudents);



