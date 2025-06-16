import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9 pr-4"
        placeholder="Caută carte de identitate..."
        onChange={handleChange}
      />
    </div>
  );
}
