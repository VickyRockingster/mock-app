import ConnectionsTemplate from '../ConnectionsTemplate';
import MainTemplate from '../../MainTemplate';
import WriteInput from '../WriteInput';
import { Outlet } from 'react-router-dom';

export function LifeLessonsPage() {
	return (
		<MainTemplate title='Life Lessons'>
			<Outlet />
			<ConnectionsTemplate />
		</MainTemplate>
	)
}

export function NewLifeLessonPage() {
	return <div><WriteInput /></div>
}