import React from 'react';
import NewsElement from './NewsElement'

const ListOfNews = ({
    news
}) => (
    <div>
        {news.map((newsItem, index) => {
            return (
                <div key={"news" + index}>
                    <hr className="hrline"></hr>
                    <NewsElement {...newsItem} /> </div>
            )
        })}
    </div>
)

export default ListOfNews;
