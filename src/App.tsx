import './App.css';
import HomePage from './components/home/HomePage';
import GuidesPage from './components/connections/guides/GuidesPage';
import LifeLessonsPage from './components/connections/lifeLessons/LifeLessonsPage';
import { Route, Routes } from 'react-router-dom';
import { LegalPage, LovedOnesPage, PersonalInfoPage } from './components/otherPages'
import { LettersHomePage, LetterPage, NewLetterPage } from './components/connections/lettersHome/LettersHomePage';

export default function App() {
  return (
    <div className="App">
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/personal-info' element={<PersonalInfoPage />} />
				<Route path='/loved-ones' element={<LovedOnesPage />} />
				<Route path='/legal' element={<LegalPage />} />

				<Route path='/letters-home' element={<LettersHomePage />}>
					<Route path='new' element={<NewLetterPage />} />
					<Route path=':letterHomeId' element={<LetterPage />} />
				</Route>

				<Route path='/life-lessons' element={<LifeLessonsPage />} />
				<Route path='/guides' element={<GuidesPage />} />

				
				<Route path='*' element={<h1>Page Not Found</h1>} />
			</Routes>
    </div>
  );
}
