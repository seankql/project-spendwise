import "../Styles/Components.css";
import ExpenditureGraph from "./Graphs/ExpenditureGraph";
import IncomeGraph from "./Graphs/IncomeGraph";
import CategoryGraph from "./Graphs/CategoryGraph";
import StackedAreaCategoryGraph from "./Graphs/StackedAreaCategoryGraph";

export default function List({ graph, data }) {
  const getGraph = () => {
    if (graph === "pie") return <CategoryGraph data={data} />;
    if (graph === "stack") return <StackedAreaCategoryGraph data={data} />;
    if (graph === "income") return <IncomeGraph data={data} />;
    if (graph === "expense") return <ExpenditureGraph data={data} />;
  };

  return <div className="transactions-col">{getGraph()}</div>;
}
