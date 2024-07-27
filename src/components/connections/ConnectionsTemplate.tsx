import './ConnectionsTemplate.css'
import axios from 'axios'
// import fs from fs
import useSWR, { Fetcher } from 'swr'
import FileInput from './FileInput'
import GuideSvg from '../svgs/guide'
import LessonSvg from '../svgs/lesson'
import LetterSvg from '../svgs/letter'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function NewConnectionButton() {
	const navigate = useNavigate()
	function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault()
    navigate('new')
  }

	return (
		<button className='new-connection-button' onClick={handleClick}>
			<p className='new-connection-button-text'>Create New</p>
		</button>
	)
}

function ConnectionItem(props: any) {
	const { name, sent } = props
	const [ icon, setIcon ] = useState(null)
	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case '/letters-home':
				setIcon(<LetterSvg />)
				break
			case '/life-lessons':
				setIcon(<LessonSvg />)
				break
			case '/guides':
				setIcon(<GuideSvg />)
				break
			}
	}, [icon])


	return (
		<Fragment>
			<div className='connection-icon'>{ icon }</div>
			<div className='connection-name'>{ name }</div>
			<div className='connection-sent'>{ sent }</div>
		</Fragment>
	)
}

const uploadsFetcher = async (resourcePath: string) => {
	try {
		// const response = await fetch(`http://localhost:8000/api/upload/${resourcePath}/`)
		// const responses = await Promise.allSettled([fetch(`http://localhost:8000/api/upload/${resourcePath}/`), fetch(`http://localhost:8000/api/write/${resourcePath}/`)])
		const firstCall = axios({
			method: 'get',
			url: `http://localhost:8000/api/upload/${resourcePath}/`,
			responseType: 'image/*'
		})

		const secondCall = axios({
			method: 'get',
			url: `http://localhost:8000/api/write/${resourcePath}/`,
			responseType: 'json'
		})
			// .then(function (response) {
			// 	// response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
			// 	console.log('response.data', response.data)
			// });
		const responses = await Promise.allSettled([firstCall, secondCall])

		
			if (responses[0].status === 'fulfilled') {
				// responses[0].value.data.pipe(fs.createWriteStream('nature.jpg'))
				console.log(responses[0].status,responses[0].value.data);
				console.log(responses[1].status,responses[1].value.data);
			} else {
				console.log(responses[0].status,responses[0].reason);
			}
		console.log('responses from UPLOADS:', responses)
		// return responses[0].json()
	} catch (error) {
		console.error('Error:', error)
	}
}

const writtenFetcher = async (resourcePath: string) => {
	try {
		const response = await fetch(`http://localhost:8000/api/write/${resourcePath}/`)
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		console.log('response.json() from WRITTEN:', response.json())
		return response.json()
	} catch (error) {
		console.error('Error:', error)
	}
}

export default function ConnectionsTemplate() {
	const [ connectionListItems, setConnectionListItems ] = useState<Array<any>>([])
	
	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]

	// useEffect(() => {
	// 	fetch(`http://localhost:8000/api/upload/${resourcePath}/`)
	// 		.then(response => {
	// 			if (!response.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			return response.json();
	// 		})
	// 		.then(files => console.log('Files:', files))
	// 		.catch(error => console.error('Error:', error));

	// 	fetch(`http://localhost:8000/api/write/${resourcePath}/`)
	// 		.then(response => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			}
	// 			throw new Error('Network response was not ok');
	// 		})
	// 		.then(writtenData => console.log('Written Data:', writtenData))
	// 		.catch(error => console.error('Error:', error))
	// }, [connectionListItems])
	// const  urls = [ `http://localhost:8000/api/upload/${resourcePath}/`, `http://localhost:8000/api/write/${resourcePath}/`]

	// const writtenData = useSWR(resourcePath, writtenFetcher)
	const data = useSWR(resourcePath, uploadsFetcher).data
	console.log('**uploadsData:', data)
	// console.log('**writtenData:', writtenData)


	return (
		<div>
			<div className='forms-display'>
				<FileInput />
				<NewConnectionButton />
			</div>
			<ul className='connection-items-list'>
				<li className='connection-item'><ConnectionItem name={'First'} sent={new Date().toJSON()}/></li>
				<li className='connection-item'><ConnectionItem name={'Second'} sent={new Date().toJSON()}/></li>
				<li className='connection-item'><ConnectionItem name={'Third'} sent={new Date().toJSON()}/></li>
				<li className='connection-item'><ConnectionItem name={'Fourth'} sent={new Date().toJSON()}/></li>
			</ul>
		</div>
	)
}