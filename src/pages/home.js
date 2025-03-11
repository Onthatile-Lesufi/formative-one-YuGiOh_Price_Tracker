import { Col, Container, Row } from 'react-bootstrap';
import './styling/home.css'
import Searchbar from '../components/searchbar';
import BaseCard from '../components/basecard';

function home () {
    return (
        <div className='home-container'>
            <Searchbar/>
            <Container>
                <Row>
                    <Col sm="3">
                        <BaseCard/>
                    </Col>
                    <Col sm="9">
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default home;