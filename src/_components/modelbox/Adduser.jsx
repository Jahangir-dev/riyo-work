  
import React, { useState, useEffect,useRef  } from "react";
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
      phone_number:"",
      role:"",
  
    });
  
    const [formDataValidation, updateFormDataValidation] = useState({
      first_name: "",
      last_name:"",
      password:"",
      re_password:"",
      employee_id:"",
      user_name:"",
      email:"",
      phone_number:"",
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
        // jwt.post('/addSettings',formData).then((res) => {
          
        // }).catch((err) =>{ console.log(err);
          
        // });
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
                              name="phone_number"
                              onChange={handleChange}
                              value={formData.phone_number}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("phone_number")
                                forceUpdate(1);
                              }}
                              />
                              {simpleValidator.current.message("phone_number", formData.phone_number, "required")}
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
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                              </tr>
                              <tr>
                                <td>Holidays</td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                              </tr>
                              <tr>
                                <td>Leaves</td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                              </tr>
                              <tr>
                                <td>Events</td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" />
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