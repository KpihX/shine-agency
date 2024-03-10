import { ThemeContext } from "../../utils/context";

function Wrapper({ children}) {
    return <ThemeContext>{children}</ThemeContext>
}

export default Wrapper