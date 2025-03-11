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
                        <div id='card-info-container'>
                            <p>Card Type</p>
                            <p>Average Price:</p>
                            <p>Set Releases:</p>
                            <p>Release Dates:<br/>TCG:<br/>OCG:</p>
                        </div>
                    </Col>
                    <Col sm="9">
                        <h2 id='graph-title'>Price By Store</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default home;