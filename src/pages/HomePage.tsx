import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Users, Layers } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 animate-fade-in">
          Student Team Members Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Efficiently manage your student team members with our comprehensive management solution.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 p-4">
              <UserPlus className="text-blue-700" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Add Members</h2>
          <p className="text-gray-600 text-center mb-6">
            Add new team members with comprehensive details including their skills, projects, and background.
          </p>
          <div className="text-center">
            <Link
              to="/add-member"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Member
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-purple-100 p-4">
              <Users className="text-purple-700" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">View Members</h2>
          <p className="text-gray-600 text-center mb-6">
            Browse through all team members and access their detailed profiles and contributions.
          </p>
          <div className="text-center">
            <Link
              to="/view-members"
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              View Members
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <Layers className="text-green-700" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Team Details</h2>
          <p className="text-gray-600 text-center mb-6">
            Access comprehensive information about your team's structure, projects, and progress.
          </p>
          <div className="text-center">
            <Link
              to="/view-members"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Explore Team
            </Link>
          </div>
        </div>
      </section>

      <section className="my-16 bg-blue-50 py-10 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">About Our Team</h2>
          <p className="text-gray-700 mb-6">
            Our student team is dedicated to excellence in academics and innovation. We collaborate on various projects, 
            share knowledge, and support each other's growth. This platform helps us stay organized and connected.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700">20+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700">15</div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700">4</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700">100%</div>
              <div className="text-gray-600">Commitment</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;