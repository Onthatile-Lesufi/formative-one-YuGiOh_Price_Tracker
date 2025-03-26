import { InputGroup, Form } from 'react-bootstrap';
import './styling/searchbar.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015

const Searchbar = ({dataPassFunction}) => {
    // var Typeahead = require('react-bootstrap-typeahead').Typeahead; // CommonJS
    const [cards, setCards] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    async function fetchCard() {
        try {
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes');
            var _responseArray = response.data.data;
            var _nameArray = _responseArray.map(index => index.name);
            setCards(_nameArray);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    useEffect(() => {
        fetchCard();
    },[]);

    return (
        <Form className='searchbar'>
            <Typeahead
                className='form-input'
                onChange={(selected) => {
                    setActiveCard(selected);
                    var _selectedData = selected;
                    var _passThroughData = _selectedData[0];
                    if (_passThroughData === undefined) return;
                    if (_passThroughData.includes("&")) {
                        _passThroughData = _passThroughData.replaceAll('&' , "%26");
                    }
                
                    dataPassFunction (_passThroughData);
                }}
                options={cards}
                selected={activeCard}
                placeholder='Card Name...'
                inputProps={{
                    className:'form-text'
                }}
            />
        </Form>
        
    )
}

export default Searchbar;