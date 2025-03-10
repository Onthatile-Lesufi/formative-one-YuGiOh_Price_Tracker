import { Col } from "react-bootstrap";
import Searchbar from "./searchbar";
import BaseCard from "./basecard";

function ComparisonColumn () {
    return (
        <Col>
            <Searchbar/>
            <BaseCard/>
        </Col>
    )
}

export default ComparisonColumn;