import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function SomeComponent() {
  const { theme, ToggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={ToggleTheme}>Toggle Theme</button>
    </div>
  );
}
