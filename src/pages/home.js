import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styling/home.css';
import Searchbar from '../components/searchbar';
import BaseCard from '../components/basecard';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null); // Initialize as null
    const [avgPrice, setAvgPrice] = useState(0); // State for average price
    const [chartData, setChartData] = useState(null); // State for chart data

    async function fetchCard(cardName) {
        try {
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}&misc=yes`);
            setData(response.data.data[0]);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function fetchRandomCard() {
        try {
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes');
            const _count = response.data.data.length;
            const _random = Math.floor(Math.random() * _count);
            const _tempData = response.data.data[_random];
            setData(_tempData);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    useEffect(() => {
        fetchRandomCard();
    }, []); // Fetch card data on component mount

    useEffect(() => {
        if (data) {
            // Calculate average price
            const prices = [
                parseFloat(data.card_prices[0].tcgplayer_price || 0),
                parseFloat(data.card_prices[0].ebay_price || 0),
                parseFloat(data.card_prices[0].amazon_price || 0),
                parseFloat(data.card_prices[0].coolstuffinc_price || 0),
            ];
            const total = prices.reduce((sum, price) => sum + price, 0);
            setAvgPrice((total / prices.length).toFixed(2));

            // Update chart data
            setChartData({
                labels: ["TcgPlayer", "eBay", "Amazon", "CoolStuffInc"],
                datasets: [
                    {
                        labels: data.name,
                        data: prices,
                        backgroundColor: "#C06805",
                        borderColor: "#EADC25",
                    },
                ],
            });
        }
    }, [data]); // Recalculate when `data` changes

    return (
        <div className='home-container'>
            <Searchbar dataPassFunction={fetchCard} />
            <Container>
                <Row>
                    <Col sm="3">
                        {data ? (
                            <>
                                <BaseCard cardName={data.name} cardImage={data.card_images[0]?.image_url} />
                                <div id='card-info-container'>
                                    <p>{data.humanReadableCardType}</p>
                                    <p>Average Price: ${avgPrice}</p>
                                    <p>Set Releases: {data.card_sets?.length || 0}</p>
                                    <p>
                                        Release Dates:<br />
                                        TCG: {data.misc_info?.[0]?.tcg_date || "N/A"}<br />
                                        OCG: {data.misc_info?.[0]?.ocg_date || "N/A"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p style={{color: 'white'}}>Loading card data...</p>
                        )}
                    </Col>
                    <Col sm="9">
                        <h2 id='graph-title'>Price By Store</h2>
                        {chartData ? (
                            <Bar data={chartData} options={ {
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
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
                                }
                            } />
                        ) : (
                            <p style={{color: 'white'}}>Loading chart...</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;