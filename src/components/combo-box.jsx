import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

function ComboBox({ options, placeholder, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    String(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    setSearchTerm(String(option));
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value); // Clear the selected value if the input changes
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (value) {
      setSearchTerm(String(value));
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-full"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={String(option)}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComboBox;
