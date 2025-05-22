//   // App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [form, setForm] = useState({
//     email: '',
//     first_name: '',
//     last_name: '',
//     contact: '+91',
//     birthdate: '',
//     photo: null,
//     address: '',
//   });

//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const [editingUser, setEditingUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const res = await axios.get('http://localhost:5000/users');
//     setUsers(res.data);
//   };

//   const handleEdit = (user) => {
//     setForm({
//       email: user.email,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       contact: user.contact,
//       birthdate: user.birthdate.split('T')[0], // Ensure date format for input
//       address: user.address,
//       photo: null, // To allow re-upload if needed
//     });
//     setEditingUser(user.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/users/${id}`);
//     fetchUsers();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { contact, birthdate, photo } = form;

//     if (!/^\+91\d{10}$/.test(contact) || contact.includes('0000000000')) {
//       return setError('Invalid contact number');
//     }

//     const birth = new Date(birthdate);
//     const today = new Date();
//     if (birth > today) return setError("Birthdate can't be in the future");

//     if (photo && photo.size > 300 * 1024) {
//       return setError('Photo too large, must be under 300KB');
//     }

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value) formData.append(key, value);
//     });

//     try {
//       if (editingUser) {
//         await axios.put(`http://localhost:5000/users/${editingUser}`, formData);
//       } else {
//         await axios.post('http://localhost:5000/users', formData);
//       }
//       fetchUsers();
//       setForm({ email: '', first_name: '', last_name: '', contact: '+91', birthdate: '', photo: null, address: '' });
//       setEditingUser(null);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to submit form');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">User Contact Form</h1>
//         {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" encType="multipart/form-data">
//           <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//           <input type="text" placeholder="First Name" required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
//           <input type="text" placeholder="Last Name" required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
//           <input type="text" maxLength={13} placeholder="Contact (+91XXXXXXXXXX)" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
//           <input type="date" required value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} />
//           <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
//           <textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
//           <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold">
//             {editingUser ? 'Update Contact' : 'Add Contact'}
//           </button>
//         </form>
//       </div>

//       <div className="max-w-4xl mx-auto mt-10">
//         <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">Saved Contacts</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {users.map((user) => (
//             <div key={user.id} className="border p-4 rounded bg-white shadow">
//               <img src={`http://localhost:5000/uploads/${user.photo}`} alt="Profile" className="w-24 h-32 object-cover mb-2" />
//               <p><strong>{user.first_name} {user.last_name}</strong></p>
//               <p>{user.email}</p>
//               <p>{user.contact}</p>
//               <p>{user.birthdate.split('T')[0]}</p>
//               <p>{user.address}</p>
//               <div className="mt-2 space-x-2">
//                 <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(user)}>Edit</button>
//                 <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';

// function App() {
//   const [form, setForm] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     contact: '',
//     birthdate: '',
//     photo: null,
//     address: '',
//   });

//   const [errors, setErrors] = useState({});

//   // Validation functions
//   const validateField = (name, value) => {
//     let error = '';

//     switch (name) {
//       case 'first_name':
//       case 'last_name':
//         if (!value) {
//           error = `${name === 'first_name' ? 'First' : 'Last'} name is required.`;
//         } else if (value.length > 50) {
//           error = `${name === 'first_name' ? 'First' : 'Last'} name must not exceed 50 characters.`;
//         } else if (!/^[A-Z]/.test(value)) {
//           error = `${name === 'first_name' ? 'First' : 'Last'} name must start with a capital letter.`;
//         } else if (!/^[A-Za-z\s]+$/.test(value)) {
//           error = `${name === 'first_name' ? 'First' : 'Last'} name can only contain letters and spaces.`;
//         }
//         break;

//       case 'email':
//         if (!value) {
//           error = 'Email is required.';
//         } else if (!/^\S+@\S+\.\S+$/.test(value)) {
//           error = 'Invalid email format.';
//         }
//         break;

//       case 'contact':
//         if (!value) {
//           error = 'Contact number is required.';
//         } else if (!/^\+91\d{10}$/.test(value)) {
//           error = 'Contact must be in +91XXXXXXXXXX format.';
//         } else if (value.includes('0000000000')) {
//           error = 'Invalid contact number.';
//         }
//         break;

//       case 'birthdate':
//         if (!value) {
//           error = 'Birthdate is required.';
//         } else {
//           const birth = new Date(value);
//           const today = new Date();
//           if (birth > today) {
//             error = "Birthdate can't be in the future.";
//           }
//         }
//         break;

//       case 'photo':
//         if (value) {
//           if (value.size > 300 * 1024) {
//             error = 'Photo must be less than 300KB.';
//           } else if (!value.type.startsWith('image/')) {
//             error = 'Photo must be an image file.';
//           }
//         }
//         break;

