import React from 'react';
import 'flowbite';

const AddBus = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Bus</h2>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label htmlFor="vehicleNo" className="block mb-2 text-sm font-medium text-gray-900">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNo"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter vehicle number"
              required
            />
          </div>
         
          <div>
            <label htmlFor="organization" className="block mb-2 text-sm font-medium text-gray-900">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter organization"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;
