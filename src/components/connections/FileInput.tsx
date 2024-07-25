import { Fragment, useState } from 'react';

export default function FileInput() {
	const [fileInputValue, setFileInputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
    setFileInputValue(event.target.value);
  };

	const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
  };

	return (
		<form className='file-upload-form'>
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
				<Fragment>
					<div className='file-name'>{ fileInputValue }</div>
					<button type='submit' onSubmit={handleSubmit}>Submit</button> 
				</Fragment>
			: null
			}
		</form>
	)
}