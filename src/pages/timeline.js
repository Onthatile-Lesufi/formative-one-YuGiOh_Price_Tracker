import React, { useState, useEffect, use } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import BaseCard from "../components/basecard";
import Searchbar from "../components/searchbar";
import './styling/timeline.css';
import axios from 'axios';

function Timeline () {
    const [ data , setData ] = useState(null);
    const [ avgPrice , setAvgPrice ] = useState(0);
    const [ chartData , setChartData ] = useState(null);
    const [ timelineData , setTimelineData ] = useState(null);

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
            console.error(error);
        }
    }

    async function fetchCardSetInfo() {
        const _miscInfo = data.misc_info[0];
        const _cardFormats = _miscInfo.formats;
        var _tempTimeline = [];

        if (_cardFormats.includes("TCG") && _cardFormats.includes("OCG")) {
            if (_miscInfo.ocg_date < _miscInfo.tcg_date) {
                _tempTimeline.push({
                    set_name: "OCG Release Date",
                    tcg_date: _miscInfo.ocg_date,
                    set_price: "0"
                });
                _tempTimeline.push({
                    set_name: "TCG Release Date",
                    tcg_date: _miscInfo.tcg_date,
                    set_price: "0"
                });
            } else {
                _tempTimeline.push({
                    set_name: "TCG Release Date",
                    tcg_date: _miscInfo.tcg_date,
                    set_price: "0"
                });
                _tempTimeline.push({
                    set_name: "OCG Release Date",
                    tcg_date: _miscInfo.ocg_date,
                    set_price: "0"
                });
            }
        } else if (_cardFormats.includes("TCG")) {
            _tempTimeline.push({
                set_name: "TCG Release Date",
                tcg_date: _miscInfo.tcg_date,
                set_price: "0"
            });
        } else if (_cardFormats.includes("OCG")) {
            _tempTimeline.push({
                set_name: "OCG Release Date",
                tcg_date: _miscInfo.ocg_date,
                set_price: "0"
            });
        }
         
        try {
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardsets.php');
            console.log(response);
            for (const tempSet of data.card_sets.reverse()) {
                _tempTimeline.push(response.data.find((setEntry) => setEntry.set_name === tempSet.set_name));
            }
            // console.log(_tempTimeline);
            _tempTimeline.sort((a, b) => {
                console.log(new Date(a.tcg_date).valueOf());
                return new Date(a.tcg_date).valueOf() - new Date(b.tcg_date).valueOf();
            });
            // console.log(_tempTimeline);
            setTimelineData(_tempTimeline);
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(() => {
        fetchRandomCard();
    }, [])

    useEffect(() => {
        if (data) {
            const prices = [
                parseFloat(data.card_prices[0].tcgplayer_price || 0),
                parseFloat(data.card_prices[0].ebay_price || 0),
                parseFloat(data.card_prices[0].amazon_price || 0),
                parseFloat(data.card_prices[0].coolstuffinc_price || 0),
            ];
            const total = prices.reduce((sum, price) => sum + price, 0);
            setAvgPrice((total / prices.length).toFixed(2));

            fetchCardSetInfo();
        }
    }, [data]); 

    useEffect (() => {
        if (timelineData) {
            var _timelineLabels = timelineData.map(index => new Date(index.tcg_date).getFullYear() || 1970);
            var _timeEntries = timelineData.map(index => parseFloat(index.set_price) || 0);
            var _timePointLabels = timelineData.map(index => index.set_name);
            console.log(_timePointLabels);
            setChartData ({
                labels: _timelineLabels,
                datasets: [
                    {
                        labels: _timePointLabels,
                        data: _timeEntries,
                        backgroundColor: "#C06805",
                        borderColor: "#EADC25",
                    },
                ]
            });
        }
    },[timelineData]);

    return (
        <div className="timeline">
            <Searchbar dataPassFunction={fetchCard}/>
            {data ? (<>
                <BaseCard cardImage={data.card_images[0]?.image_url} cardName = {data.name}/>
                <div id="timeline-card-info-container">
                    <p>{data.humanReadableCardType}</p>
                    <p>Average Price: ${avgPrice}</p>
                </div>
            </>) : 
            (<h2 style={{color: 'white'}}>Loading Card...</h2>)}
            
            <div id="timeline-container">
                <h2 id="graph-title">{data ? data.name : "Card"}'s Timeline</h2>
                <div className="timeline-graph">
                    {chartData ? (<Line data={chartData} options={{
                        maintainAspectRatio: false, 
                        plugins: {
                            legend: {
                                display: false
                            },tooltip: {
                                callbacks : {
                                    label: (context) => {
                                        var _labels =  context.dataset.labels;
                                        var _label;
                                        if (context.dataIndex > 1) {
                                            _label = _labels[context.dataIndex] +` (${data.card_sets[context.dataIndex - 2].set_rarity})`;
                                        } else {
                                            _label = _labels[context.dataIndex];
                                        }
                                        

                                        return _label;
                                    },
                                    title: (context) => {
                                        
                                        return '';
                                    }
                                }
                            }

                        }
                    }}
                    />) : (<h2 style={{color: 'white'}}>Loading Timeline...</h2>)}
                </div>
            </div>
        </div>
    )
}

export default Timeline;