import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ' '
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setemail(response.data.email);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email }
      console.log(employee)
      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      }

    }

  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }

    if ((firstName.trim())) {
      errorsCopy.firstName = '';
    }
    else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }
    if ((lastName.trim())) {
      errorsCopy.lastName = '';
    }
    else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }
    if ((email.trim())) {
      errorsCopy.email = '';

    }
    else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }


  function pageTitle() {
    if (id) {
      return <h2 className='text-center fw-bold shadow-lg bg-dark text-light'>Update Employee</h2>
    }
    else {
      return <h2 className='text-center fw-bold shadow-lg bg-dark text-light'>Add Employee</h2>

    }
  }

  return (
    <div className='container formMargin'>
      <br />
      <div className="card col-md-6 mx-auto border border-dark border-3 shadow-lg rounded">
        {
          pageTitle()
        }
        <div className="card-body mx-1 ">
          <form className='needs-validation' novalidate>
            <div className="form-group mb-2">
              <label className="form-label">First Name
                <input
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''} `}
                  type="text" placeholder='Enter First Name'
                  name='firstName'
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </label> </div>
            <div className="form-group mb-2">
              <label className="form-label">Last Name
                <input
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''} `}
                  type="text" placeholder='Enter Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                required/>
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </label></div>
            <div className="form-group mb-2">
              <label className="form-label">Email
                <input
                  className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                  type="email" placeholder='Enter Email'
                  name='email'
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </label>

            </div>
            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default EmployeeComponent