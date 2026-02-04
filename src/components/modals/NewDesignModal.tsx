"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type InputType = "photo" | "floorplan" | "text";

interface NewDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = [
  { id: "scandinavian", name: "Scandinavian", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop" },
  { id: "modern", name: "Modern", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop" },
  { id: "japandi", name: "Japandi", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&h=150&fit=crop" },
  { id: "boho", name: "Boho", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&h=150&fit=crop" },
  { id: "industrial", name: "Industrial", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=150&fit=crop" },
  { id: "minimalist", name: "Minimalist", image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=200&h=150&fit=crop" },
];

const roomTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Home Office",
  "Dining Room",
];

export default function NewDesignModal({ isOpen, onClose }: NewDesignModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [inputType, setInputType] = useState<InputType>("photo");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = () => {
    // Navigate to comparison page with the design
    router.push("/compare");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">New Design</h2>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-brand-primary transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Step 1: Input Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you like to start?
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { type: "photo", label: "Upload Photo", icon: "📷" },
                    { type: "floorplan", label: "Floor Plan", icon: "📐" },
                    { type: "text", label: "Text Prompt", icon: "✍️" },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setInputType(option.type as InputType)}
                      className={`
                        p-4 rounded-2xl border-2 transition-all duration-200 text-center
                        ${inputType === option.type
                          ? "border-brand-primary bg-sage-100"
                          : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Area for Photo/Floor Plan */}
              {(inputType === "photo" || inputType === "floorplan") && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200
                    ${isDragging ? "border-brand-primary bg-sage-100" : "border-gray-300"}
                    ${uploadedImage ? "border-brand-primary" : ""}
                  `}
                >
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-48 mx-auto rounded-xl"
                      />
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-medium mb-1">
                        Drag & drop your {inputType === "photo" ? "room photo" : "floor plan"}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">or click to browse</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              )}

              {/* Text Prompt */}
              {inputType === "text" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your dream space
                  </label>
                  <textarea
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="A cozy living room with warm earth tones, a large sectional sofa, and floor-to-ceiling windows overlooking a garden..."
                    className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              )}

              {/* Room Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Room Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map((room) => (
                    <button
                      key={room}
                      onClick={() => setSelectedRoom(room)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        ${selectedRoom === room
                          ? "bg-brand-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Style Selection */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose your style
              </label>
              <div className="grid grid-cols-3 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      relative rounded-2xl overflow-hidden transition-all duration-200
                      ${selectedStyle === style.id
                        ? "ring-3 ring-brand-primary ring-offset-2"
                        : "hover:opacity-90"
                      }
                    `}
                  >
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-white font-medium">{style.name}</span>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Review & Generate */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-sage-50 rounded-2xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Review Your Design</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Input Type:</span>
                    <p className="text-gray-900 font-medium capitalize">{inputType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Room:</span>
                    <p className="text-gray-900 font-medium">{selectedRoom || "Not selected"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Style:</span>
                    <p className="text-gray-900 font-medium capitalize">{selectedStyle || "Not selected"}</p>
                  </div>
                </div>
                {uploadedImage && (
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm">Uploaded Image:</span>
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="mt-2 max-h-32 rounded-xl"
                    />
                  </div>
                )}
                {textPrompt && (
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm">Prompt:</span>
                    <p className="text-gray-900 mt-1 text-sm">{textPrompt}</p>
                  </div>
                )}
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    AI will generate multiple design variations based on your inputs. You can edit and refine the results afterward.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {step > 1 ? "Back" : "Cancel"}
          </button>
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleGenerate()}
            className="px-6 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-xl hover:bg-brand-dark transition-colors"
          >
            {step < 3 ? "Continue" : "Generate Design ✨"}
          </button>
        </div>
      </div>
    </div>
  );
}
