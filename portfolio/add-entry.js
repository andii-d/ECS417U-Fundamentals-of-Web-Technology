// add-entry.js
// Handles the Add Entry form interactions required by the coursework spec:
// 1) Ask for confirmation before clearing form content.
// 2) Prevent submit if title/post fields are blank and visually highlight them.

const entryForm = document.getElementById("entry-form");
const clearButton = document.getElementById("entry-clear-button");
const titleInput = document.getElementById("entry-title-input");
const bodyInput = document.getElementById("entry-body");

if (entryForm && clearButton && titleInput && bodyInput) {
    const guardedFields = [titleInput, bodyInput];

    const setFieldErrorState = (field, hasError) => {
        field.classList.toggle("field-error", hasError);
        field.setAttribute("aria-invalid", hasError ? "true" : "false");
    };

    const clearErrorStates = () => {
        guardedFields.forEach((field) => {
            setFieldErrorState(field, false);
        });
    };

    clearButton.addEventListener("click", () => {
        const shouldClear = window.confirm(
            "Clear all entered text in this post form?"
        );

        if (shouldClear) {
            entryForm.reset();
            clearErrorStates();
        }
    });

    entryForm.addEventListener("submit", (event) => {
        let hasMissingRequiredText = false;

        guardedFields.forEach((field) => {
            const isMissing = field.value.trim().length === 0;
            setFieldErrorState(field, isMissing);

            if (isMissing) {
                hasMissingRequiredText = true;
            }
        });

        if (hasMissingRequiredText) {
            event.preventDefault();
            guardedFields.find((field) => field.classList.contains("field-error"))?.focus();
        }
    });

    guardedFields.forEach((field) => {
        field.addEventListener("input", () => {
            if (field.value.trim().length > 0) {
                setFieldErrorState(field, false);
            }
        });
    });
}
