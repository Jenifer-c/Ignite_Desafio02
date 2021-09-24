import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import {  MovieContextProvider } from './contexts/MovieContext';



export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieContextProvider>
        <SideBar />
        <Content />
      </MovieContextProvider>
    </div>
  )
}