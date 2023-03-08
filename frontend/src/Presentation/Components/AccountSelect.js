import "../Styles/Components.css";
import "../Styles/Common.css";

export default function List({ data }) {
  const createNewOption = (id, value) => {
    return (
      <option key={id} value={value}>
        {" "}
        {value}{" "}
      </option>
    );
  };

  const options = data?.map((item) =>
    createNewOption(item.accountid, item.accountname)
  );

  return (
    <select>
      <option value={"All Accounts"}> All Accounts </option>
      {options}
    </select>
  );
}
