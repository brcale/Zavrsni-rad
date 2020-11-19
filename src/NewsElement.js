import React from 'react';

const NewsElement = ({
    source,
    headline,
    url,
    image,
    summary
}) => {
    console.log(headline)
    return (
        <div class="card col-5 card-margin">
        <img class="card-img-top news-img" src={image} />
        <div class="card-body summary-length">
            <h6 className="text-light">{headline}</h6>
          <p class="card-text text-light summary-margin">{summary.substring(0,125)}...
          <br />
          <a href={url}>Read more</a> 
          <br />
          <hr className="news-article-hr" />
          </p>
        </div>
        
        </div>
        
    )
}

export default NewsElement