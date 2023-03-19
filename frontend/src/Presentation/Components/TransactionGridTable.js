import "../Styles/Components.css";
import "../Styles/Common.css";
import TransactionGridEntry from "./TransactionGridEntry";

// TODO: Style the table rows so they actually look good
// Add some behaviour if data is null
export default function List({ data = null, editSubmit, deleteFunction }) {
  const getGrids = () => {
    if (!data || !data.transactions || data.totalCount === 0) {
      return;
    }
    return data?.transactions?.map((transaction) => {
      return (
        <TransactionGridEntry
          key={transaction.id}
          data={transaction}
          editSubmit={editSubmit}
          deleteFunction={deleteFunction}
          viewOnly={true}
        />
      );
    });
  };

  return <div className={"grid-table-wrapper"}>{getGrids()}</div>;
}
