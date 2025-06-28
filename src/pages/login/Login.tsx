import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { authLogin } from "../../api/authapi";
import toast from "react-hot-toast";
import { loginSuccess } from "../../reducers/user/userslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(authLogin({ email, password }))
        .unwrap()
        .then((res) => {
          dispatch(loginSuccess(res))
          toast.success("Success");
          if (res.role === "ADMIN") {
            navigate("/admin");
          } else if (res.role === "AUTHOR") {
            navigate("/author");
          } else {
            navigate("/home");
          }
        }).catch((err)=>{
          toast.error(err.message||"Server Error")
        })
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#fffaf4] p-8 rounded-xl shadow-lg border border-[#e0d6cc]">
        {/* Header */}
        <h2 className="text-3xl text-[#5e4636] font-serif mb-4 text-center tracking-wide">
          Welcome Back
        </h2>
        <p className="text-[#7c6652] text-sm text-center mb-8">
          Enter your credentials to return to your shelf of stories.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-[#5e4636] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.email ? "border-red-400" : "border-[#d6c8b8]"
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-[#5e4636] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded bg-[#fdf9f3] text-[#3e2f26] border ${
                errors.password ? "border-red-400" : "border-[#d6c8b8]"
              } focus:outline-none focus:ring-2 focus:ring-[#c6a679]`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#a67c52] hover:bg-[#956a45] text-white font-medium rounded transition"
          >
            Log In
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-sm text-center mt-6 text-[#7c6652]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#a67c52] hover:underline">
            Register
          </Link>
        </div>
       
     
      </div>
    </section>
  );
};

export default Login;
