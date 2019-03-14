import React from 'react';

function FilterCard({
  columnClass = '',
  content = '',
  active = false,
  onClick = () => {},
}) {
  return (
    <div className={columnClass}>
      <button
        type="button"
        className={` btn btn-filter btn-block text-center py-3 ${
          active ? 'active' : ''
        }`}
        onClick={onClick}
      >
        {content}
      </button>
    </div>
  );
}

export default FilterCard;
