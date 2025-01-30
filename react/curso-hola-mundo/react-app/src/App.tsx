import Card,{ CardBody } from "./components/Card";
import List from "./components/List";



function App() {
  const list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  return (
          <Card>
            <CardBody title="Mi titulo" text="Mi texto" />
            <List data={list}/>
          </Card>
  );
}

export default App;
