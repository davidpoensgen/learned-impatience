
class impatience {
    constructor() {
        this.num_rounds = 105
        this.round = 0
        this.group = 1
        this.choice = []
        this.total_points = 0
        this.sequence = get_sequence(...shuffle([0,1,2,3,4,5]))
        this.container = $()
    }

    get_points(option){
        return [option + 4 + 2 * (-1)**(option+this.group+1), option + 4 + 2 * (-1)**(option+this.group)]
    }

    start_round(){

    }

}

function get_sequence(a,b,c,d,e,f){
    return [
        [f, f],[a, b],[c, d],[e, f],[a, a],[b, c],[d, e],[a, f],[c, c],[b, d],[a, e],[c, f],[d, d],[b, e],[a, c],[d, f],[b, b],[c, e],[a, d],[b, f],[e, e],
        [a, a],[d, c],[e, f],[b, a],[d, d],[c, e],[f, b],[d, a],[e, e],[c, f],[d, b],[e, a],[f, f],[c, b],[d, e],[f, a],[c, c],[e, b],[d, f],[c, a],[b, b],
        [d, d],[e, f],[b, c],[a, d],[e, e],[f, b],[c, a],[e, d],[b, b],[f, c],[e, a],[b, d],[c, c],[f, a],[e, b],[c, d],[f, f],[b, a],[e, c],[f, d],[a, a],
        [b, b],[c, e],[a, f],[d, b],[c, c],[e, a],[f, d],[c, b],[a, a],[e, f],[c, d],[a, b],[f, f],[e, d],[c, a],[f, b],[e, e],[a, d],[c, f],[e, b],[d, d],
        [c, c],[e, b],[f, d],[a, c],[e, e],[b, f],[d, a],[e, c],[f, f],[b, d],[e, a],[f, c],[d, d],[b, a],[e, f],[d, c],[b, b],[f, a],[e, d],[b, c],[a, a]
    ]
}
function shuffle(array){
    let m = array.length, t, i;
    while (m){
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array
}
