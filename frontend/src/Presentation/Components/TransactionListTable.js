import "../Styles/Components.css";
import "../Styles/Common.css";

// TODO: Style the table rows so they actually look good
// Add some behaviour if data is null
export default function List({ data = null }) {
  const createNewRowElement = (id, date, name, category, amount) => {
    return (
      <tr key={id} onClick={() => console.log(id)}>
        <td>{date}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td className="transaction-list-last-col">{amount}</td>
      </tr>
    );
  };

  const getRows = () => {
    if (!data || !data.transactions || data.totalCount === 0) {
      return;
    }
    return data?.transactions?.map((transaction) =>
      createNewRowElement(
        transaction.id,
        transaction.transactionDate,
        transaction.descriptions,
        transaction.category,
        transaction.amount
      )
    );
  };

  return (
    <div>
      <table className="transaction-list-table">
        <thead>
          <tr className="transaction-list-table-row">
            <th className="transaction-list-table-header">Date</th>
            <th className="transaction-list-table-header">Name</th>
            <th className="transaction-list-table-header">Category</th>
            <th className="transaction-list-last-col transaction-list-table-header">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>
    </div>
  );
}
