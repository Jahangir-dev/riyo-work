
import React, { useEffect,useState, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import jwt from "../../auth/useJwt";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import Select from 'react-select';
import { Spinner, Input } from 'reactstrap';

const Policies = () => {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('4');
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [delete_record,  SetDelete] = useState();
  const form = React.createRef();
  const initialFormData = Object.freeze({});
  const [departments, setDepartments] = useState([{label:'All Departments',value:'4'},{label:'Web Development',value:'1'},{label:'Marketing',value:'2'},{label:'IT Managment',value:'3'}])
  const [formData, updateFormData] = useState({
    name: "",
    description:"",
    department_id:"",
    document:"",
  });
  
  const [formDataValidation, updateFormDataValidation] = useState({
    name: "",
    description:"",
    department_id:"",
   
  });
  const handleChange = (e) => {
    if(e.target.name == 'document'){
      updateFormData({
        ...formData,
          
        // Trimming any whitespace
      [e.target.name]: e.target.files[0]
      });
    }else{
      updateFormData({
        ...formData,
          
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      });
    }
    
  };
  
  
  useEffect( ()=>{
    getPolicies()
    // if($('.select').length > 0) {
    //   $('.select').select2({
    //     minimumResultsForSearch: -1,
    //     width: '100%'
    //   });
    // }
  },[]);  
  const getPolicies = (e) => {
    setIsLoading(true);
    jwt
   .get('/policies')
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
  const download = (e) => {
    console.log("clicked")
    //window.location.href = e
  }

  const handleDelete = (e) => {
   
    jwt.get('/deletePolicy/'+delete_record.id).then((res) => {
      if(res.success == true) {
        getPolicies();
        $("#delete_policy").modal("hide");
        $(".modal-backdrop").hide();
        
      }
    }).catch((err) =>{ console.log(err);
        
    });
   
  };

  const editForm = (e) => {
    console.log(e.department_id)
    setSelectedDepartment(e.department_id)

    updateFormData({
      ...formData,
      ['id'] : e.id,
      ['name']: e.name,
      ['description']: e.description,
      ['departmrnt_id'] : e.departmrnt_id,
      ['document'] : e.document,
    });
  }

  const handleSubmit = (e) => {
      
    const formValid = simpleValidator.current.allValid();
    console.log(formValid)
    if (!formValid) {
      simpleValidator.current.showMessages(true);
      forceUpdate(1)
    } else {
      formData.department_id = selectedDepartment
        
      jwt.post('/addPolicy',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
          if(res.success == true) {
            document.getElementById("close_add").click();
            getPolicies()
          }
      }).catch((err) =>{ console.log(err);
        console.log(err.errors)
      
      });
      console.log(formData);
    }
  };

  const handleEdit = (e) => {
      
    const formValid = simpleValidator.current.allValid();
    console.log(formValid)
    if (!formValid) {
      simpleValidator.current.showMessages(true);
      forceUpdate(1)
    } else {
      formData.department_id = selectedDepartment
        
      jwt.post('/updatePolicy/'+formData.id,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
          if(res.success == true) {
            document.getElementById("close_edit").click();
            getPolicies()
          }
      }).catch((err) =>{ console.log(err);
        console.log(err.errors)
      
      });
      console.log(formData);
    }
  };



    const columns = [
      
      {
        title: '#',
        dataIndex: 'id',
          sorter: (a, b) => a.id.length - b.id.length,
      }, 
      {
        title: 'Policy Name',
        dataIndex: 'name', 
        sorter: (a, b) => a.name.length - b.name.length,
      }, 
      {
        title: 'Department',
        dataIndex: 'department_name', 
        sorter: (a, b) => a.department_name.length - b.department_name.length,
      },        
      {
        title: 'Description',
        dataIndex: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
      },
      {
        title: 'Created',
        dataIndex: 'created_date',
        sorter: (a, b) => a.created_date.length - b.created_date.length,
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
               <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href={record.file_name} download="your_cv.pdf"><i className="fa fa-download m-r-5" /> Download</a>
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_policy" onClick={() => editForm(record)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_policy" onClick={() => SetDelete(record)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
            <title>Policies - Riyo Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Policies</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Policies</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_policy"><i className="fa fa-plus" /> Add Policy</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
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
        {/* Add Policy Modal */}
        <div id="add_policy" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Policy</h5>
                <button type="button" className="close" id="close_add" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Policy Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" name="name"  onChange={handleChange}
                              value={formData.name}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("name")
                                forceUpdate(1);
                              }} />
                    {simpleValidator.current.message("name", formData.name, "required")}
                  </div>
                  
                  <div className="form-group">
                    <label>Description <span className="text-danger">*</span></label>
                    <Input type="textarea" className="form-control" rows={4} name="description" onChange={handleChange}
                              value={formData.description}
                              onBlur={() => {
                                simpleValidator.current.showMessageFor("description")
                                forceUpdate(1);
                              }}/>
                    {simpleValidator.current.message("description", formData.description, "required")}
                  </div>
                  
                  <div className="form-group">
                    <label className="col-form-label">Department <span className="text-danger">*</span></label>
                    <Select name="department_id" id="select-1" className="select" onChange={(e) => setSelectedDepartment(e.value)} options={departments} value={departments.filter(function(option) {
                                  return option.value === selectedDepartment;
                                })}>
                    </Select>
                  </div>
                  <div className="form-group">
                    <label>Upload Policy <span className="text-danger">*</span></label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="policy_upload" name="document" onChange={handleChange}/>
                      {/* <label className="custom-file-label" htmlFor="policy_upload">Choose file</label> */}
                    </div>
          
                  </div>
                  <div className="submit-section">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Policy Modal */}
        {/* Edit Policy Modal */}
        <div id="edit_policy" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Policy</h5>
                <button type="button" className="close" id="close_edit" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Policy Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" name ="name"  value={formData.name} onChange={handleChange}
                     onBlur={() => {
                      simpleValidator.current.showMessageFor("name")
                      forceUpdate(1);
                    }}/>
                    {simpleValidator.current.message("name", formData.name, "required")}
                  </div>
                  <div className="form-group">
                    <label>Description <span className="text-danger">*</span></label>
                    <Input type="textarea" defaultValue= {formData.description} className="form-control" rows={4} name="descrption" onChange={handleChange}
                     onBlur={() => {
                      simpleValidator.current.showMessageFor("descrption")
                      forceUpdate(1);
                    }}/>
                    {simpleValidator.current.message("descrption", formData.name, "required")}
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Department</label>
                    <Select name="department_id" id="select-1" className="select" onChange={(e) => setSelectedDepartment(e.value)} options={departments} value={departments.filter(function(option) {
                                  return option.value == selectedDepartment;
                                })}>
                    </Select>
                  </div>
                  <div className="form-group">
                    <label>Upload Policy <span className="text-danger">*</span></label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="edit_policy_upload" name="document" onChange={handleChange}/>
                      {/* <label className="custom-file-label" htmlFor="edit_policy_upload">Choose file</label> */}
                    </div>
                  </div>
                  <div className="submit-section">
                    <button type="button" onClick={handleEdit} className="btn btn-primary submit-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Policy Modal */}
        {/* Delete Policy Modal */}
        <div className="modal custom-modal fade" id="delete_policy" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Policy</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={handleDelete} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Policy Modal */}
      </div>
      );
   
}

export default Policies;
