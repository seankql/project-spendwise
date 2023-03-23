import "../Styles/Components.css";
import ExpenditureGraph from "./Graphs/ExpenditureGraph";
import IncomeGraph from "./Graphs/IncomeGraph";
import CategoryGraph from "./Graphs/CategoryGraph";
import StackedAreaCategoryGraph from "./Graphs/StackedAreaCategoryGraph";

export default function List({ graph, data, startDate, endDate }) {
  const getGraph = () => {
    if (graph === "pie")
      return (
        <CategoryGraph data={data} startDate={startDate} endDate={endDate} />
      );
    if (graph === "stack")
      return (
        <StackedAreaCategoryGraph
          data={data}
          startDate={startDate}
          endDate={endDate}
        />
      );
    if (graph === "income")
      return (
        <IncomeGraph data={data} startDate={startDate} endDate={endDate} />
      );
    if (graph === "expense")
      return (
        <ExpenditureGraph data={data} startDate={startDate} endDate={endDate} />
      );
  };

  return <div className="transactions-col">{getGraph()}</div>;
}
