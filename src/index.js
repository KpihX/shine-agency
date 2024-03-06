import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/'
import Survey from './pages/Survey'
import Header from './components/Header/'
import ClientForm from './components/ClientForm'
import FreelanceForm from './components/FreelanceForm'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />}>
        	<Route path="client" element={<ClientForm />} />
			<Route path="freelance" element={<FreelanceForm />} />	
		</Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)