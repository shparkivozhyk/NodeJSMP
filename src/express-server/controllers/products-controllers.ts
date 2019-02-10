export const getProduct = (req: any, res: any) => {
  res.send(`I return product for id: ${req.params.product_id}`);
};

export const  getProducts = (req: any, res: any) => {
  res.send("I return all products");
};

export const createProduct = (req: any, res: any) => {
  res.send("I create new product and return it");
};

export const getReviews = (req: any, res: any) => {
  res.send(`I return reviews for product with id ${req.params.product_id}`);
};
