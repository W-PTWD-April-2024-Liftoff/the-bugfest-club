import React, { useState } from "react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const CreateTripForm = () => {
  const [startingLocation, setStartingLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [vibe, setVibe] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      startingLocation,
      budget,
      vibe,
      days,
    };

    try {
      const response = await fetch("http://localhost:8080/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log("Success:", responseData);
        alert("Trip details sent successfully!");
      } else {
        console.error("Error:", response.status);
        alert("Failed to send trip details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending trip details.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px] max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Plan New Trip
        </h2>

        <form className="space-y-3 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Location:
            </label>
            <select
              name="startingLocation"
              value={startingLocation}
              onChange={(e) => setStartingLocation(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a starting point</option>
              <option value="northeast">Northeast</option>
              <option value="midAtlantic">Mid-Atlantic</option>
              <option value="southeast">Southeast</option>
              <option value="deepSouth">Deep South</option>
              <option value="midwest">Midwest</option>
              <option value="taxasOklahoma">Texas & Oklahoma</option>
              <option value="rockyMountain">Rocky Mountain</option>
              <option value="southwest">Southwest</option>
              <option value="californiaCoast">California Coast</option>
              <option value="pacificNorthwest">Pacific Northwest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($):
            </label>
            <select
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a budget</option>
              <option value="low">$</option>
              <option value="medium">$$</option>
              <option value="high">$$$</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vibe:
            </label>
            <select
              name="vibe"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a vibe</option>
              <option value="inspired">Inspired</option>
              <option value="refreshedEnergized">Refreshed & Energized</option>
              <option value="grounded">Grounded</option>
              <option value="personalGrowth">Personal Growth</option>
              <option value="accomplished">Accomplished</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Days:
            </label>
            <select
              name="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Trip Length</option>
              <option value="overnight">Overnight</option>
              <option value="weekend">Weekend</option>
              <option value="extendedWeekend">Extended weekend</option>
              <option value="oneWeek">One week</option>
              <option value="twoWeeks">Two weeks</option>
              <option value="remoteWork">Remote work / Nomad</option>
            </select>
          </div>

          <div className="space-y-10">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              ADD TRIP
            </button>

            <Link to="/">
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                BACK TO HOME
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripForm;

// const CreateTripForm = () => {
//   const [trips, setTrips] = useState([]);

//   const [formData, setFormData] = useState({
//     startingLocation: "",
//     budget: "",
//     vibe: "",
//     days: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTrips([...trips, formData]);
//     setFormData({
//       startingLocation: "",
//       budget: "",
//       vibe: "",
//       days: "",
//     });
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
//       <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px] max-h-screen overflow-y-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Plan New Trip
//         </h2>

//         <form className="space-y-3 text-left" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Starting Location:
//             </label>
//             <select
//               name="startingLocation"
//               value={formData.startingLocation}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select a starting point</option>
//               <option value="northeast">Northeast</option>
//               <option value="midAtlantic">Mid-Atlantic</option>
//               <option value="southeast">Southeast</option>
//               <option value="deepSouth">Deep South</option>
//               <option value="midwest">Midwest</option>
//               <option value="taxasOklahoma">Texas & Oklahoma</option>
//               <option value="rockyMountain">Rocky Mountain</option>
//               <option value="southwest">Southwest</option>
//               <option value="californiaCoast">California Coast</option>
//               <option value="pacificNorthwest">Pacific Northwest</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Budget ($):
//             </label>
//             <select
//               name="budget"
//               value={formData.budget}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select a budget</option>
//               <option value="low">$</option>
//               <option value="medium">$$</option>
//               <option value="high">$$$</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Vibe:
//             </label>
//             <select
//               name="vibe"
//               value={formData.vibe}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select a vibe</option>
//               <option value="inspired">Inspired</option>
//               <option value="refreshedEnergized">Refreshed & Energized</option>
//               <option value="grounded">Grounded</option>
//               <option value="personalGrowth">Personal Growth</option>
//               <option value="accomplished">Accomplished</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Number of Days:
//             </label>
//             <select
//               name="days"
//               value={formData.days}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Trip Length</option>
//               <option value="overnight">Overnight</option>
//               <option value="weekend">Weekend</option>
//               <option value="extendedWeekend">Extended weekend</option>
//               <option value="oneWeek">One week</option>
//               <option value="twoWeeks">Two weeks</option>
//               <option value="remoteWork">Remote work / Nomad</option>
//             </select>
//           </div>

//           <div className="space-y-10">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               ADD TRIP
//             </button>

//             <Link to="/">
//               <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
//                 BACK TO HOME
//               </button>
//             </Link>
//           </div>
//         </form>

//         {trips.length > 0 && (
//           <div className="mt-6 text-gray-800">
//             <h3 className="text-lg font-semibold mb-2">Your Trips</h3>
//             {trips.map((trip, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-base font-medium">
//                   From: {trip.startingLocation}
//                 </p>
//                 <p className="text-sm">Budget: {trip.budget}</p>
//                 <p className="text-sm">Vibe: {trip.vibe}</p>
//                 <p className="text-sm">Duration: {trip.days}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateTripForm;
