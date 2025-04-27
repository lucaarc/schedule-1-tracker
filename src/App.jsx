import Card from "./Card.jsx"
import React, {useState} from "react"
import { usePersistentState } from "./usePersistentState.jsx";

function App() {        
    function incrementCounter(counterID) {
      setCounterList(prevList => prevList.map(c => 
          {
            if (c.id===counterID) {
              return {...c,val: c.val+1}
            } else {
              return c
            }
          } 
      ))
    }
    function decrementCounter(counterID) {
      setCounterList(prevList => prevList.map(c => 
          {
            if (c.id===counterID) {
              if (c.val != 0) {
                return {...c,val: c.val-1}
              } else {
                return c
              }
            } else {
              return c
            }
          } 
      ))
    }
    function resetCounter(counterID) {
      setCounterList(prevList => prevList.map(c => 
          {
            if (c.id===counterID) {
                return {...c,val: 0}
            } else {
              return c
            }
          } 
      ))
    }

    function handleNameChange(counterID, newName) {
      setCounterList(prevList => prevList.map(c => 
          {
            if (c.id===counterID) {
                return {...c,name: newName}
            } else {
              return c
            }
          } 
      ))
    }
        
    function handleMoneyChange(counterID, newPrice) {
      setCounterList(prevList => prevList.map(c => 
          {
            if (c.id===counterID) {
                return {...c,price: newPrice}
            } else {
              return c
            }
          } 
      ))
    }
    //const [counterList, setCounterList] = useState([
    //  {id:1, name:"OG", val:0, price:50},
    //  {id:2, name:"Meth", val:0, price:70}
    //])
    const [counterList, setCounterList] = usePersistentState('saved-counter',[]);
    
    const totalBags = counterList.reduce((sum, counter) => sum + counter.val, 0);
    const totalEarnings = counterList.reduce((sum, counter) => sum + (counter.val*counter.price), 0);

    
    //add counter stuff 
    const [publicID, setPublicID] = usePersistentState('saved-count',1)

    function addCounter() {
      setCounterList(c => [...c, {id:publicID, name:"New Counter", val:0, price:0}])
      setPublicID(prev => prev+1)
    }
    function handleClearAll() {
      setCounterList(prevList => prevList.map(c => ({...c, val:0})))
    }    

    return(
    <>
    <div className="header">
      Schedule 1 Tracker
      
    </div>
    <hr></hr>
    <div className="top-container">
      <div className="baggie-count">
        <span>{totalBags}</span>
        <br/>
        Baggies Needed (Total Sales)
      </div>
      <div>
        <h1 className="categoryname">INVENTORY<br/>
          <button className="add-button" onClick={addCounter}>Add Counter</button>
          <br/>
          <button className="clear-button" onClick={handleClearAll}>Clear All</button>
        </h1> 
      </div>
      <div className="total-earnings">
        <span>${totalEarnings}</span>
        <br/>
        Daily Earnings
      </div>
    </div>
    <div className="counters-wrapper">
      {counterList.map(i => 
      
      <Card 
        id={i.id}
        key={i.id}
        name={i.name}
        counter={i.val}
        increment={() => incrementCounter(i.id)}
        decrement={() => decrementCounter(i.id)}
        reset={() => resetCounter(i.id)}
        price={i.price}
        handleName={handleNameChange}
        handleMoney={handleMoneyChange}
        handleClearAll={()=>handleClearAll(i.id)}
      />
      )}
    </div>
    </>
    );
}

export default App