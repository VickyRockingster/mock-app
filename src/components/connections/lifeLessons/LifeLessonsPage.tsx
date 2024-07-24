import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import { Outlet } from 'react-router-dom';

export default function LifeLessonsPage() {
	return (
		<MainTemplate title='Life Lessons'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}