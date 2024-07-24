import MainTemplate from './MainTemplate';

export function PersonalInfoPage() {

	return (
		<MainTemplate title='Personal Info'>
			<div>User Name</div>
			<div>Birthday</div>
		</MainTemplate>
	)
}

export function LovedOnesPage() {
	const lovedOnes = [
		{
			name: 'Loved One 1',
			email: 'email1@email.com',
			mobile: '123-456-7890',
		},
		{
			name: 'Loved One 2',
			email: 'email2@email.com',
			mobile: '123-456-7891',
		},
		{
			name: 'Loved One 3',
			email: 'email3@email.com',
			mobile: '123-456-7892',
		},
		{
			name: 'Loved One 4',
			email: 'email4@email.com',
			mobile: '123-456-7893',
		},
	]

	return (
		<MainTemplate title='Loved Ones'>
			<ul>
				{lovedOnes.map((person, i) =>
					<li key={i}>
						<div>{person.name}</div>
						<div>{person.email}</div>
						<div>{person.mobile}</div>
					</li>
				)}
			</ul>
		</MainTemplate>
	)
}

export function LegalPage() {
	
	return (
		<MainTemplate title='Legal Page'>
			<div>This is the legal page</div>
		</MainTemplate>
	)
}