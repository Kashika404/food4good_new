import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

import { toast } from 'react-toastify';

const Login = () => {
    const { setShowLogin, setToken, url } = useContext(AppContext);
    const navigate = useNavigate();

    const [state, setState] = useState('Login');
  
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        primaryRole: "",
        street: "",
        city: "",
        state: "", 
        pincode: "",
        idType: "",
        idNumber: "",
    });

    const [roleDetails, setRoleDetails] = useState({});
    const [identityDocument, setIdentityDocument] = useState(null); 
    const [message, setMessage] = useState("");

   
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

   
    const onRoleChange = (e) => {
        const role = e.target.value;
        setData(prevData => ({ ...prevData, primaryRole: role }));
        setRoleDetails({});
    };

 
    const onSubRoleChange = (e) => {
        const { name, value } = e.target;
        setRoleDetails(prev => ({ ...prev, [name]: value }));
    };

    const redirectToDashboard = (role) => {
        switch (role.toLowerCase()) {
            case 'donor': navigate('/donor-dash'); break;
            case 'receiver': navigate('/receiver-dash'); break;
            case 'volunteer': navigate('/volunteer-dash'); break;
             case 'admin':
                navigate('/admin-dash');
                break;
            default: navigate('/');
        }
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let endpoint = "";
        let payload = {};
        setMessage("");

        if (state === "Forgot Password") {
            endpoint = "/api/user/forgot-password";
            payload = { email: data.email };
            try {
                const response = await axios.post(url + endpoint, payload);
                if (response.data.success) {
                    setMessage(response.data.message);
                } else {
                    
                    toast.error(response.data.message);
                }
            } catch (error) {
            
                 toast.error("An error occurred. Please try again.");
            }
        } else if (state === "Login") {
            endpoint = "/api/user/login";
            payload = { email: data.email, password: data.password };
             try {
                const response = await axios.post(url + endpoint, payload);
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    redirectToDashboard(response.data.role);
                } else {
               
                    toast.error(response.data.message);
                }
            } catch (error) {
               
                toast.error("An error occurred during login.");

            }
        } else {
         
            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("primaryRole", data.primaryRole);
            formData.append("idType", data.idType);
            formData.append("idNumber", data.idNumber);
            formData.append("street", data.street);
            formData.append("city", data.city);
            formData.append("state", data.state);
            formData.append("pincode", data.pincode);
         

            formData.append("roleDetails", JSON.stringify(roleDetails)); 
            
            if (identityDocument) {
                formData.append("identityDocument", identityDocument);
            } else {
                
                toast.warn("Please upload your identity document.");
                return;
                
            }

            try {
                const response = await axios.post(`${url}/api/user/register`, formData);
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    redirectToDashboard(response.data.role);
                } else {
                   
                     toast.error(response.data.message);
                }
            } catch (error) {
                
                                if (error.response && error.response.status === 400) {
                  
                    const errorMessage = error.response.data.errors[0]?.msg || "Please check your input fields.";
                    toast.error(errorMessage);
                } else {
                    toast.error("An error occurred during signup.");
                }

            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
      <form onSubmit={onLogin} className='relative bg-white p-10 rounded-xl text-slate-500 max-h-[90vh] overflow-y-auto'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        
        {state === 'Forgot Password' ? (
            <>
                <p className='text-sm mt-2 mb-4'>Enter your email and we'll send a link to reset your password.</p>
                {/* <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="email" />
                    <input name="email" type="email" className='outline-none text-sm' placeholder='Email id' required value={data.email} onChange={onChangeHandler} />
                </div> */}


                {/* Your current code */}
<div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
  <img src={assets.email_icon} alt="email" />
  <input name="email" type="email" className='outline-none text-sm' placeholder='Email id' required value={data.email} onChange={onChangeHandler} />
</div>
                {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
            </>
        ) : (
            <>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && (
                  <>
                    {/* Role and Sub-role fields are preserved */}
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
                      <label className='text-sm'>Role:</label>
                      <select required className='outline-none text-sm bg-transparent w-full text-slate-500' value={data.primaryRole} onChange={onRoleChange}>
                        <option value="" disabled>Select Role</option>
                        <option value="Donor">Donor</option>
                        <option value="Receiver">Receiver</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                    {data.primaryRole === 'Donor' && (
                      <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <label className='text-sm'>Donor Type:</label>
                        <select name="donorType" required className='outline-none text-sm bg-transparent w-full' value={roleDetails.donorType || ''} onChange={onSubRoleChange}>
                          <option value="" disabled>Select Donor Type</option>
                          <option value="Individual">Individual</option>
                          <option value="Restaurant">Restaurant</option>
                        </select>
                      </div>
                    )}
                    {data.primaryRole === 'Receiver' && (
                      <>
                        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                          <label className='text-sm'>Receiver Type:</label>
                          <select name="receiverType" required className='outline-none text-sm bg-transparent w-full' value={roleDetails.receiverType || ''} onChange={onSubRoleChange}>
                            <option value="" disabled>Select Receiver Type</option>
                            <option value="Old Age Home">Old Age Home</option>
                            <option value="NGO">NGO</option>
                            <option value="Orphanage">Orphanage</option>
                          </select>
                        </div>
                        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                          <label className='text-sm'>Organization:</label>
                          <input name="organizationName" type="text" className='outline-none text-sm bg-transparent w-full' placeholder='Organization Name' required value={roleDetails.organizationName || ''} onChange={onSubRoleChange} />
                        </div>
                      </>
                    )}
                    {data.primaryRole === 'Volunteer' && (
                      <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <label className='text-sm'>Volunteer Role:</label>
                        <select name="volunteerRole" required className='outline-none text-sm bg-transparent w-full' value={roleDetails.volunteerRole || ''} onChange={onSubRoleChange}>
                          <option value="" disabled>Select Volunteer Role</option>
                          <option value="Pickup Agent">Pickup Agent</option>
                          <option value="Delivery Agent">Delivery Agent</option>
                          <option value="Coordinator">Coordinator</option>
                        </select>
                      </div>
                    )}

                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                      <img src={assets.user_icon} alt="user" />
                      <input name="fullName" type="text" className='outline-none text-sm' placeholder='Full Name' required value={data.fullName} onChange={onChangeHandler} />
                    </div>
                    
                  
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <input name="street" type="text" className='outline-none text-sm w-full' placeholder='Street Address' required value={data.street} onChange={onChangeHandler} />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <input name="city" type="text" className='border px-6 py-2 rounded-full w-1/2 outline-none text-sm' placeholder='City' required value={data.city} onChange={onChangeHandler} />
                        <input name="state" type="text" className='border px-6 py-2 rounded-full w-1/2 outline-none text-sm' placeholder='State' required value={data.state} onChange={onChangeHandler} />
                    </div>
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <input name="pincode" type="text" className='outline-none text-sm w-full' placeholder='Pincode' required value={data.pincode} onChange={onChangeHandler} />
                    </div>
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <select name="idType" required className='outline-none text-sm bg-transparent w-full text-slate-500' value={data.idType} onChange={onChangeHandler}>
                          <option value="" disabled>Select ID Type</option>
                          <option value="Aadhaar Card">Aadhaar Card</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Driver's License">Driver's License</option>
                        </select>
                    </div>
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <input name="idNumber" type="text" className='outline-none text-sm w-full' placeholder='ID Number' required value={data.idNumber} onChange={onChangeHandler} />
                    </div>
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 text-sm text-slate-500'>
                        <label htmlFor="identityDocument">ID Document:</label>
                        <input id="identityDocument" name="identityDocument" type="file" required className='w-full' onChange={(e) => setIdentityDocument(e.target.files[0])} />
                    </div>
                  </>
                )}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                  <img src={assets.email_icon} alt="email" />
                  <input name="email" type="email" className='outline-none text-sm' placeholder='Email id' required value={data.email} onChange={onChangeHandler} />
                </div>

                
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                  <img src={assets.lock_icon} alt="lock" />
                  <input name="password" type="password" className='outline-none text-sm' placeholder='Password' required value={data.password} onChange={onChangeHandler} />
                </div>
                {state === 'Login' && (
                    <p onClick={() => {setState('Forgot Password'); setMessage('');}} className='text-sm text-orange-400 my-4 cursor-pointer text-right'>Forgot password?</p>
                )}
            </>
        )}

        <button type="submit" className='bg-orange-400 w-full text-white py-2 rounded-full mt-4'>
          {state === 'Login' ? 'Login' : state === 'Sign Up' ? 'Create Account' : 'Send Reset Link'}
        </button>

        {state === 'Forgot Password' ? (
             <p className='mt-5 text-center'>Remembered your password? <span className='text-orange-400 cursor-pointer font-semibold' onClick={() => {setState('Login'); setMessage('');}}>Login</span></p>
        ) : state === 'Login' ? (
          <p className='mt-5 text-center'>Don't have an account? <span className='text-orange-400 cursor-pointer font-semibold' onClick={() => setState('Sign Up')}>Sign up</span></p>
        ) : (
          <p className='mt-5 text-center'>Already have an account? <span className='text-orange-400 cursor-pointer font-semibold' onClick={() => setState('Login')}>Login</span></p>
        )}

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="close" />
      </form>
    </div>
  );
};

export default Login;


