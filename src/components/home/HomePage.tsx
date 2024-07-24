import MainTemplate from '../MainTemplate';
import { Link } from 'react-router-dom';

function HomePageLinks(props: any) {
	const { icon, path, title, description } = props

	return (
		<Link to={path}>
			{ icon }
			{ title }
			{ description }
		</Link>
	)
}

export default function HomePage() {
	const connectionsArray = [
		{
			icon: 'icon1',
			path: 'letters-home',
			title: 'Letters Home',
			description: 'Write letters and connect your loved ones at home.',
		},
		{
			icon: 'icon2',
			path: 'life-lessons',
			title: 'Life Lessons',
			description: 'Impart your knowledge, and make sure your loved ones know everything you can teach them.',
		},
		{
			icon: 'icon3',
			path: 'guides',
			title: 'Guides',
			description: 'Provide guidance to your loved ones for activities you normally do.',
		},
	]

	return (
		<MainTemplate title='Welcome'>
			<ul>
				{ connectionsArray.map((connectObj, i) =>
					<li key={i}>
						<HomePageLinks 
							icon={connectObj.icon}
							path={connectObj.path}
							title={connectObj.title}
							description={connectObj.description}
						/>
					</li>
				)}
			</ul>
		</MainTemplate>
	)
}