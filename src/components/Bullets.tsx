import React from 'react';
import './Bullets.scss';

export default ({length, activeIndex, setActiveIndex}: {length: number, activeIndex: number, setActiveIndex: any}) => {
    const bullets: any[] = [];
    for (let b=0; b < length; b++) {
        bullets.push(<li onClick={() => setActiveIndex(b)} key={b} className={`bullet ${b === activeIndex ? 'active': ''}`}></li>);
    }

    return(
        <ul className="bullets">
            {bullets}
        </ul>
    )
}