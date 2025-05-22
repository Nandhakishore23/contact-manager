// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'

// export default function ContactForm() {
//   const [form, setForm] = useState({
//     title: '',
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     birthday: '',
//     image: null,
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     setForm(prev => ({ ...prev, image: e.target.files[0] }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.image) {
//       alert('Please upload a passport size photo');
//       return;
//     }

//     // Format birthday from yyyy-mm-dd (input type date) to dd/mm/yyyy
//     const birthdayParts = form.birthday.split('-');
//     if (birthdayParts.length === 3) {
//       form.birthday = `${birthdayParts[2]}/${birthdayParts[1]}/${birthdayParts[0]}`;
//     }

//     const formData = new FormData();
//     for (const key in form) {
//       formData.append(key, form[key]);
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/contacts', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert(res.data.message);
//       setForm({
//         title: '',
//         firstName: '',
//         lastName: '',
//         phone: '',
//         email: '',
//         birthday: '',
//         image: null,
//       });
//       document.getElementById('imageInput').value = ''; // clear file input
//     } catch (err) {
//       alert(err.response?.data?.error || 'contact added');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className='box' style={{ maxWidth: 400, marginTop: '100px',marginLeft: '500px', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//       <h2>Contact Form</h2>
//       <input
//         type="text"
//         name="title"
//         maxLength={50}
//         placeholder="Title"
//         value={form.title}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'', padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="text"
//         name="firstName"
//         maxLength={50}
//         placeholder="First Name"
//         value={form.firstName}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="text"
//         name="lastName"
//         maxLength={50}
//         placeholder="Last Name"
//         value={form.lastName}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="tel"
//         name="phone"
//         placeholder="+91XXXXXXXXXX"
//         pattern="\+91[1-9][0-9]{9}"
//         value={form.phone}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="date"
//         name="birthday"
//         value={form.birthday}
//         onChange={handleChange}
//         style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
//         required
//       />
//       <input
//         type="file"
//         id="imageInput"
//         name="image"
//         accept="image/*"
//         onChange={handleFileChange}
//         required
//       />
//       <button style={{color: 'black', backgroundColor:'lightgreen', borderRadius:'20px'}} type="submit">Add Contact</button>
//     </form>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

export default function ContactForm() {
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
  });

  // Validate first letter capital
  const validateCapital = (name, value) => {
    if (value && value[0] !== value[0].toUpperCase()) {
      return `${name} must start with a capital letter`;
    }
    return '';
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'firstName' || name === 'lastName') {
      setErrors(prev => ({
        ...prev,
        [name]: validateCapital(
          name === 'firstName' ? 'First Name' : 'Last Name',
          value
        )
      }));
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submit
    const firstNameError = validateCapital('First Name', form.firstName);
    const lastNameError = validateCapital('Last Name', form.lastName);

    if (firstNameError || lastNameError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
      });
      return;
    }

    if (!form.image) {
      alert('Please upload a passport size photo');
      return;
    }

    // Format birthday from yyyy-mm-dd (input type date) to dd/mm/yyyy
    const birthdayParts = form.birthday.split('-');
    if (birthdayParts.length === 3) {
      form.birthday = `${birthdayParts[2]}/${birthdayParts[1]}/${birthdayParts[0]}`;
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/contacts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message);
      setForm({
        title: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        birthday: '',
        image: null,
      });
      setErrors({ firstName: '', lastName: '' });
      document.getElementById('imageInput').value = ''; // clear file input
    } catch (err) {
      alert(err.response?.data?.error || 'contact added');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='box' style={{ maxWidth: 400, marginTop: '100px',marginLeft: '500px', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Contact Form</h2>
      <input
        type="text"
        name="title"
        maxLength={50}
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'', padding:'8px', borderRadius:'5px'}}
        required
      />
      <input
        type="text"
        name="firstName"
        maxLength={50}
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
        required
      />
      {errors.firstName && (
        <span style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</span>
      )}
      <input
        type="text"
        name="lastName"
        maxLength={50}
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
        required
      />
      {errors.lastName && (
        <span style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</span>
      )}
      <input
        type="tel"
        name="phone"
        placeholder="+91XXXXXXXXXX"
        pattern="\+91[1-9][0-9]{9}"
        value={form.phone}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
        required
      />
      <input
        type="date"
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        style={{color: 'black', backgroundColor:'',padding:'8px', borderRadius:'5px'}}
        required
      />
      <input
        type="file"
        id="imageInput"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button style={{color: 'black', backgroundColor:'lightgreen', borderRadius:'20px'}} type="submit">Add Contact</button>
    </form>
  );
}