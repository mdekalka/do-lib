# $do library

## Development

### To query DOM selectors use:
`$do.el('selector')`
`$do.el('.container')`

### To handle event listener use:
`$do.el('selector').on('event', fn, capture)`
`$do.el('.container').on('click', function() {
    console.log('clicked');
}, false)`

### To handle off event listener use:
`$do.el('selector').off('event')`
`$do.el('.container').off('click')`

### To handle listener use:
`$do.listen.on('name', fn)`
`$do.listen.on('initErrorMessage', function() {
    console.log('error message called')
})`

### To run listener use:
`$do.listen.fire('name', fn)`
`$do.listen.fire('initErrorMessage')`