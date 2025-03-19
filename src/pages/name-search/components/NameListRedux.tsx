import { useDispatch, useSelector } from 'react-redux';
import { filteredNamesSelector, selectSearch, setSearch } from '../store/store';

export function SearchBox() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(event) => {
          dispatch(setSearch(event.target.value));
        }}
      />
    </div>
  );
}

export function NameListRedux() {
  const search = useSelector(selectSearch);

  const filterAndSortNames = useSelector(filteredNamesSelector);

  // const { data } = useGetNameQuery(undefined);
  // const filterAndSortNames = useMemo(() => processNames(data, search), [data, search]);

  return (
    <>
      <div>{search}</div>
      <ul>
        {(filterAndSortNames || []).map((item, idx) => (
          <li key={item + idx}>{item}</li>
        ))}
      </ul>
    </>
  );
}
