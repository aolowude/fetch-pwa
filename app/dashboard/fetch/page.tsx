"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

type AnalysisOptions = {
  ingredients: boolean;
  calories: boolean;
  recipe: boolean;
};

type AnalysisResponse = {
  text: string;
  structured?: {
    item: string;
    ingredients?: Array<{
      name: string;
      amount: string;
      calories?: string;
    }>;
    recipe?: string;
  };
};

export default function ImageAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [options, setOptions] = useState<AnalysisOptions>({
    ingredients: false,
    calories: false,
    recipe: false,
  });
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const generatePrompt = () => {
    let prompt =
      "Analyze this food image. Say 'In my humble AI opinion' and do not say you cannot estimate anything asked regarding ingredients and calories. You can say these are estimates but do your best to dissect and analyze accordingly. Only state once at the beginning that these are estimates then do not mention it again. Return: 1) What is it";
    if (options.ingredients) prompt += " 2) List of ingredients with amounts";
    if (options.calories)
      prompt += options.ingredients
        ? " and calories"
        : " 2) Calorie information";
    if (options.recipe)
      prompt += ` ${
        options.ingredients || options.calories ? "3" : "2"
      }) Recipe steps`;
    return prompt;
  };

  const toggleOption = (option: keyof AnalysisOptions) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const ToggleButton = ({ option }: { option: keyof AnalysisOptions }) => (
    <button
      onClick={() => toggleOption(option)}
      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
        options[option]
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </button>
  );

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const reader = new FileReader();
      const imageBase64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(selectedFile);
      });

      const imageBase64 = await imageBase64Promise;
      const base64Data = (imageBase64 as string).split(",")[1];

      const response = await model.generateContent([
        {
          inlineData: {
            mimeType: selectedFile.type,
            data: base64Data,
          },
        },
        { text: generatePrompt() },
      ]);

      const text = response.response.text();
      let structured;
      try {
        structured = JSON.parse(text);
      } catch {
        // If not JSON, use raw text
      }

      setResult({ text, structured });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
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
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center">
              <ImagePlus className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-500">
                Click or drag and drop to upload food image
              </p>
            </div>
          )}
        </label>
      </div>

      {selectedFile && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <ToggleButton option="ingredients" />
            <ToggleButton option="calories" />
            <ToggleButton option="recipe" />
          </div>

          {!loading && (
            <button
              onClick={analyzeImage}
              disabled={
                !options.ingredients && !options.calories && !options.recipe
              }
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Analyze Image
            </button>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Analyzing image...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}

      {result && (
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          {result.structured ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                {result.structured.item}
              </h2>
              {options.ingredients && result.structured.ingredients && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {result.structured.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <span>•</span>
                        <span>
                          {ing.name} - {ing.amount}
                          {options.calories &&
                            ing.calories &&
                            ` (${ing.calories})`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {options.recipe && result.structured.recipe && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Recipe
                  </h3>
                  <p className="text-gray-600">{result.structured.recipe}</p>
                </div>
              )}
            </>
          ) : (
            <pre className="whitespace-pre-wrap text-gray-600 p-4 bg-gray-50 rounded">
              {result.text}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
