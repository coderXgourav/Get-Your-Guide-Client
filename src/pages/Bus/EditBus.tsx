import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from 'antd';
import Swal from 'sweetalert2';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { PlusIcon } from "../../icons";

export default function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    busNumber: "", model: "", manufacturer: "", year: "", capacity: "",
    fuelType: "", regExDate: "", insuranceNo: "", insuranceCompany: "",
    exDate: "", vinNo: "", image: null, busServiceDate: "",
    nextServiceDate: "", kmOnServiceDate: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("active");

  const fuelTypeOptions = [
    { value: "Diesel", label: "Diesel" },
    { value: "Petrol", label: "Petrol" },
    { value: "CNG", label: "CNG" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  useEffect(() => {
    fetchBusData();
  }, [id]);

  const fetchBusData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bus/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setStatus(data.status || 'active');
        if (data.image) {
          setImagePreview(`http://localhost:5000/uploads/${data.image}`);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load bus data',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, fuelType: value }));
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.busNumber) newErrors.busNumber = 'Bus number is required';
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.regExDate) newErrors.regExDate = 'Registration expiry date is required';
    if (!formData.insuranceNo) newErrors.insuranceNo = 'Insurance number is required';
    if (!formData.insuranceCompany) newErrors.insuranceCompany = 'Insurance company is required';
    if (!formData.exDate) newErrors.exDate = 'Expiry date is required';
    if (!formData.vinNo) newErrors.vinNo = 'VIN number is required';
    
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
      text: 'Please wait while we update the bus',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); },
      customClass: { container: 'swal-z-index' },
    });
    
    try {
      const formDataToSend = new FormData();
      const busData = { ...formData, status };
      delete busData.image;
      
      if (formData.image instanceof File) formDataToSend.append('image', formData.image);
      formDataToSend.append('data', JSON.stringify(busData));
      
      const response = await fetch(`http://localhost:5000/api/bus/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Update Successful!',
          text: 'Bus has been updated successfully',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        }).then(() => {
          navigate('/admin/view-buses');
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: errorData.message || 'Failed to update bus',
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

  return (
    <div>
      <PageMeta title="Edit Bus | Get Your Guide Admin" description="Edit bus information" />
      <PageBreadcrumb pageTitle="Edit Bus" />
      
      <ComponentCard title="Update Bus Information">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Label>Bus Photo</Label>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-24 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Bus preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PlusIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="bus-image" />
                  <label htmlFor="bus-image" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    Change Photo
                  </label>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="busNumber">Bus Number *</Label>
              <Input id="busNumber" name="busNumber" value={formData.busNumber || ''} onChange={handleInputChange} placeholder="BUS-001" status={errors.busNumber ? "error" : ""} />
              {errors.busNumber && <p className="mt-1 text-sm text-red-500">{errors.busNumber}</p>}
            </div>

            <div>
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input id="manufacturer" name="manufacturer" value={formData.manufacturer || ''} onChange={handleInputChange} placeholder="Tata Motors" status={errors.manufacturer ? "error" : ""} />
              {errors.manufacturer && <p className="mt-1 text-sm text-red-500">{errors.manufacturer}</p>}
            </div>

            <div>
              <Label htmlFor="model">Model *</Label>
              <Input id="model" name="model" value={formData.model || ''} onChange={handleInputChange} placeholder="Starbus Ultra" status={errors.model ? "error" : ""} />
              {errors.model && <p className="mt-1 text-sm text-red-500">{errors.model}</p>}
            </div>

            <div>
              <Label htmlFor="year">Manufacturing Year *</Label>
              <Input type="number" id="year" name="year" value={formData.year || ''} onChange={handleInputChange} placeholder="2023" min="1990" max="2024" status={errors.year ? "error" : ""} />
              {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
            </div>

            <div>
              <Label htmlFor="capacity">Seating Capacity *</Label>
              <Input type="number" id="capacity" name="capacity" value={formData.capacity || ''} onChange={handleInputChange} placeholder="45" min="1" status={errors.capacity ? "error" : ""} />
              {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
            </div>

            <div>
              <Label>Fuel Type *</Label>
              <Select options={fuelTypeOptions} placeholder="Select fuel type" value={formData.fuelType} onChange={handleSelectChange} className="dark:bg-gray-900" />
              {errors.fuelType && <p className="mt-1 text-sm text-red-500">{errors.fuelType}</p>}
            </div>

            <div>
              <Label htmlFor="regExDate">Reg. Ex. Date *</Label>
              <Input type="date" id="regExDate" name="regExDate" value={formData.regExDate || ''} onChange={handleInputChange} status={errors.regExDate ? "error" : ""} />
              {errors.regExDate && <p className="mt-1 text-sm text-red-500">{errors.regExDate}</p>}
            </div>

            <div>
              <Label htmlFor="insuranceNo">Insurance No *</Label>
              <Input id="insuranceNo" name="insuranceNo" value={formData.insuranceNo || ''} onChange={handleInputChange} placeholder="Enter insurance number" status={errors.insuranceNo ? "error" : ""} />
              {errors.insuranceNo && <p className="mt-1 text-sm text-red-500">{errors.insuranceNo}</p>}
            </div>

            <div>
              <Label htmlFor="insuranceCompany">Insurance Company *</Label>
              <Input id="insuranceCompany" name="insuranceCompany" value={formData.insuranceCompany || ''} onChange={handleInputChange} placeholder="Enter insurance company" status={errors.insuranceCompany ? "error" : ""} />
              {errors.insuranceCompany && <p className="mt-1 text-sm text-red-500">{errors.insuranceCompany}</p>}
            </div>

            <div>
              <Label htmlFor="exDate">Ex. Date *</Label>
              <Input type="date" id="exDate" name="exDate" value={formData.exDate || ''} onChange={handleInputChange} status={errors.exDate ? "error" : ""} />
              {errors.exDate && <p className="mt-1 text-sm text-red-500">{errors.exDate}</p>}
            </div>

            <div>
              <Label htmlFor="vinNo">VIN No *</Label>
              <Input id="vinNo" name="vinNo" value={formData.vinNo || ''} onChange={handleInputChange} placeholder="Enter VIN number" status={errors.vinNo ? "error" : ""} />
              {errors.vinNo && <p className="mt-1 text-sm text-red-500">{errors.vinNo}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-t pt-6">Bus Service Records</h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div>
                <Label htmlFor="busServiceDate">Bus Service Date</Label>
                <Input type="date" id="busServiceDate" name="busServiceDate" value={formData.busServiceDate || ''} onChange={handleInputChange} />
              </div>

              <div>
                <Label htmlFor="nextServiceDate">Next Service Date</Label>
                <Input type="date" id="nextServiceDate" name="nextServiceDate" value={formData.nextServiceDate || ''} onChange={handleInputChange} />
              </div>

              <div>
                <Label htmlFor="kmOnServiceDate">Km on Service Date</Label>
                <Input type="number" id="kmOnServiceDate" name="kmOnServiceDate" value={formData.kmOnServiceDate || ''} onChange={handleInputChange} placeholder="Enter kilometers" min="0" />
              </div>
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

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={() => navigate('/admin/view-buses')} className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium">
              {loading ? 'Updating...' : 'Update Bus'}
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
