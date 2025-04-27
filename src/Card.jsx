import React, {useState, useEffect, useRef} from "react"

function Card(props) {
    
    const [named, setNamed] = useState(true);
    const inputRef = useRef(null); // for h1
    const inputRef2 = useRef(null); // for the money setter thingy
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
            props.handleName(props.id,newName);
        };
    };

    const [priceStatic, setPriceStatic] = useState(true);
    function priceChange() {
        setPriceStatic(false);
    }
    function priceSubmit(newPrice) {
        if (newPrice != "") {
            setPriceStatic(true);
            props.handleMoney(props.id,newPrice);
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
    
    return(
        <div key={props.id} id={props.id.toString()} className="option">
            <div className="top-option">
                {named ?
                    <h1 onClick={nameChange}>{props.name}</h1>
                    :
                    <h1><input ref={inputRef} spellCheck="false" placeholder="Enter new name" className="name-input" type="text" onBlur={blurFunction} onKeyDown={keyDownFunction}/></h1>
                }
                <span className="x-button" onClick={props.handleDelete}>&#10005;</span>
            </div>
            
            
            <h2>{props.counter}</h2>
            {priceStatic ? 
                <p>${props.counter*props.price}<br/><span className="price-clicker" onClick={priceChange}>${props.price}/pc</span></p>
                :
                <p>${props.counter*props.price}<br/><span>$<input ref={inputRef2} className="price-adjust" onBlur={blurFunction} onKeyDown={keyDownFunction} type="number"/>/pc</span></p>
            }
            {(named && priceStatic) ? 
                <div className="button-container">
                    <button onClick={props.increment}>+</button> <button onClick={props.reset}>0</button> <button onClick={props.decrement}>-</button>
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