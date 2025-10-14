import { useState } from "react";
import { Input } from 'antd';
import Swal from 'sweetalert2';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { PlusIcon, FileIcon } from "../../icons";

type RoleType = "admin" | "manager" | "driver" | "owner" | "guide" | "supplier" | "general_manager" | "front_office_manager" | "guest_relation_manager" | "public_relation_manager" | "director_of_sales" | "administrative" | "customer_relationship" | "others" | "";
type Permission = "BUS_MANAGE" | "TOUR_ALLOCATE" | "TOUR_MANAGE" | "FINANCE" | "ROLE_MANAGE";

export default function AddRole() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("active");

  const [driverData, setDriverData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseClass: "",
    experience: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    dateOfBirth: "",
    qualification: "",
    licenseDocument: null as File | null,
    driverAbstract: "",
    driverAbstractFile: null as File | null,
    driverAbstractNo: "",
    driverAbstractExpiry: "",
    driverLicenseExpiry: "",
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
    sinNumber: "",
    sinCountryIssue: "",
    qualification: "",
    businessType: "",
    serviceType: "",
    bankName: "",
    accountNumber: "",
    countryIssue: "",
    bankDetailIssueNo: "",
    image: null as File | null,
    registrationDocument: null as File | null,
  });

  const [basicRoleData, setBasicRoleData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    image: null as File | null,
  });

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "driver", label: "Driver" },
    { value: "owner", label: "Owner" },
    { value: "guide", label: "Guide" },
    { value: "supplier", label: "Supplier" },
    { value: "general_manager", label: "General Manager" },
    { value: "front_office_manager", label: "Front Office Manager" },
    { value: "guest_relation_manager", label: "Guest Relation Manager" },
    { value: "public_relation_manager", label: "Public Relation Manager" },
    { value: "director_of_sales", label: "Director of Sales" },
    { value: "administrative", label: "Administrative" },
    { value: "customer_relationship", label: "Customer Relationship" },
    { value: "others", label: "Others" },
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

  const licenseClassOptions = [
    { value: "Class 7 Learner's Licence", label: "Class 7 Learner's Licence" },
    { value: "Class 5 GDL", label: "Class 5 GDL" },
    { value: "Class 5 (Full Licence)", label: "Class 5 (Full Licence)" },
    { value: "Class 6", label: "Class 6" },
    { value: "Class 1", label: "Class 1" },
    { value: "Class 2", label: "Class 2" },
    { value: "Class 3", label: "Class 3" },
    { value: "Class 4", label: "Class 4" },
    { value: "others", label: "Others" },
  ];

  const permissionOptions: { value: Permission; label: string }[] = [
    { value: "BUS_MANAGE", label: "Bus Management" },
    { value: "TOUR_ALLOCATE", label: "Tour Allocation" },
    { value: "TOUR_MANAGE", label: "Tour Management" },
    { value: "FINANCE", label: "Finance" },
    { value: "ROLE_MANAGE", label: "Role Management" },
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

  const handleBasicRoleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicRoleData(prev => ({ ...prev, [name]: value }));
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
      } else {
        setBasicRoleData(prev => ({ ...prev, image: file }));
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }
    
    if (selectedRole === 'driver') {
      if (!driverData.name) newErrors.name = 'Name is required';
      if (!driverData.email) newErrors.email = 'Email is required';
      if (!driverData.phone) newErrors.phone = 'Phone is required';
      if (!driverData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      if (!driverData.licenseClass) newErrors.licenseClass = 'License class is required';
      if (!driverData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!driverData.image) newErrors.image = 'Image is required';
    } else if (selectedRole === 'supplier') {
      if (!supplierData.companyName) newErrors.companyName = 'Company name is required';
      if (!supplierData.contactPerson) newErrors.contactPerson = 'Contact person is required';
      if (!supplierData.email) newErrors.email = 'Email is required';
      if (!supplierData.phone) newErrors.phone = 'Phone is required';
      if (!supplierData.address) newErrors.address = 'Address is required';
      if (!supplierData.city) newErrors.city = 'City is required';
      if (!supplierData.state) newErrors.state = 'State is required';
      if (!supplierData.pincode) newErrors.pincode = 'Pincode is required';
      if (!supplierData.gstNumber) newErrors.gstNumber = 'GST number is required';
      if (!supplierData.businessType) newErrors.businessType = 'Business type is required';
      if (!supplierData.serviceType) newErrors.serviceType = 'Service type is required';
      if (!supplierData.countryIssue) newErrors.countryIssue = 'Country issue is required';
      if (!supplierData.bankDetailIssueNo) newErrors.bankDetailIssueNo = 'Bank detail issue no is required';
      if (!supplierData.image) newErrors.image = 'Image is required';
    } else {
      if (!basicRoleData.name) newErrors.name = 'Name is required';
      if (!basicRoleData.email) newErrors.email = 'Email is required';
      if (!basicRoleData.phone) newErrors.phone = 'Phone is required';
      if (!basicRoleData.image) newErrors.image = 'Image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Failed',
        text: 'Please fill all required fields',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
      return;
    }
    
    setLoading(true);
    Swal.fire({
      title: 'Registering...',
      text: 'Please wait while we register the role',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); },
      customClass: { container: 'swal-z-index' },
    });
    
    try {
      const formData = new FormData();
      
      let roleData;
      if (selectedRole === 'driver') {
        roleData = { ...driverData, role: selectedRole, permissions, status };
        if (driverData.image) formData.append('image', driverData.image);
        if (driverData.licenseDocument) formData.append('licenseDocument', driverData.licenseDocument);
        if (driverData.driverAbstractFile) formData.append('driverAbstractFile', driverData.driverAbstractFile);
      } else if (selectedRole === 'supplier') {
        roleData = { ...supplierData, role: selectedRole, permissions, status };
        if (supplierData.image) formData.append('image', supplierData.image);
        if (supplierData.registrationDocument) formData.append('registrationDocument', supplierData.registrationDocument);
      } else {
        roleData = { ...basicRoleData, role: selectedRole, permissions, status };
        if (basicRoleData.image) formData.append('image', basicRoleData.image);
      }
      
      formData.append('data', JSON.stringify(roleData));
      
      const response = await fetch('http://localhost:5000/api/role/add', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        
        setSelectedRole('');
        setPermissions([]);
        setImagePreview(null);
        setStatus('active');
        setDriverData({
          name: '', email: '', phone: '', licenseNumber: '', licenseClass: '', experience: '',
          address: '', emergencyContact: '', bloodGroup: '', dateOfBirth: '', qualification: '',
          licenseDocument: null, driverAbstract: '', driverAbstractFile: null, driverAbstractNo: '',
          driverAbstractExpiry: '', driverLicenseExpiry: '', image: null,
        });
        setSupplierData({
          companyName: '', contactPerson: '', email: '', phone: '', address: '', city: '',
          state: '', pincode: '', gstNumber: '', sinNumber: '', sinCountryIssue: '',
          qualification: '', businessType: '', serviceType: '', bankName: '', accountNumber: '',
          countryIssue: '', bankDetailIssueNo: '', image: null, registrationDocument: null,
        });
        setBasicRoleData({ name: '', email: '', phone: '', address: '', qualification: '', image: null });
        setErrors({});
        
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Role has been registered successfully in the system',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorData.message || 'Failed to register role. Please try again',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Cannot connect to server. Please ensure the server is running',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    } finally {
      setLoading(false);
    }
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
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>
          </div>

          {/* Dynamic Form Based on Role */}
          {selectedRole === "driver" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Driver Information</h3>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Driver Image */}
                <div className="lg:col-span-2">
                  <Label>Driver Photo *</Label>
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
                  {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={driverData.name} onChange={handleDriverInputChange} placeholder="Enter driver's full name" status={errors.name ? "error" : ""} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="name" value={driverData.email} onChange={(e) => handleDriverInputChange({ target: { name: 'email', value: e.target.value } } as any)} placeholder="driver@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="name" value={driverData.phone} onChange={(e) => handleDriverInputChange({ target: { name: 'phone', value: e.target.value } } as any)} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input type="date" id="dateOfBirth" name="name" value={driverData.dateOfBirth} onChange={(e) => handleDriverInputChange({ target: { name: 'dateOfBirth', value: e.target.value } } as any)} status={errors.dateOfBirth ? "error" : ""} />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input id="licenseNumber" name="name" value={driverData.licenseNumber} onChange={(e) => handleDriverInputChange({ target: { name: 'licenseNumber', value: e.target.value } } as any)} placeholder="Enter license number" status={errors.licenseNumber ? "error" : ""} />
                  {errors.licenseNumber && <p className="mt-1 text-sm text-red-500">{errors.licenseNumber}</p>}
                </div>

                <div>
                  <Label>Driver License Class *</Label>
                  <Select options={licenseClassOptions} placeholder="Select license class" onChange={handleDriverSelectChange("licenseClass")} className="dark:bg-gray-900" />
                  {errors.licenseClass && <p className="mt-1 text-sm text-red-500">{errors.licenseClass}</p>}
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input type="number" id="experience" name="name" value={driverData.experience} onChange={(e) => handleDriverInputChange({ target: { name: 'experience', value: e.target.value } } as any)} placeholder="5" min="0" />
                </div>

                <div>
                  <Label>Blood Group</Label>
                  <Select options={bloodGroupOptions} placeholder="Select blood group" onChange={handleDriverSelectChange("bloodGroup")} className="dark:bg-gray-900" />
                </div>

                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="name" value={driverData.qualification} onChange={(e) => handleDriverInputChange({ target: { name: 'qualification', value: e.target.value } } as any)} placeholder="Enter qualification" />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="name" value={driverData.address} onChange={(e) => handleDriverInputChange({ target: { name: 'address', value: e.target.value } } as any)} placeholder="Enter complete address" />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" name="name" value={driverData.emergencyContact} onChange={(e) => handleDriverInputChange({ target: { name: 'emergencyContact', value: e.target.value } } as any)} placeholder="+1 (555) 987-6543" />
                </div>

                <div>
                  <Label htmlFor="driverLicenseExpiry">Driver License Expiry</Label>
                  <Input type="date" id="driverLicenseExpiry" name="name" value={driverData.driverLicenseExpiry} onChange={(e) => handleDriverInputChange({ target: { name: 'driverLicenseExpiry', value: e.target.value } } as any)} />
                </div>

                <div>
                  <Label htmlFor="driverAbstractNo">Driver Abstract No</Label>
                  <Input id="driverAbstractNo" name="name" value={driverData.driverAbstractNo} onChange={(e) => handleDriverInputChange({ target: { name: 'driverAbstractNo', value: e.target.value } } as any)} placeholder="Enter driver abstract number" />
                </div>

                <div>
                  <Label htmlFor="driverAbstractExpiry">Driver Abstract Expiry</Label>
                  <Input type="date" id="driverAbstractExpiry" name="name" value={driverData.driverAbstractExpiry} onChange={(e) => handleDriverInputChange({ target: { name: 'driverAbstractExpiry', value: e.target.value } } as any)} />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="driverAbstract">Driver Abstract</Label>
                  <Input id="driverAbstract" name="name" value={driverData.driverAbstract} onChange={(e) => handleDriverInputChange({ target: { name: 'driverAbstract', value: e.target.value } } as any)} placeholder="Enter driver abstract" />
                </div>

                {/* Driver Abstract File */}
                <div className="lg:col-span-2">
                  <Label>Driver Abstract File</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("driverAbstractFile")} className="hidden" id="driver-abstract-file" />
                    <label htmlFor="driver-abstract-file" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {driverData.driverAbstractFile ? driverData.driverAbstractFile.name : "Click to upload driver abstract file"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
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

          {(selectedRole && selectedRole !== "driver" && selectedRole !== "supplier") && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{roleOptions.find(r => r.value === selectedRole)?.label} Information</h3>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Basic Role Image */}
                <div className="lg:col-span-2">
                  <Label>Photo *</Label>
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Role preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <PlusIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="basic-role-image" />
                      <label htmlFor="basic-role-image" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Choose Photo
                      </label>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={basicRoleData.name} onChange={handleBasicRoleInputChange} placeholder="Enter full name" status={errors.name ? "error" : ""} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="name" value={basicRoleData.email} onChange={(e) => handleBasicRoleInputChange({ target: { name: 'email', value: e.target.value } } as any)} placeholder="user@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="name" value={basicRoleData.phone} onChange={(e) => handleBasicRoleInputChange({ target: { name: 'phone', value: e.target.value } } as any)} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="name" value={basicRoleData.qualification} onChange={(e) => handleBasicRoleInputChange({ target: { name: 'qualification', value: e.target.value } } as any)} placeholder="Enter qualification" />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="name" value={basicRoleData.address} onChange={(e) => handleBasicRoleInputChange({ target: { name: 'address', value: e.target.value } } as any)} placeholder="Enter complete address" />
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
                  <Label>Supplier Photo *</Label>
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
                  {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>

                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="name" value={supplierData.companyName} onChange={(e) => handleSupplierInputChange({ target: { name: 'companyName', value: e.target.value } } as any)} placeholder="Enter company name" status={errors.companyName ? "error" : ""} />
                  {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input id="contactPerson" name="name" value={supplierData.contactPerson} onChange={(e) => handleSupplierInputChange({ target: { name: 'contactPerson', value: e.target.value } } as any)} placeholder="Enter contact person name" status={errors.contactPerson ? "error" : ""} />
                  {errors.contactPerson && <p className="mt-1 text-sm text-red-500">{errors.contactPerson}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="name" value={supplierData.email} onChange={(e) => handleSupplierInputChange({ target: { name: 'email', value: e.target.value } } as any)} placeholder="company@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="name" value={supplierData.phone} onChange={(e) => handleSupplierInputChange({ target: { name: 'phone', value: e.target.value } } as any)} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="name" value={supplierData.address} onChange={(e) => handleSupplierInputChange({ target: { name: 'address', value: e.target.value } } as any)} placeholder="Enter complete address" status={errors.address ? "error" : ""} />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="name" value={supplierData.city} onChange={(e) => handleSupplierInputChange({ target: { name: 'city', value: e.target.value } } as any)} placeholder="Enter city" status={errors.city ? "error" : ""} />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" name="name" value={supplierData.state} onChange={(e) => handleSupplierInputChange({ target: { name: 'state', value: e.target.value } } as any)} placeholder="Enter state" status={errors.state ? "error" : ""} />
                  {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" name="name" value={supplierData.pincode} onChange={(e) => handleSupplierInputChange({ target: { name: 'pincode', value: e.target.value } } as any)} placeholder="123456" status={errors.pincode ? "error" : ""} />
                  {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                </div>

                <div>
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input id="gstNumber" name="name" value={supplierData.gstNumber} onChange={(e) => handleSupplierInputChange({ target: { name: 'gstNumber', value: e.target.value } } as any)} placeholder="Enter GST number" status={errors.gstNumber ? "error" : ""} />
                  {errors.gstNumber && <p className="mt-1 text-sm text-red-500">{errors.gstNumber}</p>}
                </div>

                <div>
                  <Label htmlFor="sinNumber">SIN Number</Label>
                  <Input id="sinNumber" name="name" value={supplierData.sinNumber} onChange={(e) => handleSupplierInputChange({ target: { name: 'sinNumber', value: e.target.value } } as any)} placeholder="Enter SIN number" />
                </div>

                <div>
                  <Label htmlFor="sinCountryIssue">Country of Issue for SIN</Label>
                  <Input id="sinCountryIssue" name="name" value={supplierData.sinCountryIssue} onChange={(e) => handleSupplierInputChange({ target: { name: 'sinCountryIssue', value: e.target.value } } as any)} placeholder="Enter country of issue" />
                </div>

                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="name" value={supplierData.qualification} onChange={(e) => handleSupplierInputChange({ target: { name: 'qualification', value: e.target.value } } as any)} placeholder="Enter qualification" />
                </div>

                <div>
                  <Label htmlFor="countryIssue">Country Issue *</Label>
                  <Input id="countryIssue" name="name" value={supplierData.countryIssue} onChange={(e) => handleSupplierInputChange({ target: { name: 'countryIssue', value: e.target.value } } as any)} placeholder="Enter country of issue" status={errors.countryIssue ? "error" : ""} />
                  {errors.countryIssue && <p className="mt-1 text-sm text-red-500">{errors.countryIssue}</p>}
                </div>

                <div>
                  <Label>Business Type *</Label>
                  <Select options={businessTypeOptions} placeholder="Select business type" onChange={handleSupplierSelectChange("businessType")} className="dark:bg-gray-900" />
                  {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>}
                </div>

                <div>
                  <Label>Service Type *</Label>
                  <Select options={serviceTypeOptions} placeholder="Select service type" onChange={handleSupplierSelectChange("serviceType")} className="dark:bg-gray-900" />
                  {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
                </div>

                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" name="name" value={supplierData.bankName} onChange={(e) => handleSupplierInputChange({ target: { name: 'bankName', value: e.target.value } } as any)} placeholder="Enter bank name" />
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" name="name" value={supplierData.accountNumber} onChange={(e) => handleSupplierInputChange({ target: { name: 'accountNumber', value: e.target.value } } as any)} placeholder="Enter account number" />
                </div>

                <div>
                  <Label htmlFor="bankDetailIssueNo">Bank Detail Issue No *</Label>
                  <Input id="bankDetailIssueNo" name="name" value={supplierData.bankDetailIssueNo} onChange={(e) => handleSupplierInputChange({ target: { name: 'bankDetailIssueNo', value: e.target.value } } as any)} placeholder="Enter bank detail issue number" status={errors.bankDetailIssueNo ? "error" : ""} />
                  {errors.bankDetailIssueNo && <p className="mt-1 text-sm text-red-500">{errors.bankDetailIssueNo}</p>}
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

          {/* Status Section */}
          {selectedRole && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h3>
              <div className="flex gap-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="active"
                    checked={status === 'active'}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</span>
                </label>
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
            <button type="submit" disabled={!selectedRole || loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium">
              {loading ? 'Registering...' : 'Register Role'}
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}