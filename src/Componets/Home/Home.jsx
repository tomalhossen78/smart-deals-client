import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";
import Container from "../Container/Container";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <Container>
      <h1 className="bg-primary">This is Home</h1>
      <LatestProducts latestProductsPromise={latestProductsPromise} />
    </Container>
  );
};

export default Home;
