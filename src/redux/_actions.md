### Reducers
## View

list => 'SET_LIST'
listType => 'SET_TYPE'
queries => 'NEW_QUERY'
info => 'SET_INFO'
sites => 'SET_SITES'

## Admin

Approvals => 'SET_APPROVALS'
Categories => 'SET_CATEGORIES'
Edit => 'SET_EDIT_SITE'
Languages => 'SET_LANGUAGES'
sites => 'SET_ADMIN_SITES'

### Sagas
## View

filterSaga - 'SUBMIT_QUERY' => 'SET_SITES'
    note: filterSaga handles parsing for sending over url