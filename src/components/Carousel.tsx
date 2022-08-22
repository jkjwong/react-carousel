import React from 'react';
import CarouselItem from './CarouselItem';
import './Carousel.scss';
import * as catImages from '../data/cat-images.json';
import Bullets from './Bullets';

export default () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const images = catImages.cats;
    const carouselItems = images.map((image, index) => <CarouselItem key={index} imageUrl={image.imageUrl} text={image.text} />)

    const goLeft = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else {
            setActiveIndex(images.length - 1);
        }
    }

    const goRight = () => {
        if (activeIndex < (carouselItems.length -1)) {
            setActiveIndex(activeIndex + 1);
        } else {
            setActiveIndex(0);
        }
    }

    const handleKey = (e: any) => {
        if (e.keyCode === 37) {
            goLeft();
        }

        if (e.keyCode === 39) {
            goRight();
        }
    }

    return(
        <div onKeyUp={handleKey} tabIndex={0}>
            <div className="carousel-wrapper">
                <div className="carousel" style={{ 'transform': `translateX(${activeIndex * -100}%)` }}>
                    {carouselItems}
                </div>
                <button className="left" onClick={goLeft}>&lt;</button>
                <button className="right" onClick={goRight}>&gt;</button>
            </div>
            <Bullets length={carouselItems.length} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
    )
}