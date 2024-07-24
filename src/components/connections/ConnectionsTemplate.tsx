import FileInput from './FileInput';
import { useLocation } from 'react-router-dom';

export default function ConnectionsTemplate() {
	const location = useLocation()
	console.log('location;', location.pathname)

	return (
		<section>
			<FileInput />
		</section>
	)
}