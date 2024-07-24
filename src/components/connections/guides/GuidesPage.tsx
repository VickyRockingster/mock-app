import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import { Outlet } from 'react-router-dom';


export default function GuidesPage() {
	return (
		<MainTemplate title='Guides'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}