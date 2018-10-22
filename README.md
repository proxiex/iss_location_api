# ISS Location API
[![Build Status](https://travis-ci.org/proxiex/iss_location_api.svg?branch=develop)](https://travis-ci.org/proxiex/iss_location_api)
[![Coverage Status](https://coveralls.io/repos/github/proxiex/iss_location_api/badge.svg?branch=develop)](https://coveralls.io/github/proxiex/iss_location_api?branch=develop)

An API that shows the current location of the International Space Station. The number of people in space at any given moment

## App's Location https://iss-location-api.herokuapp.com/

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Back-end: Node.js, Express.js </li>
  <li>Database: MongoDB</li>
</ul>

<h3>Usage</h3>
<ul>
    <li>Clone or download the repo</li>
    <li>npm install - to install the dependencies needed by the app</li>
    <li>create a .env file, insert data as seen in .env.example file</li>
    <li>npm start - to run the app</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
      <th>Response Data</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Create a new user</td>
      <td>
      {<br>
          username: 'string',<br>
          email: 'string'<br>
          password: 'string'<br>
      }
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Logs in user</td>
      <td>
      {<br>
          email: 'string'<br>
          password: 'string'<br>
      }
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>api/v1/iss/location</td>
      <td>Add user ISS location search history</td>
      <td>
      {<br>
          location: { <br>
            &nbsp;&nbsp;latitude: { <br>
              &nbsp;&nbsp;&nbsp;type: String, <br>
            &nbsp;}, <br>
            &nbsp;&nbsp;longitude: { <br>
              &nbsp;&nbsp;&nbsp;type: String, <br>
            &nbsp;} <br>
          }, <br>
          altitude: { <br>
            &nbsp;type: String <br>
          }, <br>
          datetime: { <br>
            &nbsp;type: String <br>
          }, <br>
          passes: [ <br>
            &nbsp;{ <br>
             &nbsp; risetime: String, <br>
             &nbsp; duration: String, <br>
            &nbsp;} <br>
          &nbsp;], <br>
      }
      </td>
  </tr>
  <tr>
      <td>GET </td>
      <td>api/v1/iss/location</td>
      <td>Get user ISS location search history</td>
      <td>null</td>
  </tr>
</table>
