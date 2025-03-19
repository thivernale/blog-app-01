import { Provider } from 'react-redux';
import { NameListRedux, SearchBox } from './NameListRedux';
import { store } from '../store/store';

function NameSearch() {
  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center justify-center gap-2">
      <Provider store={store}>
        <SearchBox />
        <NameListRedux />
      </Provider>
    </div>
  );
}

export default NameSearch;
