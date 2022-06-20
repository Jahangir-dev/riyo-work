  
import React, { useState, useEffect,useRef  } from "react";
import jwt from "../../auth/useJwt";
import SimpleReactValidator from "simple-react-validator";
import Select from 'react-select';

  const Adduser = () => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [selectedRole, setSelectedClient] = useState('admin');
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
      emp_read:"",
      emp_write:"",
      emp_create:"",
      emp_delete:"",
      emp_import:"",
      emp_export:"",
      holiday_read:"",
      holiday_write:"",
      holiday_create:"",
      holiday_delete:"",
      holiday_import:"",
      holiday_export:"",
      leave_read:"",
      leave_write:"",
      leave_create:"",
      leave_delete:"",
      leave_import:"",
      leave_export:"",
      event_read:"",
      event_write:"",
      event_create:"",
      event_delete:"",
      event_import:"",
      event_export:"",
  
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

    const handleChange = (e) => {
      updateFormData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      });
    };

    function handleSelectChange(event) {
      setSelectedClient(event.target.value);
      console.log(selectedRole)
    }

    const handleSubmit = (e) => {
      const formValid = simpleValidator.current.allValid();
      if (!formValid) {
        simpleValidator.current.showMessages(true);
        forceUpdate(1)
      } else {
        jwt.post('/addUser',formData).then((res) => {
          
        }).catch((err) =>{ console.log(err);
          
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
                      <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
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
                              <label>Last Name</label>
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
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Email <span className="text-danger">*</span></label>
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
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Password</label>
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
                              <label>Confirm Password</label>
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
                              <select className="select" value={selectedRole} onChange={handleSelectChange}
                              >
                                <option value='admin'>Admin</option>
                                <option value='client'>Client</option>
                                <option value='employee'>Employee</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Company</label>
                              <select className="select">
                                <option>Global Technologies</option>
                                <option>Delta Infotech</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-6">  
                            <div className="form-group">
                              <label>Employee ID <span className="text-danger">*</span></label>
                              <input type="text" className="form-control floating" 
                               name="employee_id"
                               onChange={handleChange}
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
                                  <input  type="checkbox"  name="emp_read" onChange={handleChange} value={formData.emp_read}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="emp_write" onChange={handleChange} value={formData.emp_write}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="emp_create" onChange={handleChange} value={formData.emp_create}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="emp_delete" onChange={handleChange} value={formData.emp_delete}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="emp_import" onChange={handleChange} value={formData.emp_import}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="emp_export" onChange={handleChange} value={formData.emp_export}/>
                                </td>
                              </tr>
                              <tr>
                                <td>Holidays</td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="holiday_read" onChange={handleChange} value={formData.holiday_read}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="holiday_write" onChange={handleChange} value={formData.holiday_write}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="holiday_create" onChange={handleChange} value={formData.holiday_create}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="holiday_delete" onChange={handleChange} value={formData.holiday_delete}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="holiday_import" onChange={handleChange} value={formData.holiday_import}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="holiday_export" onChange={handleChange} value={formData.holiday_export}/>
                                </td>
                              </tr>
                              <tr>
                                <td>Leaves</td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="leave_read" onChange={handleChange} value={formData.leave_read}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="leave_write" onChange={handleChange} value={formData.leave_write}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="leave_create" onChange={handleChange} value={formData.leave_create}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="leave_delete" onChange={handleChange} value={formData.leave_delete}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="leave_import" onChange={handleChange} value={formData.leave_import}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="leave_export" onChange={handleChange} value={formData.leave_export}/>
                                </td>
                              </tr>
                              <tr>
                                <td>Events</td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="event_read" onChange={handleChange} value={formData.event_read}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="event_write" onChange={handleChange} value={formData.event_write}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="event_create" onChange={handleChange} value={formData.event_create}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="event_delete" onChange={handleChange} value={formData.event_delete}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="event_import" onChange={handleChange} value={formData.event_import}/>
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" name="event_export" onChange={handleChange} value={formData.event_export}/>
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