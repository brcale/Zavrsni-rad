import React from 'react';

const NewsElement = ({
    source,
    title,
    url,
    image,
    summary
}) => {
    return (
        <div>
            <a href={url} target="_blank"><h3>{title}</h3></a>
            <img src={image}></img>
            <h5>Source: {source}</h5>
            <div><p> {summary} </p></div>
        </div>
    )
}

export default NewsElement