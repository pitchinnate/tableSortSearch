# Table Search Sort
A jquery plugin that allows you to easily add search and sort functionality to html tables.

### Installation
Make sure you include the javascript file.
```html
<script src="tableSortSearch.js"></script>
```

### Example Use
First tell jquery what table you are adding the feature to.
```js
$(document).ready(function(){
    $('#myTable').tableSortSearch();
});
```

##### Options
You can turn on/off searching and sorting by passing in an object.
```js
$(document).ready(function(){
    $('#myTable').tableSortSearch({
        search: true,
        sort: true
    });
});
```

tableSortSearch requires that your table uses `<thead>` with `<th>` and all your other rows are found in `<tbody>`.

Now simply tell tableSortSearch which columns you want `sortable` and `searchable` in your `thead` section. There is also an option for `sortable-numeric` which will convert the text in the columns into floats before sorting. Here is an example of you what your `thead` section may look like.

```html
<thead>
    <tr>
        <th class="sortable sortable-numeric searchable">User Id</th>
        <th class="searchable">Name</th>
        <th class="sortable">Created</th>
    </tr>
</thead>
```

Also lets say you want to sort by something other than what is actually displayed in your `<td>`'s html. You can simply add a `data-sort` attribute to it and that will be used for sorting instead. For example:

```html
<tr>
    <td data-sort='2017-01-01 01:01:01'>January 1, 2017</td>
</tr>
<tr>
    <td data-sort='2017-02-01 01:01:01'>February 1, 2017</td>
</tr>
```