//       case 'address':
//         if (value.length > 200) {
//           error = 'Address must be less than 200 characters.';
//         }
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   // Handle change and validate on the fly
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     const fieldValue = name === 'photo' ? files[0] : value;

//     // Update form data
//     setForm((prev) => ({
//       ...prev,
//       [name]: fieldValue,
//     }));

//     // Validate this field and update errors
//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, fieldValue),
//     }));
//   };

//   // On submit validate all fields
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.entries(form).forEach(([key, value]) => {
//       const err = validateField(key, value);
//       if (err) newErrors[key] = err;
//     });

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       alert('Form submitted successfully!');
//       // Proceed with API call or form submission logic here
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">User Contact Form</h1>

//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-4">
//           <div>
//             <input
//               type="text"
//               name="first_name"
//               placeholder="First Name"
//               value={form.first_name}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />
//             {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="last_name"
//               placeholder="Last Name"
//               value={form.last_name}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />
//             {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name}</p>}
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />
//             {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="contact"
//               placeholder="Contact (+91XXXXXXXXXX)"
//               maxLength={13}
//               value={form.contact}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />
//             {errors.contact && <p className="text-red-600 text-sm">{errors.contact}</p>}
//           </div>

//           <div>
//             <input
//               type="date"
//               name="birthdate"
//               value={form.birthdate}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />
//             {errors.birthdate && <p className="text-red-600 text-sm">{errors.birthdate}</p>}
//           </div>

//           <div>
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full"
//             />
//             {errors.photo && <p className="text-red-600 text-sm">{errors.photo}</p>}
//           </div>

//           <div>
//             <textarea
//               name="address"
//               placeholder="Address"
//               value={form.address}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               maxLength={200}
//             />
//             {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
//           </div>

//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    contact: '+91',
    birthdate: '',
    photo: null,
    address: '',
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'first_name':
      case 'last_name':
        if (!value) error = `${name === 'first_name' ? 'First' : 'Last'} name is required.`;
        else if (value.length > 50) error = 'Must be ≤ 50 characters.';
        else if (!/^[A-Z]/.test(value)) error = 'Must start with a capital letter.';
        else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Only letters and spaces allowed.';
        break;

      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format.';
        break;

      case 'contact':
        if (!value) error = 'Contact is required.';
        else if (!/^\+91\d{10}$/.test(value)) error = 'Use +91XXXXXXXXXX format.';
        else if (value.includes('0000000000')) error = 'Invalid number.';
        break;

      case 'birthdate':
        if (!value) error = 'Birthdate is required.';
        else {
          const birth = new Date(value);
          const today = new Date();
          if (birth > today) error = "Birthdate can't be in the future.";
        }
        break;

      case 'photo':
        if (value) {
          if (value.size > 300 * 1024) error = 'Photo must be under 300KB.';
          else if (!value.type.startsWith('image/')) error = 'File must be an image.';
        }
        break;

      case 'address':
        if (value.length > 200) error = 'Address must be under 200 characters.';
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'photo' ? files[0] : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/users/${editingUser}`, formData);
      } else {
        await axios.post('http://localhost:5000/users', formData);
      }
      fetchUsers();
      setForm({ email: '', first_name: '', last_name: '', contact: '+91', birthdate: '', photo: null, address: '' });
      setEditingUser(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert('Failed to submit the form');
    }
  };

  const handleEdit = (user) => {
    setForm({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      contact: user.contact,
      birthdate: user.birthdate.split('T')[0],
      address: user.address,
      photo: null,
    });
    setEditingUser(user.id);
    setErrors({});
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          User Contact Form
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-4">
          {['first_name', 'last_name', 'email', 'contact', 'birthdate', 'address'].map((field) => (
            <div key={field}>
              {field === 'address' ? (
                <textarea
                  name={field}
                  placeholder={field.replace('_', ' ').toUpperCase()}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              ) : (
                <input
                  type={field === 'birthdate' ? 'date' : 'text'}
                  name={field}
                  placeholder={field === 'contact' ? '+91XXXXXXXXXX' : field.replace('_', ' ').toUpperCase()}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              )}
              {errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {errors.photo && <p className="text-red-600 text-sm">{errors.photo}</p>}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold"
          >
            {editingUser ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">Saved Contacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded bg-white shadow">
              <img
                src={`http://localhost:5000/uploads/${user.photo}`}
                alt="Profile"
                className="w-24 h-32 object-cover mb-2"
              />
              <p><strong>{user.first_name} {user.last_name}</strong></p>
              <p>{user.email}</p>
              <p>{user.contact}</p>
              <p>{user.birthdate.split('T')[0]}</p>
              <p>{user.address}</p>
              <div className="mt-2 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(user)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

