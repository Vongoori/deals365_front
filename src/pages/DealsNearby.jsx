import React, { useState, useEffect } from "react";


export default function DealsNearby() {
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);

   // ✅ Read query params on page load
  useEffect( () => {
    const params = new URLSearchParams(location.search);
    const post = params.get("postcode") || "";
    const rad = params.get("radius") || 5;

    setPostcode(post);
    setRadius(rad);
    fetchDeals(post, rad);
    
  }, [location.search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!postcode.trim()) return alert("Please enter a postcode");

    setLoading(true);
    fetchDeals(postcode, radius);
    // const res = await fetch(`/api/deals?postcode=${postcode}&radius=${radius}`);
    // const data = await res.json();
    // setDeals(data);

    setTimeout(() => setLoading(false), 800); // mock delay
  };

  const fetchLatAndLang = async (postcode) => {
    console.log("fetchLatAndLang - ", postcode)
    const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`,{
        method: "GET"});
    const data = await res.json();
    console.log("fetchLatAndLang - res Data", data)
    return data; // true if valid
  };

  async function fetchDeals(postc, rad)
  {
    const data = await fetchLatAndLang(postc);
    if (data.status === 200) {
      console.log("radius: ", rad, "lat: ", data.result.latitude, " lng: ", data.result.longitude);
      try{
      const url = `http://localhost:5050/api/deals/search?lat=${data.result.latitude}&lng=${data.result.longitude}&radius=${rad}`;
      console.log("req url: ", url);
      const res = await fetch(url,{
        method: "GET",
        headers:{"Content-Type" : "application/json"},
        credentials:"include",
      });
      
      const deals_data = await res.json();
      console.log("response: ", deals_data);
      setDeals(deals_data);
      if(!res.ok) throw new Error(deals_data.error);

      
    }
    catch(err){
      console.log(err);
    }
  }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Searchbar */}
      <div className="flex justify-center items-center bg-blue-100 py-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Enter postcode (e.g. SW1A 1AA)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="p-3 rounded-lg w-full sm:w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="1">1 km</option>
            <option value="3">3 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="15">15 km</option>
            <option value="20">20 km</option>
            <option value="25">25 km</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            🔍 Find Deals
          </button>
        </form>
      </div>

      {/* Deals */}
      <div className="flex gap-1">
        {/* Filter section */}
        <aside className="hidden sm:block w-56 min-h-screen border-r border-gray-200 p-4">
          <h2 className="text-blue-700 font-semibold mb-4">Filters</h2>
          <p className="text-sm text-gray-600">More filters coming soon...</p>
        </aside>

        {/* Deals grid */}
        <main className="flex-1 p-4">
          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading deals...</p>
          ) :(deals!= null && deals.length === 0) ? (
            <p className="text-center text-gray-500 mt-10">No deals found nearby.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deals.map((d) => (
                <DealCard key={d.id} deal={d} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function DealCard({ deal }) {
  // console.log("deal: ", deal);
  console.log("Img-Url: ", deal.image_url)
  const expiry = new Date(deal.expiry_date).toLocaleDateString("en-GB");
  const distance = (deal.distance * 1000).toFixed(0); // meters

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      <img
        src={deal.image_url}
        // src="https://images.unsplash.com/photo-1511920170033-f8396924c348"
        alt={deal.title}
        onError={(e) => (e.target.src = "")}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg text-gray-800">{deal.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{deal.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-blue-600">£{deal.price}</span>
          <span className="text-xs text-gray-400">{distance}m away</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Expires: <span className="text-red-500 font-medium">{expiry}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">{deal.store_name}</p>
      </div>
    </div>
  );
}