import './MainTemplate.css';
import { Link } from 'react-router-dom';
import UserSvg from './svgs/user';


function PageNav() {

	return(
		<aside className='side-bar'>
			<UserSvg className='user-pic' />
			<ul className='nav-list'>
				<li><Link className='nav-list-item-link' to='/'>Home</Link></li>
				<li><Link className='nav-list-item-link' to='/personal-info'>Personal Info</Link></li>
				<li><Link className='nav-list-item-link' to='/loved-ones'>Loved Ones</Link></li>
				<li><Link className='nav-list-item-link' to='/letters-home'>Letters Home</Link></li>
				<li><Link className='nav-list-item-link' to='/life-lessons'>Life Lessons</Link></li>
				<li><Link className='nav-list-item-link' to='/guides'>Guides</Link></li>
				<li><Link className='nav-list-item-link' to='/legal'>Legal</Link></li>
			</ul>
			
		</aside>
	)
}


export default function MainTemplate(props: any) {
	const { title, children }  = props

	return (
		<main className='main-layout'>
			<PageNav />
			<section>
				<h1 className='section-title'>{ title }</h1>
				{ children }
			</section>

		</main>
	)
}