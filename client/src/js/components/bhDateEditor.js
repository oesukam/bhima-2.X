angular.module('bhima.components')
  .component('bhDateEditor', {
    templateUrl : 'modules/templates/bhDateEditor.tmpl.html',
    controller : bhDateEditorController,
    bindings : {
      dateValue : '<', // one-way binding
      onChange : '&',
      minDate : '<?',
      maxDate : '<?',
      allowFutureDate : '<?',
      validationTrigger : '<?',
      disabled : '<?',
      dateFormat : '@?',
      label : '@?',
    },
  });

bhDateEditorController.$inject = ['bhConstants'];

/**
 * bhDateEditor Component
 *
 * A component to deal with date, it lets a user choose a date by either typing
 * into an <input> or clicking a calendar dropdown.  It wraps the
 * uib-date-picker to provide the dropdown calendar functionality.
 *
 * @example
 * <bh-date-editor
 *  date-value="Ctrl.date"
 *  on-change="Ctrl.onDateChange(date)"
 *  date-format="'yyyy-MM-dd'"
 *  min-date="Ctrl.min"
 *  max-date="Ctrl.max"
 *  validation-trigger="Form.$submitted"
 *  disabled="Ctrl.isDisabled">
 * </bh-date-editor>
 *
 * @module components/bhDateEditor
 */
function bhDateEditorController(bhConstants) {
  const $ctrl = this;

  $ctrl.editMode = false;
  $ctrl.dateFormat = bhConstants.dayOptions.format;

  $ctrl.$onInit = () => {
    $ctrl.label = $ctrl.label || 'FORM.LABELS.DATE';
    $ctrl.allowFutureDate = $ctrl.allowFutureDate || false;
    // options to be passed to datepicker-option
    $ctrl.options = {
      minDate : $ctrl.minDate,
    };
    if (!$ctrl.allowFutureDate) {
      $ctrl.options.maxDate = $ctrl.maxDate || new Date();
    }
  };

  // fires the onChange() callback
  $ctrl.onDateChange = () => {
    if (!$ctrl.allowFutureDate) {
      const dt = (typeof $ctrl.dateValue === 'string') ? new Date($ctrl.dateValue) : $ctrl.dateValue;
      const check = new Date() >= dt;
      if (!check) {
        delete $ctrl.dateValue;
      }
    }
    $ctrl.onChange({ date : $ctrl.dateValue });
  };

  // opens/closes the date dropdown
  $ctrl.toggleEditMode = () => {
    $ctrl.editMode = !$ctrl.editMode;
  };
}
