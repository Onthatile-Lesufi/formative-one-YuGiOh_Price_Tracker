import { InputGroup, Form } from 'react-bootstrap';
import './styling/searchbar.css'

function Searchbar () {
    return (
        <div className='searchbar'>
            <InputGroup className="mb-3" >
                <Form.Control
                  placeholder="Card Name..."
                  aria-label="Card Name..."
                  id="form-text"
                />
            </InputGroup>
        </div>
        
    )
}

export default Searchbar;