import BaseCard from "../components/basecard";
import Searchbar from "../components/searchbar";
import './styling/timeline.css';

function timeline () {
    return (
        <div className="timeline">
            <Searchbar/>
            <BaseCard/>
            <div id="timeline-card-info-container">
                <p>Card Type</p>
                <p>Average Price:</p>
            </div>
            <div id="timeline-container">
                <h2 id="graph-title">Card's Timeline</h2>
            </div>
        </div>
    )
}

export default timeline;