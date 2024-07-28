import axios from "axios"
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function FileInput() {
	const [fileInputValue, setFileInputValue] = useState('')
	const [fileValue, setFileValue] = useState<File | null>(null)
	const [fileNameValue, setFileNameValue] = useState('')

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
    setFileInputValue(event.target.value)
		if (event.target.files) {
			setFileValue(event.target.files[0])
			setFileNameValue(event.target.files[0].name)
		}
  }

	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// Do not submit if there's no file
		if (!fileInputValue || !fileValue) {
			return
		}
		const formData: any = new FormData()
		formData.append('name', fileNameValue)
		formData.append('file', fileValue)
		try {
			await axios.post(
			`http://localhost:8000/api/upload/${resourcePath}/`,
			formData,
			{ headers: {'Content-Type': 'multipart/form-data'}})
		} catch(error) {
			console.error('Error:', error)
		}
		//Reset form after submission
		setFileInputValue('')
		setFileValue(null)
	}

	return (
		<form className='file-upload-form' onSubmit={handleSubmit}>
			<label className='visually-hidden' htmlFor='file-upload'>Upload</label>
			<input
			className='file-upload-input'
			accept='image/*'
			name='file-upload'
			id='file-upload'
			type='file'
			value={fileInputValue}
			onChange={handleInputChange}
			>
			</input>
			{ 
				fileInputValue ? 
					<>
						<div className='file-name'>{fileNameValue}</div>
						<button type='submit'>Submit</button> 
					</>
				: null
			}
		</form>
	)
}
