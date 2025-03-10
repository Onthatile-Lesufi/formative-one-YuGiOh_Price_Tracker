import './styling/comparison.css';
import { Container, Row } from 'react-bootstrap';
import ComparisonColumn from '../components/comparisoncolumn';

function comparison () {
    return (
        <div className='comparison'>
            <Container>
                <Row>
                    <ComparisonColumn/>
                    <ComparisonColumn/>
                </Row>
            </Container>
        </div>
    )
}

export default comparison;