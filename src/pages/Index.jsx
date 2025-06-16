import { Layout } from "../components/Layout.jsx";
import { IdCardList } from "../components/IdCardList.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIdCardStatus } from "../utils/IdCardUtils.js";
import { Plus, FileCheck, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function Index() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (cardId) =>
      axios.delete(`http://localhost:3000/dataCiUsers/${cardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["cardsData"]);
    }
  });

  const {
    data: cardsData,
    error,
    isLoading
  } = useQuery({
    queryKey: ["cardsData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/dataCiUsers");
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10 // 5 minutes
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  //count id cards by status
  const validCount = cardsData.filter(
    (card) => getIdCardStatus(card.expiryDate) === "valid"
  ).length;

  const expiringCount = cardsData.filter(
    (card) => getIdCardStatus(card.expiryDate) === "expiring"
  ).length;

  const expiredCount = cardsData.filter(
    (card) => getIdCardStatus(card.expiryDate) === "expired"
  ).length;

  const handleAddNew = () => {
    navigate("/add");
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setShowDetails(true);
  };

  const deleteCardHandler = (card) => {
    console.log("Deleting ID card with ID:", card.id);
    setCardToDelete(card);
    setShowConfirmDelete(true);
    // Implement delete logic here
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      deleteMutation.mutate(cardToDelete.id);
      toast("Carte de identitate ștearsă", {
        description: `Cartea de identitate pentru ${cardToDelete.firstName} ${cardToDelete.lastName} a fost ștearsă cu succes.`,
        style: {
          backgroundColor: "#f44336",
          color: "#fff"
        }
      });
      setCardToDelete(null);
      setShowConfirmDelete(false);
    }
  };

  const cancelDelete = () => {
    setCardToDelete(null);
    setShowConfirmDelete(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Button
          onClick={handleAddNew}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adaugă nou
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatsCard
          title="Cărți valide"
          value={validCount.toString()}
          icon={<FileCheck className="h-4 w-4 text-green-500" />}
          description="Cărți de identitate în termen de valabilitate"
          className="bg-green-300 cursor-pointer"
        />
        <StatsCard
          title="Expiră curând"
          value={expiringCount.toString()}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          description="Cărți de identitate care expiră în următoarele 90 zile"
          className="bg-amber-300 cursor-pointer"
        />
        <StatsCard
          title="Expirate"
          value={expiredCount.toString()}
          icon={<AlertCircle className="h-4 w-4 text-red-500" />}
          description="Cărți de identitate expirate ce necesită reînnoire"
          className="bg-red-200 cursor-pointer"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Toate</TabsTrigger>
          <TabsTrigger value="valid">Valide</TabsTrigger>
          <TabsTrigger value="expiring">Expiră curând</TabsTrigger>
          <TabsTrigger value="expired">Expirate</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <IdCardList
            idCards={cardsData}
            onSelectCard={handleSelectCard}
            onDeleteCard={deleteCardHandler}
            showDeleteButton={true}
          />
        </TabsContent>

        <TabsContent value="valid" className="mt-4">
          <IdCardList
            idCards={cardsData.filter(
              (card) => getIdCardStatus(card.expiryDate) === "valid"
            )}
            onSelectCard={handleSelectCard}
          />
        </TabsContent>

        <TabsContent value="expiring" className="mt-4">
          <IdCardList
            idCards={cardsData.filter(
              (card) => getIdCardStatus(card.expiryDate) === "expiring"
            )}
            onSelectCard={handleSelectCard}
          />
        </TabsContent>

        <TabsContent value="expired" className="mt-4">
          <IdCardList
            idCards={cardsData.filter(
              (card) => getIdCardStatus(card.expiryDate) === "expired"
            )}
            onSelectCard={handleSelectCard}
            onDeleteCard={deleteCardHandler}
            showDeleteButton={true}
          />
        </TabsContent>
      </Tabs>

      {selectedCard && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Detalii carte de identitate</DialogTitle>
              <DialogDescription>
                Informații complete despre cartea de identitate selectată
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedCard.photo && (
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedCard.photo}
                    alt={`${selectedCard.firstName} ${selectedCard.lastName}`}
                    className="w-32 h-32 rounded-md object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Nume complet:</div>
                <div>
                  {selectedCard.firstName} {selectedCard.lastName}
                </div>

                <div className="text-sm font-medium">CNP:</div>
                <div>{selectedCard.idNumber}</div>

                <div className="text-sm font-medium">Data nașterii:</div>
                <div>{formatDate(selectedCard.birthDate)}</div>

                <div className="text-sm font-medium">Data emiterii:</div>
                <div>{formatDate(selectedCard.issueDate)}</div>

                <div className="text-sm font-medium">Data expirării:</div>
                <div
                  className={`${
                    getIdCardStatus(selectedCard.expiryDate) === "expired"
                      ? "text-red-600 font-semibold"
                      : ""
                  }`}
                >
                  {formatDate(selectedCard.expiryDate)}
                </div>

                <div className="text-sm font-medium">Status:</div>
                <div>
                  <StatusBadge
                    status={getIdCardStatus(selectedCard.expiryDate)}
                  />
                </div>

                <div className="text-sm font-medium col-span-2">Adresa:</div>
                <div className="col-span-2">{selectedCard.address}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showConfirmDelete && (
        <AlertDialog
          open={showConfirmDelete}
          onOpenChange={setShowConfirmDelete}
        >
          <AlertDialogContent className="max-w-sm bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmați ștergerea</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-400">
                {cardToDelete &&
                  `Sunteți sigur că doriți să ștergeți cartea de identitate expirată pentru ${cardToDelete.firstName} ${cardToDelete.lastName}?`}
                <br />
                Această acțiune nu poate fi anulată dupa stergere!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>
                Anulează
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Șterge
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Layout>
  );
}

const StatsCard = ({ title, value, icon, description, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }) => {
  const statusMap = {
    valid: { text: "Valid", class: "bg-green-100 text-green-800" },
    expiring: { text: "Expiră curând", class: "bg-amber-100 text-amber-800" },
    expired: { text: "Expirat", class: "bg-red-100 text-red-800" }
  };

  const statusInfo = statusMap[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.class}`}
    >
      {statusInfo.text}
    </span>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};
