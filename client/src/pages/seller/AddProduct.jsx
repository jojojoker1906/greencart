import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      for (let i = 0; i < files.length; i++) {
        if (files[i]) formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-green-100/40 outline-none focus:border-green-400 transition-all text-sm";

  return (
    <div className="max-w-3xl">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Add Product
        </h1>
        <p className="text-green-100/60 text-sm mt-1">
          Upload product details to your store
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6"
      >

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-green-100 mb-3">
            Product Images
          </label>

          <div className="grid grid-cols-4 gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer aspect-square rounded-2xl border border-dashed border-white/20 bg-white/5 overflow-hidden hover:border-green-400 transition"
                >
                  <input
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />

                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="w-full h-full object-cover"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-green-100 mb-2">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className={inputStyle}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-green-100 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Enter description"
            className={`${inputStyle} resize-none`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category + Prices */}
        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <label className="block text-sm text-green-100 mb-2">
              Category
            </label>
            <select
              className={inputStyle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" className="text-black">
                Select
              </option>

              {categories.map((item, index) => (
                <option
                  key={index}
                  value={item.path}
                  className="text-black"
                >
                  {item.path}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-green-100 mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              className={inputStyle}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-green-100 mb-2">
              Offer Price
            </label>
            <input
              type="number"
              placeholder="0"
              className={inputStyle}
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>

        </div>

        {/* Button */}
        <div className="pt-2">
          <button className="px-8 py-3 rounded-xl bg-white text-green-900 font-semibold hover:bg-green-100 transition cursor-pointer">
            Add Product
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;