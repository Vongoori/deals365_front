import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState(5);
  const navigate = useNavigate();

 

  const handleSearch = (e) => {
    e.preventDefault();
    if (!postcode.trim()) return alert("Please enter a postcode");
    navigate(`/nearby?postcode=${postcode}&radius=${radius}`);
  };

  const sampleDeals = [
    { id: 1, product: "Eggs (12 pack)", price: "£1.80", store: "Tesco", location: "SW1A 1AA" },
    { id: 2, product: "Milk 2L", price: "£1.10", store: "Sainsbury’s", location: "SW3 2BB" },
    { id: 3, product: "Bananas 1kg", price: "£0.85", store: "Asda", location: "SW5 9CC" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral">

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find the Best Grocery Deals Near You</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Discover discounts shared by nearby stores and the community. Save more every day!
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Enter postcode (e.g. SW1A 1AA)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="p-3 rounded-lg w-full sm:w-64 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:border-gray-400 "
          />
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
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
            className="bg-white text-primary font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            🔍 Find Deals
          </button>
        </form>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: '🏪', title: 'Stores Post Deals', desc: 'Local stores can add their deals and offers for nearby shoppers.' },
            { icon: '👥', title: 'Users Contribute', desc: 'Community members share real-time deals and discounts they spot.' },
            { icon: '📍', title: 'You Save Instantly', desc: 'Find the best prices near your location and save money every week.' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-3">{item.icon} {item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Deals */}
      <section className="bg-neutral py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-dark text-center">🛒 Latest Deals Near You</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleDeals.map((deal) => (
            <div
              key={deal.id}
              className="border rounded-2xl shadow-sm p-6 hover:shadow-lg transition transform duration-300 hover:scale-105 bg-white"
            >
              <h3 className="text-lg font-semibold">{deal.product}</h3>
              <p className="text-primary font-bold">{deal.price}</p>
              <p className="text-gray-600">{deal.store}</p>
              <p className="text-sm text-gray-500">{deal.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Store CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-3">Are You a Local Store?</h2>
        <p className="mb-6">Post your deals for free and reach nearby shoppers instantly!</p>
        <a
          href="/register"
          className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Register Your Store
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-gray-400 py-6 w-full text-center text-sm">
        © {new Date().getFullYear()} Deals365 — Save More, Shop Smarter.
      </footer>
    </div>
  );
}