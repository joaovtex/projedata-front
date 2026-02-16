import './index.css';

export default function MenuButton(props) {
  return (
    <button className="menu-button">
        {props.text}
    </button>
  );
}