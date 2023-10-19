import React, { useState } from 'react'
import {Navbar} from './components/Navbar'
import axios from 'axios';

export const Home = () => {
  const [title, setTitle] = useState('');
  const [bulletPoints, setBulletPoints] = useState([]);
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBulletPointsChange = (e, index) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = e.target.value;
    setBulletPoints(updatedBulletPoints);
  };

  const handleAddBulletPoint = () => {
    setBulletPoints([...bulletPoints, '']);
  };

  const handleRemoveBulletPoint = (index) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints.splice(index, 1);
    setBulletPoints(updatedBulletPoints);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('bulletPoints', JSON.stringify(bulletPoints));
      formData.append('price', price);
      formData.append('color', color);
      formData.append('mileage', mileage);
      formData.append('image', image);

      await axios.post('https://buycars.onrender.com/createcars', formData);
      setTitle('');
      setBulletPoints([]);
      setPrice('');
      setColor('');
      setMileage('');
      setImage(null);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error creating car. Please try again later.');
      }
    }
  };
  return (
    <div>
        
      {errorMessage && <p>{errorMessage}</p>}
      <Navbar/>
      <div className='frm'>
      <form onSubmit={handleSubmit}>
        <label>
          <b>Title :</b>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  className='inp'/>
        </label>
        <br /><br />
        <label>
          <b>Bullet Points :</b>
          {bulletPoints.map((point, index) => (
            <div key={index}>
              <input
                type="text"
                value={point}
                onChange={(e) => handleBulletPointsChange(e, index)}
                className='inp'
              />
              <button type="button" onClick={() => handleRemoveBulletPoint(index)} className="card-actions">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddBulletPoint} className='inp' >
            Add Bullet Point
          </button>
        </label>
        <br /><br />
        <label>
          <b>Price :</b>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='inp'/>
        </label>
        <br /><br />
        <label>
          <b>Color :</b>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className='inp'/>
        </label>
        <br /><br />
        <label>
          <b>Mileage :</b>
          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className='inp'/>
        </label>
        <br /><br />
        <label style={{marginLeft:"50px"}}>
          <b>Image :</b>
          <input type="file" accept="image/*" onChange={handleImageChange} className='inp'/>
       </label>
        <br /><br />
<button type="submit" className="card-actions">Create Car</button>
      </form>
      </div>
    </div>
  )
}