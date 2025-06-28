import { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Header from "../Header";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addaddress } from "../../api/authapi";
import toast from "react-hot-toast";
import type { Address_types } from "../../types";
import { deleteaddressbyAddressId, getUseraddresbyuserId } from "../../api/userapi";

const AddressSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address_types[] | []>(
    user?.Address || []
  );

  useEffect(() => {
    if (!user) {
      toast.error("Something Problem please login");
      return;
    }
    dispatch(getUseraddresbyuserId(user.id))
      .unwrap()
      .then((res) => {
        setAddresses(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [dispatch, user]);

  const [formData, setFormData] = useState<Address_types>({
    _id: "",
    name: "",
    line: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.line.trim()) newErrors.line = "Address line is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Valid 6-digit pincode required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number required";
    return newErrors;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);
    if (!user) {
      toast.error("something problem please login");
      return;
    }
    dispatch(addaddress({ userId: user.id, address: formData }))
      .unwrap()
      .then(() => {
        toast.success("Address Added");
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.message);
      });

    const newAddress = { ...formData, id: Date.now() };
    setAddresses((prev) => [...prev, newAddress]);
    setFormData({
      _id: "",
      name: "",
      line: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
    setErrors({});
  };

  const handleDelete = (id: string) => {

    if(!user){
      toast.error('Something error please login')
      return
    }
    dispatch(deleteaddressbyAddressId({userId:user.id,addressId:id})).then(()=>{
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success('deleted')

    }).catch(()=>{
      toast.error('Something Error')
      
    })
  };

  return (
    <>
      <Header />
      <section className="bg-[#f8f5f0] p-6 rounded-xl shadow-md border border-[#e4ddd4] max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-[#5e4636] mb-6">
          Manage Addresses
        </h2>

        {/* Address Form */}
        <form
          onSubmit={handleAdd}
          className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl border mb-8"
        >
          {["name", "line", "city", "state", "pincode", "phone"].map(
            (field) => (
              <div key={field} className="flex flex-col col-span-1">
                <input
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={`px-4 py-2 border rounded focus:outline-none ${
                    errors[field as keyof typeof formData]
                      ? "border-red-500"
                      : "border-[#d6c8b8]"
                  }`}
                />
                {errors[field as keyof typeof formData] && (
                  <span className="text-red-600 text-xs mt-1">
                    {errors[field as keyof typeof formData]}
                  </span>
                )}
              </div>
            )
          )}

          <div className="col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#a67c52] hover:bg-[#956a45] text-white rounded transition"
            >
              <FaPlus />
              Add Address
            </button>
          </div>
        </form>

        {/* Address List */}
        <div className="space-y-4">
          {addresses &&
            addresses.map((addr) => (
              <div
                key={addr._id}
                className="border border-[#d6c8b8] p-4 bg-white rounded-lg flex justify-between items-start"
              >
                <div className="text-[#3e2f26] text-sm leading-relaxed">
                  <p className="font-semibold">{addr.name}</p>
                  <p>{addr.line}</p>
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p>📞 {addr.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Delete Address"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          {user && user.Address && user?.Address.length === 0 && (
            <p className="text-center text-gray-500">No addresses added yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default AddressSection;
