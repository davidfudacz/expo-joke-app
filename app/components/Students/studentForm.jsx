import React, { Component } from 'react';
import store from '../index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateStudent, removeStudent} from '../../reducers/studentReducer';

class StudentForm extends Component {
  constructor(props) {
  super(props)
  this.state= {
    student: 0,
  }
}
  // this.onSubmit = this.onSubmit.bind(this);
  // this.onSubmitForStudents = this.onSubmitForStudents.bind(this);
  // this.onSubmitRemoveStudents = this.onSubmitRemoveStudents.bind(this);

  // this.addStudent = this.addStudent.bind(this);
  // this.handler =this.handler.bind(this)
  // this.removeHandler = this.removeHandler.bind(this)


  render() {
    const { student } = this.props;
    console.log(student)
    return( <div>{ student ? (
      <div>
      <form onSubmit={this.onSubmit} className="list-group-item student-item">
      <h1><input
      name="student"
      type="text"
      className="form-like large-font"
      defaultValue={student.name}
    /></h1>
      <img src={student.image} />
      <input
          name="image"
          type="text"
          className="form-like large-font"
          defaultValue={student.image}
        />
      <h2><input
      name="description"
      type="text"
      className="form-like large-font"
      defaultValue={student.description}
    /></h2>
      <h3><input
      name="location"
      type="text"
      className="form-like large-font"
      defaultValue={student.location}
    /></h3>
    <button
    type="submit"
    className="button">
    Update student
 </button>
 </form>
 <button
 className="button"
   onClick={ () => removeStudent(student.id)}>
   Delete
 </button>
 <NavLink className="button"
 to={`/studentes/${student.id}`}>Done</NavLink>

      <div className="studentbar">
        <h2>Students on student</h2>
        {this.addStudent()}
      </div>
      <div className="main">
      </div>
      </div>
    ) :'...Loading'}
    {student ? student.filter((student)=> student.studentId == student.id)
      .map((student) =>
      ( <div className="box" key={student.id}>
          <img src={student.image} />
          <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
          <button className="button"
            onClick={ () => this.onSubmitRemoveStudents(student.id)}>
            Remove Student
            </button>
        </div>
      )
    ): '...Loading'
  }
    </div>)
  }

  handler(event) {
    event.preventDefault();
    this.state.student = event.target.value;
  }

  removeHandler(event) {
    // event.preventDefault();
    this.state.removeStudent = event;
  }

  addStudent(){
    const {campus, students} = this.props
    return(
      <form onSubmit={this.onSubmitForStudents}>
      <select onChange={this.handler}>
      {students ? students.filter((student)=> student.campusId !== campus.id)
        .map((student) =>
        ( <option value={student.id} key={student.id}>
          {student.name}</option>
        )
      ): '...Loading'
    }
    </select>
    <button
    type="submit"
    className="button">
    Add Student
    </button>
      </form>
    )
  }

  onSubmit(event) {
    event.preventDefault();
    const { updateCampus } = this.props;
    const { campus, location, description, image } = event.target;

    const newCampus = {
      name: campus.value,
      description: description.value,
      location: location.value,
      image: image.value,
    };
    updateCampus(this.props.campus.id, newCampus);
  }


onSubmitForStudents(event) {
  event.preventDefault();
  const { updateStudent , students, campus } = this.props;
  const studentId = this.state.student
  const thisStudent = students.filter((student)=> student.id == studentId);
  thisStudent[0].campusId = campus.id;
  updateStudent(studentId, thisStudent[0]);
}

onSubmitRemoveStudents(id) {
  event.preventDefault();
  const { updateStudent , students } = this.props;
  const thisStudent = students.filter((student)=> student.id == id);
  thisStudent[0].campusId = null;
  updateStudent(id, thisStudent[0]);
}
}


const mapState = ({ campuses, students }, ownProps) => {
  const studentId = Number(ownProps.match.params.id);
    return {
      student: students.find(student=> student.id === studentId), campuses, students
      }
    }

const mapDispatch = { updateStudent, removeStudent };
export default connect(mapState, mapDispatch)(StudentForm);
