/**
 * Signin Firebase
 */

import React, { useState, useEffect,useRef  } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Select from 'react-select';
import jwt from "../../../auth/useJwt";
import { useForm, Controller } from "react-hook-form";
import SimpleReactValidator from "simple-react-validator";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

//import jwt from "../auth/useJwt";

const Settings = () => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const form = React.createRef();
  const initialFormData = Object.freeze({});
  const [formData, updateFormData] = useState({
    company_name: "",
    conact_person:"",
    address:"",
    country:"",
    state_id:"",
    city:"",
    postal_code:"",
    email:"",
    phone_number:"",
    mobile_number:"",
    fax:"",
    website_url:""

  });

  const [formDataValidation, updateFormDataValidation] = useState({
    company_name: "",
    conact_person:"",
    address:"",
    country:"",
    state_id:"",
    city:"",
    postal_code:"",
    email:"",
    phone_number:"",
    mobile_number:"",
    fax:"",
    website_url:""

  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    axios.get("/countries").then((res) => {
      setCountries(res.data.data);
    });
  }, []);

  

  function getState(val) {
    setCountry(val.value)
    formData.country = val.value;
    axios.get("/states/"+val.value).then((res) => {
      setStates(res.data.data);
    });
  }

  function getCities(event) {
    setState(event.value)
    formData.state_id = event.value;
    axios.get("/cities/"+event.value).then((res) => {
      setCities(res.data.data);
    });
  }

  function changeCity(event)
  {
    setCity(event.value)
    formData.city = event.value;
  }

  const options = countries.map(({ code, name }, index) => {
    return {
       label: name,
       value: code,
       key: index
    }
  })

  const options1 = states.map(({ id, name }, index) => {
    return {
       label: name,
       value: id,
       key: index
    }
  })

  const options2 = cities.map(({ id, name }, index) => {
    return {
       label: name,
       value: id,
       key: index
    }
  })

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages(true);
      forceUpdate(1)
    } else {
      console.log(formData);
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Settings - Riyo Admin</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Company Settings</h3>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <form ref={form}> 
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      name="company_name"
                      className="form-control"
                      type="text"
                      onChange={handleChange}

                      onBlur={() => {
                        simpleValidator.current.showMessageFor("company_name")
                        forceUpdate(1);
                      }}
                    />
                    {simpleValidator.current.message("company_name", formData.company_name, "required")}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      name="conact_person"
                      className="form-control "
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      name="address"
                      className="form-control "
                      onChange={handleChange}
                      type="text"

                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Country</label>
                    <Select name="countries" className="select" onChange={getState} options={options} value={options.filter(function(option) {
                            return option.value === country;
                    })}>
                     
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>State/Province</label>
                    <Select name="states" id="select-1" className="select" onChange={getCities} options={options1} value={options1.filter(function(option) {
                            return option.value === state;
                    })}>
                      
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>City</label>
                    <Select name="city" className="select" onChange={changeCity} options={options2}  value={options2.filter(function(option) {
                            return option.value === city;
                    })}>
                      
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      name="postal_code"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.email}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("email")
                        forceUpdate(1);
                      }}
                      type="email"
                    />
                    {simpleValidator.current.message("email", formData.email, "required|email")}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      name="phone_number"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      name="mobile_number"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Fax</label>
                    <input
                      name="fax"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Website Url</label>
                    <input
                      className="form-control"
                      name="website_url"
                      onChange={handleChange}
                      type="url"
                    />
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button onClick={handleSubmit} type="button" className="btn btn-primary submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default Settings;
