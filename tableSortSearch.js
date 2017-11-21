(function($) {
    $.fn.tableSortSearch = function(options) {
        var searchColumns = {};
        var sortColumn = {
            index: null,
            sort: null,
            numeric: false
        };
        var settings = $.extend({
            search: true,
            sort: true
        }, options);
        var self = this;

        var tableSort = function() {
            self.find('thead th').each(function(i, v) {
                if ($(v).hasClass('sortable')) {
                    var numeric = $(v).hasClass('sortable-numeric');
                    $(v).html($(v).html() + "&nbsp;<div style='display:inline-block;margin:0px;padding:0px;'><i class='fa fa-angle-up sortDesc' style='cursor:pointer;' data-column='" + i + "' data-numeric='" + numeric + "'></i>" +
                        "<i class='fa fa-angle-down sortAsc' style='cursor:pointer;' data-column='" + i + "' data-numeric='" + numeric + "'></i></div>");
                    $(v).css('min-width', '50px');
                }
            });
            self.find('tbody tr').each(function(i, v) {
                $(v).data('tableSortSearchId', i);
            });
            bindSorts();
        };

        var bindSorts = function() {
            self.on('click', '.sortDesc', function() {
                sortColumn.sort = 'desc';
                sortColumn.index = $(this).data('column');
                sortColumn.numeric = $(this).data('numeric');
                updateSort();
            });
            self.on('click', '.sortAsc', function() {
                sortColumn.sort = 'asc';
                sortColumn.index = $(this).data('column');
                sortColumn.numeric = $(this).data('numeric');
                updateSort();
            });
        };

        var updateSort = function() {
            var allTrs = self.find('tbody tr');
            self.find('tbody').empty();
            if (sortColumn.index) {
                allTrs.sort(function(tr1, tr2) {
                    var tr1col = $(tr1).find('td')[sortColumn.index];
                    var tr2col = $(tr2).find('td')[sortColumn.index];

                    var tr1Sortable = $(tr1col).html();
                    var tr2Sortable = $(tr2col).html();

                    if ($(tr1col).data('sort') && $(tr1col).data('sort').length > 0) {
                        tr1Sortable = $(tr1col).data('sort');
                    }
                    if ($(tr2col).data('sort') && $(tr2col).data('sort').length > 0) {
                        tr2Sortable = $(tr2col).data('sort');
                    }
                    if (sortColumn.numeric) {
                        tr1Sortable = parseFloat(tr1Sortable);
                        tr2Sortable = parseFloat(tr2Sortable);
                    } else {
                        if (tr1Sortable && tr1Sortable.length > 0) {
                            tr1Sortable = tr1Sortable.toUpperCase();
                        }
                        if (tr2Sortable && tr2Sortable.length > 0) {
                            tr2Sortable = tr2Sortable.toUpperCase();
                        }
                    }

                    if (sortColumn.sort == 'asc') {
                        if (tr1Sortable < tr2Sortable) return -1;
                        if (tr1Sortable > tr2Sortable) return 1;
                    } else {
                        if (tr1Sortable > tr2Sortable) return -1;
                        if (tr1Sortable < tr2Sortable) return 1;
                    }
                    return 0;
                });
            }
            self.append(allTrs);
        };

        var tableSearch = function() {
            self.find('thead th').each(function(i, v) {
                if ($(v).hasClass('searchable')) {
                    searchColumns[i] = {
                        index: i,
                        name: $(v).html(),
                        search: ''
                    };
                    $(v).html($(v).html() + "<br><input type='text' class='form-control searchInput input-sm' data-index='" + i + "' placeholder='Search' style='padding:5px; height: 24px;' />");
                }
            });
            bindSearches();
        };

        var bindSearches = function() {
            self.find('.searchInput').on('change keyup paste', function() {
                searchColumns[$(this).data('index')].search = $(this).val();
                updateSearch();
            });
        };

        var updateSearch = function() {
            self.find("tbody tr").each(function(i, v) {
                var showRow = true;
                var columns = $(v).find('td').each(function(inc, val) {
                    if (searchColumns.hasOwnProperty(inc) && searchColumns[inc].search.length > 0) {
                        var currentValue = $(val).html().toUpperCase();
                        if (!currentValue.includes(searchColumns[inc].search.toUpperCase())) {
                            showRow = false;
                        }
                    }
                });
                if (showRow) {
                    $(v).show();
                } else {
                    $(v).hide();
                }
            });
        };

        if (settings.sort) {
            tableSort();
        }
        if (settings.search) {
            tableSearch();
        }
    };
}(jQuery));