import { waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render } from '../../utils/test'

import Freelances from '.'
// import { ThemeProvider } from '../../utils/context'

const freelancersMockedData = [
	{
			name: 'Harry Potter',
			job: 'Magicien frontend',
			picture: '',
	},
	{
			name: 'Hermione Granger',
			job: 'Magicienne fullstack',
			picture: '',
	},
]

const server = setupServer(
	// On précise ici l'url qu'il faudra "intercepter"
	rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
		// là on va pouvoir passer les datas mockées dans ce qui est retourné en json
		return res(ctx.json({ freelancersList: freelancersMockedData}))
	})
)

// On active la simulation d'APi avant les tests depuis server
beforeAll(() => server.listen())
// On réinitialise tout ce qu'on aurait pu ajouter eb termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// On ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display freelancers names', async () => {
	// render(
	// 	<ThemeProvider>
	// 		<Freelances />
	// 	</ThemeProvider>
	// )
	render(<Freelances />)
	// expect(screen.getByTestId('loader')).toBeTruthy()
	await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
	await waitFor(() => {
		expect(screen.getByText('Harry Potter')).toBeTruthy()
		expect(screen.getByText('Hermione Granger')).toBeTruthy()
	})
})

it("Should display error content", async () => {
	server.use(
		rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({
					errorMessage: 'Oups une erreur est survenue dans l\'API',
				})
			)
		})
	)
	render(<Freelances />)
	await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
	expect(screen.getByTestId('error')).toMatchInlineSnapshot()
}) 