import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from "../utils/IdCardUtils.js";
import { useState } from "react";
import { toast } from "sonner";

export function AddCardForm({ onAddIdCard }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    issueDate: "",
    expiryDate: "",
    address: "",
    photo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.idNumber) {
      return;
    }

    const newIdCard = {
      id: generateId(),
      ...formData
    };

    onAddIdCard(newIdCard);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      idNumber: "",
      birthDate: "",
      issueDate: "",
      expiryDate: "",
      address: "",
      photo: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prenume *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Introduceți prenumele"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nume *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Introduceți numele"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">CNP *</Label>
          <Input
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Introduceți CNP-ul"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Data nașterii *</Label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issueDate">Data emiterii *</Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Data expirării *</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Adresa *</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Introduceți adresa completă"
            required
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="photo">URL Fotografie</Label>
          <Input
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Introduceți URL-ul fotografiei (opțional)"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white"
      >
        Adaugă carte de identitate
      </Button>
    </form>
  );
}
