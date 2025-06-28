import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addBookthunk } from '../../api/bookapi';
import type { BookCreate_types } from '../../types';
import { useNavigate } from 'react-router-dom';



const CLOUDINARY_URL = import.meta.env.VITE_CLOUDNARY_URL;
const UPLOAD_PRESET = "Product_images";
const AddBook = () => {
    const {user}=useSelector((state:RootState)=>state.user)
    const dispatch:AppDispatch=useDispatch()
    const navigate=useNavigate()
  const [book, setBook] = useState({
    title: '',
    description: '',
    price: '',
    status: 'draft',
    picture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setBook({ ...book, picture: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!book.picture) {
    toast.error("Please upload a cover image");
    return;
}
if(!user)
    {
        toast.error("Something Problem Please login again");
        return;

    }

  try {
    // Upload image to Cloudinary
    const imageData = new FormData();
    imageData.append("file", book.picture);
    imageData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_URL, imageData);
    const imageurl: string = response.data.secure_url;

    const data: BookCreate_types = {
      picture: imageurl,
      title: book.title,
      description: book.description,
      price: book.price,
      status: book.status,
      authorname:user.name,
      author:user.id
    };

    await dispatch(addBookthunk(data)).unwrap();    

    toast.success("Book added successfully");
    navigate('/author/books')
    setBook({
      title: '',
      description: '',
      price: '',
      status: 'draft',
      picture: null,
    });
    setPreviewUrl(null);
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Failed to add book");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📘 Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter book title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Write a short description..."
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="299"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Status</label>
            <select
              name="status"
              value={book.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Image Upload + Preview */}
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-44 object-picture border rounded-md shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
