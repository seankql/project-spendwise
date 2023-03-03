import "../Styles/Components.css";

export default function List({ onClick, title, classes = "btn" }) {
  return (
    <button className={classes} onClick={onClick}>
      {title}
    </button>
  );
}
