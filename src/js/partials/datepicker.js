import $ from 'jquery';
import datepicker from 'air-datepicker';

const Datepicker = {
    bindEvents: () => {
        const datepickerInput = $('.sib-form__input-datepicker');

        if (datepickerInput.length) {

            Datepicker.init(datepickerInput);
        }
    },

    init: (inputs) => {
        // Create lang config for 'English'
        $.fn.datepicker.language['en'] = {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yyyy',
            timeFormat: 'hh:ii aa',
            firstDay: 1
        };

        inputs.datepicker({
            language: 'en',
            minDate: new Date(),
            autoClose: true,
        });
    }
};

module.exports = Datepicker;
