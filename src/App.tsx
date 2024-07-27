import './App.css';
import HomePage from './components/home/HomePage';
import { GuidesPage, NewGuidePage} from './components/connections/guides/GuidesPage';
import { LegalPage, LovedOnesPage, PersonalInfoPage } from './components/otherPages'
import { LettersHomePage, NewLetterPage } from './components/connections/lettersHome/LettersHomePage';
import { LifeLessonsPage, NewLifeLessonPage } from './components/connections/lifeLessons/LifeLessonsPage';
import { Route, Routes } from 'react-router-dom';

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
				</Route>

				<Route path='/life-lessons' element={<LifeLessonsPage />}>
					<Route path='new' element={<NewLifeLessonPage />} />
				</Route>

				<Route path='/guides' element={<GuidesPage />}>
					<Route path='new' element={<NewGuidePage />} />
				</Route>

				<Route path='*' element={<h1>Page Not Found</h1>} />
			</Routes>
    </div>
  );
}
