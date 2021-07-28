import React from 'react';
import Button, {ButtonType,ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button disabled>default</Button>
        <Button onClick={() => alert(111)}>default</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>primary</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">Baidu Link</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Menu>
          <MenuItem>menu0</MenuItem>
          <MenuItem>menu1</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
