  
import React, { useState, useEffect,useRef  } from "react";
import jwt from "../../auth/useJwt";
import SimpleReactValidator from "simple-react-validator";
import Select from 'react-select';
import $ from "jquery";
import { Input  } from 'reactstrap';

  const Adduser = ({sendDataToParent}) => {
  
    const simpleValidator = useRef(new SimpleReactValidator());
    const [userRoles, setUserRoles] = useState([{label:'Admin',value:'admin'},{label:'Employee',value:'employee'},{label:'Client',value:'client'}])
    const [userCompanies, setUserCompanies] = useState([{label:'Global Technologies',value:1},{label:'Delta Infotech',value:2}])
    const [, forceUpdate] = useState();
    const [selectedUserRole, setSelectedUserRole] = useState('admin');
    const [selectedUserCompany, setSelectedUserCompany] = useState(1);
    const [UserNameError, setUserNameError] = useState();
    const [UserEmailError, setUserEmailError] = useState();
    const form = React.createRef();
    const initialFormData = Object.freeze({});
    const [formData, updateFormData] = useState({
      first_name: "",
      last_name:"",
      password:"",
      re_password:"",
      employee_id:"",
      user_name:"",
      email:"",
      phone:"",
      role:"",
      company_id:null,
      emp_read : false,
      emp_write:false,
      emp_create: false,
      emp_delete:false,
      emp_import:false,
      emp_export:false,

      holiday_read : false,
      holiday_write:false,
      holiday_create: false,
      holiday_delete:false,
      holiday_import:false,
      holiday_export:false,

      leave_read : false,
      leave_write:false,
      leave_create: false,
      leave_delete:false,
      leave_import:false,
      leave_export:false,

      event_read : false,
      event_write:false,
      event_create: false,
      event_delete:false,
      event_import:false,
      event_export:false
    });
  
    const [formDataValidation, updateFormDataValidation] = useState({
      first_name: "",
      last_name:"",
      password:"",
      re_password:"",
      employee_id:"",
      user_name:"",
      email:"",
      phone:"",
      role:""
    });

    useEffect( ()=>{
      jwt.get('/generate-employee_id').then((res) => {
          formData.employee_id = res.employee_id
      }).catch((err) =>{ console.log(err);
        
      });
    },[]);
    const handleChange = (e) => {
      if(e.target.type === "checkbox")
      {
        console.log(e.target.checked)
        updateFormData({
          ...formData,
          
          // Trimming any whitespace
          [e.target.name]: e.target.checked
        });
  
      } else {
        updateFormData({
          ...formData,
  
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      }
    };

    function handleSelectChange(event) {
      setSelectedClient(event.target.value);
      console.log('asdasd')
    }

    const handleSubmit = (e) => {
      const formValid = simpleValidator.current.allValid();
      console.log(formValid)
      if (!formValid) {
        simpleValidator.current.showMessages(true);
        forceUpdate(1)
      } else {
        formData.role = selectedUserRole
        formData.company_id = selectedUserCompany
          
        jwt.post('/addUser',formData).then((res) => {
          if(res.errors) {
              if(res.errors.email) {
                setUserEmailError(res.errors.email);
              } else {
                setUserEmailError('')
              }
              if(res.errors.user_name) {
                setUserNameError(res.errors.user_name);
              } else {
                setUserNameError('')
              }
            }
            console.log(res.success)
            if(res.success === true) {
              document.getElementById("close_user").click();
              sendDataToParent("User added successfully")
            }
        }).catch((err) =>{ console.log(err);
          console.log(err.errors)
        
        });
        console.log(formData);
      }
    };
    

    return ( 
  <>
            {/* Add User Modal */}
            <div id="add_user" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add User</h5>
                      <button type="button" className="close" id="close_user" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form ref={form}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>First Name <span className="text-danger">*</span></label>
                              <input className="form-control" type="text"
                              required 
                              name="first_name"
                              onChange={handleChange}
                              value={formData.first_name}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("first_name")
                                forceUpdate(1);
                              }} 
                              />
                               {simpleValidator.current.message("first_name", formData.first_name, "required")}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Last Name <span className="text-danger">*</span></label>
                              <input className="form-control" type="text" 
                              name="last_name"
                              onChange={handleChange}
                              value={formData.last_name}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("last_name")
                                forceUpdate(1);
                              }}
                              />
                              {simpleValidator.current.message("last_name", formData.last_name, "required")}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Username <span className="text-danger">*</span></label>
                              <input className="form-control" type="text" 
                              
                               name="user_name"
                               onChange={handleChange}
                               value={formData.user_name}
                               onBlur={() => {
                                 simpleValidator.current.showMessageFor("user_name")
                                 forceUpdate(1);
                               }}
                              />
                              {simpleValidator.current.message("user_name", formData.user_name, "required")}
                              <small className="text-danger">{UserNameError}</small>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Email  <span className="text-danger">*</span></label>
                              <input className="form-control" type="email" 
                              name="email"
                              onChange={handleChange}
                              value={formData.email}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("email")
                                forceUpdate(1);
                              }}
                              />
                              {simpleValidator.current.message("email", formData.email, "required|email")}
                              <small className="text-danger">{UserEmailError}</small>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Password <span className="text-danger">*</span></label>
                              <input className="form-control" type="password"  
                              name="password"
                              onChange={handleChange}
                              value={formData.password}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("password")
                                forceUpdate(1);
                              }} />
                              {simpleValidator.current.message("password", formData.password, "required")}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Confirm Password<span className="text-danger">*</span></label>
                              <input className="form-control" type="password"  
                              name="re_password"
                              onChange={handleChange}
                              value={formData.re_password}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("re_password")
                                forceUpdate(1);
                              }}
                              />
                              {simpleValidator.current.message("re_password", formData.re_password, "required")}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Phone </label>
                              <input className="form-control" type="text" 
                              name="phone"
                              onChange={handleChange}
                              value={formData.phone}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("phone")
                                forceUpdate(1);
                              }}
                              />
                              {simpleValidator.current.message("phone", formData.phone, "required")}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Role</label>
                              <Select name="states" id="select-1" className="select" onChange={(e) => setSelectedUserRole(e.value)} options={userRoles} value={userRoles.filter(function(option) {
                                  return option.value === selectedUserRole;
                                })}>
                      
                              </Select>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Company</label>
                              <Select name="states" id="select-1" className="select" onChange={(e) => setSelectedUserCompany(e.value)} options={userCompanies} value={userCompanies.filter(function(option) {
                                  return option.value === selectedUserCompany;
                                })}>
                      
                              </Select>
                            </div>
                          </div>
                          <div className="col-sm-6">  
                            <div className="form-group">
                              <label>Employee ID <span className="text-danger">*</span></label>
                              <input type="text" className="form-control floating" 
                               name="employee_id"
                               disabled
                               //onChange={handleChange}
                               value={formData.employee_id}
                               onBlur={() => {
                                 simpleValidator.current.showMessageFor("employee_id")
                                 forceUpdate(1);
                               }}
                              />
                              {simpleValidator.current.message("employee_id", formData.employee_id, "required")}
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive m-t-15">
                          <table className="table table-striped custom-table">
                            <thead>
                              <tr>
                                <th>Module Permission</th>
                                <th className="text-center">Read</th>
                                <th className="text-center">Write</th>
                                <th className="text-center">Create</th>
                                <th className="text-center">Delete</th>
                                <th className="text-center">Import</th>
                                <th className="text-center">Export</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Employee</td>
                                <td className="text-center">
                                  <Input  type="checkbox"  
                                  name="emp_read"
                                  onChange={handleChange}
                                  checked={formData.emp_read} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox"  name="emp_write"
                                  onChange={handleChange}
                                  checked={formData.emp_write} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="emp_create"
                                   onChange={handleChange}
                                   checked={formData.emp_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="emp_delete"
                                   onChange={handleChange}
                                   checked={formData.emp_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="emp_import"
                                    onChange={handleChange}
                                    checked={formData.emp_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="emp_export"
                                    onChange={handleChange}
                                    checked={formData.emp_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Holidays</td>
                                <td className="text-center">
                                  <Input  type="checkbox"  
                                  name="holiday_read"
                                  onChange={handleChange}
                                  checked={formData.holiday_read} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox"  name="holiday_write"
                                  onChange={handleChange}
                                  checked={formData.holiday_write} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="holiday_create"
                                   onChange={handleChange}
                                   checked={formData.holiday_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="holiday_delete"
                                   onChange={handleChange}
                                   checked={formData.holiday_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="holiday_import"
                                    onChange={handleChange}
                                    checked={formData.holiday_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="holiday_export"
                                    onChange={handleChange}
                                    checked={formData.holiday_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Leaves</td>
                                <td className="text-center">
                                  <Input  type="checkbox"  
                                  name="leave_read"
                                  onChange={handleChange}
                                  checked={formData.leave_read} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox"  name="leave_write"
                                  onChange={handleChange}
                                  checked={formData.leave_write} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="leave_create"
                                   onChange={handleChange}
                                   checked={formData.leave_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="leave_delete"
                                   onChange={handleChange}
                                   checked={formData.leave_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="leave_import"
                                    onChange={handleChange}
                                    checked={formData.leave_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="leave_export"
                                    onChange={handleChange}
                                    checked={formData.leave_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Events</td>
                                <td className="text-center">
                                  <Input  type="checkbox"  
                                  name="event_read"
                                  onChange={handleChange}
                                  checked={formData.event_read} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox"  name="event_write"
                                  onChange={handleChange}
                                  checked={formData.event_write} />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="event_create"
                                   onChange={handleChange}
                                   checked={formData.event_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                   name="event_delete"
                                   onChange={handleChange}
                                   checked={formData.event_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="event_import"
                                    onChange={handleChange}
                                    checked={formData.event_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <Input  type="checkbox" 
                                    name="event_export"
                                    onChange={handleChange}
                                    checked={formData.event_export}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="submit-section">
                          <button onClick={handleSubmit} type="button" className="btn btn-primary submit-btn">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Add User Modal */}
</>
)
}

export default Adduser