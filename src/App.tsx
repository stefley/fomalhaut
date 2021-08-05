import React, { useState } from 'react';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import { CSSTransition } from 'react-transition-group'
import { AutoComplate } from './components/AutoComplete/autoComplete';

function App() {
  
const data = ["apple", "banale", "pear", "coat", "shirt", "paint"]
const handleFetch = (str: string) => {
    return data.filter(name => name.includes(str))
}
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="bug" size="2x" theme="primary" />
        <Button disabled>Hello</Button>
        <Button disabled>default</Button>
        <Button onClick={() => alert(111)}>default</Button>
        <Button btnType="primary" size="lg">primary</Button>
        <Button btnType="link" href="www.baidu.com">Baidu Link</Button>
        <Button btnType="danger" size="sm">Small Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Menu >
          <MenuItem index={"0"}>menu0</MenuItem>
          <MenuItem index={"1"}>menu1</MenuItem>
          <MenuItem index={"2"} disabled>menu2</MenuItem>
          <SubMenu title="dropdown">
              <MenuItem>
                dropdown1
              </MenuItem>
              <MenuItem>
                dropdown2
              </MenuItem>
          </SubMenu>
        </Menu>
        <Button size="lg" onClick={() => setShow(!show)}> Toggle </Button>
        <CSSTransition in={show} timeout={300} appear unmountOnExit classNames="zoom-in-top">
            <div style={{width: '100px', height: '100px', background: 'red'}}></div>
        </CSSTransition>
        <Transition in={show} timeout={300} animation="zoom-in-top">
            <div style={{width: '100px', height: '100px', background: 'red'}}></div>
        </Transition>
        <AutoComplate value="v" fetchSuggestions={handleFetch}/>
      </header>
    </div>
  );
}

export default App;
