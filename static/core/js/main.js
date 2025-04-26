document.addEventListener('DOMContentLoaded', function() {
    // Handle dynamic formset for order items
    const itemFormset = document.querySelector('#item-formset');
    const addItemBtn = document.querySelector('#add-item-btn');
    
    if (addItemBtn && itemFormset) {
        const totalFormsInput = document.querySelector('[name="items-TOTAL_FORMS"]');
        const formCount = parseInt(totalFormsInput.value);
        
        // Add new form
        addItemBtn.addEventListener('click', function() {
            const newFormCount = parseInt(totalFormsInput.value);
            const formTemplate = itemFormset.querySelector('.item-form').cloneNode(true);
            
            // Update form IDs and names
            const formRegex = new RegExp(`items-(\\d+)-`, 'g');
            formTemplate.innerHTML = formTemplate.innerHTML.replace(formRegex, `items-${newFormCount}-`);
            
            // Clear input values
            formTemplate.querySelectorAll('input, select, textarea').forEach(input => {
                if (input.type !== 'hidden' || !input.name.includes('id')) {
                    input.value = '';
                }
            });
            
            // Add the new form
            itemFormset.appendChild(formTemplate);
            totalFormsInput.value = newFormCount + 1;
            
            // Add remove event listener to the new form
            addRemoveButtonListeners();
        });
        
        // Remove form
        function addRemoveButtonListeners() {
            document.querySelectorAll('.remove-form').forEach(button => {
                button.addEventListener('click', function() {
                    const form = this.closest('.item-form');
                    
                    // Don't remove if it's the only form
                    if (itemFormset.querySelectorAll('.item-form').length > 1) {
                        form.remove();
                        
                        // Update form count
                        totalFormsInput.value = parseInt(totalFormsInput.value) - 1;
                        
                        // Renumber forms
                        updateFormIndices();
                    } else {
                        // Just clear it
                        form.querySelectorAll('input, select, textarea').forEach(input => {
                            if (input.type !== 'hidden' || !input.name.includes('id')) {
                                input.value = '';
                            }
                        });
                    }
                });
            });
        }
        
        function updateFormIndices() {
            const forms = itemFormset.querySelectorAll('.item-form');
            forms.forEach((form, index) => {
                const formRegex = new RegExp(`items-(\\d+)-`, 'g');
                form.innerHTML = form.innerHTML.replace(formRegex, `items-${index}-`);
            });
        }
        
        // Initialize remove buttons
        addRemoveButtonListeners();
    }
    
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeBtn = alert.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.click();
            }
        }, 5000);
    });
});