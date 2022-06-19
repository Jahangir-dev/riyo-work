/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Select from 'react-select';
import jwt from "../../../auth/useJwt";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import jwt from "../auth/useJwt";

const schema = yup.object({
  company_name: yup
    .string()
    .required("Company name is required")
    .trim(),
  //password: yup.string().max(10).required("Password is required").trim(),
});

const Settings = () => {

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)},);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    // if ($(".select").length > 0) {
    //   $(".select").select2({
    //     minimumResultsForSearch: -1,
    //     width: "100%",
    //   });
    // }
    
    jwt
    .get('/getSettings')
    .then((res) => {
      // Toast('Settings saved')
    })
    .catch((err) =>{ console.log(err);
      setIsLoading(false)
      setError("general", {
           message: err.response.data.message,
         });
        });
    
    axios.get("/countries").then((res) => {
      setCountries(res.data.data);
    });
  }, []);

  function getState(val) {
    axios.get("/states/"+val.value).then((res) => {
      setStates(res.data.data);
    });
  }

  function getCities(event) {
    axios.get("/cities/"+event.value).then((res) => {
      setCities(res.data.data);
    });
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

  const onSubmit = (data) => {
    jwt
    .post('/addSettings',{ ...data })
    .then((res) => {
  
      clearErrors("general");
      // Toast('Settings saved')
     
    })
    .catch((err) =>{ console.log(err);
      setIsLoading(false)
      setError("general", {
           message: err.response.data.message,
         });
        });
  }

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <Controller
                    name="company_name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input
                        className={`form-control  ${
                          errors?.company_name ? "error-input" : ""
                        }`}
                        type="text"
                        value={value}
                        onChange={onChange}
                        autoComplete="false"
                      />
                    )}
                    />
                     <small>{errors?.company_name?.message}</small>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <Controller
                    name="conact_person"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="conact_person"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="text"
                    />
                    )}
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
                      defaultValue=""
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Country</label>
                    <Select name="countries" className="select" onChange={getState} options={options} value={country}>
                     
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>State/Province</label>
                    <Select name="states" id="select-1" className="select" onChange={getCities} options={options1} value={state}>
                      
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>City</label>
                    <Select name="city" className="select" options={options2} value={city}>
                      
                    </Select>
                    
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <Controller
                    name="post_code"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="post_code"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="text"
                    />
                    )}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Email</label>
                    <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="email"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="email"
                    />
                    )}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <Controller
                    name="phone_number"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="phone_number"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="text"
                    />
                    )}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <Controller
                    name="mobile_number"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="mobile_number"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="text"
                    />
                    )}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Fax</label>
                    <input
                      name="fax"
                      className="form-control"
                      defaultValue="818-978-7102"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Website Url</label>
                    <Controller
                    name="website"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                    <input
                      name="website"
                      className="form-control "
                      value={value}
                      onChange={onChange}
                      type="url"
                    />
                    )}
                    />
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Save</button>
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
