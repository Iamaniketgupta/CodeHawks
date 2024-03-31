import React, { useEffect, useState } from 'react'
import '../App.css';
import '../Home.css';
import Navbar from './Navbar';
import { Link} from "react-router-dom";
import Footer from './Footer';
import Reviews from './Reviews';
import FAQ from './FAQ';
export default function Home() {

  const [mentors,setMentors]=useState([{}]);


  useEffect(()=>{
    const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}
function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
  },[]);

  return (
    <>
<Navbar/>
<div className="home">
<div className="intro">
<h1 className='text-center mt-5'>Mentor Hub</h1>    
<h2 className='text-center mt-2'>Make your path easier with a Mentor</h2>
<p className='text-center mt-2'>Land your dream job, role, and company faster than ever with 1:1 long term mentorship.</p>
<div className="box text-center mt-5">
<Link to="/signup_mentee" className="btn btn-primary btn-lg mybtn">Get Your Mentor Now →</Link>
</div>
<div className="mentors mt-5">
<h2 className='text-center mt-5' style={{ textAlign: "center" }}>Our Mentors</h2>
<div className="scroller" data-direction="right" data-speed="slow">
  <div className="scroller__inner">
  <img src="https://i.pravatar.cc/150?img=1" alt="" />
    <img src="https://i.pravatar.cc/150?img=2" alt="" />
    <img src="https://i.pravatar.cc/150?img=3" alt="" />
    <img src="https://i.pravatar.cc/150?img=4" alt="" />
    <img src="https://i.pravatar.cc/150?img=5" alt="" />
    <img src="https://i.pravatar.cc/150?img=6" alt="" />
  </div>
</div>
</div>
  </div>
 <Reviews/> 
<div className="domains mt-5 pb-5">
<h2 className='text-center mt-5' style={{ textAlign: "center" }}>Domains In Which We Mentor</h2>
<div className="div d-flex justify-content-center">
  <div className="scroller" data-speed="fast">
    <ul className="tag-list scroller__inner">
      <li>Android Dev</li>
      <li>Designing</li>
      <li>Graphics</li>
      <li>Figma</li>
      <li>Web Dev</li>
      <li>Animation</li>
      <li>UI/UX</li>
    </ul>
  </div>
  </div>
</div>
<div className="container mt-5 mb-5">
<FAQ></FAQ>
</div>
</div>

<Footer></Footer>

    </>
  )
}
