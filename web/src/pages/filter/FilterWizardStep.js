import React from 'react';
import {Link} from 'react-router-dom';

function FilterWizardStep({
  active = false,
  done = false,
  link = '',
  text = '',
}) {
  if (done) {
    return (
      <Link to={link} className="wizard-step done col-12 col-md">
        {text}
      </Link>
    );
  } else {
    return (
      <span className={`wizard-step ${active ? 'active' : ''} col-12 col-md`}>
        {text}
      </span>
    );
  }
}

export default FilterWizardStep;
