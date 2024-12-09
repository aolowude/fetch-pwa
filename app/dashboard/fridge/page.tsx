"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import {
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  Apple,
  Coffee,
  Beer,
  Package,
  Calendar,
} from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

type ItemType = "Ingredient" | "Food" | "Drink" | "Other";

interface FridgeItem {
  id: string;
  name: string;
  type: ItemType;
  quantity?: string;
  expiryDate: string;
  isExpiryEstimated?: boolean;
}

const ItemTypeIcon = ({ type }: { type: ItemType }) => {
  switch (type) {
    case "Ingredient":
      return <Apple className="w-6 h-6" />;
    case "Drink":
      return <Beer className="w-6 h-6" />;
    case "Food":
      return <Coffee className="w-6 h-6" />;
    default:
      return <Package className="w-6 h-6" />;
  }
};

export default function MyFridge() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [textInput, setTextInput] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const parseGeminiResponse = (text: string): any => {
    // Remove code block markers if present
    let cleanText = text;
    if (text.includes("```")) {
      cleanText = text
        .split("```")
        .filter(
          (block) => block.trim() && !block.toLowerCase().startsWith("json")
        )
        .join("")
        .trim();
    }
    return JSON.parse(cleanText);
  };

  // Then in analyzeTextInput:
  const analyzeTextInput = async (input: string) => {
    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Extract fridge items from the following text. Items are separated by commas. For each item:
1. Extract the item name
2. Determine type (Ingredient, Food, Drink, or Other)
3. Extract quantity if mentioned
4. Extract or estimate expiry date
5. Mark estimated dates with (estimated)

Input text: "${input}"

Format as JSON array with fields: name, type, quantity (optional), expiryDate, isExpiryEstimated (boolean).
Ensure each item has all required fields even if you need to make reasonable estimates.
Return only the JSON array without any markdown formatting or code blocks.`;

      const response = await model.generateContent(prompt);
      const result = response.response.text();
      const newItems: Partial<FridgeItem>[] = parseGeminiResponse(result);

      const itemsToAdd = newItems.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      })) as FridgeItem[];

      setFridgeItems((prev) => [...prev, ...itemsToAdd]);
      setTextInput("");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to process text input"
      );
    } finally {
      setLoading(false);
    }
  };

  // And similarly in analyzeImage:
  const analyzeImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const reader = new FileReader();
      const imageBase64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(selectedFile);
      });

      const imageBase64 = await imageBase64Promise;
      const base64Data = (imageBase64 as string).split(",")[1];

      const prompt = `Analyze this image of groceries/fridge contents. For each item visible:
1. Identify the item name
2. Categorize as either: Ingredient, Food, Drink, or Other
3. Extract quantity if visible
4. If visible, extract the expiry date. If not visible, provide an estimated expiry date and mark it as (estimated)
Format as JSON array with fields: name, type, quantity (optional), expiryDate, isExpiryEstimated (boolean).
Return only the JSON array without any markdown formatting or code blocks.`;

      const response = await model.generateContent([
        {
          inlineData: {
            mimeType: selectedFile.type,
            data: base64Data,
          },
        },
        { text: prompt },
      ]);

      const result = response.response.text();
      console.log({ result });
      const newItems: Partial<FridgeItem>[] = parseGeminiResponse(result);

      const itemsToAdd = newItems.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      })) as FridgeItem[];

      console.log({ itemsToAdd });
      setFridgeItems((prev) => [...prev, ...itemsToAdd]);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    await analyzeTextInput(textInput);
  };

  const removeItem = (id: string) => {
    setFridgeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getExpiryColor = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.floor(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) return "text-red-600 border-red-200 bg-red-50";
    if (daysUntilExpiry < 3)
      return "text-orange-600 border-orange-200 bg-orange-50";
    if (daysUntilExpiry < 7)
      return "text-yellow-600 border-yellow-200 bg-yellow-50";
    return "text-green-600 border-green-200 bg-green-50";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add Items from Image</h2>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center">
                <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload fridge/grocery image
                </p>
              </div>
            )}
          </label>
        </div>

        {selectedFile && !loading && (
          <button
            onClick={analyzeImage}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Analyze Image
          </button>
        )}
      </div>

      {/* Manual Input Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add Items Manually</h2>
        <p className="text-sm text-gray-500">
          Enter items separated by commas. Include quantity and expiry date if
          known. Example: "2 apples expires next week, milk expires in 3 days,
          500g chicken breast"
        </p>
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter items separated by commas..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !textInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </form>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}
      </div>

      {/* Fridge Contents Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Fridge Contents</h2>
        {fridgeItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No items in your fridge yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fridgeItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 relative"
              >
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-start space-y-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ItemTypeIcon type={item.type} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-medium text-lg truncate w-full pr-6">
                      {item.name}
                    </h3>
                    {item.quantity && (
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    )}
                  </div>

                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    {item.type}
                  </span>

                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getExpiryColor(
                      item.expiryDate
                    )}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(item.expiryDate).toLocaleDateString()}
                      {item.isExpiryEstimated && " (est.)"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
