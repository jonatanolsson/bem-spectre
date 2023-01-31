export const getNearestParentWithSelector = (currentElement, selector) => {
    let parentElement = currentElement;

    while (parentElement && !parentElement?.matches(selector)) {
        parentElement = parentElement.parentElement;
    }

    return parentElement?.matches(selector) ? parentElement : null
}
