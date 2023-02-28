import '../Styles/Components.css' 

export default function List({ onClick, title, style='btn'}) {
  return (
      <button className={style} onClick={onClick}>{title}</button>
  );
}
