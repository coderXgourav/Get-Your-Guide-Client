import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { FileIcon } from "../../icons";

export default function AddSupplier() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    panNumber: "",
    businessType: "",
    serviceType: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    registrationDocument: null as File | null,
  });

  const businessTypeOptions = [
    { value: "Private Limited", label: "Private Limited" },
    { value: "Public Limited", label: "Public Limited" },
    { value: "Partnership", label: "Partnership" },
    { value: "Proprietorship", label: "Proprietorship" },
    { value: "LLP", label: "LLP" },
  ];

  const serviceTypeOptions = [
    { value: "Transportation", label: "Transportation" },
    { value: "Accommodation", label: "Accommodation" },
    { value: "Food & Catering", label: "Food & Catering" },
    { value: "Tour Guide", label: "Tour Guide" },
    { value: "Equipment Rental", label: "Equipment Rental" },
    { value: "Other", label: "Other" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, registrationDocument: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supplier data:", formData);
    // Handle form submission here
  };

  return (
    <div>
      <PageMeta
        title="Add Supplier | Supplier Management"
        description="Register new supplier"
      />
      <PageBreadcrumb pageTitle="Add Supplier" />
      
      <ComponentCard title="Supplier Registration">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Company Information */}
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
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
                placeholder="company@example.com"
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
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="address">Address *</Label>
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
              <Label htmlFor="city">City *</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="123456"
              />
            </div>

            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                placeholder="Enter GST number"
              />
            </div>

            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                placeholder="Enter PAN number"
              />
            </div>

            <div>
              <Label>Business Type *</Label>
              <Select
                options={businessTypeOptions}
                placeholder="Select business type"
                onChange={handleSelectChange("businessType")}
                className="dark:bg-gray-900"
              />
            </div>

            <div>
              <Label>Service Type *</Label>
              <Select
                options={serviceTypeOptions}
                placeholder="Select service type"
                onChange={handleSelectChange("serviceType")}
                className="dark:bg-gray-900"
              />
            </div>

            {/* Bank Details */}
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Enter bank name"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number"
              />
            </div>

            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="Enter IFSC code"
              />
            </div>

            {/* Registration Document */}
            <div className="lg:col-span-2">
              <Label>Registration Document *</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleDocumentChange}
                    className="hidden"
                    id="registration-document"
                    required
                  />
                  <label
                    htmlFor="registration-document"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="text-center">
                      <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formData.registrationDocument
                          ? formData.registrationDocument.name
                          : "Click to upload registration document"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>
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
              Register Supplier
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}