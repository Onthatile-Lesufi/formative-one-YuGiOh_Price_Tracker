import BaseCard from "../components/basecard";
import Searchbar from "../components/searchbar";
import './styling/timeline.css';

function timeline () {
    return (
        <div className="timeline">
            <Searchbar/>
            <BaseCard/>
        </div>
    )
}

export default timeline;