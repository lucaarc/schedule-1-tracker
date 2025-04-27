import React, { useState, useEffect, useRef } from "react"

function Card({ handleName, handleClearAll, handleMoney, id, name,  increment, reset, decrement, counter, price }) {
    
    const [named, setNamed] = useState(true);
    const inputRef = useRef(null); // for h1 input
    const inputRef2 = useRef(null); // for the money setter input
    function nameChange() {
        setNamed(false);
    };
    function keyDownFunction(event) {
        if (event.key === "Enter") {
            if (event.target.type == "text") {
                nameSubmit(event.target.value);
            } else if (event.target.type == "number") {
                priceSubmit(event.target.value);
            };
        };
    };

    function blurFunction(event) {
        if (event.target.type == "text") {
            nameSubmit(event.target.value);
        } else if (event.target.type == "number") {
            priceSubmit(event.target.value);
        };
    };
    function nameSubmit(newName) {
        if (newName != "") {
            setNamed(true);
            handleName(id,newName);
        };
    };

    const [priceStatic, setPriceStatic] = useState(true);
    function priceChange() {
        setPriceStatic(false);
    }
    function priceSubmit(newPrice) {
        if (newPrice != "") {
            setPriceStatic(true);
            handleMoney(id,newPrice);
        };  
    };

    useEffect(() => {
        if (!named && inputRef.current) {
            inputRef.current.focus();
        }
    }, [named]);
    useEffect(() => {
        if (!priceStatic && inputRef2.current) {
            inputRef2.current.focus();
        }
    }, [priceStatic]);
    
    //conditional things
    const h1Named = <h1 onClick={nameChange}>{name}</h1> //normal h1
    const h1NotNamed = <h1><input ref={inputRef} spellCheck="false" placeholder="Enter new name" className="name-input" type="text" onBlur={blurFunction} onKeyDown={keyDownFunction}/></h1> //h1 setter w the input

    const priceIsStatic = <p>${counter*price}<br/><span className="price-clicker" onClick={priceChange}>${price}/pc</span></p> //normal price element
    const priceIsNotStatic = <p>${counter*price}<br/><span>$<input ref={inputRef2} className="price-adjust" onBlur={blurFunction} onKeyDown={keyDownFunction} type="number"/>/pc</span></p> //price setter input




    return(
        <div key={id} id={id.toString()} className="option">
            <div className="top-option">
                {named ? h1Named : h1NotNamed}
                <span className="x-button" onClick={handleClearAll}>&#10005;</span>
            </div>
            <h2>{counter}</h2>
            {priceStatic ? priceIsStatic : priceIsNotStatic}
            {(named && priceStatic) ? 
                <div className="button-container">
                    <button onClick={increment}>+</button> <button onClick={reset}>0</button> <button onClick={decrement}>-</button>
                </div>
                :
                <div className="button-container">
                    <button>+</button> <button>0</button> <button>-</button>
                </div>
            }
        </div>
    )
};

export default Card