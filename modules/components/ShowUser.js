import React from 'react'
import { BASE_URL } from './constants'
import $ from 'jquery'
import { Link } from 'react-router'

class ShowUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { first_name: '', last_name: '', phone_number: 0 },
      edit: false
    }
  }

  componentWillMount() {
    let id = this.props.params.id
    $.ajax({
      url: `${BASE_URL}/users/${id}`,
      type: 'GET'
    }).done( user => {
      this.setState({ user })
    })
  }

  show() {
    let user = this.state.user
    return(
      <div className="container row">
        <h3 className="col m6">First Name:</h3>
        <h3 className="col m3">{user.first_name}</h3>
        <h3 className="col m6">Last Name:</h3>
        <h3 className="col m3">{user.last_name}</h3>
        <h3 className="col m6">Phone:</h3>
        <h3 className="col m3">{user.phone_number}</h3>
        <div classname="center">
        <Link to="/">Back</Link>
          <button className="btn-floating waves-effect waves right blue" onClick={this.toggleEdit.bind(this)}>Edit</button>
        </div>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    let first_name = this.refs.first_name.value
    let last_name = this.refs.last_name.value
    let phone_number = this.refs.phone_number.value
    $.ajax({
      url: `${BASE_URL}/users/${this.state.user.id}`,
      type: 'PUT',
      data: { user: { first_name, last_name, phone_number } }
    }).done( user => {
      this.setState({ user, edit: false })
    })

  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit })
  }

  edit() {
    let user = this.state.user
    return(
      <form className="container" ref="editUser" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="first_name" placeholder="first_name" required={true} defaultValue={user.first_name} />
        <input ref="last_name" placeholder="last_name" defaultValue={user.last_name} />
        <input ref="phone_number" type="number" placeholder="phone_number" defaultValue={user.phone_number} />
        <button type="button" className="btn-floating waves-effect waves blue" onClick={this.toggleEdit.bind(this)}>x</button>
        <button type="submit" className="btn-floating waves-effect waves red">Save</button>
      </form>
    )
  }

  render() {
    if (this.state.edit)
      return this.edit()
    else
      return this.show()
  }

}

export default ShowUser
