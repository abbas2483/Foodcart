import React, { useEffect, useRef } from 'react'

export default function Carousal() {
    const carouselRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (carouselRef.current) {
                try {
                    const carouselInstance = new window.bootstrap.Carousel(carouselRef.current);
                    carouselInstance.next();
                } catch (error) {
                    console.error("Error initializing or advancing carousel:", error);
                    clearInterval(intervalId);
                }
            }
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" ref={carouselRef} style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousal' style={{ height: '1200px' }}>
                    <div className="carousel-item active">
                        <img src="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg" className="d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />
                        <div className="carousel-caption d-none d-md-block mb-4" style={{ zIndex: '11', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
                            <h5>Refreshing Fish Salad</h5>
                            <p>Take A Deeper Dive Into The World Of Sea Food</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />
                        <div className="carousel-caption d-none d-md-block mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <h5>Mixed Veg Salad</h5>
                            <p>Refresh Your Body With The Freshness Of Vegies</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" className="d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />
                        <div className="carousel-caption d-none d-md-block mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <h5>Spagettie</h5>
                            <p>Open Your Tastebuds With The Cottage Cheese Spagettie</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
