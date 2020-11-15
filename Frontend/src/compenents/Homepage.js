import React,{useState} from 'react';
// import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import InternshipList from './IntershipList';
import Navbar from '../containers/Navbar'
import PageFooter from '../containers/PageFooter'
import Modal from 'react-bootstrap/Modal'
import Internshipform from './Internshipform'

const Homepage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://lms-kjsce.somaiya.edu/pluginfile.php/1/theme_essential/slide2image/1604898978/eng_banner_2%20%282%29.jpg"
                            alt="Second slide"
                        />

                        {/* <Carousel.Caption>
                            <h3>Second slide</h3>
                            <p>second sub title</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://lms-kjsce.somaiya.edu/pluginfile.php/1/theme_essential/slide4image/1604898978/Principal%20Mam.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <InternshipList/>
            
            <PageFooter/>
            <button onClick={handleShow} class="float-bx">
                <i class="fa fa-plus"></i>
            </button>
            <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Fill internship Details</Modal.Title>
            </Modal.Header>
            <Modal.Body><Internshipform></Internshipform> </Modal.Body>
        </Modal>
        </div>
    );
}
export default Homepage;