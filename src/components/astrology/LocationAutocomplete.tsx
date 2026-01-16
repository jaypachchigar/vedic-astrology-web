"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
    country_code?: string;
  };
}

interface LocationAutocompleteProps {
  value: string;
  onChange?: (location: {
    place: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  }) => void;
  onSelect?: (location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    formatted: string;
  }) => void;
  onPlaceChange?: (place: string) => void;
  placeholder?: string;
  label?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  onSelect,
  onPlaceChange,
  placeholder = "Enter city, country",
  label = "Place of Birth",
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch location suggestions from OpenStreetMap Nominatim
  const fetchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(searchQuery)}` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=5`,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (query.trim()) {
        fetchLocations(query);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onPlaceChange?.(newValue);
  };

  const getTimezoneFromCoords = (lat: number, lon: number, country: string): string => {
    // Simple timezone mapping based on country and longitude
    // This is a simplified approach - for production, use a proper timezone library

    // Common timezone mappings by country
    const countryTimezones: Record<string, string> = {
      'India': 'Asia/Kolkata',
      'United States': lon < -100 ? 'America/Los_Angeles' : lon < -90 ? 'America/Denver' : lon < -80 ? 'America/Chicago' : 'America/New_York',
      'United Kingdom': 'Europe/London',
      'Australia': lon < 135 ? 'Australia/Perth' : lon < 145 ? 'Australia/Adelaide' : 'Australia/Sydney',
      'Canada': lon < -120 ? 'America/Vancouver' : lon < -100 ? 'America/Edmonton' : lon < -90 ? 'America/Winnipeg' : 'America/Toronto',
      'China': 'Asia/Shanghai',
      'Japan': 'Asia/Tokyo',
      'Germany': 'Europe/Berlin',
      'France': 'Europe/Paris',
      'Brazil': lon < -60 ? 'America/Manaus' : 'America/Sao_Paulo',
      'Russia': lon < 50 ? 'Europe/Moscow' : lon < 100 ? 'Asia/Yekaterinburg' : 'Asia/Vladivostok',
      'Mexico': 'America/Mexico_City',
      'South Africa': 'Africa/Johannesburg',
      'Egypt': 'Africa/Cairo',
      'United Arab Emirates': 'Asia/Dubai',
      'Singapore': 'Asia/Singapore',
      'New Zealand': 'Pacific/Auckland',
    };

    // Check if country has a specific mapping
    for (const [countryName, timezone] of Object.entries(countryTimezones)) {
      if (country.includes(countryName)) {
        return timezone;
      }
    }

    // Fallback: Calculate approximate timezone from longitude
    // Longitude roughly corresponds to 15 degrees per hour
    const offset = Math.round(lon / 15);
    const absOffset = Math.abs(offset);
    const sign = offset >= 0 ? '+' : '-';

    // Return as Etc/GMT format (note: signs are reversed in Etc/GMT)
    return `Etc/GMT${offset >= 0 ? '-' : '+'}${absOffset}`;
  };

  const handleSelectLocation = (location: Location) => {
    const city = location.address.city || location.address.town || location.address.village || "";
    const country = location.address.country || "";
    const displayName = location.display_name;
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);

    setQuery(displayName);
    setShowSuggestions(false);
    setSuggestions([]);

    // Get timezone
    const timezone = getTimezoneFromCoords(latitude, longitude, country);

    // Call appropriate callback
    if (onChange) {
      onChange({
        place: displayName,
        city,
        country,
        latitude,
        longitude,
      });
    }

    if (onSelect) {
      onSelect({
        city,
        country,
        latitude,
        longitude,
        timezone,
        formatted: displayName,
      });
    }
  };

  return (
    <div ref={wrapperRef} className="space-y-2 relative">
      <Label>{label}</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((location, index) => {
            const city = location.address.city || location.address.town || location.address.village;
            const country = location.address.country;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectLocation(location)}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors",
                  "flex items-start space-x-3 border-b border-border last:border-b-0"
                )}
              >
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{location.display_name}</p>
                  {(city || country) && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {[city, country].filter(Boolean).join(", ")}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {parseFloat(location.lat).toFixed(4)}°N, {parseFloat(location.lon).toFixed(4)}°E
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && query.length >= 3 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground">
          No locations found. Try a different search term.
        </div>
      )}
    </div>
  );
}
