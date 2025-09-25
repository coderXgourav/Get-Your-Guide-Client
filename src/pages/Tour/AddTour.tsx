import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { CheckCircleIcon, AlertIcon } from "../../icons";

interface FormData {
  // Product Category
  productCategory: string;
  
  // AI Content
  useAI: boolean;
  aiContent: string;
  
  // Main Information
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  
  // Locations
  locations: string[];
  
  // Keywords
  keywords: string[];
  
  // Inclusions
  included: string;
  notIncluded: string;
  guideType: string;
  guideLanguages: string[];
  foodIncluded: boolean;
  mealType: string;
  dietaryRestrictions: string[];
  transportationUsed: boolean;
  transportationType: string[];
  
  // Extra Information
  notSuitableFor: string[];
  notAllowed: string[];
  petPolicy: string;
  mandatoryItems: string[];
  knowBeforeYouGo: string;
  emergencyContact: string;
  voucherInfo: string;
  
  // Photos
  photos: File[];
  
  // Options
  options: any[];
}

interface BookingOption {
  title: string;
  languages: string[];
  isPrivate: boolean;
  skipLine: boolean;
  wheelchairAccessible: boolean;
  durationType: string;
  duration: string;
  meetingType: string;
  meetingPoint: string;
  meetingDescription: string;
  arrivalTime: string;
  availabilityType: string;
  pricingType: string;
  cutoffTime: string;
}

const steps = [
  { id: 1, name: "Product Category", key: "category" },
  { id: 2, name: "AI Content Creator", key: "ai" },
  { id: 3, name: "Main Information", key: "main" },
  { id: 4, name: "Locations", key: "locations" },
  { id: 5, name: "Keywords", key: "keywords" },
  { id: 6, name: "Inclusions", key: "inclusions" },
  { id: 7, name: "Extra Information", key: "extra" },
  { id: 8, name: "Photos", key: "photos" },
  { id: 9, name: "Options", key: "options" },
  { id: 10, name: "Review", key: "review" }
];

