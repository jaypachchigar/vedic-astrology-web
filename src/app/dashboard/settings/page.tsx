"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Globe, Moon, Sun, Trash2, Download, Loader2, Shield, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface UserSettings {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    dailyHoroscope: boolean;
    weeklyPredictions: boolean;
    planetaryTransits: boolean;
    emailUpdates: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowAnalytics: boolean;
  };
  predictions: {
    defaultYear: number;
    showRemedies: boolean;
    showMantras: boolean;
  };
}

const defaultSettings: UserSettings = {
  theme: "dark",
  language: "en",
  notifications: {
    dailyHoroscope: true,
    weeklyPredictions: true,
    planetaryTransits: false,
    emailUpdates: false,
  },
  privacy: {
    showProfile: false,
    allowAnalytics: true,
  },
  predictions: {
    defaultYear: new Date().getFullYear(),
    showRemedies: true,
    showMantras: true,
  },
};

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const stored = localStorage.getItem("userSettings");
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      localStorage.setItem("userSettings", JSON.stringify(settings));

      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (settings.theme === "light") {
        document.documentElement.classList.remove("dark");
      }

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleExportData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: charts } = await supabase
        .from("birth_charts")
        .select("*")
        .eq("user_id", user.id);

      const exportData = {
        exportDate: new Date().toISOString(),
        profile,
        birthCharts: charts,
        settings,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vedic-astrology-data-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data. Please try again.");
    }
  }

  async function handleDeleteAccount() {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("birth_charts").delete().eq("user_id", user.id);
      await supabase.from("chat_history").delete().eq("user_id", user.id);
      await supabase.from("profiles").delete().eq("id", user.id);

      await supabase.auth.signOut();
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please contact support.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your experience and manage preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {settings.theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Select your preferred color theme</p>
              </div>
              <Select
                value={settings.theme}
                onValueChange={(value: string) =>
                  setSettings({ ...settings, theme: value as "light" | "dark" | "system" })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">Display language for the app</p>
              </div>
              <Select
                value={settings.language}
                onValueChange={(value: string) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-purple/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Horoscope</Label>
                <p className="text-sm text-muted-foreground">Receive daily predictions</p>
              </div>
              <Switch
                checked={settings.notifications.dailyHoroscope}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, dailyHoroscope: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Predictions</Label>
                <p className="text-sm text-muted-foreground">Weekly forecast summaries</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyPredictions}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyPredictions: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Planetary Transits</Label>
                <p className="text-sm text-muted-foreground">Alerts for important transits</p>
              </div>
              <Switch
                checked={settings.notifications.planetaryTransits}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, planetaryTransits: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Updates</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.emailUpdates}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailUpdates: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Prediction Preferences */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-gold/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Prediction Preferences</span>
            </CardTitle>
            <CardDescription>Customize your prediction display</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Default Prediction Year</Label>
                <p className="text-sm text-muted-foreground">Year for yearly predictions</p>
              </div>
              <Select
                value={settings.predictions.defaultYear.toString()}
                onValueChange={(value: string) =>
                  setSettings({
                    ...settings,
                    predictions: { ...settings.predictions, defaultYear: parseInt(value) },
                  })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Remedies</Label>
                <p className="text-sm text-muted-foreground">Display astrological remedies</p>
              </div>
              <Switch
                checked={settings.predictions.showRemedies}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    predictions: { ...settings.predictions, showRemedies: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Mantras</Label>
                <p className="text-sm text-muted-foreground">Display recommended mantras</p>
              </div>
              <Switch
                checked={settings.predictions.showMantras}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    predictions: { ...settings.predictions, showMantras: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy</span>
            </CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve the app with usage data</p>
              </div>
              <Switch
                checked={settings.privacy.allowAnalytics}
                onCheckedChange={(checked: boolean) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, allowAnalytics: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-destructive/20 bg-gradient-to-br from-card via-card to-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Data Management</span>
            </CardTitle>
            <CardDescription>Export or delete your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Export Data</Label>
                <p className="text-sm text-muted-foreground">Download all your data as JSON</p>
              </div>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="border-t border-destructive/20 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  variant={showDeleteConfirm ? "destructive" : "outline"}
                  onClick={handleDeleteAccount}
                  className={showDeleteConfirm ? "" : "border-destructive/50 text-destructive hover:bg-destructive/10"}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {showDeleteConfirm ? "Confirm Delete" : "Delete"}
                </Button>
              </div>
              {showDeleteConfirm && (
                <p className="text-sm text-destructive mt-2">
                  Click again to permanently delete. This action cannot be undone.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setSettings(defaultSettings)}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
