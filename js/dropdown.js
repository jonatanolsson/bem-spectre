import {getNearestParentWithSelector} from "../../js/generic";

const acceptedFocusableItems = ['a', 'input', 'button', ' [tabindex]:not([tabindex="-1"]', 'textarea', 'select'];

document.addEventListener("DOMContentLoaded", (event) => {
    const dropdowns = document.querySelectorAll('.dropdown');

    for (const dropdown of dropdowns) {
        const dropdownStateOpen = () => (dropdown.classList.contains('dropdown--active') || dropdown.getAttribute('aria-expanded') === 'true');
        const toggle = dropdown.querySelector('.dropdown__toggle');

        const setDropDownExpanded = (expand) => {
            dropdown.classList.toggle('dropdown--active', expand)
            toggle.setAttribute('aria-expanded', expand)
        }

        const toggleEventHandler = () => {
            setDropDownExpanded(!dropdownStateOpen())
        }

        toggle.addEventListener('click', toggleEventHandler)

        toggle.addEventListener('keydown', (event) => {
            const lcKey = event.key.toLowerCase();

            if (!/tab/.test(lcKey)) {
                event.preventDefault()
            }

            if (!/enter|\s|arrowdown/.test(lcKey)) {
                return;
            }

            toggleEventHandler(event)
        })

        dropdown.addEventListener('keydown', (event) => {
            const currentMenuItem = getNearestParentWithSelector(document.activeElement, '.menu__item');

            switch (event.key.toLowerCase()) {
                case 'escape':
                    if (dropdownStateOpen()) {
                        setDropDownExpanded(false)
                    }
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    // when inside the menu step between the items
                    if (currentMenuItem && currentMenuItem?.nextSibling) {
                        let nextSibling = currentMenuItem.nextSibling;

                        while (nextSibling && !nextSibling.querySelector(acceptedFocusableItems.join(', '))) {
                            nextSibling = nextSibling.nextSibling;
                        }

                        if (nextSibling) {
                            nextSibling.querySelector(acceptedFocusableItems.join(', '))?.focus()
                        }
                    } else {
                        // when on toggle, focus on first item in list when pressing arrow down
                        if (document.activeElement.classList.contains('dropdown__toggle')) { // use aria-expanded?
                            dropdown.querySelector(`.menu__item ${acceptedFocusableItems.join(', .menu__item ')}`)?.focus()
                        }
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();

                    if (currentMenuItem && currentMenuItem?.previousSibling) {
                        let previousSibling = currentMenuItem.previousSibling;

                        while (previousSibling && !previousSibling.querySelector(acceptedFocusableItems.join(', '))) {
                            previousSibling = previousSibling.previousSibling;
                        }

                        if (previousSibling) {
                            previousSibling.querySelector(acceptedFocusableItems.join(', '))?.focus()
                        }
                    }

                    break;
            }

        })

        dropdown.addEventListener('focusout', (event) => {
            if (!dropdown.contains(event.relatedTarget) || dropdownStateOpen() && (!event.relatedTarget || (event.relatedTarget.classList.contains('dropdown__toggle') && event.relatedTarget !== toggle))) {
                setDropDownExpanded(false)
            }
        })
    }
});
