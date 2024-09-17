import classNames from 'classnames';
import { FilterType } from './types/FilterType';

type Props = {
  filtered: string;
  setFiltered: (selected: string) => void;
};

export const Filter: React.FC<Props> = ({ filtered, setFiltered }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterType).map((filterType, index) => (
        <a
          key={index}
          href="#/"
          className={classNames('filter__link', {
            selected: filtered === filterType,
          })}
          data-cy={`FilterLink${filterType}`}
          onClick={() => setFiltered(filterType)}
        >
          {filterType}
        </a>
      ))}
      {/* <a
        href="#/"
        className={classNames('filter__link', {
          selected: filtered === FilterType.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFiltered(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filtered === FilterType.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFiltered(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filtered === FilterType.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFiltered(FilterType.Completed)}
      >
        Completed
      </a> */}
    </nav>
  );
};
