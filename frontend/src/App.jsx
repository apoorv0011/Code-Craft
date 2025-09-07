import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CodeGenerator from './pages/CodeGenerator';
import CodeExplainer from './pages/CodeExplainer';
import CodeCompletion from './pages/CodeCompletion';
import BugDetector from './pages/BugDetector';
import CodeConverter from './pages/CodeConverter';
import CodeDocumentation from './pages/CodeDocumentation';
import CodeRefactor from './pages/CodeRefactor';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/code-generator" element={<ProtectedRoute><CodeGenerator /></ProtectedRoute>} />
            <Route path="/code-explainer" element={<ProtectedRoute><CodeExplainer /></ProtectedRoute>} />
            <Route path="/code-completion" element={<ProtectedRoute><CodeCompletion /></ProtectedRoute>} />
            <Route path="/bug-detector" element={<ProtectedRoute><BugDetector /></ProtectedRoute>} />
            <Route path="/code-converter" element={<ProtectedRoute><CodeConverter /></ProtectedRoute>} />
            <Route path="/code-documentation" element={<ProtectedRoute><CodeDocumentation /></ProtectedRoute>} />
            <Route path="/code-refactor" element={<ProtectedRoute><CodeRefactor /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
