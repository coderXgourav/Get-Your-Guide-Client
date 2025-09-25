import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PlusIcon } from "../../icons";

export default function AddBus() {
  const [formData, setFormData] = useState({
    busNumber: "",
    model: "",
    manufacturer: "",
    year: "",
    capacity: "",
    fuelType: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fuelTypeOptions = [
    { value: "Diesel", label: "Diesel" },
    { value: "Petrol", label: "Petrol" },
    { value: "CNG", label: "CNG" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, fuelType: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bus data:", formData);
    // Handle form submission here
  };

  return (
    <div>
      <PageMeta
        title="Add Bus | Get Your Guide Admin"
        description="Register new bus to the fleet"
      />
      <PageBreadcrumb pageTitle="Add Bus" />
      
      <ComponentCard title="Bus Registration">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bus Image */}
            <div className="lg:col-span-2">
              <Label>Bus Photo</Label>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-24 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Bus preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PlusIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="bus-image"
                  />
                  <label
                    htmlFor="bus-image"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Choose Photo
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <Label htmlFor="busNumber">Bus Number *</Label>
              <Input
                type="text"
                id="busNumber"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleInputChange}
                placeholder="BUS-001"
                required
              />
            </div>

            <div>
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                placeholder="Tata Motors"
                required
              />
            </div>

            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Starbus Ultra"
                required
              />
            </div>

            <div>
              <Label htmlFor="year">Manufacturing Year *</Label>
              <Input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="2023"
                min="1990"
                max="2024"
                required
              />
            </div>

            <div>
              <Label htmlFor="capacity">Seating Capacity *</Label>
              <Input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="45"
                min="1"
                required
              />
            </div>

            <div>
              <Label>Fuel Type *</Label>
              <Select
                options={fuelTypeOptions}
                placeholder="Select fuel type"
                onChange={handleSelectChange}
                className="dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Register Bus
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}