export default function AddTour() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [optionStep, setOptionStep] = useState(1);
  const [currentOption, setCurrentOption] = useState({
    title: "",
    languages: [],
    isPrivate: false,
    skipLine: false,
    wheelchairAccessible: false,
    durationType: "duration", // duration or validity
    duration: "",
    meetingType: "meeting-point", // meeting-point or pickup
    meetingPoint: "",
    meetingDescription: "",
    arrivalTime: "on-time", // on-time or early
    availabilityType: "time-slots", // time-slots or opening-hours
    pricingType: "per-person", // per-person or per-group
    cutoffTime: "2-hours"
  });
  const [formData, setFormData] = useState<FormData>({
    productCategory: "",
    useAI: false,
    aiContent: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    highlights: ["", "", ""],
    locations: [],
    keywords: [],
    included: "",
    notIncluded: "",
    guideType: "",
    guideLanguages: [],
    foodIncluded: false,
    mealType: "",
    dietaryRestrictions: [],
    transportationUsed: false,
    transportationType: [],
    notSuitableFor: [],
    notAllowed: [],
    petPolicy: "",
    mandatoryItems: [],
    knowBeforeYouGo: "",
    emergencyContact: "",
    voucherInfo: "",
    photos: [],
    options: []
  });

  const productCategories = [
    { value: "entry-ticket", label: "Entry ticket", desc: "Entry to an attraction, landmark, theme park, show, or event" },
    { value: "tour", label: "Tour", desc: "Guided walking tours of a city or attraction, day trips, multi-day trips, city cruises, etc." },
    { value: "city-card", label: "City card", desc: "A pass for multiple attractions and/or transport within a city" },
    { value: "hop-on-hop-off", label: "Hop-on hop-off ticket", desc: "Entry to a hop-on hop-off bus or boat" },
    { value: "transport", label: "Transport experience", desc: "Memorable ways to travel, e.g. scenic train, ferry, or cable car" },
    { value: "rental", label: "Rental experience", desc: "Like traditional costumes, or renting a bicycle or vintage car" },
    { value: "other", label: "Other", desc: "Like a cooking class, creative workshop, or two attractions sold together" }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.productCategory) {
          newErrors.productCategory = "Please select a product category";
        }
        break;
      case 3:
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.shortDescription) newErrors.shortDescription = "Short description is required";
        if (!formData.fullDescription) newErrors.fullDescription = "Full description is required";
        if (formData.highlights.length < 3 || formData.highlights.some(h => !h.trim())) newErrors.highlights = "At least 3 highlights are required and cannot be empty";
        break;
      case 4:
        if (formData.locations.length === 0) newErrors.locations = "At least one location is required";
        break;
      case 8:
        if (formData.photos.length < 4) newErrors.photos = "At least 4 photos are required";
        break;
      case 9:
        if (formData.options.length === 0) newErrors.options = "At least one booking option is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep || validateStep(currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  const generateAIContent = () => {
    // Simulate AI content generation
    if (formData.aiContent.trim()) {
      setFormData(prev => ({
        ...prev,
        title: "Amazing City Walking Tour",
        shortDescription: "Discover the hidden gems of the city with our expert local guide in this immersive 3-hour walking experience.",
        fullDescription: "Join us for an unforgettable journey through the heart of the city. Our experienced local guide will take you through historic neighborhoods, bustling markets, and iconic landmarks while sharing fascinating stories and insider knowledge. You'll explore hidden alleyways, visit local artisan shops, and experience the authentic culture that makes this city unique. This tour is perfect for first-time visitors and curious travelers who want to see beyond the typical tourist attractions.",
        highlights: [
          "Explore historic neighborhoods with a local expert guide",
          "Visit authentic local markets and artisan workshops", 
          "Discover hidden gems and secret spots only locals know"
        ]
      }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Product Category
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Which of these best describes your activity?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                This adapts the creation process to what you're offering, and helps us categorize your product so customers can find it.
              </p>
              <div className="space-y-3">
                {productCategories.map((category) => (
                  <label key={category.value} className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="productCategory"
                      value={category.value}
                      checked={formData.productCategory === category.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, productCategory: e.target.value }))}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{category.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{category.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.productCategory && <p className="text-red-500 text-sm mt-2">{errors.productCategory}</p>}
            </div>
          </div>
        );

      case 2: // AI Content Creator
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">AI content creator</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <h4 className="font-medium mb-3">How it works</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Provide your content, then we'll fill out most of the sections for you</li>
                  <li>Check for accuracy and make changes if necessary</li>
                  <li>You'll still need to upload photos and create the booking options yourself</li>
                </ol>
                <p className="text-sm mt-3 text-blue-700 dark:text-blue-300">
                  Products using the AI content creator are likely to get more bookings, plus it saves you time.
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, useAI: true }))}
                  className={`w-full p-4 border rounded-lg text-left ${formData.useAI ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300'}`}
                >
                  <div className="font-medium">Use AI</div>
                  <div className="text-sm text-green-600">Increases conversion by up to 28%</div>
                </button>
                
                <button
                  onClick={() => setFormData(prev => ({ ...prev, useAI: false }))}
                  className={`w-full p-4 border rounded-lg text-left ${!formData.useAI ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300'}`}
                >
                  <div className="font-medium">Skip and create product manually</div>
                </button>
              </div>

              {formData.useAI && (
                <div className="mt-6 p-4 border rounded-lg">
                  <label className="block text-sm font-medium mb-2">
                    Describe your tour activity in detail:
                  </label>
                  <textarea
                    value={formData.aiContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, aiContent: e.target.value }))}
                    placeholder="Tell us about your tour - what will customers see, do, and experience? Include details about locations, duration, highlights, and what makes it special..."
                    className="w-full h-32 p-3 border rounded-lg"
                  />
                  <button
                    onClick={generateAIContent}
                    disabled={!formData.aiContent.trim()}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Generate Content
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 3: // Main Information
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter tour title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short description *</label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                className="w-full h-20 p-3 border rounded-lg"
                placeholder="Give the customer a taste of what they'll do in 2 or 3 sentences..."
                maxLength={200}
              />
              <div className="text-sm text-gray-500 mt-1">{formData.shortDescription.length} / 200</div>
              {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full description *</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                className="w-full h-32 p-3 border rounded-lg"
                placeholder="Provide all the details about what the customer will see and experience..."
                maxLength={3000}
              />
              <div className="text-sm text-gray-500 mt-1">{formData.fullDescription.length} / 3000</div>
              {errors.fullDescription && <p className="text-red-500 text-sm mt-1">{errors.fullDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Highlights * (minimum 3 required)</label>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...formData.highlights];
                        newHighlights[index] = e.target.value;
                        setFormData(prev => ({ ...prev, highlights: newHighlights }));
                      }}
                      className="flex-1 p-3 border rounded-lg"
                      placeholder={`Highlight ${index + 1}`}
                      maxLength={80}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.highlights.length > 1) {
                          const newHighlights = formData.highlights.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, highlights: newHighlights }));
                        }
                      }}
                      className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50"
                      disabled={formData.highlights.length <= 1}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ""] }));
                  }}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600"
                >
                  + Add Another Highlight
                </button>
              </div>
              {errors.highlights && <p className="text-red-500 text-sm mt-1">{errors.highlights}</p>}
            </div>
          </div>
        );

      case 4: // Locations
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Where will customers visit?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                List all the major cities, sites, and attractions that your customers will visit during your experience.
              </p>
              <div className="space-y-4">
                {/* Location Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter location name"
                    className="flex-1 p-3 border rounded-lg"
                    id="location-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          locations: [...prev.locations, e.currentTarget.value.trim()]
                        }));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('location-input') as HTMLInputElement;
                      if (input.value.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          locations: [...prev.locations, input.value.trim()]
                        }));
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                {/* Location List */}
                <div className="space-y-2">
                  {formData.locations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <span className="text-sm font-medium">{location}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          locations: prev.locations.filter((_, i) => i !== index)
                        }))}
                        className="px-3 py-1 text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {formData.locations.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    No locations added yet. Add your first location above.
                  </div>
                )}
              </div>
              {errors.locations && <p className="text-red-500 text-sm mt-2">{errors.locations}</p>}
            </div>
          </div>
        );

      case 5: // Keywords
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add keywords to your product (optional)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Keywords work as tags for your product and help customers find it when they search by a theme or their interests. Try to use all 15 for maximum reach.
              </p>
              <div className="space-y-4">
                {/* Keyword Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter keyword"
                    className="flex-1 p-3 border rounded-lg"
                    id="keyword-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim() && formData.keywords.length < 15) {
                        setFormData(prev => ({
                          ...prev,
                          keywords: [...prev.keywords, e.currentTarget.value.trim()]
                        }));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('keyword-input') as HTMLInputElement;
                      if (input.value.trim() && formData.keywords.length < 15) {
                        setFormData(prev => ({
                          ...prev,
                          keywords: [...prev.keywords, input.value.trim()]
                        }));
                        input.value = '';
                      }
                    }}
                    disabled={formData.keywords.length >= 15}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>

                {/* Keywords Display */}
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          keywords: prev.keywords.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  {formData.keywords.length} / 15 keywords added
                </p>

                {formData.keywords.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    No keywords added yet. Add keywords to help customers find your tour.
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 6: // Inclusions
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Inclusions & exclusions</h3>
              
              {/* What's included */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">What's included?</label>
                <textarea
                  value={formData.included}
                  onChange={(e) => setFormData(prev => ({ ...prev, included: e.target.value }))}
                  className="w-full h-32 p-3 border rounded-lg"
                  placeholder="List everything that's included in the price. Start a new line for each one."
                  maxLength={1000}
                />
                <div className="text-sm text-gray-500 mt-1">{formData.included.length} / 1000</div>
              </div>

              {/* What's not included */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">What's not included? (optional)</label>
                <textarea
                  value={formData.notIncluded}
                  onChange={(e) => setFormData(prev => ({ ...prev, notIncluded: e.target.value }))}
                  className="w-full h-24 p-3 border rounded-lg"
                  placeholder="Name any optional fees or charges that customers may encounter during the activity."
                  maxLength={1000}
                />
                <div className="text-sm text-gray-500 mt-1">{formData.notIncluded.length} / 1000</div>
              </div>

              {/* Guide Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Who will guide the customers?</label>
                <div className="space-y-2">
                  {[
                    { value: "self-guided", label: "Self-Guided", desc: "The activity does not include a guide; travellers will navigate independently." },
                    { value: "tour-guide", label: "Tour guide", desc: "Leads a group of customers through a tour and explains things about the destination." },
                    { value: "host", label: "Host or greeter", desc: "Provides an introduction or waits with customers, but doesn't provide a full tour." },
                    { value: "instructor", label: "Instructor", desc: "Shows customers how to use equipment or teaches them how to do something." },
                    { value: "driver", label: "Driver", desc: "Drives the customer somewhere but doesn't explain anything along the way." }
                  ].map((guide) => (
                    <label key={guide.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="guideType"
                        value={guide.value}
                        checked={formData.guideType === guide.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, guideType: e.target.value }))}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium">{guide.label}</div>
                        <div className="text-sm text-gray-600">{guide.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Food & Drinks */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Is food included in your activity?</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foodIncluded"
                      checked={!formData.foodIncluded}
                      onChange={() => setFormData(prev => ({ ...prev, foodIncluded: false }))}
                      className="mr-2"
                    />
                    No
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foodIncluded"
                      checked={formData.foodIncluded}
                      onChange={() => setFormData(prev => ({ ...prev, foodIncluded: true }))}
                      className="mr-2"
                    />
                    Yes
                  </label>
                </div>

                {formData.foodIncluded && (
                  <div className="space-y-4 ml-4 p-4 border-l-2 border-blue-200">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type of meal</label>
                      <select
                        value={formData.mealType}
                        onChange={(e) => setFormData(prev => ({ ...prev, mealType: e.target.value }))}
                        className="w-full p-3 border rounded-lg"
                      >
                        <option value="">Select meal type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snacks">Snacks</option>
                        <option value="drinks">Drinks only</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Transportation */}
              <div>
                <label className="block text-sm font-medium mb-2">Is transportation used during this activity?</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transportationUsed"
                      checked={!formData.transportationUsed}
                      onChange={() => setFormData(prev => ({ ...prev, transportationUsed: false }))}
                      className="mr-2"
                    />
                    No
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transportationUsed"
                      checked={formData.transportationUsed}
                      onChange={() => setFormData(prev => ({ ...prev, transportationUsed: true }))}
                      className="mr-2"
                    />
                    Yes
                  </label>
                </div>

                {formData.transportationUsed && (
                  <div className="ml-4 p-4 border-l-2 border-blue-200">
                    <label className="block text-sm font-medium mb-2">Transportation type</label>
                    <div className="space-y-2">
                      {["Bus", "Car", "Bike", "Electric bike", "Boat", "Train", "Walking"].map((transport) => (
                        <label key={transport} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.transportationType.includes(transport)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ ...prev, transportationType: [...prev.transportationType, transport] }));
                              } else {
                                setFormData(prev => ({ ...prev, transportationType: prev.transportationType.filter(t => t !== transport) }));
                              }
                            }}
                            className="mr-2"
                          />
                          {transport}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7: // Extra Information
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Extra Information</h3>
              
              {/* Know before you go */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Know before you go (optional)</label>
                <textarea
                  value={formData.knowBeforeYouGo}
                  onChange={(e) => setFormData(prev => ({ ...prev, knowBeforeYouGo: e.target.value }))}
                  className="w-full h-24 p-3 border rounded-lg"
                  placeholder="Add any remaining information that customers should know before they make a booking."
                  maxLength={1000}
                />
                <div className="text-sm text-gray-500 mt-1">{formData.knowBeforeYouGo.length} / 1000</div>
              </div>

              {/* Emergency contact */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Emergency contact (optional)</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  className="w-full p-3 border rounded-lg"
                  placeholder="How can customers contact you in case of an emergency?"
                  maxLength={35}
                />
                <div className="text-sm text-gray-500 mt-1">{formData.emergencyContact.length} / 35</div>
              </div>

              {/* Voucher information */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Voucher information (optional)</label>
                <textarea
                  value={formData.voucherInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, voucherInfo: e.target.value }))}
                  className="w-full h-24 p-3 border rounded-lg"
                  placeholder="Provide any other logistical information that hasn't been covered elsewhere."
                  maxLength={1000}
                />
                <div className="text-sm text-gray-500 mt-1">{formData.voucherInfo.length} / 1000</div>
              </div>

              {/* Pet policy */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Pet policy (optional)</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="petPolicy"
                      value="not-allowed"
                      checked={formData.petPolicy === "not-allowed"}
                      onChange={(e) => setFormData(prev => ({ ...prev, petPolicy: e.target.value }))}
                      className="mr-2"
                    />
                    Pets not allowed
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="petPolicy"
                      value="pet-friendly"
                      checked={formData.petPolicy === "pet-friendly"}
                      onChange={(e) => setFormData(prev => ({ ...prev, petPolicy: e.target.value }))}
                      className="mr-2"
                    />
                    Pet-friendly
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="petPolicy"
                      value="service-animals-only"
                      checked={formData.petPolicy === "service-animals-only"}
                      onChange={(e) => setFormData(prev => ({ ...prev, petPolicy: e.target.value }))}
                      className="mr-2"
                    />
                    Service animals only
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 8: // Photos
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add photos to your product</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Images help customers visualize joining your activity. You need at least 4.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
                  }}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="text-gray-500">
                    <p>Drag photos here or click to upload</p>
                    <p className="text-sm mt-2">JPG, JPEG, PNG, GIF up to 7MB each</p>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        photos: prev.photos.filter((_, i) => i !== index)
                      }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                {formData.photos.length} / 4 minimum photos uploaded
              </p>
              {errors.photos && <p className="text-red-500 text-sm mt-2">{errors.photos}</p>}
            </div>
          </div>
        );

      case 9: // Options
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add booking option(s) to your product</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Options allow you to customize your activity and attract more customers. For example, your options can have different durations, group sizes, languages, inclusions, or ways to start the activity.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Booking Options</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowOptionModal(true);
                        setOptionStep(1);
                        setCurrentOption({
                          title: "",
                          languages: [],
                          isPrivate: false,
                          skipLine: false,
                          wheelchairAccessible: false,
                          durationType: "duration",
                          duration: "",
                          meetingType: "meeting-point",
                          meetingPoint: "",
                          meetingDescription: "",
                          arrivalTime: "on-time",
                          availabilityType: "time-slots",
                          pricingType: "per-person",
                          cutoffTime: "2-hours"
                        });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create New Option
                    </button>
                    {formData.options.length > 0 && (
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            const templateOption = formData.options[parseInt(e.target.value)];
                            setShowOptionModal(true);
                            setOptionStep(1);
                            setCurrentOption({ ...templateOption, title: templateOption.title + " (Copy)" });
                          }
                        }}
                        className="px-4 py-2 border rounded-lg"
                        defaultValue=""
                      >
                        <option value="">Use existing as template</option>
                        {formData.options.map((option, index) => (
                          <option key={index} value={index}>
                            {option.title || `Option ${index + 1}`}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {formData.options.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <h4 className="text-lg font-medium mb-2">No booking options created yet</h4>
                    <p className="text-gray-600 mb-4">You need at least one option to start receiving bookings.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.options.map((option, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{option.title || `Option ${index + 1}`}</h5>
                            <p className="text-sm text-gray-600">
                              {option.languages?.join(", ")} • {option.durationType === "duration" ? "Duration" : "Validity"} • {option.pricingType === "per-person" ? "Per Person" : "Per Group"}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                options: prev.options.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {formData.options.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Created Options:</h4>
                  {formData.options.map((option, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span>Option {index + 1}</span>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 10: // Review
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations!</h3>
              <h4 className="text-lg font-medium mb-4">Your product has been submitted.</h4>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h5 className="font-medium mb-3">What happens next?</h5>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Your product will be checked to ensure it's suitable for our platform, offers something new for customers, and is set up correctly.</li>
                  <li>After around 7 days, you'll receive an email with a decision on your product. If it's accepted and there are no quality issues, it will be activated to start receiving bookings.</li>
                  <li>If your product has been accepted but there are quality issues, you will need to fix them and resubmit your product.</li>
                </ol>
              </div>

              <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                <h5 className="font-medium mb-2">Tour Summary:</h5>
                <div className="text-left space-y-1 text-sm">
                  <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                  <p><strong>Category:</strong> {formData.productCategory || 'Not selected'}</p>
                  <p><strong>Locations:</strong> {formData.locations.length} locations</p>
                  <p><strong>Keywords:</strong> {formData.keywords.length} keywords</p>
                  <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-4">Step {currentStep}</h3>
            <p className="text-gray-600">Invalid step.</p>
          </div>
        );
    }
  };

  return (
    <>
      <PageMeta title="Add Tour | Tour Management" description="Create new tour package" />
      
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${showOptionModal ? 'z-40' : 'z-10'}`}>
          <div className="p-6">
            <PageBreadcrumb pageTitle="Add Tour" />
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Tour Creation Steps</h2>
              <nav className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={showOptionModal}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : currentStep > step.id
                        ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    } ${showOptionModal ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                        currentStep === step.id
                          ? 'bg-blue-600 text-white'
                          : currentStep > step.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {currentStep > step.id ? <CheckCircleIcon className="w-4 h-4" /> : step.id}
                      </div>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                    {errors[step.key] && <AlertIcon className="w-4 h-4 text-red-500 ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1 || showOptionModal}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </div>
                
                {currentStep === steps.length ? (
                  <button
                    onClick={() => console.log('Submit tour', formData)}
                    disabled={showOptionModal}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    Submit Tour
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={showOptionModal}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Option Creation Modal */}
      {showOptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Create New Option</h3>
                <button
                  onClick={() => setShowOptionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Option Steps */}
              <div className="mb-6">
                <div className="flex space-x-4 text-sm">
                  {["Option setup", "Meeting point", "Connectivity", "Availability & Pricing", "Cut-off"].map((step, index) => (
                    <div key={index} className={`px-3 py-1 rounded ${
                      optionStep === index + 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Option Step Content */}
              <div className="space-y-6">
                {optionStep === 1 && (
                  <div>
                    <h4 className="font-medium mb-4">Option Setup</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Option Title</label>
                        <input
                          type="text"
                          value={currentOption.title}
                          onChange={(e) => setCurrentOption(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          placeholder="e.g., Guided Tour in English"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Languages</label>
                        <div className="space-y-2">
                          {["English", "Spanish", "French", "German", "Italian"].map((lang) => (
                            <label key={lang} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={currentOption.languages.includes(lang)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setCurrentOption(prev => ({ ...prev, languages: [...prev.languages, lang] }));
                                  } else {
                                    setCurrentOption(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
                                  }
                                }}
                                className="mr-2"
                              />
                              {lang}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={currentOption.isPrivate}
                            onChange={(e) => setCurrentOption(prev => ({ ...prev, isPrivate: e.target.checked }))}
                            className="mr-2"
                          />
                          Is this a private activity?
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={currentOption.skipLine}
                            onChange={(e) => setCurrentOption(prev => ({ ...prev, skipLine: e.target.checked }))}
                            className="mr-2"
                          />
                          Skip the line access
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={currentOption.wheelchairAccessible}
                            onChange={(e) => setCurrentOption(prev => ({ ...prev, wheelchairAccessible: e.target.checked }))}
                            className="mr-2"
                          />
                          Wheelchair accessible
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Duration Type</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="durationType"
                              value="duration"
                              checked={currentOption.durationType === "duration"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, durationType: e.target.value }))}
                              className="mr-2"
                            />
                            It lasts for a specific amount of time (duration)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="durationType"
                              value="validity"
                              checked={currentOption.durationType === "validity"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, durationType: e.target.value }))}
                              className="mr-2"
                            />
                            Customers can use their ticket anytime during a period (validity)
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {currentOption.durationType === "duration" ? "Duration (hours)" : "Validity period"}
                        </label>
                        <input
                          type="text"
                          value={currentOption.duration}
                          onChange={(e) => setCurrentOption(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          placeholder={currentOption.durationType === "duration" ? "3" : "2 days"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {optionStep === 2 && (
                  <div>
                    <h4 className="font-medium mb-4">Meeting Point or Pickup</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">How do customers get to the activity?</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="meetingType"
                              value="meeting-point"
                              checked={currentOption.meetingType === "meeting-point"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, meetingType: e.target.value }))}
                              className="mr-2"
                            />
                            They go to the starting point by themselves (meeting point)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="meetingType"
                              value="pickup"
                              checked={currentOption.meetingType === "pickup"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, meetingType: e.target.value }))}
                              className="mr-2"
                            />
                            They get picked up (by bus, car, etc.)
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {currentOption.meetingType === "meeting-point" ? "Meeting Point Address" : "Pickup Details"}
                        </label>
                        <input
                          type="text"
                          value={currentOption.meetingPoint}
                          onChange={(e) => setCurrentOption(prev => ({ ...prev, meetingPoint: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          placeholder={currentOption.meetingType === "meeting-point" ? "Enter meeting point address" : "Pickup location details"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description (optional)</label>
                        <textarea
                          value={currentOption.meetingDescription}
                          onChange={(e) => setCurrentOption(prev => ({ ...prev, meetingDescription: e.target.value }))}
                          className="w-full h-24 p-3 border rounded-lg"
                          placeholder="Describe the meeting point or pickup details..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">When do customers need to arrive?</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="arrivalTime"
                              value="on-time"
                              checked={currentOption.arrivalTime === "on-time"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, arrivalTime: e.target.value }))}
                              className="mr-2"
                            />
                            At the activity start time
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="arrivalTime"
                              value="early"
                              checked={currentOption.arrivalTime === "early"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, arrivalTime: e.target.value }))}
                              className="mr-2"
                            />
                            Arrive early (for check-in, equipment, etc.)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {optionStep === 3 && (
                  <div>
                    <h4 className="font-medium mb-4">Connectivity Settings</h4>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          GetYourGuide supports API integrations with industry-leading channel managers, ticketing and reservation systems.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Do you use an online reservation system?</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="radio" name="reservationSystem" className="mr-2" />
                            No, I don't
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="reservationSystem" className="mr-2" />
                            Yes, I use a reservation system
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {optionStep === 4 && (
                  <div>
                    <h4 className="font-medium mb-4">Availability & Pricing</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">How do you set your availability?</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="availabilityType"
                              value="time-slots"
                              checked={currentOption.availabilityType === "time-slots"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, availabilityType: e.target.value }))}
                              className="mr-2"
                            />
                            Time slots (e.g., 9:00 AM, 11:00 AM, 2:00 PM)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="availabilityType"
                              value="opening-hours"
                              checked={currentOption.availabilityType === "opening-hours"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, availabilityType: e.target.value }))}
                              className="mr-2"
                            />
                            Opening hours (e.g., Mon-Sat, 9:00 AM - 7:00 PM)
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">How do you set your prices?</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="pricingType"
                              value="per-person"
                              checked={currentOption.pricingType === "per-person"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, pricingType: e.target.value }))}
                              className="mr-2"
                            />
                            Price per person (different prices for adults, youth, child, etc.)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="pricingType"
                              value="per-group"
                              checked={currentOption.pricingType === "per-group"}
                              onChange={(e) => setCurrentOption(prev => ({ ...prev, pricingType: e.target.value }))}
                              className="mr-2"
                            />
                            Price per group/vehicle (based on group size, vehicle type, etc.)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {optionStep === 5 && (
                  <div>
                    <h4 className="font-medium mb-4">Cut-off Time</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        The cut-off time is the very latest you accept new bookings before the start time or end of opening hours.
                      </p>
                      <div>
                        <label className="block text-sm font-medium mb-2">How far in advance do you stop accepting new bookings?</label>
                        <select
                          value={currentOption.cutoffTime}
                          onChange={(e) => setCurrentOption(prev => ({ ...prev, cutoffTime: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        >
                          <option value="30-minutes">30 minutes</option>
                          <option value="1-hour">1 hour</option>
                          <option value="2-hours">2 hours</option>
                          <option value="4-hours">4 hours</option>
                          <option value="1-day">1 day</option>
                          <option value="2-days">2 days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => setOptionStep(prev => Math.max(prev - 1, 1))}
                  disabled={optionStep === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                
                <div className="text-sm text-gray-500">
                  Step {optionStep} of 5
                </div>
                
                {optionStep === 5 ? (
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, options: [...prev.options, currentOption] }));
                      setShowOptionModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save Option
                  </button>
                ) : (
                  <button
                    onClick={() => setOptionStep(prev => Math.min(prev + 1, 5))}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}