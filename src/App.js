import './App.css';
import DropdownMenu from './components/DropdownMenu';

function App() {
    const menuItems = [
        "Sabah Townsend",
        "Daria Ratcliffe",
        "Kaison Goldsmith",
        "Kaira Brandt",
        "Iain Cabrera",
        "Juno Delacruz",
        "Talha Bean",
        "Zeynep Kirby",
        "Maksymilian Spooner",
        "Dwayne Buck",
    ];

    return (
        <div className="app">
            <DropdownMenu items={menuItems} />
        </div>
    );
}

export default App;
