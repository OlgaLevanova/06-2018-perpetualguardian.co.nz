const FormValidate = {
    bindEvents: () => {
        const forms = document.getElementsByClassName('sib-form');
        if (forms.length) {
            FormValidate.init(forms);
        }
    },

    init: (forms) => {

        for (let i = 0; i < forms.length; i++) {
            let form = forms[i];
            form.addEventListener('submit', (e) => {
                let formSuccess = true;
                let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                let dateReg = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
                let submitButton = form.getElementsByClassName('sib-form__button')[0];
                let requiredFields = form.getElementsByClassName('required');
                // clear previous errors.
                FormValidate.clearErrors(form);
                // temporarily disable form buttons
                submitButton.disabled = true;

                for (let i = 0; i < requiredFields.length; i++) {
                    let field = requiredFields[i];
                    let hasError = false;
                    if (field.classList.contains('required-email') && !emailReg.test(field.value)) {
                        hasError = true;
                    } else if (field.classList.contains('required-recaptcha')) {
                       let widgetToken = ''
                        if(field.id === '_recaptcha-contact'){
                            widgetToken = window.recaptchaWidgets.widgetContact;
                        }
                        if (grecaptcha && grecaptcha.getResponse(widgetToken) === '') {
                            hasError = true;
                        }
                    } else if (field.classList.contains('required-date') && !dateReg.test(field.value)) {
                        hasError = true;
                    } else if (field.value === '') {
                        hasError = true;
                    }
                    if (hasError) {
                        field.parentElement.classList.add('sib-form-error');
                    }
                    formSuccess = formSuccess ? !hasError : formSuccess;
                }
                // if validation fails
                if (!formSuccess) {
                    e.preventDefault();
                    let firstError = form.getElementsByClassName('sib-form-error')[0];
                    if (firstError) {
                        firstError.getElementsByClassName('required')[0].focus();
                    }
                    submitButton.disabled = false;
                } else {
                    submitButton.classList.add('submitting');
                }
            });
        }
    },

    /**
     * clear-out existing errors for the given form
     * @param form
     */
    clearErrors: (form) => {
        let errorFields = form.getElementsByClassName('sib-form-group');
        for (let i = 0; i < errorFields.length; i++) {
            errorFields[i].classList.remove('sib-form-error');
        }
    },
};

module.exports = FormValidate;
