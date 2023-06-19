import { useSelector } from "react-redux";
import TurnAddForm from './turnAddingForm';
import TurnFilterForm from './turnFilterForm';

export default function TurnForm() {

    const TurnFormType = useSelector((state: any) => state.turnFormType.value);

    return (
        <>
            {TurnFormType ? <TurnAddForm /> : <TurnFilterForm />}
        </>
    );
}