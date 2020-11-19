import React from 'react';
import NewsElement from './NewsElement';
import './App.css';

const ListOfNews = ({
    news
}) => (
    <div className="d-flex  flex-wrap justify-content-around">
      {news.map((newsItem, index) => {
        return (
         
            <NewsElement key={"news" + index} {...newsItem} />
          
        )
      })}
    </div>
  )

export default ListOfNews;
