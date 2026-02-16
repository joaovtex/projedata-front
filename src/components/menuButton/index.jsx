import './index.css';
import { useNavigate } from 'react-router-dom';

export default function MenuButton(props, onClick) {
  const navigate = useNavigate();

  return (
    <button className="menu-button" onClick={() => navigate(props.link)}>
        {props.text}
    </button>
  );
}