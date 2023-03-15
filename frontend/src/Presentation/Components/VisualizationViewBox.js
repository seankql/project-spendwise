import "../Styles/Components.css";
import ExpenditureGraph from "./Graphs/ExpenditureGraph";
import CategoryGraph from "./Graphs/CategoryGraph";
import StackedAreaCategoryGraph from "./Graphs/StackedAreaCategoryGraph";

export default function List({ data }) {
  return (
    <div className="transactions-col">
      <CategoryGraph data={data} />
      <ExpenditureGraph data={data} />
      <StackedAreaCategoryGraph data={data} />
    </div>
  );
}
