import React, { Component } from 'react';
import store from '../index';
import { createCampus, removeCampus } from '../../reducers/campusReducer'
import { connect } from 'react-redux';
// import campusNode from './campusNode';
import { NavLink } from 'react-router-dom';


export class AllCampuses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: {}
    };
    // this.renderNewUserWidget=this.renderNewUserWidget.bind(this)
    this.renderAddCampusWidget=this.renderAddCampusWidget.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount () {
  //   this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  // }

  // componentWillUnmount () {
  //   this.unsubscribe();
  // }

  render() {
    const { campuses, createCampus, removeCampus } = this.props
    return(
    <View>
      <Text>All Campuses</Text>

      <View className="main">
      <View className="box">
      { this.renderAddCampusWidget() }
      </View>
      {campuses[0] ? campuses.map(campus =>
        (
        <View key={campus.id} className="box">
          <Image src={campus.image} />
          <NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink>
          <h3>{campus.location}</h3>
          <View className="bottom">
          <NavLink className="button" to={`/campuses/${campus.id}/edit`}>edit</NavLink>

          <button
            className="button"
              onClick={ () => removeCampus(campus.id)}>
              delete
            </button>
          </View>
      </View>
      )
        ) : <View />}
      </View>
    </View>)
  }

renderAddCampusWidget() {
    return (
      <form onSubmit={this.onSubmit} className="list-group-item campus-item">
      <h2>Add a Campus</h2>

        <ul className="list-inline">
          <li>
            <input
              name="campus"
              type="text"
              className="form-like large-font"
              placeholder="campus name here"
            />
          </li>
          <li>
          <input
          name="description"
          type="text"
          className="form-like large-font"
          placeholder="description"
        />
          </li>
          <li>
          <input
          name="location"
          type="text"
          className="form-like large-font"
          placeholder="location"
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
            Add Campus
         </button>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { createCampus } = this.props;
    const { campus, location, description, image } = event.target;
    const newCampus = {
      name: campus.value,
      description: description.value,
      location: location.value,
      image: image.value,
    };

    createCampus(newCampus);
    campus.value =''
    description.value=''
    location.value=''
    image.value=''
  }
}

//CONTAINER
const mapState = ({ campuses, students }) => ({ campuses, students });
const mapDispatch = { createCampus, removeCampus};
export default connect(mapState, mapDispatch)(AllCampuses);
