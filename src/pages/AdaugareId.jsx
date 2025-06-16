import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AddCardForm } from "../components/addCardForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function AdaugareId() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios.post("http://localhost:3000/dataCiUsers", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["cardsData"]);
      setTimeout(() => {
        console.log("Navigating...");
        navigate("/");
      }, 1500);
    }
  });

  const handleAddIdCard = (newUser) => {
    mutation.mutate(newUser);
    toast("Carte de identitate adăugată", {
      description: `Cartea de identitate pentru ${newUser.firstName} ${newUser.lastName} a fost adăugată cu succes.`,
      style: {
        backgroundColor: "#4caf50",
        color: "#fff"
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Adaugă carte de identitate nouă
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Formular adăugare</CardTitle>
            <CardDescription>
              Completați toate câmpurile obligatorii pentru a adăuga o carte de
              identitate nouă în sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddCardForm onAddIdCard={handleAddIdCard} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
