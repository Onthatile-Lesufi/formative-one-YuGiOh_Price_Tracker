import './styling/comparison.css';
import { Container, Row } from 'react-bootstrap';
import ComparisonColumn from '../components/comparisoncolumn';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

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
                <div id='price-graph'>
                    <Bar
                    data={{
                        labels: ["TcgPlayer","eBay","Amazon","CoolStuffInc"],
                        datasets: [{
                            data: [2.69,4.95,6.18,3.99]
                        },
                        {
                            data: [2.69,4.95,6.18,3.99]
                        }]
                    }}
                    />
                </div>
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