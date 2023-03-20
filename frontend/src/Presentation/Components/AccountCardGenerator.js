import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import AccountCardForm from "./AccountCardForm.js";

export default function List({
  data = null,
  editSubmit,
  deleteFunction,
  linkToken,
  successFunction,
}) {
  const cards = data?.map((account) => (
    <AccountCardForm
      key={account.id}
      data={account}
      editSubmit={editSubmit}
      deleteFunction={deleteFunction}
      linkToken={linkToken}
      successFunction={successFunction}
    />
  ));

  return cards;
}
