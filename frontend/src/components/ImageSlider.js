import { Carousel } from "@material-tailwind/react";

export default function Slider() {
  return (
    <div className="pt-3 mx-auto max-w-screen-2xl">
      <Carousel loop={true} autoplay={true} className="rounded-xl slider">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="image 1"
          className="h-full w-full object-cover object-center"
        />
        <img
          src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="image 2"
          className="h-full w-full object-cover object-center"
        />
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 3"
          className="h-full w-full object-cover object-center"
        />
      </Carousel>
      <style jsx>{`
        @media (min-width: 768px) {
          .slider {
            height: 400px; /* Set the desired height for desktop */
          }
        }
      `}</style>
    </div>
  );
}
