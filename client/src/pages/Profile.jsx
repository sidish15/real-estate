import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase.js"
const Profile = () => {
  const fileRef = useRef(null);

  const { currentUser } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  // console.log(filePerc);
  //   console.log(file);
  const [formData, setFormData] = useState({}) //for updating the formdata acc to new profile
// console.log(formData)
// console.log(filePerc);
// console.log(fileUploadError);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name //will produce always unique name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);//we want to actually see the percentage of the upload

    // upload.on starts
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setFilePerc(Math.round(progress));
      },
    //we want to track the changes
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        );
    }
    )
    // upload.on ends
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()}
          src={formData.avatar||currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 
        object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileUploadError ?
          (<span className='text-red-700'>
            Error Image Upload(Image must be less than 2mb )
         </span>)
          :
          filePerc >0 && filePerc <100 ? (
             <span>
              {`Uploading ${filePerc}%`}
             </span>
          ) 
          :
          filePerc===100 ? (
            <span className='text-green-700'> Successfully Uploaded!</span>
          )
          : 
          ""
          }
        </p>
        <input type='text' placeholder='username' id='username'
          className='border p-3 rounded-lg' />
        <input type='text' placeholder='email' id='email'
          className='border p-3 rounded-lg' />
        <input type='text' placeholder='password' id='password'
          className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-95
        disabled:opacity-80'>update</button>



      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}

export default Profile
