import './styling/comparison.css';
import { Container, Row } from 'react-bootstrap';
import ComparisonColumn from '../components/comparisoncolumn';

function comparison () {
    return (
        <div className='comparison'>
            <Container id='column-container'>
                <Row>
                    <ComparisonColumn/>
                    <ComparisonColumn/>
                </Row>
            </Container>
            <div id='price-graph-holder'>
                <h2 className='graph-title'>Price By Store</h2>
            </div>
            <div id='popularity-graph-holder'>
                <h2 className='graph-title'>Popularity</h2>
            </div>
            <div id='releases-graph-holder'>
                <h2 className='graph-title'>Set Releases</h2>
            </div>
        </div>
    )
}

export default comparison;