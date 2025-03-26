import './styling/basecard.css';
import Pog from '../assets/images/pot-of-greed.jpg';


const BaseCard = ({cardName, cardImage}) => {
    let tempCardName = cardName;

    return (
        <div className='card-holder'>
            <div className='card-image-holder'>
                <img className='card-image' src={cardImage} alt='card'/>
            </div>
            <div className='card-name-holder'>
                <h3 className='card-name-text'>{tempCardName}</h3>
            </div>
        </div>
    )
} 

export default BaseCard;