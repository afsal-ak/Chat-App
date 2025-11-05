import { useEffect, useState } from 'react';
 
import { Button } from '../../../components/Button';
import PackageCard from '@/components/user/PackageCard';
 const Home = () => {
 
  return (
    <>
 
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Chat App <span className="text-orange"></span>
            </h2>
             
          </div>


           
        </div>
      </section>
    </>
  );
};

export default Home;
