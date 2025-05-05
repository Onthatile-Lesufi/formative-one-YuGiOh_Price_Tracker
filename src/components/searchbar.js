import { InputGroup, Form } from 'react-bootstrap';
import './styling/searchbar.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015

const Searchbar = ({dataPassFunction}) => {
    const [cards, setCards] = useState(null);
    //Active Card webhook to set the card name to the searchbar
    const [activeCard, setActiveCard] = useState(null);

    //Function to gather all card names for typeahead
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
        //Fetch card names on page load
        fetchCard();
    },[]);

    return (
        <Form className='searchbar'>
            {/* Custom bootstrap Typeahead component acquired from https://github.com/ericgio/react-bootstrap-typeahead
            Provides auto complete for searchbar */}
            <Typeahead
                className='form-input'
                onChange={(selected) => {
                    setActiveCard(selected);
                    var _selectedData = selected;
                    var _passThroughData = _selectedData[0];
                    if (_passThroughData === undefined) return;
                    // String handling to replace any ampersands in a card's name with it's corresponding hex value to allow easy searching with the api
                    if (_passThroughData.includes("&")) {
                        _passThroughData = _passThroughData.replaceAll('&' , "%26");
                    }

                    //Pass through the card's name to the component using the searchbar
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