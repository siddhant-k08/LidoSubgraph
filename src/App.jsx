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
              <div>{lidoTransfer.id}</div><br></br>
              <div>{lidoTransfer.from}</div><br></br>
              <div>{lidoTransfer.to}</div><br></br>
              <div>{lidoTransfer.value}</div><br></br><br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;