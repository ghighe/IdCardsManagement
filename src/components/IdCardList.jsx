import { IdCard } from "./IdCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { filterIdCardsByStatus, searchIdCards } from "@/utils/IdCardUtils";
import { useState } from "react";

export function IdCardList({
  idCards,
  onSelectCard,
  onDeleteCard,
  showDeleteButton = false
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCards = filterIdCardsByStatus(
    searchIdCards(idCards, searchTerm),
    statusFilter
  );

  console.log("filteredCards", filteredCards);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Caută după nume sau CNP..."
            className="w-full p-2 pl-8 border rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-2 top-3 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrează după status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate</SelectItem>
            <SelectItem value="valid">Active</SelectItem>
            <SelectItem value="expiring">Inactive</SelectItem>
            <SelectItem value="expired">Expirate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <IdCard
              key={card.id}
              idCard={card}
              onClick={() => onSelectCard(card)}
              onDelete={() => onDeleteCard(card)}
              showDeleteButton={showDeleteButton}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-muted/50 rounded-md">
          <p>
            Nu s-au găsit cărți de identitate care să corespundă criteriilor.
          </p>
        </div>
      )}
    </div>
  );
}
