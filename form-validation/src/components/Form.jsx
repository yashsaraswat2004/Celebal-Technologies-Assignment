import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
};

const countries = {
    India: ['Jaipur', 'Gwalior', 'Noida', 'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna'],
    Germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Birmingham'],
};
const Form = () => {
    const [formData, setformData] = useState(initialState);
    const [errors, seterrors] = useState({});
    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setshowPassword(prev => !prev);
    }

    const validate = (field, value) => {
        switch(field){
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
            case 'password':
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value) ? '' : 'Password must be at least 6 characters long and contain at least one letter and one number';
            case 'phone':
                return /^\+\d{1,3}\d{10}$/.test(value) ? '' : 'Phone number must be in the format +91xxxxxxxxxx';
            case 'pan':
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? '' : 'Invalid PAN format';
            case 'aadhar':
                return /^\d{12}$/.test(value) ? '' : 'Aadhar number must be 12 digits';
            default:
                return value.trim() === '' ? `${field} is required` : '';

        }
    };

const handleChange = (e) => {
    const {name, value} = e.target;
    const errorMessage = validate(name, value);
    setformData(prev=> ({...prev, [name]: value}));
    seterrors(prev => ({...prev, [name]: errorMessage}));
};

const isFormValid = () => {
    return Object.values(errors).every(error => error === '') &&
           Object.values(formData).every(value => value.trim() !== '');
};

const handleSubmit = (e) => {
    e.preventDefault();
    if(isFormValid())
    {
        navigate('/success', { state: formData });
    }
}

  return (
   <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {Object.keys(initialState).filter(field => field !== 'password').map((field) => (
          (field !== "country" && field !== "city" && field !== "pan" && field !== "aadhar") && (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="font-semibold mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`p-2 border rounded-md outline-none ${errors[field] ? "border-red-500" : "border-gray-300"}`}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          )
        ))}

        {/* Password Field */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className="font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Country Field */}
        <div className="flex flex-col">
          <label htmlFor="country" className="font-semibold mb-1">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none ${errors.country ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
        </div>

        {/* City Field */}
        {formData.country && (
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold mb-1">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`p-2 border rounded-md outline-none ${errors.city ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select City</option>
              {countries[formData.country].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
          </div>
        )}

        {/* PAN Field */}
        <div className="flex flex-col">
          <label htmlFor="pan" className="font-semibold mb-1">PAN No</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className={`p-2 border rounded-md uppercase outline-none ${errors.pan ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan}</span>}
        </div>

        {/* Aadhar Field */}
        <div className="flex flex-col">
          <label htmlFor="aadhar" className="font-semibold mb-1">Aadhar No</label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none ${errors.aadhar ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.aadhar && <span className="text-red-500 text-sm">{errors.aadhar}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-400 cursor-pointer"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;