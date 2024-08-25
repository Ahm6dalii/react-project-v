import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import img1 from "../../assets/images/1.jpeg";
import img2 from "../../assets/images/2.jpeg";
import img3 from "../../assets/images/3.jpeg";
import img5 from "../../assets/images/10.png";
import img6 from "../../assets/images/11.jpeg";
import img7 from "../../assets/images/12.jpeg";
import img8 from "../../assets/images/13.jpeg";
import img9 from "../../assets/images/9.jpg";
import img10 from "../../assets/images/15.jpeg";

export default function BrandSlider() {
    const logo=[
        {imgLink:img1},
        {imgLink:img2},
        {imgLink:img3},
        {imgLink:img5},
        {imgLink:img6},
        {imgLink:img7},
        {imgLink:img8},
        {imgLink:img9},
        {imgLink:img10},
    ]

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
        cssEase: "linear",
        pauseOnHover: false, 
      };
      return (
        <div className="slider-container h-[100px] overflow-hidden">
          <Slider {...settings}>
          { logo.map((imglink,index)=>
          <div key={index}>
                         <img src={imglink.imgLink}  className='w-[100px]'></img>

          </div>
          ) }

          </Slider>
        </div>
      );
}
