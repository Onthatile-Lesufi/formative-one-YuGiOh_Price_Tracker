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
        //Get card data from api using a specific card's name
        try {
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}&misc=yes`);
            setData(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    async function fetchRandomCard() {
        try {
            //Get all cards from api then get a random card from the array
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes');
            const _count = response.data.data.length;
            const _random = Math.floor(Math.random() * _count);
            const _tempData = response.data.data[_random];
            setData(_tempData);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    async function fetchCardSetInfo() {
        const _miscInfo = data.misc_info[0];
        const _cardFormats = _miscInfo.formats;
        var _tempTimeline = [];

        //Test whether searched card was released in the Trading Card Game and/or Official Card Game regions and order the timeline array accordingly
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
         
        //After release information is placed on the array compare the names of sets the card was released in to an array containing the information of every card set that has been released
        try {
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardsets.php');
            
            for (const tempSet of data.card_sets.reverse()) {
                _tempTimeline.push(response.data.find((setEntry) => setEntry.set_name === tempSet.set_name));
            }
            
            _tempTimeline.sort((a, b) => {
                return new Date(a.tcg_date).valueOf() - new Date(b.tcg_date).valueOf();
            });
            
            //After comparison and array construction the timeline's data is set
            setTimelineData(_tempTimeline);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
        
    }

    useEffect(() => {
        //On page load fetch a random card from api
        fetchRandomCard();
    }, [])

    useEffect(() => {
        if (data) {
            //Set average price if card data has been updated
            const prices = [
                parseFloat(data.card_prices[0].tcgplayer_price || 0),
                parseFloat(data.card_prices[0].ebay_price || 0),
                parseFloat(data.card_prices[0].amazon_price || 0),
                parseFloat(data.card_prices[0].coolstuffinc_price || 0),
            ];
            const total = prices.reduce((sum, price) => sum + price, 0);
            setAvgPrice((total / prices.length).toFixed(2));

            //Fetch timeline information after calculating the card's average price
            fetchCardSetInfo();
        }
    }, [data]); 

    useEffect (() => {
        if (timelineData) {
            //Once the timeline is retrieved, it is then separated and formatted to be used by the ChartJs graph
            var _timelineLabels = timelineData.map(index => new Date(index.tcg_date).getFullYear() || 1970);
            var _timeEntries = timelineData.map(index => parseFloat(index.set_price) || 0);
            var _timePointLabels = timelineData.map(index => index.set_name);
            
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
            {/* Ternary operator that displays a card if the data is obtained. Otherwise loading text is displayed */}
            {data ? (<>
                <BaseCard cardImage={data.card_images[0]?.image_url} cardName = {data.name}/>
                <div id="timeline-card-info-container">
                    <p>{data.humanReadableCardType}</p>
                    <p>Average Price: ${avgPrice}</p>
                </div>
            </>) : 
            (<h2 style={{color: 'white'}}>Loading Card...</h2>)}
            
            {/* Ternary operator that displays the timeline if the data is obtained. Otherwise loading text is displayed */}
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