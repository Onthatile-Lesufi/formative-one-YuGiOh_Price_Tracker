import { Col } from "react-bootstrap";
import Searchbar from "./searchbar";
import BaseCard from "./basecard";
import "./styling/comparisoncard.css";

function ComparisonColumn () {
    return (
        <Col className="column-container">
            <Searchbar/>
            <BaseCard/>
            <div className="card-info-text">
                <p>Card Type</p>
                <p>Average Price:</p>
                <p>Release Dates:<br/>TCG:<br/>OCG:</p>
            </div>
        </Col>
    )
}

export default ComparisonColumn;