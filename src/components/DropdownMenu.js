import './DropdownMenu.css';
import { useState } from 'react';

const DropdownMenu = ({ items, isMultiSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [computedItems, setComputedItems] = useState(
        items.map((item, index) => {
            return { id: index, value: item, isSelected: false }
        })
    );

    const onOptionSelect = (id) => {
        let newComputedItems = [...computedItems];
        newComputedItems[id].isSelected = !newComputedItems[id].isSelected;
        setComputedItems(newComputedItems);
    };

    const selectedOptionsDisplay = () => {
        const selectedOptions = computedItems.reduce((res, item) => {
            if (item.isSelected) {
                res.push(item.value);
            }
            return res;
        }, []);

        return selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select an item...";
    };

    return (
        <div className="dropdown-container">
            <div className="selected-options" onClick={() => {setShowDropdown(!showDropdown)}}>
                {selectedOptionsDisplay()}
            </div>
            {
                showDropdown &&
                <>
                    {
                        computedItems.map(item => (
                            <div key={item.id} onClick={() => {onOptionSelect(item.id)}}>
                                {item.value}
                            </div>
                        ))
                    }
                </>
            }
        </div>
    );
}

export default DropdownMenu;