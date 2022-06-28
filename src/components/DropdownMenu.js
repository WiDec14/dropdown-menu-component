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

    const changeAllTo = (isSelected) => {
        let newComputedItems = [...computedItems];
        newComputedItems.map(item => item.isSelected = isSelected);
        setComputedItems(newComputedItems);
    }

    const selectedOptions = () => {
        return computedItems.reduce((res, item) => {
            if (item.isSelected) {
                res.push(item.value);
            }
            return res;
        }, []);
    };

    return (
        <div className="dropdown-container">
            <div className="selected-options" onClick={() => {setShowDropdown(!showDropdown)}}>
                {selectedOptions().length > 0 ? selectedOptions().join(", ") : "Select an item..."}
            </div>
            {
                showDropdown &&
                <>
                    {
                        selectedOptions().length > 0 &&
                        <div onClick={() => {changeAllTo(false)}}><i>None</i></div>
                    }
                    {
                        selectedOptions().length < computedItems.length &&
                        <div onClick={() => {changeAllTo(true)}}><i>All</i></div>
                    }
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