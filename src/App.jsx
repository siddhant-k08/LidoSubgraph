import { useState, useEffect } from 'react';
import './App.css';
import { createClient } from 'urql';

function App() {
  
  const [lidoTransfers, setTransfers] = useState([]);

  const QueryURL = "https://gateway-arbitrum.network.thegraph.com/api/a4fdd4918028f9f66ff0cd6b4e753eb9/subgraphs/id/Sxx812XgeKyzQPaBpR5YZWmGV5fZuBaPdh7DFhzSwiQ"

  const client = createClient({
    url: QueryURL
  })

  const query =`{
    lidoTransfers(first: 15, orderBy: blockTime, orderDirection: desc) {
      id
      from
      to
      value
      balanceAfterDecrease
      balanceAfterIncrease
      block
      blockTime
      logIndex
      shares
      sharesAfterDecrease
      sharesAfterIncrease
      sharesBeforeDecrease
      sharesBeforeIncrease
      totalPooledEther
      totalShares
      transactionHash
      transactionIndex
    }
  }`

  useEffect(() => {
    const getTransfers = async () => {
      const { data } = await client.query(query).toPromise();
      console.log(data);
      setTransfers(data.lidoTransfers);
    }
    getTransfers();
  }, [])

  return (
    <>
      <div>
        <h1>Transfers Information</h1>
        {lidoTransfers !== null && lidoTransfers.length > 0 && lidoTransfers.map((lidoTransfer) => {
          return (
            <div key={lidoTransfer.id}>
              <div>id = {lidoTransfer.id}</div><br></br>
              <div>from = {lidoTransfer.from}</div><br></br>
              <div>to = {lidoTransfer.to}</div><br></br>
              <div>value = {lidoTransfer.value}</div><br></br>
              <div>balanceAfterDecrease = {lidoTransfer.balanceAfterDecrease}</div><br></br>
              <div>balanceAfterIncrease = {lidoTransfer.balanceAfterIncrease}</div><br></br>
              <div>block = {lidoTransfer.block}</div><br></br>
              <div>blockTime = {lidoTransfer.blockTime}</div><br></br>
              <div>logIndex = {lidoTransfer.logIndex}</div><br></br>
              <div>shares = {lidoTransfer.shares}</div><br></br>
              <div>sharesAfterDecrease = {lidoTransfer.sharesAfterDecrease}</div><br></br>
              <div>sharesAfterIncrease = {lidoTransfer.sharesAfterIncrease}</div><br></br>
              <div>sharesBeforeDecrease = {lidoTransfer.sharesBeforeDecrease}</div><br></br>
              <div>sharesBeforeIncrease = {lidoTransfer.sharesBeforeIncrease}</div><br></br>
              <div>totalPooledEther = {lidoTransfer.totalPooledEther}</div><br></br>
              <div>totalShares = {lidoTransfer.totalShares}</div><br></br>
              <div>transactionHash = {lidoTransfer.transactionHash}</div><br></br>
              <div>transactionIndex = {lidoTransfer.transactionIndex}</div><br></br><br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;