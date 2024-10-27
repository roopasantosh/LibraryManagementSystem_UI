import React from "react";

const Loader = () => {
    return (
        <div className="centered-div">
            <img src={process.env.PUBLIC_URL + "loading.gif"} />
        </div>
    );
};

export default Loader;
