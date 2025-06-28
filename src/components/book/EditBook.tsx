import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import type { AppDispatch } from '../../store/store';
import type {  BookEdit_types, BookState_types } from '../../types';
import { getBookbyIdThunk, updateBookThunk } from '../../api/bookapi';
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDNARY_URL;
const UPLOAD_PRESET = "Product_images";
const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  console.log("edit rendering");
  
const [newImageFile, setNewImageFile] = useState<File | null>(null);

const [imageurl,setImageurl]=useState<string>("")
//   const [book,setBook]=useState<BookState_types|null>(null)

  const [formData, setFormData] = useState<BookState_types>({
    id: '',
    title: '',
    description: '',
    price: 0,
    isActive:false,
    picture:'',
    author:'',
    authorname:'',
    bookId:'',

    



  });

  useEffect(() => {
    console.log("editpage")
    
    if (id) {
      dispatch(getBookbyIdThunk(id))
        .unwrap()
        .then((book) => setFormData(book))
        .catch(() => toast.error('Book not found'));
    }
  }, [id, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target;
  const { name, value } = target;

  const updatedValue =
    target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : value;

  setFormData((prev) => ({ ...prev, [name]: updatedValue }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.title || !formData.description || (formData.price && formData.price <= 0)) {
    toast.error('Please fill all fields correctly');
    return;
  }

  let pictureUrl = formData.picture;

  if (newImageFile) {
    const formDataImage = new FormData();
    formDataImage.append("file", newImageFile);
    formDataImage.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formDataImage,
      });

      const data = await res.json();
      if (data.secure_url) {
        pictureUrl = data.secure_url;
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Image upload failed");
        return;
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Failed to upload image");
      return;
    }
  }

  const updatedata: BookEdit_types = {
    id: formData.id,
    description: formData.description,
    isActive: formData.isActive,
    picture: pictureUrl,
    price: formData.price,
    title: formData.title,
  };

  dispatch(updateBookThunk(updatedata))
    .unwrap()
    .then(() => {
      toast.success('Book updated successfully');
      navigate('/author/books');
    })
    .catch(() => toast.error('Failed to update book'));
};


const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setNewImageFile(file);

  // Preview image locally before uploading
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === 'string') {

      setImageurl(reader.result);
    }
  };
  reader.readAsDataURL(file);
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Book</h2>


      <div>
  <label className="block font-medium text-gray-700">Cover Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full"
  />
  {formData.picture && (
    <img
      src={imageurl?imageurl:formData.picture}
      alt="Book Cover"
      className="mt-2 w-32 h-32 object-cover rounded"
    />
  )}
</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            className="w-full px-4 py-2 border rounded"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"

            checked={formData.isActive}
            onChange={handleChange}
          />
          <label className="text-gray-700">Published</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
