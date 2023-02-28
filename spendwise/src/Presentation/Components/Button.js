import '../Styles/Components.css' 

export default function List({ onClick, title, }) {
  return (
      <button className='button' onClick={onClick}>{title}</button>
  );
}
