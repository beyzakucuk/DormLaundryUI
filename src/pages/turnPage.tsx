import { Provider } from 'react-redux';
import store from "../modules/store";
import TurnTable from '../components/turnTable';
import TurnForm from '../components/turnForm';


export default function TurnsPage() {
  return (
    <>
     <Provider store={store}> 
     <TurnForm />
     <TurnTable/>
    </Provider>
    </>
  );
}