import React, { useState } from 'react'
import Layout from '../../components/layout/Layout.comp'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Forms from '../../components/ui/forms/Forms.comp'
import { login } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const Signin = () => {
	//handle the state.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	//handle the hooks.
	const dispatch = useDispatch()
	//handle the form submit.
	const handleFormSubmit = event => {
		event.preventDefault()
		const user = {
			email,
			password,
		}
		console.log(user)
		dispatch(login(user))
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '55px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={handleFormSubmit}>
							<Forms
								type='email'
								label='email'
								placeholder='enter email'
								onChange={event => setEmail(event.target.value)}
								value={email}
							/>

							<Forms
								type='password'
								label='password'
								placeholder='enter password'
								value={password}
								onChange={event => setPassword(event.target.value)}
							/>

							<Button variant='primary' type='submit'>
								Sign In
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signin
