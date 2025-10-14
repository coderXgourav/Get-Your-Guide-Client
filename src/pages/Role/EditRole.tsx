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
    if (!formData.name && !formData.companyName) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
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
          navigate('/role/view');
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
              <Label>Photo</Label>
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

            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name || formData.companyName || ''} onChange={handleInputChange} placeholder="Enter full name" status={errors.name ? "error" : ""} />
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
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Enter address" />
            </div>
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
            <button type="button" onClick={() => navigate('/role/view')} className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
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
