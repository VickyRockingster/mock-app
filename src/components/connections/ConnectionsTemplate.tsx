import './ConnectionsTemplate.css'
import axios from 'axios'
import FileInput from './FileInput'
import GuideSvg from '../svgs/guide'
import LessonSvg from '../svgs/lesson'
import LetterSvg from '../svgs/letter'
import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

type UploadedData = {
	created: string
	name: string
	pk: Number
}

type WrittenData = {
	created: string
	text: string
	pk: Number
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

function ConnectionItem(props: UploadedData | WrittenData) {
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
	setUploadedConnectionListItems: React.Dispatch<React.SetStateAction<UploadedData[]>>,
	setWrittenConnectionListItems: React.Dispatch<React.SetStateAction<WrittenData[]>>,
	uploadedConnectionListItems: Array<any>,
	writtenConnectionListItems: Array<any>
) => {
	try {
		const firstCall = axios({
			method: 'get',
			url: `http://localhost:8000/api/upload/${resourcePath}/`,
			responseType: 'json'
		})

		const secondCall = axios({
			method: 'get',
			url: `http://localhost:8000/api/write/${resourcePath}/`,
			responseType: 'json'
		})
		const responses = await Promise.allSettled([firstCall, secondCall])
		const uploadedData: Array<UploadedData> = responses[0].value.data
		const writtenData: Array<WrittenData> = responses[1].value.data
		if (responses[0].status === 'fulfilled' && responses[1].status === 'fulfilled') {
			setUploadedConnectionListItems([...uploadedConnectionListItems, ...uploadedData])
			setWrittenConnectionListItems([...writtenConnectionListItems, ...writtenData])
		}
	} catch (error) {
		console.error('Error:', error)
	}
}

export default function ConnectionsTemplate() {
	const [ uploadedConnectionListItems, setUploadedConnectionListItems ] = useState<Array<UploadedData>>([])
	const [ writtenConnectionListItems, setWrittenConnectionListItems ] = useState<Array<WrittenData>>([])
	
	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]
	
	useEffect(() => {
		getConnections(
			resourcePath, 
			setUploadedConnectionListItems, 
			setWrittenConnectionListItems,
			uploadedConnectionListItems,
			writtenConnectionListItems)
	}, [ location.pathname])

	const uploadedListItems = uploadedConnectionListItems.map(listItem => (
		<li key={listItem.pk} className='connection-item'><ConnectionItem name={listItem.name} created={listItem.created}/></li>
	))
	const writtenListItems = writtenConnectionListItems.map(listItem => (
		<li key={listItem.pk + '50'} className='connection-item'><ConnectionItem created={listItem.created}/></li>
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