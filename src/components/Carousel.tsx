import React, { useRef, useEffect, useState } from 'react';
import CarouselItem from './CarouselItem';
import './Carousel.scss';
import * as catImages from '../data/cat-images.json';
import Bullets from './Bullets';

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);
    const [moving, setMoving] = useState(false);
    const [translateOffset, setTranslateOffset] = useState(0);

    const images = catImages.cats;
    const carouselItems = images.map((image, index) => <CarouselItem key={index} imageUrl={image.imageUrl} text={image.text} />)

    const ref: any = useRef();

    const handleMouseDown = (e: any) => {
        setMoving(true);
        if (e.clientX) setDragStartX(e.clientX);
        
    }

    const handleMouseUp = (e: any) => {
        setMoving(false);
        if (translateOffset < -10) {
            goRight();
        }

        if (translateOffset > 10) {
            goLeft();
        }
        setTranslateOffset(0);
    }

    const handleMouseMove = (e: any) => {
        const clientX = e.clientX || e.touches[0].clientX
        if (moving === true) {
            if (clientX < dragStartX) {
                const difference = dragStartX - clientX;
                const diffPercentage = difference / sliderWidth * 100;
                setTranslateOffset(-diffPercentage);
            }

            if (clientX > dragStartX) {
                const difference =  clientX - dragStartX;
                const diffPercentage = difference / sliderWidth * 100;
                setTranslateOffset(diffPercentage);
            }
        }
    }

    useEffect(() => {
        setSliderWidth(ref.current.clientWidth);
    }, []);
 
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
        <div
            ref={ref}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onKeyUp={handleKey}
            tabIndex={0}>
            <div className="carousel-wrapper">
                <div className={`carousel ${moving ? 'moving' : ''}`} style={{ 'transform': `translateX(${(activeIndex * -100) + translateOffset}%)` }}>
                    {carouselItems}
                </div>
                <button className="left" onClick={goLeft}>&lt;</button>
                <button className="right" onClick={goRight}>&gt;</button>
            </div>
            <Bullets length={carouselItems.length} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
    )
}