import "../Styles/Components.css";
import "../Styles/Common.css";

export default function List({ data = null }) {
  const createNewGridElement = (id, date, name, category, amount) => {
    return (
      <div key={id} className="grid-table-grid">
        <div className="grid-container">
          <div> {date} </div>
          <div> {name} </div>
          <div> {category} </div>
          <div> {amount} </div>
        </div>
      </div>
    );
  };

  const getGrids = () => {
    if (!data || !data.transactions || data.totalCount === 0) {
      return;
    }
    return data?.transactions?.map((transaction) =>
      createNewGridElement(
        transaction.id,
        transaction.transactionDate,
        transaction.descriptions,
        transaction.category,
        transaction.amount
      )
    );
  };

  return <div className={"grid-table-wrapper"}>{getGrids()}</div>;
}
