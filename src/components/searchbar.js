import { InputGroup, Form } from 'react-bootstrap';
import './styling/searchbar.css'

function Searchbar () {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="input-icon">🔎︎</InputGroup.Text>
            <Form.Control
              placeholder="Card Name"
              aria-label="Card Name"
              aria-describedby="form-text"
            />
        </InputGroup>
    )
}

export default Searchbar;