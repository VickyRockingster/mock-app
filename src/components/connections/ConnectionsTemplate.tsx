import './ConnectionsTemplate.css'
import axios from 'axios'
import FileInput from './FileInput'
import GuideSvg from '../svgs/guide'
import LessonSvg from '../svgs/lesson'
import LetterSvg from '../svgs/letter'
import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

type ConnectionItemData = {
	created: string
	pk: number
	name?: string
	text?: string
}

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

function ConnectionItem(props: ConnectionItemData) {
	const { name, created } = props
	const [ icon, setIcon ] = useState()
	const location = useLocation()
	const id = useParams()

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
	}, [location])

	const sent = new Date(created).toLocaleDateString()

	return (
		<>
			<div className='connection-icon'>{ icon }</div>
			<div className='connection-name'>{ name ? name : null}</div>
			<div className='connection-sent'>Sent { sent }</div>
		</>
	)
}

const getConnections = async (
	resourcePath: string,
	setUploadedConnectionListItems: React.Dispatch<React.SetStateAction<ConnectionItemData[]>>,
	setWrittenConnectionListItems: React.Dispatch<React.SetStateAction<ConnectionItemData[]>>,
) => {
	try {
		const firstCall = axios({
			method: 'get',
			url: `https://vrockingster.pythonanywhere.com/api/upload/${resourcePath}/`,
			responseType: 'json'
		})

		const secondCall = axios({
			method: 'get',
			url: `https://vrockingster.pythonanywhere.com/api/write/${resourcePath}/`,
			responseType: 'json'
		})
		const responses = await Promise.allSettled([firstCall, secondCall])
		const uploadedData: Array<ConnectionItemData> = responses[0].value.data
		const writtenData: Array<ConnectionItemData> = responses[1].value.data
		if (responses[0].status === 'fulfilled' && responses[1].status === 'fulfilled') {
			setUploadedConnectionListItems([...uploadedData])
			setWrittenConnectionListItems([...writtenData])
		}
	} catch (error) {
		console.error('Error:', error)
	}
}

export default function ConnectionsTemplate() {
	const [ uploadedConnectionListItems, setUploadedConnectionListItems ] = useState<Array<ConnectionItemData>>([])
	const [ writtenConnectionListItems, setWrittenConnectionListItems ] = useState<Array<ConnectionItemData>>([])
	
	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]
	
	useEffect(() => {
		getConnections(
			resourcePath, 
			setUploadedConnectionListItems, 
			setWrittenConnectionListItems)
	}, [ location.pathname])

	const uploadedListItems = uploadedConnectionListItems.map(listItem => (
		<li key={listItem.pk} className='connection-item'>
			<ConnectionItem pk={listItem.pk} name={listItem.name} created={listItem.created}/>
			</li>
	))
	const writtenListItems = writtenConnectionListItems.map(listItem => (
		<li key={listItem.pk + '50'} className='connection-item'>
			<ConnectionItem pk={listItem.pk} created={listItem.created}/>
		</li>
	))
	return (
		<div>
			<div className='forms-display'>
				<FileInput />
				<NewConnectionButton />
			</div>
			<ul className='connection-items-list'>
				{uploadedListItems}
				{writtenListItems}
			</ul>
		</div>
	)
}