import { useState } from 'react';

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
		<form>
			<label htmlFor='file-upload'>Upload</label>
			<input
			accept='image/*'
			name='file-upload'
			id='file-upload'
			type='file'
			value={fileInputValue}
			onChange={handleInputChange}
			>
			</input>
			<button type='submit' onSubmit={handleSubmit}>Submit</button>
		</form>
	)
}