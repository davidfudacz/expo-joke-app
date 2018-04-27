import axios from 'axios';


//ACTION TYPES
const INITIALIZE_STUDENT = 'INITIALIZE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const REMOVE_CAMPUSID = 'UPDATE_CAMPUSID';

//ACTION CREATORS
const initialize = students => ({ type: INITIALIZE_STUDENT, students });
const create = student   => ({ type: CREATE_STUDENT, student });
const remove = id      => ({ type: REMOVE_STUDENT, id });
const update = student   => ({ type: UPDATE_STUDENT, student });
const removeCampusId = id    => ({ type: REMOVE_CAMPUSID, id })

//STATE
const initialState = {
  statefulStudents: {},
}

//REDUCER
export default function reducer (students = [], action) {
  switch(action.type) {
    case INITIALIZE_STUDENT:
      return action.students;

      case CREATE_STUDENT:
      return [action.student, ...students];

      case REMOVE_STUDENT:
      return students.filter( student => student.id !== action.id );

      case UPDATE_STUDENT:
      return students.map( student => (
        action.student.id === student.id ? action.student : student
      ));

      case REMOVE_CAMPUSID:
      return students.map( student => (
        action.student.id === student.id ? action.student : student
      ))

    default: return students
  }
}

//THUNK
export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
       .then(res => dispatch(initialize(res.data)))
       .catch(err => console.error('Fetching students unsuccessful', err));
};

export const createStudent = student => dispatch => {
  axios.post('/api/students', student)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error('creating student was unsuccessful', err));
};

export const removeStudent = id => dispatch => {
  axios.delete(`/api/students/${id}`)
    .then(res => dispatch(remove(id)))
    .catch(err => console.error('removing student was unsuccesful', err))
};

export const updateStudent = (id, student) => dispatch => {
  axios.put(`/api/students/${id}/edit`, student)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error('updating student was unsuccessful', err))
};

