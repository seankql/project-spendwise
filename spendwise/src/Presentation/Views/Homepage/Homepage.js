import useViewModel from "./ViewModel";
import Button from "../../Components/Button"

export default function Homepage() {

  const { navigateToDashboard } = useViewModel();

  return (
    <div>
      <header>
        <div> Homepage</div>
        <Button title={"Navigate to Dashboard"} onClick={() => {
          navigateToDashboard() 
        }}/> 
      </header>
    </div>
  );
}
