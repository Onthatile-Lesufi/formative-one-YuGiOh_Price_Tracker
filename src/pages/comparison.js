import React, { useState, useEffect } from 'react';
import './styling/comparison.css';
import { Container, Row } from 'react-bootstrap';
import ComparisonColumn from '../components/comparisoncolumn';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, PolarArea, Radar } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import { data } from 'react-router-dom';

function Comparison () {
    const [popularData,setPopularData] = useState(null);
    const [cardOne,setCardOne] = useState({});
    const [cardTwo,setCardTwo] = useState({});
    const [popularityMetric,setPopularityMetric] = useState(null);
    const eventKeys = [{
        value: "total",
        display: "Total",
        eventHandler: FetchTotalViews
    },{
        value: "current",
        display: "Current",
        eventHandler: FetchWeekViews
    },{
        value: "upvotes",
        display: "Upvotes",
        eventHandler: FetchUpvotes
    },{
        value: "downvotes",
        display: "Downvotes",
        eventHandler: FetchDownvotes
    }]

    function handleCardOne (cardOneData) {
        setCardOne(cardOneData);
    }

    function handleCardTwo (cardTwoData) {
        setCardTwo(cardTwoData);
    }

    function FetchTotalViews () {
        if (cardOne.cardName && cardTwo.cardName) {
            setPopularData([cardOne.cardPopularity.totalViews,cardTwo.cardPopularity.totalViews]);
            setPopularityMetric("Total Views");
        }   
    }
    
    function FetchWeekViews () {
        if (cardOne.cardName && cardTwo.cardName) {
            setPopularData([cardOne.cardPopularity.weekViews,cardTwo.cardPopularity.weekViews]);
            setPopularityMetric("Recent Views");
        }   
    }
    
    function FetchUpvotes () {
        if (cardOne.cardName && cardTwo.cardName) {
            setPopularData([cardOne.cardPopularity.upvotes,cardTwo.cardPopularity.upvotes]);
            setPopularityMetric("Upvotes");
        }  
    }
    function FetchDownvotes () {
        if (cardOne.cardName && cardTwo.cardName) {
            setPopularData([cardOne.cardPopularity.downvotes,cardTwo.cardPopularity.downvotes]);
            setPopularityMetric("Downvotes");
        }  
    }

    useEffect (() => {
        FetchTotalViews();
    },[cardOne, cardTwo]);

    return (
        <div className='comparison'>
            <Container id='column-container'>
                <Row>
                    <ComparisonColumn dataPassFunction={handleCardOne}/>
                    <ComparisonColumn dataPassFunction={handleCardTwo}/>
                </Row>
            </Container>
            <div id='price-graph-holder'>
                <h2 className='graph-title'>Price By Store</h2>
                <div id='price-graph'>
                    <Radar
                    data={{
                        labels: ["TcgPlayer","eBay","Amazon","CoolStuffInc"],
                        datasets: [{
                            label: cardOne.cardName,
                            data: cardOne.cardPrices,
                            borderColor: "#EADC25",
                            borderWidth: '15px',
                            backgroundColor: "rgba(234, 179, 8, 0.5)"
                        },
                        {
                            label: cardTwo.cardName,
                            data: cardTwo.cardPrices,
                            borderColor: "#EADC25",
                            borderWidth: '15px',
                            backgroundColor: "rgba(86, 135, 242, 0.5)"
                        }]
                    }}

                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                callbacks : {
                                    label: (context) => {
                                        var _labels =  context.dataset.data;
                                        var _label = "$"+_labels[context.dataIndex];
                                    
                                        return _label;
                                    }
                                }
                            }

                        }
                    }}
                    />
                </div>
            </div>
            <div id='popularity-graph-holder'>
                <h2 className='graph-title'>Popularity</h2>
                <div id='price-graph'>
                    {popularData ? (<Bar
                        data={{
                            labels: [(popularityMetric ? popularityMetric : "Popularity")],
                            datasets: [{
                                label: cardOne.cardName,
                                data: [popularData[0]],
                                borderColor: "#EADC25",
                                backgroundColor: "#EAB308"
                            },
                            {
                                label: cardTwo.cardName,
                                data: [popularData[1]],
                                borderColor: "#EADC25",
                                backgroundColor: "#5687F2"
                            }]
                        }}
                    
                        options={{
                            maintainAspectRatio: false
                        }}
                    />) : <p style={{color: 'white'}}>Fetching Graph...</p>}
                    
                </div>
                <div className='button-container'>
                    {eventKeys.map((_radio) => (
                        <Button 
                        className='popularity-Controls' 
                        onClick={() => {
                            _radio.eventHandler();
                            
                        }}>
                            {_radio.display}
                        </Button>
                    ))}
                </div>
            </div>
            <div id='releases-graph-holder'>
                <h2 className='graph-title'>Set Releases</h2>
                <div className='sets-graph'>
                    <PolarArea
                    data={{
                        labels: [cardOne.cardName, cardTwo.cardName],
                        datasets: [{
                            data: [cardOne.cardSets, cardTwo.cardSets],
                            backgroundColor: ["#EAB308","#5687F2"],
                            borderColor: "#EADC25"
                        }]
                    }}

                    options={{maintainAspectRatio: false}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Comparison;