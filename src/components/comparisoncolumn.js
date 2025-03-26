import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from "react-bootstrap";
import Searchbar from "./searchbar";
import BaseCard from "./basecard";
import "./styling/comparisoncard.css";

const ComparisonColumn = ({dataPassFunction}) => {
    const [ data , setData ] = useState(null);
    const [ avgPrice , setAvgPrice ] = useState(0);

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

    useEffect(() => {
        fetchRandomCard();
    }, [])

    useEffect(() => {
        if (data && data.name) {
            const prices = [
                parseFloat(data.card_prices[0].tcgplayer_price || 0),
                parseFloat(data.card_prices[0].ebay_price || 0),
                parseFloat(data.card_prices[0].amazon_price || 0),
                parseFloat(data.card_prices[0].coolstuffinc_price || 0),
            ];
            const total = prices.reduce((sum, price) => sum + price, 0);
            setAvgPrice((total / prices.length).toFixed(2));

            const passThroughData = {
                cardName: data.name,
                cardPrices: prices,
                cardPopularity: {
                    totalViews: data.misc_info?.[0]?.views,
                    weekViews: data.misc_info?.[0]?.viewsweek,
                    upvotes: data.misc_info?.[0]?.upvotes,
                    downvotes: data.misc_info?.[0]?.downvotes
                },
                cardSets: data.card_sets?.length
            };
            
            dataPassFunction(passThroughData);
        }

        
    }, [data]); 

    return (
        <Col className="column-container">
            <Searchbar dataPassFunction={fetchCard}/>
            {data ? (<>
                <BaseCard cardName={data.name} cardImage={data.card_images[0]?.image_url} />
                <div className="card-info-text">
                    <p>{data.humanReadableCardType}</p>
                    <p>Average Price: ${avgPrice}</p>
                    <p>Release Dates:<br/>TCG: {data.misc_info?.[0]?.tcg_date || "N/A"}<br/>OCG: {data.misc_info?.[0]?.ocg_date || "N/A"}</p>
                </div>
            </>)
            :
            (<p style={{color: 'white'}}>Loading Card...</p>)}
        </Col>
    )
}

export default ComparisonColumn;