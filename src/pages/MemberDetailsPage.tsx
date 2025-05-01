import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Award, 
  Heart, 
  Target, 
  ChevronLeft, 
  Loader, 
  AlertCircle 
} from 'lucide-react';

type Member = {
  _id: string;
  name: string;
  rollNo: string;
  year: string;
  degree: string;
  aboutProject: string;
  hobbies: string;
  certificate: string;
  internship: string;
  aboutAim: string;
  profilePhoto: string;
};

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`/api/members/${id}`);
        let data;
        try {
          data = await response.json();
        } catch (e) {
          throw new Error('Invalid JSON in member detail response');
        }
        if (!response.ok) {
          throw new Error(data?.message || 'Failed to fetch member details');
        }
        setMember(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchMemberDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-gray-600">Loading member details...</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
          <AlertCircle className="mr-2 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold">Error</h3>
            <p>{error || 'Member not found'}</p>
          </div>
        </div>
        <div className="mt-4">
          <Link 
            to="/view-members" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to All Members
          </Link>
        </div>
      </div>
    );
  }

  const hobbyList = member.hobbies?.split(',').map(hobby => hobby.trim()).filter(Boolean) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/view-members" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to All Members
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-48 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-lg mt-2 opacity-90">{member.degree}</p>
          </div>
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 -mt-16 md:mr-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={`/uploads/${member.profilePhoto}`} 
                  alt={`${member.name}'s profile`} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                  }}
                />
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-700">Roll No</div>
                    <div className="text-gray-600">{member.rollNo}</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-700">Year</div>
                    <div className="text-gray-600">{member.year}</div>
                  </div>
                </div>
              </div>
              
              {hobbyList.length > 0 && (
                <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center mb-3">
                    <Heart className="text-red-500 mr-2" size={20} />
                    <h3 className="text-lg font-semibold text-gray-800">Hobbies</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hobbyList.map((hobby, index) => (
                      <span 
                        key={index} 
                        className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 mt-6 md:mt-4">
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                <div className="flex items-center mb-4">
                  <User className="text-blue-600 mr-2" size={22} />
                  <h2 className="text-xl font-semibold text-gray-800">About Member</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-700 mb-2">
                      <BookOpen className="text-green-600 mr-2" size={18} />
                      About Project
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {member.aboutProject || 'No project information available.'}
                    </p>
                  </div>
                  
                  {member.internship && (
                    <div>
                      <h3 className="flex items-center text-lg font-medium text-gray-700 mb-2">
                        <Briefcase className="text-blue-600 mr-2" size={18} />
                        Internship Experience
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {member.internship}
                      </p>
                    </div>
                  )}
                  
                  {member.certificate && (
                    <div>
                      <h3 className="flex items-center text-lg font-medium text-gray-700 mb-2">
                        <Award className="text-yellow-600 mr-2" size={18} />
                        Certifications
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {member.certificate}
                      </p>
                    </div>
                  )}
                  
                  {member.aboutAim && (
                    <div>
                      <h3 className="flex items-center text-lg font-medium text-gray-700 mb-2">
                        <Target className="text-red-600 mr-2" size={18} />
                        Future Goals
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {member.aboutAim}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;