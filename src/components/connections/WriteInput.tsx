import axios from "axios"
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function WriteInput() {
	const [writeInputValue, setWriteInputValue] = useState('')

	const location = useLocation()
	const resourcePath = location.pathname.split('/')[1]

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		// Do not submit if there's only white space
		if (writeInputValue.trim().length === 0) {
			return
		}
		const formData: any = new FormData()
		formData.append('text', writeInputValue)
		try {
			await axios.post(
			`https://vrockingster.pythonanywhere.com/api/write/${resourcePath}/`,
			formData,
			{ headers: {'Content-Type': 'multipart/form-data'}})
		} catch(error) {
			console.error('Error:', error)
		}
		//Reset form after submission
		setWriteInputValue('')
	}

	return (
		<form className='form' onSubmit={handleSubmit}>
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
        	ai_request: (request: any, respondWith: { string: (arg0: () => Promise<never>) => any }) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      	}}
				value={writeInputValue}
      	onEditorChange={(newValue) => setWriteInputValue(newValue)}
				textareaName='text'
    	/>
			<button type='submit'>Submit</button> 
		</form>
	)
}
