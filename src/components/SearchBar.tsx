import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="도시 이름을 입력하세요..."
          disabled={isLoading}
          className="w-full px-6 py-4 bg-white/20 backdrop-blur-md rounded-full text-white placeholder-white/70 shadow-lg outline-none ring-2 ring-white/30 focus:ring-white/60 transition-all font-medium disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/40 rounded-full transition-colors disabled:opacity-50"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};
