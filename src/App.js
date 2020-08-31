import React from 'react';
import './App.css';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// create Atom that takes in an object with default value
const usernameState = atom({
  key: "username",
  default: "Red"
})


// selector will take character length from Atom
// key needs to be unique
// get is a function that takes in another function called 'get' which gives you access to all the atoms
const countState = selector({
  key: "count",
  get: ({ get }) => {
    const username = get(usernameState);
    return username.length;
  }
})



function App() {
  // make sure to wrap Nav and Boy in <RecoilRoot> instead of <div>
  return (
    <RecoilRoot className="App">
      <Nav />
      <Body />
    </RecoilRoot>
  );
}

function Nav() {
  return (
    <div className="nav">

    </div>
  );
}

function Body() {
  return (
    <div className="body">
      <Profile />
      <Count />
    </div>
  );
}

function Profile() {
  // without Recoil
  // const [username, setUsername] = useState('Red');
  const [username, setUsername] = useRecoilState(usernameState);
  return (
    <div className="profile">
      <h2>Profile: </h2>
      <p>{username}</p>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
    </div>
  );
}

function Count() {
  const count = useRecoilValue(countState);
  return (
    <div className="count">
      <p>Count: {count}</p>
    </div>
  );
}

export default App;
