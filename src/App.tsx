import './App.css';
import NewsBlock from './components/NewsBlock/NewsBlock';

function App() {
  return (
      <div className="app-container">
        <NewsBlock
            title="Новости компании"
            mode="short"
            displayImages="all"
        />
        <NewsBlock
            title="Рубрика Бизнес"
            mode="short"
            displayImages="first"
        />
        <NewsBlock
            title="Пустая рубрика"
            mode="empty"
            displayImages="all"
        />
      </div>
  )
}

export default App;