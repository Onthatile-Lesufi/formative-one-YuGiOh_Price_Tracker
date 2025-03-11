import './styling/basecard.css';
import Pog from '../assets/images/pot-of-greed.jpg';

// function BaseCard (cardName) {
//     let tempCardName = cardName !== "" ? cardName : "Card Name";

//     return (
//         <div>
//             <div className='card-image-holder'>
//                 <img src='' alt='card'/>
//             </div>
//             <h3 className='card-name-text'>{tempCardName}</h3>
//         </div>
//     )
// } 

function BaseCard () {
    let tempCardName = "Card Name";

    return (
        <div className='card-holder'>
            <div className='card-image-holder'>
                <img className='card-image' src={Pog} alt='card'/>
            </div>
            <div className='card-name-holder'>
                <h3 className='card-name-text'>{tempCardName}</h3>
            </div>
        </div>
    )
} 

export default BaseCard;