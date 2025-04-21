import React, { useEffect, useState } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  BlueskyShareButton,
  BlueskyIcon,
} from "react-share";


const Explore = () => {
  const currentPageUrl = window.location.href;
  const [tripPlans, setTripPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [formData, setFormData] = useState({
    tripTitle: "",
    location: "",
    description: "",
    topActivity: "",
    mainAttraction: "",
    vibeInspiration: "",
    startingLocation: "",
    bestTimeToVisit: "",
    days: "",
    budget: "",
    vibe: "",
  });


  useEffect(() => {
    fetchTripPlans();
  }, []);


  const fetchTripPlans = async (query = "") => {
    setLoading(true);
    setFetchError(null);
    try {
      const url = query
        ? `http://localhost:8080/api/trips/tripPlans/search?location=${encodeURIComponent(query)}`
        : "http://localhost:8080/api/trips/tripPlans";
      console.log(`Fetching trip plans from: ${url}`);
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseText = await response.text();
      console.log(`Fetch response: status=${response.status}, body=${responseText}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
      }
      const data = JSON.parse(responseText);
      console.log("Parsed trip plans:", JSON.stringify(data, null, 2));
      console.log(`Received ${data.length} trip plans`);
      setTripPlans(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  };


  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchTripPlans(query);
  };


  const handleDelete = async (tripPlan) => {
    if (!tripPlan.trip?.id && !tripPlan.id) {
      console.error("No valid trip or travel plan ID provided for deletion", tripPlan);
      alert("Failed to delete trip plan: No valid ID provided");
      return;
    }


    if (window.confirm("Are you sure you want to delete this trip plan?")) {
      try {
        let response, responseText;
        if (tripPlan.trip?.id) {
          console.log(`Attempting to delete Trip with ID: ${tripPlan.trip.id}`);
          response = await fetch(`http://localhost:8080/api/trips/${tripPlan.trip.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          responseText = await response.text();
          console.log(`Delete /api/trips response: status=${response.status}, body=${responseText}`);
         
          if (!response.ok && response.status !== 405) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
          }
        }


        if ((!response || response.status === 405) && tripPlan.id) {
          console.log(`Attempting to delete TravelPlan with ID: ${tripPlan.id}`);
          response = await fetch(`http://localhost:8080/api/trips/tripPlans/${tripPlan.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          responseText = await response.text();
          console.log(`Delete /api/trips/tripPlans response: status=${response.status}, body=${responseText}`);
         
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
          }
        }


        if (!response.ok) {
          throw new Error(`Both delete attempts failed. Last status: ${response.status}, Details: ${responseText}`);
        }


        console.log(`Successfully deleted trip plan with ID: ${tripPlan.id || tripPlan.trip.id}`);
        setTripPlans(tripPlans.filter((plan) => plan.id !== tripPlan.id));
      } catch (error) {
        console.error("Delete error:", error);
        alert(`Failed to delete trip plan: ${error.message}`);
      }
    }
  };


  const handleEdit = (tripPlan) => {
    setEditingTrip(tripPlan);
    setFormData({
      tripTitle: tripPlan.tripTitle || "",
      location: tripPlan.location || "",
      description: tripPlan.description || "",
      topActivity: tripPlan.topActivity || "",
      mainAttraction: tripPlan.mainAttraction || "",
      vibeInspiration: tripPlan.vibeInspiration || "",
      startingLocation: tripPlan.trip?.startingLocation || "",
      bestTimeToVisit: tripPlan.bestTimeToVisit || "",
      days: tripPlan.trip?.days ? tripPlan.trip.days.toString() : "",
      budget: tripPlan.trip?.budget || "",
      vibe: tripPlan.trip?.vibe || "",
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!editingTrip.id) {
      console.error("No travel plan ID found for updating:", editingTrip);
      alert("Failed to update trip plan: No travel plan ID found");
      return;
    }


    try {
      const payload = {
        id: editingTrip.id,
        tripTitle: formData.tripTitle || "",
        location: formData.location || "",
        description: formData.description || "",
        topActivity: formData.topActivity || "",
        mainAttraction: formData.mainAttraction || "",
        vibeInspiration: formData.vibeInspiration || "",
        bestTimeToVisit: formData.bestTimeToVisit || "",
        trip: {
          id: editingTrip.trip?.id || null,
          startingLocation: formData.startingLocation || "",
          budget: formData.budget || "",
          vibe: formData.vibe || "",
          days: parseInt(formData.days) || 0,
        },
      };


      console.log("Sending PUT request with payload:", JSON.stringify(payload, null, 2));


      const response = await fetch(
        `http://localhost:8080/api/trips/${editingTrip.trip?.id || editingTrip.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }


      const updatedTrip = await response.json();
      setTripPlans(
        tripPlans.map((plan) =>
          plan.id === editingTrip.id
            ? { ...plan, ...payload, trip: updatedTrip }
            : plan
        )
      );


      setEditingTrip(null);
    } catch (error) {
      console.error("Update error:", error);
      alert(`Failed to update trip plan: ${error.message}`);
    }
  };


  const cancelEdit = () => {
    setEditingTrip(null);
  };


  if (loading) return <div className="text-center text-xl">Loading...</div>;


  if (fetchError) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-600">Error fetching trip plans</h2>
        <p>{fetchError}</p>
        <p>Please check the console logs and ensure the backend data is valid.</p>
      </div>
    );
  }


  return (
    <>
      <div className="bg-white p-8 w-[1200px]">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          Explore MyTrips
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Explore destinations by how they make you feel, not just where they are
          on a map.
        </p>
        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search trips by location (e.g., Miami)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>


      {editingTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Trip Plan</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Trip Title
                  </label>
                  <input
                    type="text"
                    name="tripTitle"
                    value={formData.tripTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4 md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  ></textarea>
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Top Activity
                  </label>
                  <input
                    type="text"
                    name="topActivity"
                    value={formData.topActivity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Main Attraction
                  </label>
                  <input
                    type="text"
                    name="mainAttraction"
                    value={formData.mainAttraction}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Vibe Inspiration
                  </label>
                  <input
                    type="text"
                    name="vibeInspiration"
                    value={formData.vibeInspiration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Starting Location
                  </label>
                  <input
                    type="text"
                    name="startingLocation"
                    value={formData.startingLocation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    name="bestTimeToVisit"
                    value={formData.bestTimeToVisit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Days
                  </label>
                  <select
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select duration</option>
                    <option value="1">Overnight</option>
                    <option value="3">Weekend</option>
                    <option value="5">Extended Weekend</option>
                    <option value="7">Week-long</option>
                    <option value="10">Extended</option>
                  </select>
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select budget</option>
                    <option value="500">Budget</option>
                    <option value="2000">Mid-Range</option>
                    <option value="5000">Luxury</option>
                  </select>
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Vibe
                  </label>
                  <select
                    name="vibe"
                    value={formData.vibe}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select vibe</option>
                    <option value="inspired_and_creative">Inspired & Creative</option>
                    <option value="refreshed">Refreshed</option>
                    <option value="grounded_and_connected">Grounded & Connected</option>
                    <option value="accomplished">Accomplished</option>
                    <option value="transformed_and_enlightened">Transformed & Enlightened</option>
                  </select>
                </div>
              </div>


              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {tripPlans.length === 0 && !loading && !fetchError ? (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">
            {searchQuery ? "No trips found for your search." : "No valid trip data found."}
          </h2>
          <p>
            {searchQuery
              ? "Try a different location or clear the search."
              : "Trips may lack required trip details. Check the console logs and database for missing trip data."}
          </p>
        </div>
      ) : (
        tripPlans.map((tripPlan) => (
          <div key={tripPlan.id} className="max-w-4xl mx-auto overflow-hidden border bg-white shadow-md mt-10 relative">
            <div className="px-6 py-10">
              <div className="flex mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  The Vibe:{" "}
                  {tripPlan.trip?.vibe === "inspired_and_creative"
                    ? "Inspired & Creative"
                    : tripPlan.trip?.vibe === "refreshed"
                    ? "Refreshed"
                    : tripPlan.trip?.vibe === "grounded_and_connected"
                    ? "Grounded & Connected"
                    : tripPlan.trip?.vibe === "accomplished"
                    ? "Accomplished"
                    : tripPlan.trip?.vibe === "transformed_and_enlightened"
                    ? "Transformed & Enlightened"
                    : "Unknown Vibe"}
                </span>
              </div>


              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="w-full mb-6 md:w-3/5 md:mb-0">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {tripPlan.tripTitle || "Trip Title"} in{" "}
                    {tripPlan.location || "Trip Location"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {tripPlan.description || "Trip Description"}
                  </p>


                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    What To Do
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600 mb-3">
                      <span className="mr-2">⭐</span>
                      <span>
                        <b>Highlight:</b>{" "}
                        {tripPlan.topActivity || "Highlight Info"}
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600 mb-3">
                      <span className="mr-2">⭐</span>
                      <span>
                        <b>Experience:</b>{" "}
                        {tripPlan.mainAttraction || "Activity Name"}
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600 mb-3">
                      <span className="mr-2">⭐</span>
                      <span>
                        <b>Vibe-Inspired Spot:</b>{" "}
                        {tripPlan.vibeInspiration || "Vibe-related highlight"}
                      </span>
                    </li>
                  </ul>
                </div>


                <div className="w-full md:w-2/5">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Plan Your Trip
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Essential information to help you plan
                    </p>


                    <div className="mb-6 space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800">From:</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {tripPlan.trip?.startingLocation || "N/A"}
                        </p>
                      </div>


                      <div>
                        <h4 className="font-medium text-gray-800">
                          Best Time to Visit:
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {tripPlan.bestTimeToVisit || "Best Time to Visit"}
                        </p>
                      </div>


                      <div>
                        <h4 className="font-medium text-gray-800">
                          Duration:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {tripPlan.trip?.days === 1
                            ? "Overnight"
                            : tripPlan.trip?.days === 3
                            ? "Weekend"
                            : tripPlan.trip?.days === 5
                            ? "Extended Weekend"
                            : tripPlan.trip?.days === 7
                            ? "Week-long"
                            : tripPlan.trip?.days === 10
                            ? "Extended"
                            : "Trip Length"}
                        </p>
                      </div>


                      <div>
                        <h4 className="font-medium text-gray-800">Budget:</h4>
                        <p className="text-sm text-gray-600">
                          {tripPlan.trip?.budget === "500"
                            ? "Budget"
                            : tripPlan.trip?.budget === "2000"
                            ? "Mid-Range"
                            : tripPlan.trip?.budget === "5000"
                            ? "Luxury"
                            : "Amount to spend"}
                        </p>
                      </div>
                    </div>


                    <div className="flex items-center gap-3 mt-4">
                      <EmailShareButton url={currentPageUrl}>
                        <EmailIcon round />
                      </EmailShareButton>
                      <FacebookShareButton url={currentPageUrl}>
                        <FacebookIcon round />
                      </FacebookShareButton>
                      <BlueskyShareButton url={currentPageUrl}>
                        <BlueskyIcon round />
                      </BlueskyShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="absolute bottom-3 left-3 flex space-x-2">
              <button
                onClick={() => handleDelete(tripPlan)}
                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                title="Delete trip plan"
                disabled={!tripPlan.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleEdit(tripPlan)}
                className="bg-teal-500 hover:bg-teal-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                title="Edit trip plan"
                disabled={!tripPlan.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};


export default Explore;
