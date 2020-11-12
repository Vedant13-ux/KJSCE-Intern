import React from 'react';
// import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import InternshipList from './IntershipList';
import Navbar from '../containers/Navbar'

const Homepage = () => {
    return (
        <div className='homePage'>
            <Navbar></Navbar>
            <div className="carousel-home">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://lms-kjsce.somaiya.edu/pluginfile.php/1/theme_essential/slide1image/1604898978/home4_kjsce%20%281%29.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide</h3>
                            <p>first subtitle</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://lms-kjsce.somaiya.edu/pluginfile.php/1/theme_essential/slide2image/1604898978/eng_banner_2%20%282%29.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide</h3>
                            <p>second sub title</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://lms-kjsce.somaiya.edu/pluginfile.php/1/theme_essential/slide4image/1604898978/Principal%20Mam.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide</h3>
                            <p>third sub title</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <InternshipList></InternshipList>
            </div>
    );
}
export default Homepage;