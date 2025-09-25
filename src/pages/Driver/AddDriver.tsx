import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PlusIcon } from "../../icons";

export default function AddDriver() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, bloodGroup: value }));
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
    console.log("Driver data:", formData);
    // Handle form submission here
  };

  return (
    <div>
      <PageMeta
        title="Add Driver | Driver Management"
        description="Add new driver to the system"
      />
      <PageBreadcrumb pageTitle="Add Driver" />
      
      <ComponentCard title="Driver Registration">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Driver Image */}
            <div className="lg:col-span-2">
              <Label>Driver Photo</Label>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Driver preview"
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
                    id="driver-image"
                  />
                  <label
                    htmlFor="driver-image"
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

            {/* Personal Information */}
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter driver's full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="driver@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div>
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="Enter license number"
                required
              />
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="5"
                min="0"
              />
            </div>

            <div>
              <Label>Blood Group</Label>
              <Select
                options={bloodGroupOptions}
                placeholder="Select blood group"
                onChange={handleSelectChange}
                className="dark:bg-gray-900"
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
              />
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="+1 (555) 987-6543"
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
              Register Driver
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}