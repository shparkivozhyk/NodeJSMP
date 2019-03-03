import { Request, Response } from "express";
import { ICity } from "../interfaces";
import { City } from "../mongomodels/city";

export const getRandomCity = (req: Request, res: Response) => {
  City.find({}, (error: Error, cities: ICity[]) => {
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
    res.send(city);
  });
};

export const getAllCities = (req: Request, res: Response) => {
  City.find({}, (error: Error, cities: ICity[]) => {
    res.send(cities);
  });
};
