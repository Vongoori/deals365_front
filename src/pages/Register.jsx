import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const[formData, setFormData] = useState({store_name:"", email:"",password:"",postcode:""});
  const[error, setError] = useState({});
  const navigate = useNavigate();


  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

//   const validatePostcodeFormat = (postcode) => {
//     return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2}) | (([A - Za - z][A - Ha - hJ - Yj - y][0 - 9]{ 1, 2}) | (([A - Za - z][0 - 9][A - Za - z]) | ([A - Za - z][A - Ha - hJ - Yj - y][0 - 9] ? [A - Za - z])))) s ? [0 - 9][A - Za - z]{ 2 }) $ /.test(postcode.trim());
// };

const validatePostcodeOnline = async (postcode) => {
  const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
  const data = await res.json();
  return data.result; // true if valid
};


  const handleChange = async (e)=>{
    console.log("handleChange - ", e.target.name, " ", e.target.value);
    const { name, value } = e.target;
    setFormData({...formData, [name]:value});

    if(name === "email" && value)
    {
      setError((prev)=>({...prev, email:validateEmail(value) ? "": "Invalid email id"}));
    }

    if(name == "password" && value)
    {
      setError((prev)=>({...prev, password:validatePassword(value)?"":"Invalid password"}))
    }

    if (name === "postcode" && value.length>=6) {
      
      const isReal = await validatePostcodeOnline(value);
      console.log("Is postcode valid - ", isReal);
      setError((prev) => ({ ...prev, postcode: isReal ? "" : "Postcode not found" }));
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");

    try{
      const url = "http://localhost:5050/api/auth/register";
      console.log("req url: ", url);
      const res = await fetch(url,{
        method: "POST",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(formData),
        credentials:"include",
      });
      
      const data = await res.json();
      console.log("response: ", data);
      
      if(!res.ok) throw new Error(data.error);

      navigate("/login");
    }
    catch(err){
      setError(err.message);
    }
  };

  return(
     <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md m-4">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Register</h2>
    
            {error.general && <p className="text-red-500 mb-4">{error.general}</p>}
    
            <form onSubmit={handleSubmit}>
               <InputField label="Name" type="text" name="store_name" value={formData.store_name} onChange={handleChange} />
              <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              {error.email && <p className="text-red-500 mb-4">{error.email}</p>}
              <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
              {error.password && <p className="text-red-500 mb-4">{error.password}</p>}
               <InputField label="Postcode" type="text" name="postcode" value={formData.postcode} onChange={handleChange} />
               {error.postcode && <p className="text-red-500 mb-4">{error.postcode}</p>}
    
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-purple-500 transition mb-6"
              >
                Register
              </button>
              <button
                type="cancel"
                className="w-full bg-white border text-black py-2 rounded-lg hover:bg-primary hover:text-white transition"
              >
                Cancel
              </button>
            </form>
    
            <p className="text-sm text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
  );
}