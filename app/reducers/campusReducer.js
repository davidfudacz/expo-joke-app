import axios from 'axios';


//ACTION TYPES
const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';

//ACTION CREATORS
const init = campuses => ({ type: INITIALIZE_CAMPUSES, campuses });
const create = campus   => ({ type: CREATE_CAMPUS, campus });
const remove = id      => ({ type: REMOVE_CAMPUS, id });
const update = campus   => ({ type: UPDATE_CAMPUS, campus });

//STATE
// const initialState = {
//   statefulCampuses: {},
//   campus: {},
//   newCampus: '',
// }

//REDUCER
export default function reducer(campuses = [], action) {
  switch(action.type) {

    case INITIALIZE_CAMPUSES:
      return action.campuses;

      case CREATE_CAMPUS:
      return [ action.campus, ...campuses ];

      case REMOVE_CAMPUS:
      return campuses.filter( campus => campus.id !== action.id );

      case UPDATE_CAMPUS:
      return campuses.map( campus => (
        action.campus.id === campus.id ? action.campus : campus
      ));

    default: return campuses
  }
}

//THUNK
export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error('Fetching campuses unsuccessful', err));
};

export const createCampus = campus => dispatch => {
  axios.post('/api/campuses', campus)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error('creating campus was unsuccessful', err));
};

export const removeCampus = id => dispatch => {
  axios.delete(`/api/campuses/${id}`)
    .then(res => dispatch(remove(id)))
    .catch(err => console.error('removing campus was unsuccesful', err))
};

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/campuses/${id}/edit`, campus)
    .then(res =>{
      dispatch(update(res.data))})
    .catch(err => console.error('updating campus was unsuccessful', err))
};
