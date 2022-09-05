import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
function Home() {
    return (
        <>
            <div className="header">
                <p className="h1">
                    Hey, <Link to={"/todo"}>wellcome</Link> to Ceylans App
                </p>
            </div>
        </>
    );
}

export default Home;
