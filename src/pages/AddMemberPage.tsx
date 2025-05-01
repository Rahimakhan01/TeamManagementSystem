import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  rollNo: string;
  year: string;
  degree: string;
  aboutProject: string;
  hobbies: string;
  certificate: string;
  internship: string;
  aboutAim: string;
  profilePhoto: File | null;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    rollNo: '',
    year: '',
    degree: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutAim: '',
    profilePhoto: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (formErrors[name as keyof FormData]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (formErrors.profilePhoto) {
        setFormErrors({ ...formErrors, profilePhoto: undefined });
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.rollNo.trim()) {
      errors.rollNo = 'Roll No is required';
      isValid = false;
    }

    if (!formData.year.trim()) {
      errors.year = 'Year is required';
      isValid = false;
    }

    if (!formData.degree.trim()) {
      errors.degree = 'Degree is required';
      isValid = false;
    }

    if (!formData.aboutProject.trim()) {
      errors.aboutProject = 'About Project is required';
      isValid = false;
    }

    if (!formData.profilePhoto) {
      errors.profilePhoto = 'Profile Photo is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'profilePhoto' && value !== null) {
          formDataToSend.append(key, value);
        }
      });
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }
  
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(apiBase + '/api/members', {
        method: 'POST',
        body: formDataToSend,
      });
  
      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error(`Invalid JSON from server. Status: ${response.status}`);
      }
  
      if (!response.ok) {
        throw new Error(result?.message || `Failed to add member. Status: ${response.status}`);
      }
  
      setSuccess(true);
      setTimeout(() => navigate('/view-members'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-700 py-4 px-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <UserPlus className="mr-2" size={24} />
              Add Team Member
            </h1>
          </div>
          
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Member added successfully! Redirecting...
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-center">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="rollNo" className="block text-gray-700 font-medium mb-2">
                  Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.rollNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter roll number"
                />
                {formErrors.rollNo && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.rollNo}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="year" className="block text-gray-700 font-medium mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
                {formErrors.year && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.year}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="degree" className="block text-gray-700 font-medium mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.degree ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="E.g., B.Tech Computer Science"
                />
                {formErrors.degree && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.degree}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="aboutProject" className="block text-gray-700 font-medium mb-2">
                  About Project <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="aboutProject"
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.aboutProject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your project"
                ></textarea>
                {formErrors.aboutProject && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.aboutProject}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="hobbies" className="block text-gray-700 font-medium mb-2">
                  Hobbies (comma separated)
                </label>
                <input
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., Reading, Coding, Music"
                />
              </div>
              
              <div>
                <label htmlFor="certificate" className="block text-gray-700 font-medium mb-2">
                  Certificates
                </label>
                <input
                  type="text"
                  id="certificate"
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., AWS Certification, Google Cloud"
                />
              </div>
              
              <div>
                <label htmlFor="internship" className="block text-gray-700 font-medium mb-2">
                  Internship
                </label>
                <input
                  type="text"
                  id="internship"
                  name="internship"
                  value={formData.internship}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., Summer Internship at XYZ"
                />
              </div>
              
              <div>
                <label htmlFor="aboutAim" className="block text-gray-700 font-medium mb-2">
                  About Your Aim
                </label>
                <input
                  type="text"
                  id="aboutAim"
                  name="aboutAim"
                  value={formData.aboutAim}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your future goals and aspirations"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="profilePhoto" className="block text-gray-700 font-medium mb-2">
                  Profile Photo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profilePhoto"
                      name="profilePhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className={`block w-full px-4 py-2 border rounded-md cursor-pointer text-center ${
                        formErrors.profilePhoto
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {formData.profilePhoto ? formData.profilePhoto.name : 'Select Profile Photo'}
                    </label>
                    {formErrors.profilePhoto && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.profilePhoto}</p>
                    )}
                  </div>
                  
                  {previewUrl && (
                    <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-300">
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-1" size={18} />
                    Add Member
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberPage;