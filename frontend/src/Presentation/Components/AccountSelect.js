import "../Styles/Components.css";
import "../Styles/Common.css";

// TODO: data should be a list of alerts if there are multiple alerts, users
// should be able to scroll or perhaps clear through alerts.
export default function List({ data }) {
  const createNewOption = (id, value) => {
    return (
      <option key={id} value={value}>
        {" "}
        {value}{" "}
      </option>
    );
  };

  const options = data?.map((item) => createNewOption(item.id, item.value));

  return (
    <select>
      <option value={"All Accounts"}> All Accounts </option>
      {options}
    </select>
  );
}
