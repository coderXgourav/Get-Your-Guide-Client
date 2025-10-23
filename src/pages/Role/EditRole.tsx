import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
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

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RoleType>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("active");
  const [existingImage, setExistingImage] = useState<string>("");

  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    image: null,
  });

  useEffect(() => {
    fetchRoleData();
  }, [id]);

  const fetchRoleData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/role/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedRole(data.role);
        setPermissions(data.permissions || []);
        setStatus(data.status || 'active');
        setFormData(data);
        if (data.image) {
          setExistingImage(data.image);
          setImagePreview(`http://localhost:5000/uploads/${data.image}`);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load role data',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, image: file }));
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
      setFormData((prev: any) => ({ ...prev, [field]: file }));
    }
  };

  const handlePermissionChange = (permission: Permission) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (selectedRole === 'driver') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      if (!formData.licenseClass) newErrors.licenseClass = 'License class is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
    } else if (selectedRole === 'supplier') {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
      if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    } else {
      if (!formData.name && !formData.companyName) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
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
      title: 'Updating...',
      text: 'Please wait while we update the role',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); },
      customClass: { container: 'swal-z-index' },
    });
    
    try {
      const formDataToSend = new FormData();
      const roleData = { ...formData, role: selectedRole, permissions, status };
      delete roleData.image;
      delete roleData.licenseDocument;
      delete roleData.driverAbstractFile;
      delete roleData.registrationDocument;
      
      if (formData.image instanceof File) formDataToSend.append('image', formData.image);
      if (formData.licenseDocument instanceof File) formDataToSend.append('licenseDocument', formData.licenseDocument);
      if (formData.driverAbstractFile instanceof File) formDataToSend.append('driverAbstractFile', formData.driverAbstractFile);
      if (formData.registrationDocument instanceof File) formDataToSend.append('registrationDocument', formData.registrationDocument);
      
      formDataToSend.append('data', JSON.stringify(roleData));
      
      const response = await fetch(`http://localhost:5000/api/role/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Update Successful!',
          text: 'Role has been updated successfully',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        }).then(() => {
          navigate('/admin/view-role');
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: errorData.message || 'Failed to update role',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Cannot connect to server',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div>
      <PageMeta title="Edit Role | Role Management" description="Edit role information" />
      <PageBreadcrumb pageTitle="Edit Role" />
      
      <ComponentCard title="Update Role Information">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Label>Photo {(selectedRole === 'driver' || selectedRole === 'supplier') && '*'}</Label>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PlusIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="role-image" />
                  <label htmlFor="role-image" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    Change Photo
                  </label>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            {selectedRole !== 'driver' && selectedRole !== 'supplier' && (
              <>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Enter full name" status={errors.name ? "error" : ""} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="user@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="qualification" value={formData.qualification || ''} onChange={handleInputChange} placeholder="Enter qualification" />
                </div>
                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Enter address" />
                </div>
              </>
            )}

            {selectedRole === 'driver' && (
              <>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Enter driver's full name" status={errors.name ? "error" : ""} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="driver@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </>
            )}

            {selectedRole === 'supplier' && (
              <>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="company@example.com" status={errors.email ? "error" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="+1 (555) 123-4567" status={errors.phone ? "error" : ""} />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </>
            )}

            {selectedRole === 'driver' && (
              <>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleInputChange} status={errors.dateOfBirth ? "error" : ""} />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input id="licenseNumber" name="licenseNumber" value={formData.licenseNumber || ''} onChange={handleInputChange} placeholder="Enter license number" status={errors.licenseNumber ? "error" : ""} />
                  {errors.licenseNumber && <p className="mt-1 text-sm text-red-500">{errors.licenseNumber}</p>}
                </div>
                <div>
                  <Label>Driver License Class *</Label>
                  <Select options={licenseClassOptions} placeholder="Select license class" value={formData.licenseClass} onChange={handleSelectChange("licenseClass")} className="dark:bg-gray-900" />
                  {errors.licenseClass && <p className="mt-1 text-sm text-red-500">{errors.licenseClass}</p>}
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input type="number" id="experience" name="experience" value={formData.experience || ''} onChange={handleInputChange} placeholder="5" min="0" />
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <Select options={bloodGroupOptions} placeholder="Select blood group" value={formData.bloodGroup} onChange={handleSelectChange("bloodGroup")} className="dark:bg-gray-900" />
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="qualification" value={formData.qualification || ''} onChange={handleInputChange} placeholder="Enter qualification" />
                </div>
                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Enter complete address" status={errors.address ? "error" : ""} />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                  <Input id="emergencyContact" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleInputChange} placeholder="+1 (555) 987-6543" status={errors.emergencyContact ? "error" : ""} />
                  {errors.emergencyContact && <p className="mt-1 text-sm text-red-500">{errors.emergencyContact}</p>}
                </div>
                <div>
                  <Label htmlFor="driverLicenseExpiry">Driver License Expiry</Label>
                  <Input type="date" id="driverLicenseExpiry" name="driverLicenseExpiry" value={formData.driverLicenseExpiry || ''} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="driverAbstractNo">Driver Abstract No</Label>
                  <Input id="driverAbstractNo" name="driverAbstractNo" value={formData.driverAbstractNo || ''} onChange={handleInputChange} placeholder="Enter driver abstract number" />
                </div>
                <div>
                  <Label htmlFor="driverAbstractExpiry">Driver Abstract Expiry</Label>
                  <Input type="date" id="driverAbstractExpiry" name="driverAbstractExpiry" value={formData.driverAbstractExpiry || ''} onChange={handleInputChange} />
                </div>
                <div className="lg:col-span-2">
                  <Label>Driver Abstract File</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("driverAbstractFile")} className="hidden" id="driver-abstract-file" />
                    <label htmlFor="driver-abstract-file" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.driverAbstractFile instanceof File ? formData.driverAbstractFile.name : formData.driverAbstractFile || "Click to upload driver abstract file"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                    {formData.driverAbstractFile && !(formData.driverAbstractFile instanceof File) && (
                      <a href={`http://localhost:5000/uploads/${formData.driverAbstractFile}`} download target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <Label>License Document</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("licenseDocument")} className="hidden" id="license-document" />
                    <label htmlFor="license-document" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.licenseDocument instanceof File ? formData.licenseDocument.name : formData.licenseDocument || "Click to upload license document"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                    {formData.licenseDocument && !(formData.licenseDocument instanceof File) && (
                      <a href={`http://localhost:5000/uploads/${formData.licenseDocument}`} download target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedRole === 'supplier' && (
              <>
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="companyName" value={formData.companyName || ''} onChange={handleInputChange} placeholder="Enter company name" status={errors.companyName ? "error" : ""} />
                  {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input id="contactPerson" name="contactPerson" value={formData.contactPerson || ''} onChange={handleInputChange} placeholder="Enter contact person name" status={errors.contactPerson ? "error" : ""} />
                  {errors.contactPerson && <p className="mt-1 text-sm text-red-500">{errors.contactPerson}</p>}
                </div>
                <div className="lg:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Enter complete address" status={errors.address ? "error" : ""} />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" value={formData.city || ''} onChange={handleInputChange} placeholder="Enter city" status={errors.city ? "error" : ""} />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" name="state" value={formData.state || ''} onChange={handleInputChange} placeholder="Enter state" status={errors.state ? "error" : ""} />
                  {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" name="pincode" value={formData.pincode || ''} onChange={handleInputChange} placeholder="123456" status={errors.pincode ? "error" : ""} />
                  {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input id="gstNumber" name="gstNumber" value={formData.gstNumber || ''} onChange={handleInputChange} placeholder="Enter GST number" status={errors.gstNumber ? "error" : ""} />
                  {errors.gstNumber && <p className="mt-1 text-sm text-red-500">{errors.gstNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="sinNumber">SIN Number</Label>
                  <Input id="sinNumber" name="sinNumber" value={formData.sinNumber || ''} onChange={handleInputChange} placeholder="Enter SIN number" />
                </div>
                <div>
                  <Label htmlFor="sinCountryIssue">Country of Issue for SIN</Label>
                  <Input id="sinCountryIssue" name="sinCountryIssue" value={formData.sinCountryIssue || ''} onChange={handleInputChange} placeholder="Enter country of issue" />
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" name="qualification" value={formData.qualification || ''} onChange={handleInputChange} placeholder="Enter qualification" />
                </div>
                <div>
                  <Label htmlFor="countryIssue">Country Issue</Label>
                  <Input id="countryIssue" name="countryIssue" value={formData.countryIssue || ''} onChange={handleInputChange} placeholder="Enter country of issue" />
                </div>
                <div>
                  <Label>Business Type *</Label>
                  <Select options={businessTypeOptions} placeholder="Select business type" value={formData.businessType} onChange={handleSelectChange("businessType")} className="dark:bg-gray-900" />
                  {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>}
                </div>
                <div>
                  <Label>Service Type *</Label>
                  <Select options={serviceTypeOptions} placeholder="Select service type" value={formData.serviceType} onChange={handleSelectChange("serviceType")} className="dark:bg-gray-900" />
                  {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" name="bankName" value={formData.bankName || ''} onChange={handleInputChange} placeholder="Enter bank name" />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" name="accountNumber" value={formData.accountNumber || ''} onChange={handleInputChange} placeholder="Enter account number" />
                </div>
                <div>
                  <Label htmlFor="bankDetailIssueNo">Bank Detail Issue No</Label>
                  <Input id="bankDetailIssueNo" name="bankDetailIssueNo" value={formData.bankDetailIssueNo || ''} onChange={handleInputChange} placeholder="Enter bank detail issue number" />
                </div>
                <div className="lg:col-span-2">
                  <Label>Registration Document</Label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleDocumentChange("registrationDocument")} className="hidden" id="registration-document" />
                    <label htmlFor="registration-document" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-center">
                        <FileIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.registrationDocument instanceof File ? formData.registrationDocument.name : formData.registrationDocument || "Click to upload registration document"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                    {formData.registrationDocument && !(formData.registrationDocument instanceof File) && (
                      <a href={`http://localhost:5000/uploads/${formData.registrationDocument}`} download target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h3>
            <div className="flex gap-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="active" checked={status === 'active'} onChange={(e) => setStatus(e.target.value)} className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="inactive" checked={status === 'inactive'} onChange={(e) => setStatus(e.target.value)} className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permissions</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {permissionOptions.map((permission) => (
                <label key={permission.value} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={permissions.includes(permission.value)} onChange={() => handlePermissionChange(permission.value)} className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={() => navigate('/admin/view-role')} className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium">
              {loading ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
