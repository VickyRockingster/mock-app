import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import WriteInput from '../WriteInput';
import { Outlet } from 'react-router-dom';


export function GuidesPage() {
	return (
		<MainTemplate title='Guides'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}

export function NewGuidePage() {
	return <div><WriteInput /></div>
}