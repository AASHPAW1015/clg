import { useContext } from 'react';
import { ThemeContext } from './ContextHook/ThemeContext';

function Navbar() {
  const { theme, ToggleTheme } = useContext(ThemeContext);
  
  return (
    <nav>
      <button onClick={ToggleTheme}>Switch Theme</button>
    </nav>
  );
}

export default Navbar
