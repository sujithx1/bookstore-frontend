import { useState } from 'react';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/user/userslice';
import axios from 'axios';
import { editUser } from '../../api/authapi';


const CLOUDINARY_URL = import.meta.env.VITE_CLOUDNARY_URL;
const UPLOAD_PRESET = "Product_images";
const EditProfile = () => {

 const dispatch:AppDispatch=useDispatch()
  const {user}=useSelector((state:RootState)=>state.user)
  const navigate=useNavigate()
  const [imagefile,setImagefile]=useState<File|null>(null)
  const [imageurl,setimageurl]=useState(user?.profile||"https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=sujith")
  const [profileurl,setProfileurl]=useState(user?.profile)
  const [formData, setFormData] = useState({
    name: user!.name,
    email: user!.email,
    mobile: user!.mobile,
   
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  if (!user) {
    toast.error('Something error please login')
    dispatch(logout())
    navigate('/login')
    return
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      
      setImagefile(file)
      const imageURL = URL.createObjectURL(file);
      setimageurl(imageURL);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
   let uploadedUrl = profileurl;

if (imagefile) {
  const imageData = new FormData();
  imageData.append("file", imagefile);
  imageData.append("upload_preset", UPLOAD_PRESET);
  try {
    const response = await axios.post(CLOUDINARY_URL, imageData);
    uploadedUrl = response.data.secure_url; // get the correct uploaded image URL
    setProfileurl(uploadedUrl)
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Image upload failed");
    return;
  }
}
  

    console.log('Updated Profile:', formData);
    console.log(profileurl);
    

    dispatch(editUser({name:formData.name,id:user.id,mobile:formData.mobile,profile:uploadedUrl})).unwrap()
    .then(()=>{toast.success('success')
      if(user.role=="USER"){

        navigate('/profile')
      }else
      {
        navigate('/author/profile')

      }
    })
    .catch((err)=>toast.error(err.message))
    // Call update API here
  };

  return (
    <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-[#e4ddd4]">
        <h2 className="text-2xl font-semibold text-center text-[#5e4636] mb-6">Edit Profile</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-4 gap-2">
            <img
              src={imageurl}
              alt="avatar"
              className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            />

           <label className="flex items-center gap-3 cursor-pointer text-[#5e4636] bg-[#fdf9f3] border border-[#d6c8b8] px-4 py-2 rounded-lg shadow-sm hover:bg-[#f8f1e7] transition">
  <svg
    className="w-5 h-5 text-[#a67c52]"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M4 3a2 2 0 00-2 2v1h2V5h12v1h2V5a2 2 0 00-2-2H4zM2 8v7a2 2 0 002 2h12a2 2 0 002-2V8H2zm5 2a3 3 0 116 0 3 3 0 01-6 0z" />
  </svg>
  <span className="text-sm">Upload Image</span>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />
</label>

          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-[#5e4636] mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] border ${
                errors.name ? 'border-red-500' : 'border-[#d6c8b8]'
              } text-[#3e2f26] focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email (readonly) */}
          <div>
            <label htmlFor="email" className="block text-[#5e4636] mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 rounded bg-gray-100 text-[#3e2f26] border border-[#d6c8b8] cursor-not-allowed"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-[#5e4636] mb-1">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] border ${
                errors.mobile ? 'border-red-500' : 'border-[#d6c8b8]'
              } text-[#3e2f26] focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
            />
            {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-[#a67c52] hover:bg-[#956a45] text-white font-medium rounded transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
