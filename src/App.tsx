import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-member" element={<AddMemberPage />} />
            <Route path="/view-members" element={<ViewMembersPage />} />
            <Route path="/member/:id" element={<MemberDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;