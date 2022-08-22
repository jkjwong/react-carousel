import React from 'react';
import './CarouselItem.scss';

type CarouselItemProps = {
    imageUrl?: string,
    text?: string | number | undefined
}

export default ({imageUrl, text}: CarouselItemProps) => {
    return(
        <div className="carousel-item" style={{backgroundImage: `url('${imageUrl}')`}}>{text}</div>
    )
}