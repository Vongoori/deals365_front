import { useState } from "react";
// import API from "../api";

export default function AddDeal() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    expiry_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await API.post("/deals/add-deal", form);
    //   alert("Deal added successfully!", res.data);
    // } catch (err) {
    //   alert(err.response?.data?.error || "Error adding deal");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="image_url" placeholder="Image URL" onChange={handleChange} />
      <input name="expiry_date" type="date" onChange={handleChange} />
      <button type="submit">Add Deal</button>
    </form>
  );
}