import { useState } from "react";
import { Layout } from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { IdCardList } from "../components/IdCardList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function Cautare() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: cardsData,
    error,
    isloading
  } = useQuery({
    queryKey: ["cardsData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/dataCiUsers");
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10 // 10 minutes
  });

  if (isloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  const handleSearch = () => {
    setHasSearched(true);

    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = cardsData.filter(
      (card) =>
        card.firstName.toLowerCase().includes(term) ||
        card.lastName.toLowerCase().includes(term) ||
        card.idNumber.toLowerCase().includes(term) ||
        card.address.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);

    if (searchTerm.trim().length === 1) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Caută cărți de identitate</h1>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="Caută după nume, CNP sau adresă..."
              value={searchTerm}
              onChange={onChangeSearchTerm}
              className="flex-grow focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white w-24"
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              Caută
            </Button>
          </div>
        </div>

        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {searchResults.length > 0
                ? `S-au găsit ${searchResults.length} rezultate pentru "${searchTerm}"`
                : `Nu s-au găsit rezultate pentru "${searchTerm}"`}
            </h2>

            {searchResults.length > 0 && <IdCardList idCards={searchResults} />}
          </div>
        )}
      </div>
    </Layout>
  );
}
