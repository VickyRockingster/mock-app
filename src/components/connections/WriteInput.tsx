import axios from "axios";
import React from 'react';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useLocation } from 'react-router-dom';
import useSWR from "swr";

const handlePost = async (resourcePath: any, writeInputValue: any) => {
	// event.preventDefault();

	const formData: any = new FormData();
	formData.append('text', writeInputValue);
	try {
		const response = await axios.post(
		`http://localhost:8000/api/write/${resourcePath}/`,
		formData,
		{ headers: {'Content-Type': 'multipart/form-data'}})

		console.log('From WriteInput:', response);
		console.log('From WriteInput:', response.data);

	} catch(error) {
		console.error('Error:', error)
	}
}

export default function WriteInput() {
	const [writeInputValue, setWriteInputValue] = useState('');

	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]

	// console.log('writeInputValue: ', writeInputValue)

	const handlePost = async (resourcePath: any, writeInputValue: any) => {
		// event.preventDefault();
	
		const formData: any = new FormData();
		formData.append('text', writeInputValue);
		try {
			const response = await axios.post(
			`http://localhost:8000/api/write/${resourcePath}/`,
			formData,
			{ headers: {'Content-Type': 'multipart/form-data'}})
	
			console.log('From WriteInput:', response);
			console.log('From WriteInput:', response.data);
	
		} catch(error) {
			console.error('Error:', error)
		}
	}

	const handleSubmit = useSWR(resourcePath, handlePost)

	return (
		<form className='form'>
			<label className='visually-hidden' htmlFor=''>Write a new</label>
			<Editor
      	apiKey='vmxaq2auufsx6jd67q4805hs7nrm5k1txn1urkhvi4cemd6g'
				licenseKey='gpl'
      	init={{
        	plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        	toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        	tinycomments_mode: 'embedded',
        	tinycomments_author: 'Author name',
        	mergetags_list: [
       	 	  { value: 'First.Name', title: 'First Name' },
        	  { value: 'Email', title: 'Email' },
        	],
        	ai_request: (request: any, respondWith: { string: (arg0: () => Promise<never>) => any; }) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      	}}
				value={ writeInputValue }
      	onEditorChange={(newValue) => setWriteInputValue(newValue)}
				textareaName='description'
    	/>
			<button type='submit' onSubmit={handleSubmit}>Submit</button> 
		</form>
	)
}