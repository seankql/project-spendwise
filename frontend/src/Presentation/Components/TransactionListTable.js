import "../Styles/Components.css";
import "../Styles/Common.css";
import TransactionListEntry from "./TransactionListEntry";

// TODO: Style the table rows so they actually look good
// Add some behaviour if data is null
export default function List({
  data = null,
  editSubmit,
  deleteFunction,
  limit = null,
}) {
  const getRows = () => {
    if (!data || !data.transactions || data.totalCount === 0) {
      return;
    }
    if (limit) {
      return data?.transactions?.slice(0, limit).map((transaction) => {
        return (
          <TransactionListEntry
            key={transaction.id}
            data={transaction}
            editSubmit={transaction}
            deleteFunction={deleteFunction}
            viewOnly={true}
          />
        );
      });
    } else {
      return data?.transactions?.map((transaction) => {
        return (
          <TransactionListEntry
            key={transaction.id}
            data={transaction}
            editSubmit={editSubmit}
            deleteFunction={deleteFunction}
          />
        );
      });
    }
  };

  return (
    <div>
      <div className="page-row-container">
        <div className="transaction-col-container list-transaction-font">
          Date
        </div>
        <div className="transaction-col-container list-transaction-font">
          Name
        </div>
        <div className="transaction-col-container list-transaction-font">
          Category
        </div>
        <div className="transaction-col-container list-transaction-font">
          Amount
        </div>
        <div className="page-row-container table-header-spacer" />
      </div>
      {getRows()}
    </div>
  );
}
