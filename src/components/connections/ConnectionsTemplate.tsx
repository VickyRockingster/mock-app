import './ConnectionsTemplate.css'
import FileInput from './FileInput';
import { useLocation, useNavigate } from 'react-router-dom';

function NewConnectionButton() {
	const navigate = useNavigate(); 
	function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
    navigate('new');
  }

	return (
		<button className='new-connection-button' onClick={handleClick}>
			<p className='new-connection-button-text'>Create New</p>
		</button>
	)
}

export default function ConnectionsTemplate() {
	const location = useLocation()
	console.log('location:', location.pathname)

	return (
		<div className='forms-display'>
			<FileInput />
			<NewConnectionButton />
		</div>
	)
}