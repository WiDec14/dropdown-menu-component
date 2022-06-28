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
            <h2>Dropdown Menu Component</h2>
            <h3>Default</h3>
            <DropdownMenu title="Tag" items={menuItems} />
            <h3>With multi-select</h3>
            <DropdownMenu title="Tag" items={menuItems} isMultiSelect="true" />
        </div>
    );
}

export default App;
