import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './carousel.css';

type CarouselProps = {
    children: React.ReactNode[] | React.ReactNode;
    displayedNumbers?: number;
};

export const Carousel: React.FC<CarouselProps> = ({ children, displayedNumbers = 3 }) => {
    const [displayedElements, setDisplayedElements] = useState<React.ReactNode[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = useRef(0);

    useEffect(() => {
        totalPages.current = Math.ceil(React.Children.count(children) / displayedNumbers);
        setDisplayedElements(React.Children.toArray(children).slice(0, displayedNumbers));
    }, [children, displayedNumbers]);

    const handleButtonClick = (direction: 1 | -1) => {
        const goToPage = currentPage + direction;
        if (goToPage >= 0 && goToPage < totalPages.current) {
            setCurrentPage(goToPage);
            setDisplayedElements(React.Children.toArray(children).slice(
                goToPage * displayedNumbers,
                (goToPage * displayedNumbers) + displayedNumbers
            ));
        }
    };

    return (
        <div className="carousel">
            <div className="carousel__container display_tree">
                {displayedElements}
            </div>
            <div className={`carousel__button carousel__button--left ${currentPage === 0 ? 'disabled' : ''}`} onClick={() => handleButtonClick(-1)}>
                <FaChevronLeft />
            </div>
            <div className={`carousel__button carousel__button--right ${currentPage === totalPages.current - 1 ? 'disabled' : ''}`} onClick={() => handleButtonClick(1)}>
                <FaChevronRight />
            </div>
        </div>
    );
};
