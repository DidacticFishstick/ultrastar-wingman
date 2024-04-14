// Spinner.js
import {BarLoader} from "react-spinners";
import './Spinner.css';

function Spinner() {
    const override = {
        display: "block",
        margin: "0 auto",
        width: "100%",
    };

    return <BarLoader
        color="var(--highlight-blue-light)"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        // speedMultiplier={0.8}
    />
}


export default Spinner;
