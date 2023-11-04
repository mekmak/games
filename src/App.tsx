import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { F1Team, getStandings } from '../src/connectors/f1'
import { useEffect, useState } from 'react';


function App() {
  const [standings, setStandings] = useState<F1Team[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getStandings().then(r => setStandings(r?.teams ?? [])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>F1 Races</Tab>
          <Tab>F1 Standings</Tab>
          <Tab>Meat Sports</Tab>
        </TabList>
        <TabPanel>
          <p>Mexico City</p>
        </TabPanel>
        <TabPanel>
          {loading ? (<div>Loading...</div>) : (
            <table>
              <tr><td colSpan={3}>Constructors</td></tr>
              {standings.map(team => (
                <tr>
                  <td>{team.position}</td>
                  <td>{team.name}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </table>
          )}
        </TabPanel>
        <TabPanel>
          <p>SPORTS</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
