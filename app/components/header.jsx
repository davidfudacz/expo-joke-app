import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <header>
        <NavLink to="/" id='home'>Home</NavLink>
        <div id='all'>
          <NavLink to="/campuses" id='allcampuses'>Campuses</NavLink>
          <NavLink to="/students" id='allstudents'>Students</NavLink>
        </div>
      </header>
    )
  }
}
