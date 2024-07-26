import './HomePage.css'
import GuideSvg from '../svgs/guide';
import LetterSvg from '../svgs/letter';
import LessonSvg from '../svgs/lesson';
import MainTemplate from '../MainTemplate';
import { Link } from 'react-router-dom';

function HomePageLink(props: any) {
	const { icon, path, title, description } = props

	return (
		<Link to={path} className='home-page-link'>
			<div className='home-page-link-icon'>{ icon }</div>
			<div className='home-page-link-title'>{ title }</div>
			<div className='home-page-link-description'>{ description }</div>
		</Link>
	)
}

export default function HomePage() {
	const connectionsArray = [
		{
			icon: <LetterSvg />,
			path: 'letters-home',
			title: 'Letters Home',
			description: 'Write letters and connect your loved ones at home.',
		},
		{
			icon: <LessonSvg />,
			path: 'life-lessons',
			title: 'Life Lessons',
			description: 'Impart your knowledge, and make sure your loved ones know everything you can teach them.',
		},
		{
			icon: <GuideSvg />,
			path: 'guides',
			title: 'Guides',
			description: 'Provide guidance to your loved ones for activities you normally do.',
		},
	]

	return (
		<MainTemplate title='Welcome'>
			<ul className='homepage-link-list'>
				{ connectionsArray.map((connectObj, i) =>
					<li className='homepage-link-list-item' key={i}>
						<HomePageLink
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