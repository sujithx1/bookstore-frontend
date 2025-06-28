import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { authRegister } from '../../api/authapi';
import type { User_create_types } from '../../types';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState<User_create_types>({
    name: '',
    email: '',
    password: '',
    mobile:'',
    role: 'USER',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch:AppDispatch=useDispatch()
  const navigate=useNavigate()
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (formData.mobile.length<10||formData.mobile.length>10) {
      newErrors.mobile = 'Invalid mobile format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' }); // clear individual error
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('✅ Valid form:', formData);
      dispatch(authRegister(formData)).unwrap()
      .then(()=>{
        toast.success("success")
        navigate('/login')
      })
      // TODO: Submit to API or dispatch Redux action
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#fffaf4] p-8 rounded-xl shadow-lg border border-[#e0d6cc]">
        {/* Header */}
        <h2 className="text-3xl text-[#5e4636] font-serif mb-4 text-center tracking-wide">
          Create Account
        </h2>
        <p className="text-[#7c6652] text-sm text-center mb-8">
          Join Shakespeare — begin your literary journey.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-[#5e4636] mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.name ? 'border-red-400' : 'border-[#d6c8b8]'
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="William Shakespeare"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#5e4636] mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.email ? 'border-red-400' : 'border-[#d6c8b8]'
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="mobile" className="block text-[#5e4636] mb-1">Mobile</label>
            <input
              type="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.mobile ? 'border-red-400' : 'border-[#d6c8b8]'
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="1234567890"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[#5e4636] mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.password ? 'border-red-400' : 'border-[#d6c8b8]'
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-[#5e4636] mb-1">Select Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.role ? 'border-red-400' : 'border-[#d6c8b8]'
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
            >
              <option value="">Choose one</option>
              <option value="USER">User</option>
              <option value="AUTHOR">Author</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#a67c52] hover:bg-[#956a45] text-white font-medium rounded transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-center mt-6 text-[#7c6652]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#a67c52] hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
