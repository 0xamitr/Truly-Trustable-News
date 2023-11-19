import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './newspage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Newspage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://truly-trustable-news-s52o.vercel.app/news/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const renderHtmlContent = (html) => {
    return { __html: html };
  };

  return (
    <>
      <div className="header" style={{ backgroundImage: data.img ? `url(${data.img.src})` : '', backgroundPosition: data.img ? `${data.img.position}` : 'center', }}>
        <Navbar />
      </div>
      <div className='newsbody'>
        <div className="news-hero-text">
          <h1>{data.heading}</h1>
          <p>{data.subheading}</p>
          <p>{data.author}</p>
          <p>{data.slug}</p>
        </div>
        <div className='categories justify-start'>
          Category: 
          {data.category &&
            data.category.map((cat) => (
              <p className='inline-block m-2 flex-start text-sky category-link' key={cat._id}>
                {cat.title}
              </p>
            ))}
        </div>
        <div className="articles" dangerouslySetInnerHTML={renderHtmlContent(data.article)} />
      </div>
      <Footer />
    </>
  );
}

export default Newspage;
