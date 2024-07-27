import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import WriteInput from '../WriteInput';
import { Outlet } from 'react-router-dom';

export function LettersHomePage() {
	return (
		<MainTemplate title='Letters Home'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}

export function NewLetterPage() {
	return <div><WriteInput /></div>
}