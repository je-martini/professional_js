(function(){
    let color = 'green';
    function print_colot(){
        console.log(color);
    }
    print_colot();
})();

function make_color_printer(color){
    let color_message = `the color is ${color}`;

    return function(){
        console.log(color_message)
    }
}

let red_color_printer = make_color_printer('red')
console.log(red_color_printer())