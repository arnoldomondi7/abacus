import React from 'react'
import Layout from '../../components/layout/Layout.comp'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Forms from '../../components/ui/forms/Forms.comp'

const Signin = () => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '55px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Forms
								type='email'
								label='email'
								placeholder='enter email'
								onChange={() => {}}
								value=''
							/>

							<Forms
								type='password'
								label='password'
								placeholder='enter password'
								onChange={() => {}}
								value=''
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
