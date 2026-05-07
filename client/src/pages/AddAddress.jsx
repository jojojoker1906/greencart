import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// Input Field Component
const InputField = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
}) => (
  <input
    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-green-200/50 outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 bg-gradient-to-br from-[#021a10] via-[#0a3d2a] to-[#157347] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 blur-[160px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
            Shipping Details
          </p>

          <h1 className="text-5xl md:text-6xl font-black text-white">
            Add Address
          </h1>

          <p className="text-green-100/70 mt-4 text-lg">
            Securely save your delivery details for faster checkout
          </p>
        </div>

        {/* Main Card */}
        <div className="grid md:grid-cols-2 gap-14 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street Address"
            />

            <div className="grid grid-cols-2 gap-5">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone Number"
            />

            <button className="w-full mt-6 py-4 rounded-2xl bg-white text-green-900 font-bold text-lg hover:scale-[1.02] hover:bg-green-100 transition-all duration-300 shadow-xl">
              Save Address
            </button>
          </form>

          {/* Image Side */}
          <div className="relative flex justify-center">
            <div className="absolute w-[420px] h-[420px] bg-green-400/10 rounded-full blur-[120px]"></div>

            <img
              className="relative z-10 max-h-[520px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:scale-105 transition-all duration-500"
              src={assets.add_address_iamge}
              alt="Add Address"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAddress;