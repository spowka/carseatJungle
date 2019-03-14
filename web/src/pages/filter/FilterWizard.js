import React from 'react';
import FilterWizardStep from './FilterWizardStep.js';

function FilterWizard({currentStep}) {
  return (
    <div className="wizard-steps row mb-5 mt-3">
      <FilterWizardStep
        active={currentStep === 1}
        done={currentStep > 1}
        link="/filter"
        text="Type"
      />
      <FilterWizardStep
        active={currentStep === 2}
        done={currentStep > 2}
        link="/filter2"
        text="Rear-facing"
      />
      <FilterWizardStep
        active={currentStep === 3}
        done={currentStep > 3}
        link="/filter4"
        text="ISOFIX"
      />
      <FilterWizardStep
        active={currentStep === 4}
        done={currentStep > 4}
        link="/filter3"
        text="Swivel"
      />
      <FilterWizardStep
        active={currentStep === 5}
        done={currentStep > 5}
        link="/filter5"
        text="i-Size"
      />
    </div>
  );
}

export default FilterWizard;
