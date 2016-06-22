import React from 'react'
import { Link } from 'react-router'

const User = ({ id, phone_number, first_name, last_name, deleteUser }) => (
  <li>
    <div className="card white-grey">
      <div className="card-content blue-text">
        <span className="card-title">{name}</span>
        <table className="table">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
          </thead>
          <tbody>
            <tr>
              <td>{first_name}</td>
              <td>{last_name}</td>gi
              <td>{phone_number}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-action">
        <Link to={`/users/${id}`}>Show</Link>
        <a onClick={() => deleteUser(id)} href="#">Delete</a>
      </div>
    </div>
  </li>
)

export default User
