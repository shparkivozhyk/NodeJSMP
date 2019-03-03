import { Request, Response } from "express";
import { ICity } from "../interfaces";
import { City } from "../mongomodels/city";

export const getRandomCity = (req: Request, res: Response) => {
  City.find({}, (error: Error, cities: ICity[]) => {
    if (error) {
      console.error("Error", error);
    }

    if (cities.length) {
      const randomCityNumber = Math.round(Math.random() * cities.length);
      res.send(cities[randomCityNumber]);
    }
  });
};

export const createCity = (req: Request, res: Response) => {
  const { name, country, capital, lat, long, } = req.body;

  City.create({ name, country, capital,
    location: {
      lat: lat,
      long: long,
    },
  }, (error: Error, city: ICity ) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(city);
  });
};

export const getAllCities = (req: Request, res: Response) => {
  City.find({}, (error: Error, cities: ICity[]) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(cities);
  });
};

export const updateCity = (req: Request, res: Response) => {
  const { city_id, } = req.params;
  const opts = {upsert: true, };
  const update = {$set: req.body, };

  City.findOneAndUpdate({_id: city_id, }, update, opts, (error: Error, city: object) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(city);
  });
};

export const deleteCity = (req: Request, res: Response) => {
  const { city_id, } = req.params;

  City.findOneAndDelete({_id: city_id, }, (error: Error, city: object) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(city);
  });
};
