import React from 'react'
import Layout from '../../components/layout/Layout.comp'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Forms from '../../components/ui/forms/Forms.comp'

const Signup = () => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '55px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Row>
								<Col md={6}>
									<Forms
										type='text'
										label='firstname'
										placeholder='enter lastname'
										onChange={() => {}}
										value=''
									/>
								</Col>
								<Col md={6}>
									<Forms
										type='text'
										label='lastname'
										placeholder='enter lastname'
										onChange={() => {}}
										value=''
									/>
								</Col>
							</Row>
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
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signup
