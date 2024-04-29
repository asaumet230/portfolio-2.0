import Image from "next/image";

import HomeBanner from "@/components/banners/home-banner";



export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <div className="bg-slate-100 text-center pt-6 mx-auto">
        <h2>Tecnologías</h2>
        <br />
        <div className="grid grid-cols-4 pt-5 mx-auto w-10/12 ">

            <div className="flex justify-center flex-col items-center border p-4 mx-1">
              <Image 
                src="/images/2.png" 
                alt={""} 
                width={30} 
                height={30} />
              <h3>Typecrypt</h3>
              <p>80%</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus minima praesentium officiis esse amet vitae quae labore voluptatibus expedita eaque? Incidunt rem voluptates nobis iure, cum ducimus voluptatem alias suscipit.</p>
            </div>
            <div className="flex justify-center flex-col items-center border p-4 mx-1">
              <Image 
                src="/images/2.png" 
                alt={""} 
                width={30} 
                height={30} />
              <h3>Typecrypt</h3>
              <p>80%</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus minima praesentium officiis esse amet vitae quae labore voluptatibus expedita eaque? Incidunt rem voluptates nobis iure, cum ducimus voluptatem alias suscipit.</p>
            </div>
            <div className="flex justify-center flex-col items-center border p-4 mx-1">
              <Image 
                src="/images/2.png" 
                alt={""} 
                width={30} 
                height={30} />
              <h3>Typecrypt</h3>
              <p>80%</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus minima praesentium officiis esse amet vitae quae labore voluptatibus expedita eaque? Incidunt rem voluptates nobis iure, cum ducimus voluptatem alias suscipit.</p>
            </div>
            <div className="flex justify-center flex-col items-center border p-4 mx-1">
              <Image 
                src="/images/2.png" 
                alt={""} 
                width={30} 
                height={30} />
              <h3>Typecrypt</h3>
              <p>80%</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus minima praesentium officiis esse amet vitae quae labore voluptatibus expedita eaque? Incidunt rem voluptates nobis iure, cum ducimus voluptatem alias suscipit.</p>
            </div>
         
          
            
        </div>
      </div>
    </main>
  );
}
