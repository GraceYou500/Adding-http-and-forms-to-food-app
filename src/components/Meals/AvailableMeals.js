import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-requests-24eb5-default-rtdb.firebaseio.com/meals.json'
      );
      const data = await response.json();
      console.log(data);

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      console.log(loadedMeals);
    };

    fetchMeals();
  }, []);

  ////////////////////////////////////////////////////////////////////////
  //still need async function to get data first, then use data

  // let loadedData = {};
  // const responseData = fetch(
  //   'https://react-http-requests-24eb5-default-rtdb.firebaseio.com/meals.json'
  // )
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log('1', data);
  //     loadedData = data;
  //   });
  // console.log(loadedData);

  // const loadedMeals = [];

  // for (const key in responseData) {
  //   loadedMeals.push({
  //     id: key,
  //     name: responseData[key].name,
  //     description: responseData[key].description,
  //     price: responseData[key].price,
  //   });
  // }
  // console.log(loadedMeals);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
