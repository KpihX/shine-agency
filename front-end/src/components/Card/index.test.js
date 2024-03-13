import Card from '.'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Card component', () => {
    it('should render title and image', async () => {
        render(
            <ThemeProvider>
                <Card
                    label="Magician frontend"
                    title="Harry Potter"
                    picture="/myPicture.png"
                />
            </ThemeProvider>
        )
        const cardPicture = screen.getByRole('img')
        const cardTitle = screen.getByText(/Harry/i)
        expect(cardPicture.src).toBe('http://localhost/myPicture.png')
        expect(cardTitle.textContent).toBe('Harry Potter')
    })
    it('should add ⭐️ around title', async () => {
        render(
            <ThemeProvider>
                <Card
                    label="Magician frontend"
                    title="Harry Potter"
                    picture="/myPicture.png"
                />
            </ThemeProvider>
        )
        const cardTitle = screen.getByText(/Harry/i)
        const parentNode = cardTitle.closest('div')
        fireEvent.click(parentNode)
        expect(cardTitle.textContent).toBe('⭐️Harry Potter⭐️')
    })
})
