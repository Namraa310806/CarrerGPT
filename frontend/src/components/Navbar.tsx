import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-xl font-bold">CareerGPT</h1>
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <ul
          className={`md:flex md:space-x-4 absolute md:static bg-blue-600 w-full md:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? 'top-16' : '-top-96'
          }`}
        >
          <li className="py-2 md:py-0"><Link to="/dashboard" className="block px-4 hover:underline">Dashboard</Link></li>
          <li className="py-2 md:py-0"><Link to="/resume-analyzer" className="block px-4 hover:underline">Resume Analyzer</Link></li>
          <li className="py-2 md:py-0"><Link to="/github-stats" className="block px-4 hover:underline">GitHub Stats</Link></li>
          <li className="py-2 md:py-0"><Link to="/interview-coach" className="block px-4 hover:underline">Interview Coach</Link></li>
          <li className="py-2 md:py-0"><Link to="/roadmap-viewer" className="block px-4 hover:underline">Roadmap</Link></li>
          <li className="py-2 md:py-0"><Link to="/analytics-dashboard" className="block px-4 hover:underline">Analytics</Link></li>
          <li className="py-2 md:py-0"><Link to="/certifications" className="block px-4 hover:underline">Certifications</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;