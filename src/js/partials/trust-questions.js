import noUiSlider from 'nouislider';

const TrustQuestions = {
    trustQuestionsContainer: null,
    questionSliderContainer: null,
    trustQuestionsCounter: null,
    trustQuestionsNext: null,
    trustQuestionsItems: null,
    trustQuestionsInfo: null,
    questionSlider: null,
    questionsMore: null,
    counterTitle: null,
    submitButton:null,
    infoTitle: null,
    inputs: null,
    form: null,
    formInner: null,
    thanks: null,
    validFields: true,
    activeInputValue: '',
    questionMainCounter: 0, // Counter for main questions with slider. We need this one to know which question with slider to show
    questionAllCounter: 0, // Counter for all questions
    classOpen: 'open-js',
    classClose: 'close-js',
    classError: 'sib-form-error',
    classNotAvailable: 'not-available-js',
    questionFormats: {
        '0':'No',
        '50':'Unsure',
        '100':'Yes'
    },
    questionsInfo:{
        'name': false,
        'location': false,
        'number': false
    },
    questionsInfoTitle:{
        'name': 'Your details',
        'location': 'Your location',
        'number': 'Contact details'
    },
    questionResult: 'good',
    init: () => {

        // Set all variables
        TrustQuestions.setVars();

        // Init
        if (TrustQuestions.trustQuestionsContainer) {

            if (window.location.hash === '#thanks') {
                TrustQuestions.showContent('thanks');
            } else {
                TrustQuestions.showContent('form');

                TrustQuestions.initQuestions();

                TrustQuestions.bindEvents();

                TrustQuestions.sliderInit();
            }
        }
    },
    setVars: () => {
        TrustQuestions.trustQuestionsContainer = document.getElementsByClassName('sib-trust-questions-block')[0];

        if (TrustQuestions.trustQuestionsContainer) {
            TrustQuestions.trustQuestionsCounter = document.getElementsByClassName('sib-trust-questions-block__counter')[0];
            TrustQuestions.trustQuestionsNext = TrustQuestions.trustQuestionsContainer.getElementsByClassName('faq__more__link')[0];
            TrustQuestions.trustQuestionsItems = TrustQuestions.trustQuestionsContainer.getElementsByClassName('sib-trust-questions-block__item');
            TrustQuestions.trustQuestionsInfo = TrustQuestions.trustQuestionsContainer.getElementsByClassName('sib-trust-questions-block__info');
            TrustQuestions.questionSlider = document.getElementsByClassName('sib-trust-questions-block__slider')[0];
            TrustQuestions.questionSliderContainer = document.getElementsByClassName('sib-trust-questions-block__slider-container')[0];
            TrustQuestions.questionsMore = TrustQuestions.trustQuestionsContainer.getElementsByClassName('faq__more')[0];
            TrustQuestions.counterTitle = document.getElementsByClassName('sib-trust-questions-block__counter-title')[0];
            TrustQuestions.infoTitle = document.getElementsByClassName('sib-trust-questions-block__info-title')[0];
            TrustQuestions.submitButton = document.getElementsByClassName('sib-form__button')[0];
            TrustQuestions.inputs = document.getElementsByClassName('sib-form__input-text');
            TrustQuestions.form = document.getElementById('sib-trust-questions-block__form');
            TrustQuestions.formInner = document.getElementsByClassName('sib-trust-questions-block__form')[0];
            TrustQuestions.thanks = document.getElementById('sib-trust-questions-block__thanks');
        }
    },
    initQuestions: () => {
        TrustQuestions.trustQuestionsItems[0].classList.add(TrustQuestions.classOpen);
    },
    bindEvents: () => {
        // Click on Next button
        TrustQuestions.trustQuestionsNext.addEventListener('click', () => {

            // if user answered on main question - update activeInputValue
            let activeQuestion = TrustQuestions.getActiveQuestion(TrustQuestions.trustQuestionsItems);
            if (activeQuestion) {
                TrustQuestions.activeInputValue = activeQuestion.querySelector('input').value;
            } else {
                // If it's info questions - validate fields
                TrustQuestions.validateFields();
            }

            if (TrustQuestions.validFields) {

                // Increase questionAllCounter counter
                TrustQuestions.updateCounter();

                // If user answer 'unsure' or 'no' on any question QUIZ says that user's Trust is bad
                if (TrustQuestions.activeInputValue === 'unsure' || TrustQuestions.activeInputValue === 'no') TrustQuestions.questionResult = 'bad';

                // If user answer 'unsure' or 'no' first time - show question about name and email
                if ((TrustQuestions.activeInputValue === 'unsure' || TrustQuestions.activeInputValue === 'no') && !TrustQuestions.questionsInfo.name) {
                    TrustQuestions.questionsInfo.name = true;
                    TrustQuestions.infoQuestion('name');
                    // After first question ask about user's location
                } else if (TrustQuestions.questionMainCounter === 0 && !TrustQuestions.questionsInfo.location) {
                    TrustQuestions.questionsInfo.location = true;
                    TrustQuestions.infoQuestion('location');
                    // if it's end of form and user didn't answer about name - ask Name
                } else if (TrustQuestions.trustQuestionsItems.length === TrustQuestions.questionMainCounter + 1 && !TrustQuestions.questionsInfo.name) {
                    TrustQuestions.questionsInfo.name = true;
                    TrustQuestions.infoQuestion('name');
                    // if it's end of form and user didn't answer about number - ask Number
                } else if (TrustQuestions.trustQuestionsItems.length === TrustQuestions.questionMainCounter + 1 && !TrustQuestions.questionsInfo.number) {
                    TrustQuestions.questionsInfo.number = true;
                    TrustQuestions.infoQuestion('number');
                    // In any other cases - ask main questions
                } else {
                    TrustQuestions.nextQuestion();
                }
            }
        });

        // Focus on input - remove error class
        for (let i = 0; i < TrustQuestions.inputs.length; i++) {
            TrustQuestions.inputs[i].addEventListener('focus', (e) => {
                e.target.closest('div').classList.remove(TrustQuestions.classError);
            });
        }

        // Click on submit button
        // Make content unavailable and show spinner
        TrustQuestions.submitButton.addEventListener('click', () => {
            TrustQuestions.validateFields();

            if (TrustQuestions.validFields) {
                TrustQuestions.showSpinner();
                TrustQuestions.trustQuestionsContainer.querySelector('form').submit();
            }
        });
    },
    nextQuestion: () => {
        // Increase counter
        TrustQuestions.questionMainCounter++;

        // Check if we need to hide info question block
        let infoQuestionBlock = null;
        for (let i = 0; i < TrustQuestions.trustQuestionsInfo.length; i++) {
            if (TrustQuestions.trustQuestionsInfo[i].classList.contains(TrustQuestions.classOpen)) infoQuestionBlock = TrustQuestions.trustQuestionsInfo[i];
        }
        // if info question block is visible - hide it
        if (infoQuestionBlock) {
            infoQuestionBlock.classList.remove(TrustQuestions.classOpen);
        // Hide prev question
        } else if (TrustQuestions.questionMainCounter > 0) {
            TrustQuestions.trustQuestionsItems[TrustQuestions.questionMainCounter - 1].classList.remove(TrustQuestions.classOpen);
        }

        // Change title
        TrustQuestions.toggleTitles('counter');

        // Show slider
        TrustQuestions.toggleSlider('show');

        // Show next question
        TrustQuestions.trustQuestionsItems[TrustQuestions.questionMainCounter].classList.add(TrustQuestions.classOpen);

        // Set slider value to default
        TrustQuestions.sliderSetToDefault();
    },
    infoQuestion: (type) => {
        // Find information question block we need to show
        let infoQuestionBlock = TrustQuestions.trustQuestionsInfo[0];
        for (let i = 0; i < TrustQuestions.trustQuestionsInfo.length; i++) {
            if (TrustQuestions.trustQuestionsInfo[i].classList.contains(`sib-trust-questions-block__${type}`)) infoQuestionBlock = TrustQuestions.trustQuestionsInfo[i];
        }

        // Change title
        TrustQuestions.toggleTitles('info', type);

        // Hide active main question
        let activeQuestion = TrustQuestions.getActiveQuestion(TrustQuestions.trustQuestionsItems);
        if (activeQuestion) {
            activeQuestion.classList.remove(TrustQuestions.classOpen);
        }

        // Hide slider
        TrustQuestions.toggleSlider('hide');

        // Hide active info question
        let activeInfoQuestion = TrustQuestions.getActiveQuestion(TrustQuestions.trustQuestionsInfo);
        if (activeInfoQuestion) {
            activeInfoQuestion.classList.remove(TrustQuestions.classOpen);
        }

        // Show good or bad information
        TrustQuestions.goodBad(infoQuestionBlock);

        // Show information question
        infoQuestionBlock.classList.add(TrustQuestions.classOpen);

        // Check if it's last question and we need to change Next button to Submit
        if (TrustQuestions.questionAllCounter === TrustQuestions.trustQuestionsItems.length + 3 - 1) TrustQuestions.changeButton();
    },
    getActiveQuestion: (items) => {
        let activeItem = null;

        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains(TrustQuestions.classOpen)) {
                activeItem = items[i];
            }
        }
        return activeItem;
    },
    sliderInit: () => {

        noUiSlider.create(TrustQuestions.questionSlider, {
            range: {
                min: 0,
                max: 100
            },
            start: [50],
            step: 50,
            pips: {
                mode: 'count',
                values: 3,
                format: {
                    to: function(a) {
                        return TrustQuestions.questionFormats[a];
                    }
                }
            }
        });

        // Add click event on slider values
        TrustQuestions.sliderPipsClick();

        // On change slider - change active input value
        TrustQuestions.sliderUpdateInput();
    },
    sliderPipsClick: () => {

        let pips = TrustQuestions.questionSlider.querySelectorAll('.noUi-value');

        function clickOnPip() {
            let value = Number(this.getAttribute('data-value'));
            TrustQuestions.questionSlider.noUiSlider.set(value);
        }

        for (let i = 0; i < pips.length; i++) {
            pips[i].addEventListener('click', clickOnPip);
        }
    },
    sliderUpdateInput: () => {

        TrustQuestions.questionSlider.noUiSlider.on('update', function (values, handle) {

            let value = Number(values[handle]);

            let activeInput = TrustQuestions.formInner.getElementsByClassName('open-js')[0].querySelector('input');

            activeInput.value = TrustQuestions.questionFormats[value].toLowerCase();
        });
    },
    sliderSetToDefault: () => {
        TrustQuestions.questionSlider.noUiSlider.set('50');
    },
    toggleSlider: (action) => {
        if (action === 'show') TrustQuestions.questionSliderContainer.classList.remove(TrustQuestions.classClose);
        if (action === 'hide') TrustQuestions.questionSliderContainer.classList.add(TrustQuestions.classClose);
    },
    changeButton: () => {
        document.getElementsByClassName('faq__more__container')[0].classList.add(TrustQuestions.classClose);
        TrustQuestions.submitButton.classList.remove(TrustQuestions.classClose);
    },
    updateCounter: () => {
        TrustQuestions.questionAllCounter++;

        // Change counter in Question's text
        TrustQuestions.trustQuestionsCounter.textContent = TrustQuestions.questionAllCounter + 1;
    },
    goodBad: (infoQuestionBlock) => {

        let goodBadItem = infoQuestionBlock.getElementsByClassName(TrustQuestions.questionResult)[0];

        if (goodBadItem) goodBadItem.classList.add(TrustQuestions.classOpen);
    },
    toggleTitles: (titleType, type) => {
        if (titleType === 'counter') {
            TrustQuestions.counterTitle.classList.remove(TrustQuestions.classClose);
            TrustQuestions.infoTitle.classList.remove(TrustQuestions.classOpen);
        } else {
            // Change title's text
            TrustQuestions.infoTitle.textContent = TrustQuestions.questionsInfoTitle[type];

            TrustQuestions.counterTitle.classList.add(TrustQuestions.classClose);
            TrustQuestions.infoTitle.classList.add(TrustQuestions.classOpen);
        }
    },
    validateFields: () => {
        // Get active info question
        let activeInfoQuestion = TrustQuestions.getActiveQuestion(TrustQuestions.trustQuestionsInfo);
        let activeInputs = activeInfoQuestion.querySelectorAll('input');

        TrustQuestions.validFields = true;

        for (let i = 0; i < activeInputs.length; i++) {
            if (activeInputs[i].value === '') {
                TrustQuestions.validFields = false;
                activeInputs[i].closest('div').classList.add(TrustQuestions.classError);
            }
        }
    },
    showContent: (type) => {
        TrustQuestions[type].classList.add(TrustQuestions.classOpen);
    },
    showSpinner: () => {
        TrustQuestions.submitButton.classList.add(TrustQuestions.classClose);
        TrustQuestions.form.classList.add(TrustQuestions.classNotAvailable);
    }
};

module.exports = TrustQuestions;
