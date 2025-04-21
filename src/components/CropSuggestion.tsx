import { LeafIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const CropSuggestion = () => {
  const [soilType, setSoilType] = useState("");
  const [state, setState] = useState("");
  const [month, setMonth] = useState("");
  const [suggestions, setSuggestions] = useState<null | string[]>(null);

  // Mock function to suggest crops
  const suggestCrops = () => {
    if (!soilType || !state || !month) return;

    // This would come from an API in a real application
    const mockSuggestions = {
      "Maharashtra": {
        "January": {
          "Clay": ["Wheat", "Chickpea", "Mustard", "Peas"],
          "Sandy": ["Groundnuts", "Millets", "Bajra"],
          "Silt": ["Sugarcane", "Cotton", "Chili"],
          "Loam": ["Wheat", "Gram", "Sunflowers"],
        },
        "February": {
          "Clay": ["Wheat", "Gram", "Vegetables"],
          "Sandy": ["Groundnuts", "Melons", "Watermelons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Wheat", "Vegetables", "Sunflowers"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Gourds", "Cucumber"],
          "Sandy": ["Watermelons", "Muskmelons", "Gourds"],
          "Silt": ["Sugarcane", "Gourds", "Vegetables"],
          "Loam": ["Vegetables", "Gourds", "Cucumber"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Gourds"],
          "Sandy": ["Watermelons", "Muskmelons"],
          "Silt": ["Sugarcane", "Summer Vegetables"],
          "Loam": ["Summer Vegetables", "Gourds"],
        },
        "May": {
          "Clay": ["Rice Nursery", "Cotton"],
          "Sandy": ["Cotton", "Vegetables"],
          "Silt": ["Cotton", "Sugarcane"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Soybean"],
          "Sandy": ["Cotton", "Bajra", "Vegetables"],
          "Silt": ["Cotton", "Sugarcane", "Vegetables"],
          "Loam": ["Cotton", "Soybean", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Soybean", "Pigeon Pea"],
          "Sandy": ["Bajra", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Pulses"],
          "Loam": ["Soybean", "Vegetables", "Pulses"],
        },
        "August": {
          "Clay": ["Rice", "Soybean", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Wheat", "Gram", "Vegetables"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Gram", "Mustard"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Wheat"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Gram", "Peas", "Mustard"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Wheat"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
      },
      "Karnataka": {
        "January": {
          "Clay": ["Wheat", "Chickpea", "Jowar"],
          "Sandy": ["Groundnuts", "Ragi", "Jowar"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Wheat", "Vegetables", "Sunflowers"],
        },
        "February": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Gourds"],
          "Sandy": ["Watermelons", "Muskmelons"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Gourds"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Cotton"],
          "Sandy": ["Watermelons", "Cotton"],
          "Silt": ["Sugarcane", "Cotton"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "May": {
          "Clay": ["Cotton", "Rice Nursery"],
          "Sandy": ["Cotton", "Millets"],
          "Silt": ["Sugarcane", "Cotton"],
          "Loam": ["Cotton", "Pulses"],
        },
        "June": {
          "Clay": ["Rice", "Cotton"],
          "Sandy": ["Millets", "Cotton"],
          "Silt": ["Sugarcane", "Cotton"],
          "Loam": ["Cotton", "Pulses"],
        },
        "July": {
          "Clay": ["Rice", "Pulses"],
          "Sandy": ["Millets", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Pulses", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Pulses"],
          "Sandy": ["Millets", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Pulses", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Pulses"],
          "Sandy": ["Ragi", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Pulses", "Vegetables"],
        },
        "October": {
          "Clay": ["Jowar", "Wheat", "Vegetables"],
          "Sandy": ["Ragi", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Chickpea", "Jowar"],
          "Sandy": ["Ragi", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Chickpea", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Chickpea", "Jowar"],
          "Sandy": ["Ragi", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Chickpea", "Vegetables"],
        },
      },
      "Uttar Pradesh": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Peas"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Gourds"],
          "Sandy": ["Summer Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Gourds"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Gourds"],
          "Sandy": ["Melons", "Gourds"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Vegetables", "Gourds"],
        },
        "May": {
          "Clay": ["Rice Nursery", "Cotton"],
          "Sandy": ["Cotton", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Rice", "Maize", "Vegetables"],
          "Sandy": ["Maize", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Maize", "Vegetables"],
          "Loam": ["Maize", "Pulses", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Maize", "Pulses"],
          "Sandy": ["Maize", "Pulses", "Millets"],
          "Silt": ["Sugarcane", "Maize", "Vegetables"],
          "Loam": ["Maize", "Pulses", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Pulses"],
          "Sandy": ["Maize", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Pulses", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables"],
          "Loam": ["Pulses", "Vegetables"],
        },
        "October": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Peas"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Peas"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
      },
      "Gujarat": {
        "January": {
          "Clay": ["Wheat", "Chickpea", "Mustard"],
          "Sandy": ["Groundnuts", "Bajra", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Wheat"],
          "Loam": ["Wheat", "Chickpea", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Chickpea", "Vegetables"],
          "Sandy": ["Groundnuts", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Wheat"],
          "Loam": ["Wheat", "Chickpea", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Gourds"],
          "Sandy": ["Groundnuts", "Melons", "Watermelons"],
          "Silt": ["Sugarcane", "Vegetables", "Gourds"],
          "Loam": ["Summer Vegetables", "Gourds"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Cotton"],
          "Sandy": ["Groundnuts", "Cotton", "Melons"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Summer Vegetables"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables"],
          "Sandy": ["Cotton", "Groundnuts", "Bajra"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Cotton", "Bajra", "Vegetables"],
          "Sandy": ["Cotton", "Bajra", "Groundnuts"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Bajra", "Vegetables"],
        },
        "July": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Cotton", "Bajra", "Groundnuts"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "August": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Cotton", "Bajra", "Groundnuts"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "September": {
          "Clay": ["Cotton", "Vegetables"],
          "Sandy": ["Cotton", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "October": {
          "Clay": ["Wheat", "Chickpea", "Vegetables"],
          "Sandy": ["Groundnuts", "Wheat", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Chickpea", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Chickpea", "Mustard"],
          "Sandy": ["Groundnuts", "Wheat", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Chickpea", "Mustard"],
        },
        "December": {
          "Clay": ["Wheat", "Chickpea", "Mustard"],
          "Sandy": ["Groundnuts", "Wheat", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Wheat", "Chickpea", "Mustard"],
        },
      },
      "Tamil Nadu": {
        "January": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables", "Pulses"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables", "Pulses"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Vegetables"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Rice", "Cotton", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Cotton", "Vegetables"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Rice", "Cotton", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Cotton", "Vegetables"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Rice", "Cotton", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "October": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Millets", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Millets", "Vegetables"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Punjab": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "March": {
          "Clay": ["Wheat", "Vegetables", "Pulses"],
          "Sandy": ["Wheat", "Vegetables", "Melons"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables", "Rice Nursery"],
          "Sandy": ["Cotton", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Maize", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Maize", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Maize", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Maize", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "October": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
      },
      "West Bengal": {
        "January": {
          "Clay": ["Rice", "Wheat", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Vegetables"],
        },
        "February": {
          "Clay": ["Rice", "Wheat", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables", "Jute"],
          "Sandy": ["Vegetables", "Pulses", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Jute"],
          "Loam": ["Summer Rice", "Vegetables", "Jute"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables", "Jute"],
          "Sandy": ["Vegetables", "Pulses", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Jute"],
          "Loam": ["Summer Rice", "Vegetables", "Jute"],
        },
        "May": {
          "Clay": ["Jute", "Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Jute", "Rice Nursery"],
          "Silt": ["Sugarcane", "Vegetables", "Jute"],
          "Loam": ["Jute", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Jute", "Vegetables"],
          "Silt": ["Sugarcane", "Jute", "Rice"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Jute", "Vegetables"],
          "Silt": ["Sugarcane", "Jute", "Rice"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Jute", "Vegetables"],
          "Silt": ["Sugarcane", "Jute", "Rice"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Wheat", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Vegetables"],
        },
        "December": {
          "Clay": ["Rice", "Wheat", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Vegetables"],
        },
      },
      "Rajasthan": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Barley"],
          "Sandy": ["Wheat", "Mustard", "Gram"],
          "Silt": ["Wheat", "Vegetables", "Mustard"],
          "Loam": ["Wheat", "Mustard", "Gram"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Barley"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Melons"],
          "Sandy": ["Melons", "Watermelons", "Vegetables"],
          "Silt": ["Summer Vegetables", "Melons"],
          "Loam": ["Summer Vegetables", "Melons"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Melons"],
          "Sandy": ["Melons", "Watermelons", "Vegetables"],
          "Silt": ["Summer Vegetables", "Melons"],
          "Loam": ["Summer Vegetables", "Melons"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables"],
          "Sandy": ["Cotton", "Bajra", "Vegetables"],
          "Silt": ["Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Bajra", "Cotton", "Pulses"],
          "Silt": ["Cotton", "Bajra", "Pulses"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "July": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Bajra", "Cotton", "Pulses"],
          "Silt": ["Cotton", "Bajra", "Pulses"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "August": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Bajra", "Cotton", "Pulses"],
          "Silt": ["Cotton", "Bajra", "Pulses"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "September": {
          "Clay": ["Cotton", "Bajra", "Pulses"],
          "Sandy": ["Bajra", "Cotton", "Pulses"],
          "Silt": ["Cotton", "Bajra", "Pulses"],
          "Loam": ["Cotton", "Bajra", "Pulses"],
        },
        "October": {
          "Clay": ["Wheat", "Mustard", "Gram"],
          "Sandy": ["Wheat", "Mustard", "Gram"],
          "Silt": ["Wheat", "Vegetables", "Mustard"],
          "Loam": ["Wheat", "Mustard", "Gram"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Barley"],
          "Sandy": ["Wheat", "Mustard", "Gram"],
          "Silt": ["Wheat", "Vegetables", "Mustard"],
          "Loam": ["Wheat", "Mustard", "Gram"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Barley"],
          "Sandy": ["Wheat", "Mustard", "Gram"],
          "Silt": ["Wheat", "Vegetables", "Mustard"],
          "Loam": ["Wheat", "Mustard", "Gram"],
        },
      },
      "Andhra Pradesh": {
        "January": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "February": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables"],
          "Sandy": ["Groundnuts", "Cotton", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Pulses"],
          "Sandy": ["Groundnuts", "Cotton", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Rice", "Cotton", "Pulses"],
        },
        "July": {
          "Clay": ["Rice", "Cotton", "Pulses"],
          "Sandy": ["Groundnuts", "Cotton", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Rice", "Cotton", "Pulses"],
        },
        "August": {
          "Clay": ["Rice", "Cotton", "Pulses"],
          "Sandy": ["Groundnuts", "Cotton", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Rice", "Cotton", "Pulses"],
        },
        "September": {
          "Clay": ["Rice", "Cotton", "Pulses"],
          "Sandy": ["Groundnuts", "Cotton", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Rice", "Cotton", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "December": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Groundnuts", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
      },
      "Madhya Pradesh": {
        "January": {
          "Clay": ["Wheat", "Gram", "Mustard"],
          "Sandy": ["Wheat", "Gram", "Barley"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Mustard"],
        },
        "February": {
          "Clay": ["Wheat", "Gram", "Vegetables"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses", "Melons"],
          "Silt": ["Sugarcane", "Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses", "Melons"],
          "Silt": ["Sugarcane", "Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Cotton", "Rice Nursery", "Vegetables"],
          "Sandy": ["Cotton", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Rice Nursery", "Vegetables"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Soybean"],
          "Sandy": ["Cotton", "Jowar", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Soybean", "Cotton", "Rice"],
        },
        "July": {
          "Clay": ["Rice", "Cotton", "Soybean"],
          "Sandy": ["Cotton", "Jowar", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Soybean", "Cotton", "Rice"],
        },
        "August": {
          "Clay": ["Rice", "Cotton", "Soybean"],
          "Sandy": ["Cotton", "Jowar", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Soybean", "Cotton", "Rice"],
        },
        "September": {
          "Clay": ["Rice", "Cotton", "Soybean"],
          "Sandy": ["Cotton", "Jowar", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Soybean", "Cotton", "Rice"],
        },
        "October": {
          "Clay": ["Wheat", "Gram", "Vegetables"],
          "Sandy": ["Wheat", "Gram", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Gram", "Mustard"],
          "Sandy": ["Wheat", "Gram", "Barley"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Mustard"],
        },
        "December": {
          "Clay": ["Wheat", "Gram", "Mustard"],
          "Sandy": ["Wheat", "Gram", "Barley"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Gram", "Mustard"],
        },
      },
      "Bihar": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Pulses", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Pulses", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Summer Vegetables"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Summer Vegetables"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Jute", "Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Sugarcane", "Vegetables", "Jute"],
          "Loam": ["Jute", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Jute", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Sugarcane", "Rice", "Maize"],
          "Loam": ["Rice", "Jute", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Jute", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Sugarcane", "Rice", "Maize"],
          "Loam": ["Rice", "Jute", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Jute", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Sugarcane", "Rice", "Maize"],
          "Loam": ["Rice", "Jute", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Pulses", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Sugarcane", "Vegetables"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
      },
      "Telangana": {
        "January": {
          "Clay": ["Rice", "Jowar", "Vegetables"],
          "Sandy": ["Groundnuts", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jowar", "Vegetables"],
        },
        "February": {
          "Clay": ["Rice", "Jowar", "Vegetables"],
          "Sandy": ["Groundnuts", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jowar", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables"],
          "Sandy": ["Groundnuts", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables"],
          "Sandy": ["Groundnuts", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Rice", "Vegetables"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables"],
          "Sandy": ["Cotton", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables"],
        },
        "June": {
          "Clay": ["Cotton", "Rice", "Pulses"],
          "Sandy": ["Cotton", "Groundnuts", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Cotton", "Rice", "Pulses"],
        },
        "July": {
          "Clay": ["Cotton", "Rice", "Pulses"],
          "Sandy": ["Cotton", "Groundnuts", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Cotton", "Rice", "Pulses"],
        },
        "August": {
          "Clay": ["Cotton", "Rice", "Pulses"],
          "Sandy": ["Cotton", "Groundnuts", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Cotton", "Rice", "Pulses"],
        },
        "September": {
          "Clay": ["Cotton", "Rice", "Pulses"],
          "Sandy": ["Cotton", "Groundnuts", "Pulses"],
          "Silt": ["Sugarcane", "Cotton", "Rice"],
          "Loam": ["Cotton", "Rice", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Jowar", "Vegetables"],
          "Sandy": ["Groundnuts", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jowar", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Jowar", "Vegetables"],
          "Sandy": ["Groundnuts", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jowar", "Vegetables"],
        },
        "December": {
          "Clay": ["Rice", "Jowar", "Vegetables"],
          "Sandy": ["Groundnuts", "Jowar", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jowar", "Vegetables"],
        },
      },
      "Haryana": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "March": {
          "Clay": ["Wheat", "Vegetables", "Pulses"],
          "Sandy": ["Wheat", "Vegetables", "Melons"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Vegetables", "Cotton"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Cotton", "Vegetables", "Rice Nursery"],
          "Sandy": ["Cotton", "Vegetables", "Melons"],
          "Silt": ["Sugarcane", "Cotton", "Vegetables"],
          "Loam": ["Cotton", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Bajra", "Maize"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Bajra", "Maize"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Bajra", "Maize"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Cotton", "Maize"],
          "Sandy": ["Cotton", "Bajra", "Maize"],
          "Silt": ["Sugarcane", "Cotton", "Maize"],
          "Loam": ["Rice", "Cotton", "Maize"],
        },
        "October": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Vegetables"],
          "Sandy": ["Wheat", "Barley", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Sugarcane"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
      },
      "Kerala": {
        "January": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "February": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "March": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "April": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "May": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "June": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "October": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
        "December": {
          "Clay": ["Rice", "Coconut", "Vegetables"],
          "Sandy": ["Coconut", "Tapioca", "Vegetables"],
          "Silt": ["Coconut", "Rice", "Vegetables"],
          "Loam": ["Rice", "Coconut", "Vegetables"],
        },
      },
      "Odisha": {
        "January": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "February": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables", "Pulses"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables", "Pulses"],
          "Sandy": ["Groundnuts", "Vegetables", "Pulses"],
          "Silt": ["Sugarcane", "Vegetables", "Pulses"],
          "Loam": ["Summer Rice", "Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Jute", "Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Vegetables", "Jute"],
          "Loam": ["Jute", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Groundnuts", "Vegetables"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables"],
          "Sandy": ["Rice", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Vegetables"],
        },
        "October": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "December": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Pulses", "Vegetables", "Groundnuts"],
          "Silt": ["Sugarcane", "Rice", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
      },
      "Jharkhand": {
        "January": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Pulses", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Pulses", "Vegetables"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Maize", "Pulses"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Maize", "Pulses"],
          "Loam": ["Rice", "Maize", "Pulses"],
        },
        "July": {
          "Clay": ["Rice", "Maize", "Pulses"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Maize", "Pulses"],
          "Loam": ["Rice", "Maize", "Pulses"],
        },
        "August": {
          "Clay": ["Rice", "Maize", "Pulses"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Maize", "Pulses"],
          "Loam": ["Rice", "Maize", "Pulses"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Mustard", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Mustard", "Vegetables"],
        },
      },
      "Assam": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Summer Rice", "Vegetables", "Jute"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Summer Rice", "Vegetables", "Jute"],
          "Loam": ["Summer Rice", "Vegetables", "Jute"],
        },
        "April": {
          "Clay": ["Summer Rice", "Vegetables", "Jute"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Summer Rice", "Vegetables", "Jute"],
          "Loam": ["Summer Rice", "Vegetables", "Jute"],
        },
        "May": {
          "Clay": ["Jute", "Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Jute", "Vegetables", "Rice Nursery"],
          "Loam": ["Jute", "Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Jute", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Jute", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Jute", "Vegetables"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Jute", "Vegetables"],
          "Loam": ["Rice", "Jute", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables"],
          "Loam": ["Rice", "Vegetables"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Chhattisgarh": {
        "January": {
          "Clay": ["Rice", "Wheat", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Wheat", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Pulses"],
        },
        "March": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Summer Vegetables", "Pulses"],
          "Sandy": ["Summer Vegetables", "Pulses"],
          "Silt": ["Summer Vegetables", "Pulses"],
          "Loam": ["Summer Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Pulses", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Pulses", "Maize"],
          "Loam": ["Rice", "Pulses", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Pulses", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Pulses", "Maize"],
          "Loam": ["Rice", "Pulses", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Pulses", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Pulses", "Maize"],
          "Loam": ["Rice", "Pulses", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Pulses", "Maize"],
          "Sandy": ["Rice", "Pulses", "Maize"],
          "Silt": ["Rice", "Pulses", "Maize"],
          "Loam": ["Rice", "Pulses", "Maize"],
        },
        "October": {
          "Clay": ["Rice", "Pulses", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Pulses", "Vegetables"],
          "Loam": ["Rice", "Pulses", "Vegetables"],
        },
        "November": {
          "Clay": ["Rice", "Wheat", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Wheat", "Pulses"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Rice", "Wheat", "Vegetables"],
          "Loam": ["Rice", "Wheat", "Pulses"],
        },
      },
      "Uttarakhand": {
        "January": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "March": {
          "Clay": ["Wheat", "Vegetables", "Pulses"],
          "Sandy": ["Wheat", "Vegetables", "Pulses"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Pulses"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
      },
      "Himachal Pradesh": {
        "January": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "March": {
          "Clay": ["Wheat", "Vegetables", "Pulses"],
          "Sandy": ["Wheat", "Vegetables", "Pulses"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Pulses"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Maize", "Rice Nursery"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Vegetables", "Maize", "Rice Nursery"],
          "Loam": ["Vegetables", "Maize", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Maize", "Vegetables"],
          "Sandy": ["Maize", "Vegetables"],
          "Silt": ["Rice", "Maize", "Vegetables"],
          "Loam": ["Rice", "Maize", "Vegetables"],
        },
        "July": {
          "Clay": ["Rice", "Maize", "Vegetables"],
          "Sandy": ["Maize", "Vegetables"],
          "Silt": ["Rice", "Maize", "Vegetables"],
          "Loam": ["Rice", "Maize", "Vegetables"],
        },
        "August": {
          "Clay": ["Rice", "Maize", "Vegetables"],
          "Sandy": ["Maize", "Vegetables"],
          "Silt": ["Rice", "Maize", "Vegetables"],
          "Loam": ["Rice", "Maize", "Vegetables"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Pulses", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
      },
      "Jammu & Kashmir": {
        "January": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "March": {
          "Clay": ["Wheat", "Vegetables", "Barley"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Vegetables", "Barley"],
          "Loam": ["Wheat", "Vegetables", "Barley"],
        },
        "April": {
          "Clay": ["Wheat", "Vegetables", "Pulses"],
          "Sandy": ["Wheat", "Vegetables", "Pulses"],
          "Silt": ["Wheat", "Vegetables", "Pulses"],
          "Loam": ["Wheat", "Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Wheat", "Vegetables"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
      },
      "Sikkim": {
        "January": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "February": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Vegetables", "Rice Nursery", "Maize"],
          "Loam": ["Vegetables", "Rice Nursery", "Maize"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Buckwheat"],
          "Sandy": ["Vegetables", "Buckwheat"],
          "Silt": ["Rice", "Vegetables", "Buckwheat"],
          "Loam": ["Rice", "Vegetables", "Buckwheat"],
        },
        "October": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "November": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
        "December": {
          "Clay": ["Wheat", "Barley", "Vegetables"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Wheat", "Barley", "Vegetables"],
          "Loam": ["Wheat", "Barley", "Vegetables"],
        },
      },
      "Arunachal Pradesh": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Wheat"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Rice", "Vegetables", "Wheat"],
          "Loam": ["Rice", "Vegetables", "Wheat"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Wheat"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Rice", "Vegetables", "Wheat"],
          "Loam": ["Rice", "Vegetables", "Wheat"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Vegetables", "Rice Nursery", "Maize"],
          "Loam": ["Vegetables", "Rice Nursery", "Maize"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Maize"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Wheat"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Rice", "Vegetables", "Wheat"],
          "Loam": ["Rice", "Vegetables", "Wheat"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Wheat"],
          "Sandy": ["Vegetables", "Wheat"],
          "Silt": ["Rice", "Vegetables", "Wheat"],
          "Loam": ["Rice", "Vegetables", "Wheat"],
        },
      },
      "Manipur": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Meghalaya": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Mizoram": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Nagaland": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "April": {
          "Clay": ["Vegetables", "Maize"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Maize"],
          "Loam": ["Vegetables", "Maize"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Maize"],
          "Sandy": ["Rice", "Vegetables"],
          "Silt": ["Rice", "Vegetables", "Maize"],
          "Loam": ["Rice", "Vegetables", "Maize"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      },
      "Tripura": {
        "January": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "February": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "March": {
          "Clay": ["Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Pulses"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "April": {
          "Clay": ["Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Vegetables", "Pulses"],
          "Loam": ["Vegetables", "Pulses"],
        },
        "May": {
          "Clay": ["Vegetables", "Rice Nursery"],
          "Sandy": ["Vegetables", "Rice Nursery"],
          "Silt": ["Vegetables", "Rice Nursery"],
          "Loam": ["Vegetables", "Rice Nursery"],
        },
        "June": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "July": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "August": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "September": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "October": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Rice", "Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "November": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
        "December": {
          "Clay": ["Rice", "Vegetables", "Pulses"],
          "Sandy": ["Vegetables", "Pulses"],
          "Silt": ["Rice", "Vegetables", "Pulses"],
          "Loam": ["Rice", "Vegetables", "Pulses"],
        },
      }
    };

    try {
    // @ts-ignore - Mock data structure
      const stateCrops = mockSuggestions[state] || {};
      // @ts-ignore - Mock data structure
      const monthCrops = stateCrops[month] || {};
      setSuggestions(monthCrops[soilType] || ["Wheat", "Rice", "Corn"]);
    } catch (error) {
      console.error("Error suggesting crops:", error);
      setSuggestions(["Wheat", "Rice", "Corn"]);
    }
  };

  return (
    <section id="crop-suggestions" className="py-16 bg-agri-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Crop Suggestion System</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get personalized crop recommendations based on your soil type, month, and state in India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-t-4 border-t-agri-green-500">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LeafIcon className="h-5 w-5 text-agri-green-500" />
                Input Your Farm Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soil Type
                  </label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clay">Clay</SelectItem>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Silt">Silt</SelectItem>
                      <SelectItem value="Loam">Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                      <SelectItem value="Assam">Assam</SelectItem>
                      <SelectItem value="Bihar">Bihar</SelectItem>
                      <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                      <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                      <SelectItem value="Jammu & Kashmir">Jammu & Kashmir</SelectItem>
                      <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Kerala">Kerala</SelectItem>
                      <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Manipur">Manipur</SelectItem>
                      <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                      <SelectItem value="Mizoram">Mizoram</SelectItem>
                      <SelectItem value="Nagaland">Nagaland</SelectItem>
                      <SelectItem value="Odisha">Odisha</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="Sikkim">Sikkim</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                      <SelectItem value="Tripura">Tripura</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-agri-green-500 hover:bg-agri-green-600"
                  onClick={suggestCrops}
                >
                  Get Crop Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Crops</h3>
              
              {!suggestions ? (
                <div className="text-center py-8 text-gray-500">
                  <LeafIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p>Enter your farm details to get personalized crop suggestions</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {suggestions.map((crop, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:border-agri-green-500 transition-colors">
                      <div className="w-12 h-12 bg-agri-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LeafIcon className="h-6 w-6 text-agri-green-500" />
                      </div>
                      <div className="font-medium">{crop}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center">
                <a 
                  href="/crop-suggestions" 
                  className="text-agri-green-700 hover:text-agri-green-800 inline-flex items-center gap-1"
                >
                  View detailed crop analysis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropSuggestion;
