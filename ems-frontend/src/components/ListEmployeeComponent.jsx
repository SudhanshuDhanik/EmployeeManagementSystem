import React, {useEffect,useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const[employees , setEmployees]=useState([])

   const navigator=useNavigate();

    useEffect(()=>{
      getAllEmployees();
    },[] )
   function getAllEmployees(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
    }).catch(error=>{
        console.error(error);
    })
   }
    function addNewEmployee(){
             navigator('/add-employee')
    }

     function modifyEmployee(id){
        navigator(`/edit-employee/${id}`)
     }

     function removeEmployee(id){
        console.log(id);
 //In arrow fun,it is optional to store parameter in () if there is only one parameter 
 //If the arrow function has no parameters, parentheses are required
        deleteEmployee(id).then(response=>{ 
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })}
    return (
        
        <div className='container marginCSS'  >
<br />
<button className='btn btn-warning  position-fixed'  style={{right:'10px',height:'70px'}} onClick={addNewEmployee}>➕Add Employee</button>
<button className='btn btn-warning  position-fixed'  style={{left:'0px',height:'70px'}} onClick={addNewEmployee}>➕Add Employee</button>

            <h2 className='text-center fst-italic shadow-lg p-3 mb-5 bg-body rounded'>List of Employees</h2>
            <table className="table table-success table-hover table-striped marginCSS" >
                <thead>
                    <tr>
                        <th className='text-center'>Employee Id</th>
                        <th className='text-center'>Employee First Name</th>
                        <th className='text-center'>Employee Last Name</th>
                        <th className='text-center'>Employee Email Id</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td><button className='btn btn-info' onClick={()=>modifyEmployee(employee.id)}>🔄 Update</button>
                                <button className='marginLEFT btn btn-danger'  onClick={()=>removeEmployee(employee.id)}>✖ Delete</button>
                                
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default ListEmployeeComponent
