
import React from "react";
import Jumbotron from '../components/cards/Jumbotron'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'
import ropa from '../images/ropa.jpg'
import logo from '../images/cco.jpg'
import '../index.css'

const Home = () => {

  return (

    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center"
        style={{
          backgroundImage: `url(${ropa})`,
          backgroundSize: 'cover'
        }}>

        <Jumbotron text={['Page Demo E.Commerce ', 'React', 'Firebase']} />

      </div>


      <div className="text-center padding-logo mt-5 mb-5 display-3" style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',

      }}>

      </div>

      <NewArrivals />
      <br></br>


      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"  >
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Categories
      </h4>

      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Subs Categories
      </h4>

      <SubList />
      <br></br>
    </>

  );
};

export default Home;
