import React from 'react';

const CarseatListFilterList = ({title, items, selectedValues, toggle}) => {
  return (
    <div className="d-flex flex-column bg-white rounded h-100">
      <small className="d-block text-uppercase border-bottom text-muted text-center py-1">
        {title}
      </small>
      <small className="d-block p-1 pl-2">
        {items.map((i, index) => {
          const isSelected = selectedValues.indexOf(i.id) > -1;

          return (
            <div key={index}>
              {/* eslint-disable-next-line */}
              <a
                className={isSelected ? 'filter-selected' : null}
                onClick={() => toggle(i.id)}
              >
                {isSelected ? (
                  <i className="far fa-check-square mr-1" />
                ) : (
                  <i className="far fa-square mr-1" />
                )}
                {i.name}
              </a>
            </div>
          );
        })}
      </small>
    </div>
  );
};

export default CarseatListFilterList;
