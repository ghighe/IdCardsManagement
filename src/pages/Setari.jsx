import { Layout } from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export function Setari() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  console.log("Dark mode:", darkMode);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      toast("Mod întunecat dezactivat", {
        description: "Modul întunecat a fost dezactivat."
      });
    } else {
      document.documentElement.classList.add("dark");
      toast("Mod întunecat activat", {
        description: "Modul întunecat a fost activat."
      });
    }
  };

  const handleSaveSettings = () => {
    const theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    toast("Setări salvate", {
      description: "Setările au fost actualizate cu succes.",
      style: {
        backgroundColor: "#4caf50",
        color: "#fff"
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Setări</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificări</CardTitle>
              <CardDescription>
                Configurați notificările pentru cărțile de identitate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-expiring" className="flex-1">
                  Notificări pentru cărți care expiră în curând
                </Label>
                <label className="switch">
                  <input id="notify-expiring" type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-expired" className="flex-1">
                  Notificări pentru cărți expirate
                </Label>
                <label className="switch">
                  <input id="notify-expired" type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-email" className="flex-1">
                  Trimite notificări prin email
                </Label>
                <label className="switch">
                  <input id="notify-email" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Securitate</CardTitle>
              <CardDescription>
                Configurați setările de securitate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="secure-login" className="flex-1">
                  Autentificare cu doi factori
                </Label>
                <label className="switch">
                  <input id="secure-login" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout" className="flex-1">
                  Sesiune inactivă după 30 de minute
                </Label>
                <label className="switch">
                  <input id="session-timeout" type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Afișare</CardTitle>
              <CardDescription>
                Configurați preferințele de afișare
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex-1">
                  Mod întunecat
                </Label>
                <label className="switch">
                  <input
                    id="dark-mode"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view" className="flex-1">
                  Mod compact
                </Label>
                <label className="switch">
                  <input id="compact-view" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Salvează setările
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
