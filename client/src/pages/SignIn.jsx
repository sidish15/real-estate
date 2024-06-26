import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInfailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData, //previous information
      [e.target.id]: e.target.value,
    })
  }
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      dispatch(signInStart());
      const res = await fetch('https://real-estate-yi19.onrender.com/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      // we want to send the body by a stringify the formdata


      //next is to change and convert the response we get to JSON
      const data = await res.json();
      // console.log(data);
      // data="user created successfully"
      if (data.success === false) {
        dispatch(signInfailure(data.message));

        return;
      }
      else {
        dispatch(signInSuccess(data));
        navigate("/")
      }
    } catch (error) {
      // after the error happens weve to set the loading to false
      dispatch(signInfailure(error.message))

    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4  p-3 max-w-lg mx-auto' onSubmit={handleSubmit}>

        <input type="text" placeholder='email'
          className='border p-3 rounded-lg' id='email'
          onChange={handleChange} />
        <input type="password" placeholder='password'
          className='border p-3 rounded-lg' id='password'
          onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase
      hover:opacity-95 disabled:opacity-80 '>
          {loading ? 'Loading...' : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"} >
          <span className='text-blue-700'> Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500  mt-5'>{error}</p>}
    </div>
  )
}




export default SignIn;

/*
mx-w-lg :in the bigger screen ,we dont get bigger than large
mx-auto :centre 
'bg-slate-700:background
 text-white :text white color
 p-3:padding 3
  rounded-lg:round in the corners
   uppercase
A <span> element which is used to color a part of a text:
we want to send the body by a stringify the formdata
*/
