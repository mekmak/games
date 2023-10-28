import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import './App.css';


function App() {
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
          <p>Red Bull is cheating and winning</p>
        </TabPanel>
        <TabPanel>
          <p>SPORTS</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
