import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function FileInput() {
	const [fileInputValue, setFileInputValue] = useState('');
	const [fileValue, setFileValue] = useState<File | null>(null);

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		console.log('event.target.value from file upload:', event.target.value)
		console.log('event.target.files from file upload:', event.target.files)
    setFileInputValue(event.target.value);
		if (event.target.files) {
			setFileValue(event.target.files[0])
		}
  };

	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]
	// console.log('fileInputValue from file upload:', fileInputValue)
	function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
		event.preventDefault();

		const formData: any = new FormData();
		formData.append('name', fileInputValue);
		formData.append('file', fileValue);
		console.log('formData from submit file:', formData)

		fetch(`http://localhost:8000/api/upload/${resourcePath}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: formData,
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(writtenData => console.log('file Data from POST:', writtenData))
			.catch(error => console.error('Error:', error));
	}

	return (
		<form className='file-upload-form'>
			<label className='visually-hidden' htmlFor='file-upload'>Upload</label>
			<input
			className='file-upload-input'
			accept='image/*'
			name='file-upload'
			id='file-upload'
			type='file'
			value={ fileInputValue }
			onChange={handleInputChange}
			>
			</input>
			{ 
			fileInputValue ? 
				<Fragment>
					<div className='file-name'>{ fileInputValue }</div>
					<button type='submit' onSubmit={handleSubmit}>Submit</button> 
				</Fragment>
			: null
			}
		</form>
	)
}