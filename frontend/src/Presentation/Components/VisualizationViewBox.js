import "../Styles/Components.css";
import ExpenditureGraph from "./ExpenditureGraph";

export default function List({ data }) {
  return (
    <div className="transactions-col">
      <ExpenditureGraph data={data} />
    </div>
  );
}
