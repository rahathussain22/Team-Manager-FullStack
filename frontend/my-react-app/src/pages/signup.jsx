import { useState } from "react";
import { register } from "../services/authService";  // Assuming you have a `register` function in your `authService`
import { ClipLoader } from "react-spinners";  // Importing the ClipLoader spinner
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [name, setName] = useState("");  // State for name input (string)
  const [phone, setPhone] = useState("");  // State for phone input (string)
  const [email, setEmail] = useState("");  // State for email input (string)
  const [password, setPassword] = useState("");  // State for password input (string)
  const [loading, setLoading] = useState(false);  // State for handling loading spinner
  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading spinner
    try {
      const response = await register(name, phone, email, password);  // Call the register function
      const data = response.data;
      const user = data.user;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Registration Successful");
      navigate("/login")
        // You can redirect to the login page after success if needed
    } catch (error) {
      console.error("Error during registration: ", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} method="POST" className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <ClipLoader size={20} color={"#fff"} loading={loading} /> // Spinner from react-spinners
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
