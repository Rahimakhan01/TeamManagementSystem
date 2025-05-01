import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCircle, Loader, Search, AlertCircle } from 'lucide-react';

type Member = {
  _id: string;
  name: string;
  rollNo: string;
  year: string;
  degree: string;
  profilePhoto: string;
};

const ViewMembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members');
        const text = await response.text();
  
        let data;
        try {
          data = JSON.parse(text);
          if (!Array.isArray(data)) {
            throw new Error();
          }
        } catch (e) {
          throw new Error('Expected JSON array from server, got something else.');
        }
  
        setMembers(data);
        setFilteredMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMembers(members);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = members.filter(member => 
      member.name.toLowerCase().includes(lowercasedSearch) || 
      member.degree.toLowerCase().includes(lowercasedSearch) || 
      member.rollNo.toLowerCase().includes(lowercasedSearch)
    );
    
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
          <AlertCircle className="mr-2 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center mb-4 md:mb-0">
          <Users className="mr-2" size={28} />
          Team Members
        </h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {members.length === 0 ? (
            <div>
              <UserCircle className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Members Found</h2>
              <p className="text-gray-500 mb-4">
                Your team doesn't have any members yet. Add your first team member to get started.
              </p>
              <Link 
                to="/add-member" 
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add First Member
              </Link>
            </div>
          ) : (
            <div>
              <Search className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Matching Results</h2>
              <p className="text-gray-500 mb-4">
                No members match your search criteria. Try adjusting your search term.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map(member => (
            <div 
              key={member._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={`/uploads/${member.profilePhoto}`} 
                  alt={`${member.name}'s profile`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h2>
                <p className="text-gray-600 mb-2">{member.degree}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    {`Year: ${member.year}`}
                  </span>
                  <span className="ml-2 truncate">{`Roll: ${member.rollNo}`}</span>
                </div>
                <Link 
                  to={`/member/${member._id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembersPage;