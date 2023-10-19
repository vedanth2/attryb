import React, { useEffect, useState } from 'react';
import {Navbar} from './Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.css';
import axios from 'axios';

export const CarDetails = () => {
  const [cars, setCars] = useState([]);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get('https://buycars.onrender.com/viewcars');
      const carDetails = response.data.carDetails.map((car) => ({
        ...car,
        bulletPoints: JSON.parse(car.bulletPoints),
      }));
      setCars(carDetails);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://buycars.onrender.com/deletecars/${id}`);
      fetchCarDetails();
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e, id) => {
    setEditValues({
      ...editValues,
      [id]: {
        ...editValues[id],
        [e.target.name]: e.target.value
      }
    });
  };
  
  const handleEdit = async (id) => {
    try {
      await axios.patch(`https://buycars.onrender.com/updatecars/${id}`,editValues[id]);
      fetchCarDetails();
    } catch (error) {
      console.error(error);
    }
  };

  let op;
  function sortpop(e){
    let data=e.target.value;
    if(data ==="lth"){
      op = cars.sort((a,b)=>{
       return (a.price - b.price);
       })
    }
    else if(data === 'htl'){
        op = cars.sort((a,b)=>{
            return (b.price - a.price);
            })
    }
    setCars([...op])
  }
  let mileage;
  function filterMileage(e){
    let data=e.target.value;
    if(data ==="lth"){
      mileage = cars.sort((a,b)=>{
       return (a.mileage - b.mileage);
       })
    }
    else if(data === 'htl'){
      mileage = cars.sort((a,b)=>{
            return (b.mileage - a.mileage);
            })
    }
    setCars([...mileage])
  }
  return (
    <div className="car-details-container">
       <Navbar/>
           <div className='funly'>
        <label htmlFor="">Filter by Price : </label>
        <select  id="rgn" onChange={(e)=>sortpop(e)}>
           <option value="">........</option>
            <option value="lth">Low To High</option>
            <option value="htl">High to Low</option>
        </select>
        <label htmlFor="">Filter by Mileage : </label>
        <select  id="rgn" onChange={(e)=>filterMileage(e)}>
           <option value="">........</option>
            <option value="lth">Low To High</option>
            <option value="htl">High to Low</option>
        </select>
    </div>
      <div className="details">
        {cars.map((car) => (
          <Card sx={{ maxWidth: 345 }} key={car._id} style={{marginLeft:"75px"}}>
            {car.image && (
              <CardMedia
                sx={{ height: 200 }}
                image={`https://buycars.onrender.com/uploads/${car.image}`}
                title={car.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {car.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Color:</b> {car.color}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Mileage:</b> {car.mileage}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <b>Price:</b> {car.price}
              </Typography>
              {editValues[car._id] && (
    <>
      <input
        type="text"
        name="title"
        value={editValues[car._id].title}
        onChange={(e) => handleChange(e, car._id)}
      />
      <input
        type="text"
        name="color"
        value={editValues[car._id].color}
        onChange={(e) => handleChange(e, car._id)}
      />
      <input
        type="number"
        name="mileage"
        value={editValues[car._id].mileage}
        onChange={(e) => handleChange(e, car._id)}
      />
      <input
        type="number"
        name="price"
        value={editValues[car._id].price}
        onChange={(e) => handleChange(e, car._id)}
      />
    </>
  )}
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {car.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
            </CardContent>
            <CardActions>
              {!editValues[car._id] ? (
                <Button
                  size="small"
                  className="card-actions"
                  onClick={() =>
                    setEditValues({
                      ...editValues,
                      [car._id]: {
                        title: car.title,
                        color: car.color,
                        mileage: car.mileage,
                        price: car.price
                      }
                    })
                  }
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    size="small"
                    className="card-actions"
                    onClick={() => {
                      handleEdit(car._id);
                      setEditValues({
                        ...editValues,
                        [car._id]: undefined
                      });
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    className="card-actions"
                    onClick={() =>
                      setEditValues({
                        ...editValues,
                        [car._id]: undefined
                      })
                    }
                  >
                    Cancel
                  </Button>
                </>
              )}
              <Button
                size="small"
                className="card-actions"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};