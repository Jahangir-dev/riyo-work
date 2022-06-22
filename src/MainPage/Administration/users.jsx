/**
 * Signin Firebase
 */

import React, { useState,useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from "axios";
import jwt from "../../auth/useJwt";
import { Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05,Avatar_06,Avatar_07,
        Avatar_08,Avatar_09,Avatar_10,Avatar_11,Avatar_12 } from '../../Entryfile/imagepath';

import { Table } from 'antd';
import $ from "jquery";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import  Adduser from "../../_components/modelbox/Adduser"
import SimpleReactValidator from "simple-react-validator";
import Select from 'react-select';
import { Spinner, Alert  } from 'reactstrap';
import { faLaptopHouse, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [edit,  SetEdit] = useState();
  const [delete_record,  SetDelete] = useState();
  const [data, setData] = useState([
    // {id:1,name:"Bernardo Galaviz",image:Avatar_01,email:"bernardogalaviz@example.com",company:"Global Technologies",created_date:"5 Jan 2019",role:"Client"},
    // {id:2,name:"Catherine Manseau",image:Avatar_02,email:"catherinemanseau@example.com",company:"Dreamguy's Technologies",created_date:"5 Jan 2019",role:"Admin"},
    // {id:3,name:"Jeffery Lalor",image:Avatar_03,email:"jefferrylalorr@example.com",company:"Dreamguy's Technologies",created_date:"5 Jan 2019",role:"Employee"},
    // {id:4,name:"Jeffrey Warden",image:Avatar_04,email:"jeffreywarden@example.com",company:"Global Technologies",created_date:"5 Jan 2019",role:"Client"},
    // {id:5,name:"John Due",image:Avatar_05,email:"johndue@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:6,name:"John Smith",image:Avatar_06,email:"johnsmith@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:7,name:"Lesley Grauer",image:Avatar_07,email:"lesleygrauer@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:8,name:"Loren Gatlin",image:Avatar_08,email:"lorengatlin@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:9,name:"Mike Litorus",image:Avatar_09,email:"mikelitorus@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:10,name:"Richard Miles",image:Avatar_10,email:"richardmiles@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:11,name:"Tarah Shropshire",image:Avatar_11,email:"tarahshropshire@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    // {id:12,name:"Wilmer Deluna",image:Avatar_12,email:"wilmerdeluna@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
  ]);
  const [userRoles, setUserRoles] = useState([{label:'Admin',value:'admin'},{label:'Employee',value:'employee'},{label:'Client',value:'client'}])
  const [userCompanies, setUserCompanies] = useState([{label:'Global Technologies',value:'1'},{label:'Delta Infotech',value:'2'}])
  const simpleValidator = useRef(new SimpleReactValidator());
  const [IsLoading, setIsLoading] = useState(true);
  const [SearchText, setSearchText] = useState();
  const [, forceUpdate] = useState();
  const [UserSuccess, setUserSuccess] = useState();
  const [message , setMessage] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState('admin');
  const [selectedUserCompany, setSelectedUserCompany] = useState('1');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [searchRole, setSearchRole] = useState('admin');
  const [selectedCompany, setSelectedCompany] = useState('1');
  const form = React.createRef();
  const initialFormData = Object.freeze({});
  const [searchForm , setSearchForm] = useState({
    search:"",
    role: "",
    company: "",

});
  const [formData, updateFormData] = useState({
    id:null,
    first_name: "",
    last_name:"",
    password:"",
    re_password:"",
    employee_id:"",
    user_name:"",
    email:"",
    phone_number:"",
    role:"",
    employee_read : null,
    employee_write:null,
    employee_create: null,
    employee_delete:null,
    employee_import:null,
    employee_export:null,

    holiday_read : null,
    holiday_write:null,
    holiday_create: null,
    holiday_delete:null,
    holiday_import:null,
    holiday_export:null,

    leave_read : null,
    leave_write:null,
    leave_create: null,
    leave_delete:null,
    leave_import:null,
    leave_export:null,

    event_read : null,
    event_write:null,
    event_create: null,
    event_delete:null,
    event_import:null,
    event_export:null
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

  useEffect( ()=>{
    getUsers()
  },[]);  

  const editForm = (e) => {
    console.log(e)
    setSelectedUserRole(e.role)
    setSelectedCompany(e.user_profile.company_id)
    updateFormData({
      ...formData,
      ['id'] : e.id,
      ['first_name']: e.first_name,
      ['last_name']: e.last_name,
      ['role'] : e.role,
      ['email'] : e.email,
      ['user_name'] : e.username,
      ['phone_number'] : e.user_profile.phone,
      ['employee_id'] : e.user_profile.employee_id,
      ['employee_create']: e.permissions.emp_create,
      ['employee_delete']: e.permissions.emp_delete,
      ['employee_export']: e.permissions.emp_export,
      ['employee_import']: e.permissions.emp_import,
      ['employee_read: ']:e.permissions.emp_read,
      ['employee_write:'] :e.permissions.emp_write,
      ['event_create']: e.permissions.event_create,
      ['event_delete']: e.permissions.event_delete,
      ['event_export']: e.permissions.event_export,
      ['event_import']: e.permissions.event_import,
      ['event_read']: e.permissions.event_read,
      ['event_write']: e.permissions.event_write,
      ['holiday_create']: e.permissions.holiday_create,
      ['holiday_delete']: e.permissions.holiday_delete,
      ['holiday_export']: e.permissions.holiday_export,
      ['holiday_import']: e.permissions.holiday_import,
      ['holiday_read']:   e.permissions.holiday_read,
      ['holiday_write']: e.permissions.holiday_wite,
      ['leave_create']: e.permissions.leave_create,
      ['leave_delete']: e.permissions.leave_delete,
      ['leave_export']: e.permissions.leave_export,
      ['leave_import']: e.permissions.leave_import,
      ['leave_read']: e.permissions.leave_read,
      ['leave_write']: e.permissions.leave_write

    });
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
  const getUsers = (e) => {
     jwt
    .get('/users')
    .then((res) => {
      setData(res.data);
      setIsLoading(false)
    })
    .catch((err) =>{ console.log(err);
      setIsLoading(false)
      setError("general", {
           message: err.response.data.message,
         });
    });
  }
  const handleDelete = (e) => {
   
    jwt.get('/deleteUser/'+delete_record.id).then((res) => {
      if(res.success == true) {
        getUsers();
        $("#delete_user").modal("hide");
        $(".modal-backdrop").hide();
        
      }
    }).catch((err) =>{ console.log(err);
        
    });
   
  };
  const searchuser = () => {
    setIsLoading(true)
    searchForm.role = selectedRole
    searchForm.company = selectedCompany 
    searchForm.search = SearchText
    jwt.post('/search-user',searchForm).then((res) => {
      setData(res.data);
      setIsLoading(false)
      }).catch((err) =>{ console.log(err);
        setIsLoading(false)
      });
  }

  const sendDataToParent = (index) => { // the callback. Use a better name
    setUserSuccess(index);
    setMessage(true)
  };

    const columns = [
      
      {
        title: 'Name',
        dataIndex: 'username',
        render: (text, record) => (            
            <h2 className="table-avatar">
              <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={Avatar_01}/></Link>
              <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
            </h2>
          ), 
          sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
      },

      {
        title: 'Company',
        dataIndex: 'company_name', 
      
        sorter: (a, b) => a.company_name.length - b.company_name.length,
      },
    
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        sorter: (a, b) => a.created_date.length - b.created_date.length,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, record) => (
            <span className={text ==="admin" ? "badge bg-inverse-danger" :  "badge bg-inverse-success" }
           >{text}</span>
          ),
        sorter: (a, b) => a.role.length - b.role.length,
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_user" onClick={() => editForm(record)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user" onClick={() => SetDelete(record)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
      },
    ]

    
      return ( 
        
            <div className="page-wrapper">
              {
              IsLoading &&
              <div className="loader">
              <Spinner color="white" />
              </div>
            }
              <Helmet>
                 <title>Users - Riyo Admin Template</title>
                 <meta name="description" content="Login page"/>					
              </Helmet>
              {/* Page Content */}
              <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Users</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                      </ul>
                    </div>
                    <div className="col-auto float-end ml-auto">
                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User</a>
                    </div>
                  </div>
                  
                </div>
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-12"> 
                  <Alert color="success" isOpen={message} fade={true}>{UserSuccess}</Alert>
                  </div>
                </div>
                {/* /Page Header */}
                {/* Search Filter */}
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3">  
                    <div className="form-group ">
                      <input type="text" value={SearchText} onChange={(e) => setSearchText(e.target.value)} className="form-control floating" placeholder='Search'/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3"> 
                    <div className="form-group">
                    
                    <Select name="states" id="select-1" className="select" onChange={(e) => setSelectedCompany(e.value)} options={userCompanies} value={userCompanies.filter(function(option) {
                          return option.value === selectedCompany;
                      })}>
                    </Select>
                      
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3"> 
                    <div className="form-group">
                    <Select name="searchRole" className="select"  onChange={(e) => setSelectedRole(e.value)}  options={userRoles}  value={userRoles.filter(function(option) {
                            return option.value === searchRole;
                    })}>
                      
                    </Select>
                    
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">  
                    <a onClick={searchuser} className="btn btn-success btn-block w-100"> Search </a>  
                  </div>     
                </div>
                {/* /Search Filter */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                    <Table className="table-striped"
                        pagination= { {total : data.length,
                          showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        style = {{overflowX : 'auto'}}
                        columns={columns}                 
                        // bordered
                        dataSource={data}
                        rowKey={record => record.id}
                        // onChange={this.handleTableChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Content */}
              {/* Add User Modal */}

              < Adduser sendDataToParent={sendDataToParent}/>

              {/* /Add User Modal */}
              {/* Edit User Modal */}
              <div id="edit_user" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit User</h5>
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
                                  <input  type="checkbox"  
                                  name="employee_read"
                                  onChange={handleChange}
                                  checked={formData.employee_read} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="employee_write"
                                  onChange={handleChange}
                                  checked={formData.employee_write} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="employee_create"
                                   onChange={handleChange}
                                   checked={formData.employee_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="employee_delete"
                                   onChange={handleChange}
                                   checked={formData.employee_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="employee_import"
                                    onChange={handleChange}
                                    checked={formData.employee_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="employee_export"
                                    onChange={handleChange}
                                    checked={formData.employee_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Holidays</td>
                                <td className="text-center">
                                  <input  type="checkbox"  
                                  name="holiday_read"
                                  onChange={handleChange}
                                  checked={formData.holiday_read} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="holiday_write"
                                  onChange={handleChange}
                                  checked={formData.holiday_write} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="holiday_create"
                                   onChange={handleChange}
                                   checked={formData.holiday_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="holiday_delete"
                                   onChange={handleChange}
                                   checked={formData.holiday_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="holiday_import"
                                    onChange={handleChange}
                                    checked={formData.holiday_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="holiday_export"
                                    onChange={handleChange}
                                    checked={formData.holiday_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Leaves</td>
                                <td className="text-center">
                                  <input  type="checkbox"  
                                  name="leave_read"
                                  onChange={handleChange}
                                  checked={formData.leave_read} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="leave_write"
                                  onChange={handleChange}
                                  checked={formData.leave_write} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="leave_create"
                                   onChange={handleChange}
                                   checked={formData.leave_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="leave_delete"
                                   onChange={handleChange}
                                   checked={formData.leave_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="leave_import"
                                    onChange={handleChange}
                                    checked={formData.leave_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="leave_export"
                                    onChange={handleChange}
                                    checked={formData.leave_export}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Events</td>
                                <td className="text-center">
                                  <input  type="checkbox"  
                                  name="event_read"
                                  onChange={handleChange}
                                  checked={formData.event_read} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox"  name="event_write"
                                  onChange={handleChange}
                                  checked={formData.event_write} />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="event_create"
                                   onChange={handleChange}
                                   checked={formData.event_create}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                   name="event_delete"
                                   onChange={handleChange}
                                   checked={formData.event_delete}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
                                    name="event_import"
                                    onChange={handleChange}
                                    checked={formData.event_import}
                                  />
                                </td>
                                <td className="text-center">
                                  <input  type="checkbox" 
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
              {/* /Edit User Modal */}
              {/* Delete User Modal */}
              <div className="modal custom-modal fade" id="delete_user" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="form-header">
                        <h3>Delete User</h3>
                        <p>Are you sure want to delete?</p>
                      </div>
                      <div className="modal-btn delete-action">
                        <div className="row">
                          <div className="col-6">
                            <a onClick={handleDelete} className="btn btn-primary continue-btn">Delete</a>
                          </div>
                          <div className="col-6">
                            <a data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Delete User Modal */}
            </div>

      );
  }

export default Users;
