$(function () {
    window.KeysApp = (function () {

        var searchParams = {
            customer_name: null,
            worker_id: null,
            limit: 5,
            offset: 0
        };

        var initialize = function () {
           $.ajax('/workers').done(setWorkerSearchOptions);
           $.ajax('/chart').done(addChart);
        };
        
        var addChart = function (data) {
            var ctx = document.getElementById("appartment-chart");
            var myChart = new Chart(ctx, data);
        };
        
        var setWorkerSearchOptions = function (workers) {
            var options = '<option value=""></option>';
            for (var i = 0; i < workers.length; ++i) {
                    options += '<option value="' + workers[i].id + '">' + workers[i].name + '</option>';
            }
            options = (options.length) ? '<select name="worker_id">' + options + '</select>' : '';
            $('select[name="worker_id"]').html(options);
        };
        
        var searchRecord = function () {
            var cutomerName = $('input[name="customer_name"]').val();
            var workerId = $('select[name="worker_id"]').val();
            searchParams.customer_name = cutomerName;
            searchParams.worker_id = workerId;
            searchParams.offset = 0;
            $.ajax('/search', { data: searchParams }).done(setSearchOutput);
        };
        
        var setSearchOutput = function (data) {            
            if (!searchParams.offset) {
                if (!data || data.length === 0) {
                    $('#search-output').html('<div>Nothing found</div>');
                    return;
                }
            } else {
                if (!data || data.length === 0) {
                    $('#load-more-button').hide();
                    return;
                }
            }               
            var content = getHeader(searchParams.offset);
            for (var i = 0; i < data.length; ++i) {
                content += '<tr>' +
                    "<td>" + data[i].date + "</td>" +
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].worker.name + "</td>" +
                    "<td>" + data[i].key.customer.name + "</td>" +
                    "<td>" + data[i].key.apartment.number + "</td>" +
            '</tr>';
            }
            var loadMore = (data.length % searchParams.limit === 0) ? '<div class="button" id="load-more-button" onclick="window.KeysApp.loadMore()">Load more</div>': '';
            var searchOutputTable = [
                '<table border="1">', 
                content, 
                '</table>',
                loadMore
            ].join('');
            $('#search-output').html(searchOutputTable);
        };

        var getHeader = function (hasPreviousResult) {
            var content = '';
            if (hasPreviousResult) {
                content = $('#search-output>table').html();

            } else {
                content = '<tr>' +
                    '<td>Date</td>' +
                    '<td>Id key</td>' +
                    '<td>Worker Name</td>' +
                    '<td>Customer Name</td>' +
                    '<td>Appartment Number</td>' +
                    '</tr>';
            }
            return  content;
        }
        
        var addRecord = function () {
            var customerName = $('form[action="record"] > input[name="customer_name"]').val();
            var workerName = $('input[name="worker_name"]').val();
            var appartmentNumber = $('input[name="appartment_number"]').val();
            var keyName = $('input[name="key_name"]').val();
            var record = {
                customer_name: customerName,
                worker_name: workerName,
                appartment_number: appartmentNumber,
                key_name: keyName
            };
            $.ajax('/record', {
                method: 'POST',
                data: record
            }).done(setAddMessage);
        };
        
        var setAddMessage = function (data) {
            var message = (data.success) ? 'Record added' : 'Failed to add record';
            $('#post-record-message').text(message);
        };

        var loadMore = function () {
            searchParams.offset += searchParams.limit;
            $.ajax('/search', { data: searchParams }).done(setSearchOutput);
        }
        
        initialize();
        
        return {
            searchRecord: searchRecord,
            addRecord: addRecord,
            loadMore: loadMore
        };
    })();
});
