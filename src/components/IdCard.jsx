import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2 } from "lucide-react";
import { formatDate, getIdCardStatus } from "../utils/IdCardUtils";
import { Button } from "@/components/ui/button";

export function IdCard({
  idCard,
  onClick,
  onDelete,
  showDeleteButton = false
}) {
  const status = getIdCardStatus(idCard.expiryDate);

  const getStatusColors = (status) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "expiring":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "expired":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-green-100 text-green-800 hover:bg-green-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "valid":
        return "Valid";
      case "expiring":
        return "Expiră curând";
      case "expired":
        return "Expirat";
      default:
        return "Valid";
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick event of the card
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
        status === "expired" ? "border-red-300" : "border-green-300"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex p-4 justify-between">
          <div className="flex">
            <div className="mr-4">
              {idCard.photo ? (
                <div className="w-16 h-16 rounded-md overflow-hidden">
                  <img
                    src={idCard.photo}
                    alt={`${idCard.firstName} ${idCard.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {idCard.firstName} {idCard.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                CNP: {idCard.idNumber}
              </p>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className={getStatusColors(status)}>
                  {getStatusText(status)}
                </Badge>
                <p className="text-xs text-muted-foreground ml-2">
                  Expiră: {formatDate(idCard.expiryDate)}
                </p>
              </div>
            </div>
          </div>

          {showDeleteButton && status === "expired" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => handleDelete(e)}
              className="h-8 w-8 p-0 rounded-full bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
