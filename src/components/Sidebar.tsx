import React from 'react';
import { School, X } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onCourseClick: (course: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, onSuggestionClick, onCourseClick }) => {
  const suggestions = [
    {
      category: "College Information",
      queries: [
        "Tell me about Andhra University",
        "Tell me about JNTUK",
        "Show me engineering colleges in Vizag",
        "List top colleges in Andhra Pradesh"
      ]
    },
    {
      category: "Course & Branch Queries",
      queries: [
        "What colleges offer CSE branch?",
        "Show B.Tech colleges",
        "Which colleges have ECE branch?",
        "List colleges with Mechanical Engineering"
      ]
    },
    {
      category: "Placement & Facilities",
      queries: [
        "JNTUK placement details",
        "Andhra University placement stats",
        "Colleges with hostel facilities",
        "Best placement records in AP colleges"
      ]
    }
  ];

  return (
    <div className="w-72 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <School className="text-blue-600" size={24} />
          <h1 className="text-xl font-bold text-gray-800">AP College Guide</h1>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {suggestions.map((section, index) => (
            <div key={index}>
              <h2 className="text-sm font-semibold text-gray-500 mb-2">
                {section.category.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {section.queries.map((query, queryIndex) => (
                  <button
                    key={queryIndex}
                    onClick={() => onSuggestionClick(query)}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm transition-colors duration-150"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;