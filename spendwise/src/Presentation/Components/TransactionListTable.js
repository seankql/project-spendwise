import "../Styles/Components.css";
import "../Styles/Common.css";

// TODO: make table populate dynamically based off provided data
// TODO: Style the table rows so they actually look good
export default function List({ data }) {
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
        <tbody>
          <tr>
            <td>Feb 28 2023</td>
            <td>Starbucks - Coffee</td>
            <td>Fast Food</td>
            <td className="transaction-list-last-col">$5.79</td>
          </tr>
          <tr>
            <td>Feb 27 2023</td>
            <td>Starbucks - Coffee</td>
            <td>Fast Food</td>
            <td className="transaction-list-last-col">$5.79</td>
          </tr>
          <tr>
            <td>Feb 26 2023</td>
            <td>Starbucks - Coffee</td>
            <td>Fast Food</td>
            <td className="transaction-list-last-col">$5.79</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
