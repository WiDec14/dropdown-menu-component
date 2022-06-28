import './DropdownMenu.css';
import { useEffect, useRef, useState } from 'react';

const DropdownMenu = ({ title, items, isMultiSelect }) => {    
    const [showDropdown, setShowDropdown] = useState(false);
    const [computedItems, setComputedItems] = useState(
        items.map((item, index) => {
            return { id: index, value: item, isSelected: false }
        })
    );
    const buttonRef = useRef(null);

    const onOptionSelect = (id) => {
        if (!isMultiSelect) changeAllTo(false);

        let newComputedItems = [...computedItems];
        newComputedItems[id].isSelected = !newComputedItems[id].isSelected;
        setComputedItems(newComputedItems);

        if (!isMultiSelect) setShowDropdown(false);
    };

    const changeAllTo = (isSelected) => {
        let newComputedItems = [...computedItems];
        newComputedItems.map(item => item.isSelected = isSelected);
        setComputedItems(newComputedItems);

        if (!isMultiSelect) setShowDropdown(false);
    }

    const selectedOptions = () => {
        return computedItems.reduce((res, item) => {
            if (item.isSelected) {
                res.push(item.value);
            }
            return res;
        }, []);
    };

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            const handleClickOutsidePopover = (event) => {
                if (ref.current && !ref.current.contains(event.target) && event.target !== buttonRef.current) {
                    setShowDropdown(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutsidePopover);
            return () => {
                document.removeEventListener("mousedown", handleClickOutsidePopover);
            };
        }, [ref]);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="dropdown-container">
            <div className="title">{title}</div>
            <div
                ref={buttonRef}
                className="selected-options"
                title={selectedOptions().length > 0 ? selectedOptions().join(", ") : "Select an item..."}
                onClick={() => {setShowDropdown(!showDropdown)}}
            >
                {selectedOptions().length > 0 ? selectedOptions().join(", ") : "Select an item..."}
            </div>
            {
                showDropdown &&
                <div ref={wrapperRef} className="dropdown-options-container">
                    {
                        selectedOptions().length > 0 &&
                        <div className="dropdown-option" onClick={() => {changeAllTo(false)}}><i>None</i></div>
                    }
                    {
                        isMultiSelect && selectedOptions().length < computedItems.length &&
                        <div className="dropdown-option" onClick={() => {changeAllTo(true)}}><i>All</i></div>
                    }
                    {
                        computedItems.map(item => (
                            <div
                                className={`dropdown-option ${item.isSelected ? 'dropdown-option-selected' : ''}`}
                                key={item.id}
                                onClick={() => {onOptionSelect(item.id)}}
                            >
                                {isMultiSelect && <input type="checkbox" className="checkbox" readOnly checked={item.isSelected} />}
                                {item.value}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default DropdownMenu;