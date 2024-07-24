import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import { Outlet } from 'react-router-dom';

export function LettersHomePage() {
	return (
		<MainTemplate title='Letters Home'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}

export function LetterPage() {
	return (
		<div>
			<div>This Letter</div>
		</div>

	)
}

export function NewLetterPage() {
	return (
		<div>
			<div>New Letter</div>
		</div>

	)
}