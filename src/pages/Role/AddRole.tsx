import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PlusIcon, FileIcon } from "../../icons";

type RoleType = "driver" | "supplier" | "";
type Permission = "BUS_MANAGE" | "TOUR_ALLOCATE" | "TOUR_MANAGE" | "FINANCE";

export default function AddRole() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [driverData, setDriverData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    licenseDocument: null as File | null,
    driverAbstract: "",
    driverLicenseExpiry: "",
    driverUpdateExpiry: "",
    image: null as File | null,
  });

  const [supplierData, setSupplierData] = useState({
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
    countryIssue: "",
    bankDetailIssueNo: "",
    image: null as File | null,
    registrationDocument: null as File | null,
  });

  const roleOptions = [
    { value: "driver", label: "Driver" },
    { value: "supplier", label: "Supplier" },
  ];

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

  const permissionOptions: { value: Permission; label: string }[] = [
    { value: "BUS_MANAGE", label: "Bus Management" },
    { value: "TOUR_ALLOCATE", label: "Tour Allocation" },
    { value: "TOUR_MANAGE", label: "Tour Management" },
    { value: "FINANCE", label: "Finance" },
  ];

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as RoleType);
    setPermissions([]);
    setImagePreview(null);
  };

  const handlePermissionChange = (permission: Permission) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverData(prev => ({ ...prev, [name]: value }));
  };

  const handleSupplierInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierData(prev => ({ ...prev, [name]: value }));
  };

  const handleDriverSelectChange = (field: string) => (value: string) => {
    setDriverData(prev => ({ ...prev, [field]: value }));
  };

  const handleSupplierSelectChange = (field: string) => (value: string) => {
    setSupplierData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedRole === "driver") {
        setDriverData(prev => ({ ...prev, image: file }));
      } else if (selectedRole === "supplier") {
        setSupplierData(prev => ({ ...prev, image: file }));
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedRole === "driver") {
        setDriverData(prev => ({ ...prev, [field]: file }));
      } else if (selectedRole === "supplier") {
        setSupplierData(prev => ({ ...prev, [field]: file }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      role: selectedRole,
      permissions,
      data: selectedRole === "driver" ? driverData : supplierData,
    };
    console.log("Role data:", formData);
  };

  return (
    <div>
      <PageMeta
        title="Add Role | Role Management"
        description="Add new role to the system"
      />
      <PageBreadcrumb pageTitle="Add Role" />
      
      <ComponentCard title="Role Registration">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label>Select Role *</Label>
              <Select
                options={roleOptions}
                placeholder="Choose role type"
                onChange={handleRoleChange}
                className="dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Dynamic Form Based on Role */}
          {selectedRole === "driver" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Driver Information</h3>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Driver Image */}
                <div className="lg:col-span-2">
                  <Label>Driver Photo</Label>
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Driver preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <PlusIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="driver-image" />
                      <label htmlFor="driver-image" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Choose Photo
                      </label>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input type="text" id="name" name="name" value={driverData.name} onChange={handleDriverInputChange} placeholder="Enter driver's full name" />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={driverData.email} onChange={handleDriverInputChange} placeholder="driver@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input type="tel" id="phone" name="phone" value={driverData.phone} onChange={handleDriverInputChange} placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input type="text" id="licenseNumber" name="licenseNumber" value={driverData.licenseNumber} onChange={handleDriverInputChange} placeholder="Enter license number" />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input type="number" id="experience" name="experience" value={driverData.experience} onChange={handleDriverInputChange} placeholder="5" min="0" />
                </div>

                <div>
                  <Label>Blood Group</Label>
                  <Select options={bloodGroupOptions} placeholder="Select blood group" onChange={handleDriverSelectChange("bloodGroup")} className="dark:bg-gray-900" />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" id="address" name="address" value={driverData.address} onChange={handleDriverInputChange} placeholder="Enter complete address" />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input type="tel" id="emergencyContact" name="emergencyContact" value={driverData.emergencyContact} onChange={handleDriverInputChange} placeholder="+1 (555) 987-6543" />
                </div>

                <div>
                  <Label htmlFor="driverLicenseExpiry">Driver License Expiry</Label>
                  <Input type="date" id="driverLicenseExpiry" name="driverLicenseExpiry" value={driverData.driverLicenseExpiry} onChange={handleDriverInputChange} />
                </div>

                <div>
                  <Label htmlFor="driverUpdateExpiry">Driver Update Expiry</Label>
                  <Input type="date" id="driverUpdateExpiry" name="driverUpdateExpiry" value={driverData.driverUpdateExpiry} onChange={handleDriverInputChange} />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="driverAbstract">Driver Abstract</Label>
                  <Input type="text" id="driverAbstract" name="driverAbstract" value={driverData.driverAbstract} onChange={handleDriverInputChange} placeholder="Enter driver abstract" />
                </div>

                {/* License Document */}
                <div className="lg:col-span-2">
                  <Label>License Document</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("licenseDocument")} className="hidden" id="license-document" />
                    <label htmlFor="license-document" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {driverData.licenseDocument ? driverData.licenseDocument.name : "Click to upload license document"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedRole === "supplier" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Supplier Information</h3>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Supplier Image */}
                <div className="lg:col-span-2">
                  <Label>Supplier Photo</Label>
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Supplier preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <PlusIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="supplier-image" />
                      <label htmlFor="supplier-image" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Choose Photo
                      </label>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input type="text" id="companyName" name="companyName" value={supplierData.companyName} onChange={handleSupplierInputChange} placeholder="Enter company name" />
                </div>

                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input type="text" id="contactPerson" name="contactPerson" value={supplierData.contactPerson} onChange={handleSupplierInputChange} placeholder="Enter contact person name" />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={supplierData.email} onChange={handleSupplierInputChange} placeholder="company@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input type="tel" id="phone" name="phone" value={supplierData.phone} onChange={handleSupplierInputChange} placeholder="+1 (555) 123-4567" />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input type="text" id="address" name="address" value={supplierData.address} onChange={handleSupplierInputChange} placeholder="Enter complete address" />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input type="text" id="city" name="city" value={supplierData.city} onChange={handleSupplierInputChange} placeholder="Enter city" />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input type="text" id="state" name="state" value={supplierData.state} onChange={handleSupplierInputChange} placeholder="Enter state" />
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input type="text" id="pincode" name="pincode" value={supplierData.pincode} onChange={handleSupplierInputChange} placeholder="123456" />
                </div>

                <div>
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input type="text" id="gstNumber" name="gstNumber" value={supplierData.gstNumber} onChange={handleSupplierInputChange} placeholder="Enter GST number" />
                </div>

                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input type="text" id="panNumber" name="panNumber" value={supplierData.panNumber} onChange={handleSupplierInputChange} placeholder="Enter PAN number" />
                </div>

                <div>
                  <Label htmlFor="countryIssue">Country Issue *</Label>
                  <Input type="text" id="countryIssue" name="countryIssue" value={supplierData.countryIssue} onChange={handleSupplierInputChange} placeholder="Enter country of issue" />
                </div>

                <div>
                  <Label>Business Type *</Label>
                  <Select options={businessTypeOptions} placeholder="Select business type" onChange={handleSupplierSelectChange("businessType")} className="dark:bg-gray-900" />
                </div>

                <div>
                  <Label>Service Type *</Label>
                  <Select options={serviceTypeOptions} placeholder="Select service type" onChange={handleSupplierSelectChange("serviceType")} className="dark:bg-gray-900" />
                </div>

                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input type="text" id="bankName" name="bankName" value={supplierData.bankName} onChange={handleSupplierInputChange} placeholder="Enter bank name" />
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input type="text" id="accountNumber" name="accountNumber" value={supplierData.accountNumber} onChange={handleSupplierInputChange} placeholder="Enter account number" />
                </div>

                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input type="text" id="ifscCode" name="ifscCode" value={supplierData.ifscCode} onChange={handleSupplierInputChange} placeholder="Enter IFSC code" />
                </div>

                <div>
                  <Label htmlFor="bankDetailIssueNo">Bank Detail Issue No *</Label>
                  <Input type="text" id="bankDetailIssueNo" name="bankDetailIssueNo" value={supplierData.bankDetailIssueNo} onChange={handleSupplierInputChange} placeholder="Enter bank detail issue number" />
                </div>

                {/* Registration Document */}
                <div className="lg:col-span-2">
                  <Label>Registration Document *</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("registrationDocument")} className="hidden" id="registration-document" required />
                    <label htmlFor="registration-document" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {supplierData.registrationDocument ? supplierData.registrationDocument.name : "Click to upload registration document"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Permissions Section */}
          {selectedRole && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permissions</h3>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {permissionOptions.map((permission) => (
                  <label key={permission.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.includes(permission.value)}
                      onChange={() => handlePermissionChange(permission.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={!selectedRole} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium">
              Register Role
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}