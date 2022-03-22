class LearnedImpatience {
    constructor() {
        this.num_rounds = 105;
        this.round = 0;
        this.round_display = $('.round span');
        this.group = 1;
        this.choice = [];
        this.total_points = 0;
        this.points_display = $('.score');
        this.points_array = Array(this.num_rounds).fill([null, null]);
        this.sequence = get_sequence(...shuffle([0, 1, 2, 3, 4, 5]));
        this.container = $('.impatience-container');
        this.colors = shuffle(['btn-default', 'btn-primary', 'btn-info', 'btn-success', 'btn-warning', 'btn-danger']);
        this.left = null;
        this.right = null;
        this.left_button = null;
        this.right_button = null;
        this.timer_frame = $('.timer_frame');
        this.penalty = 5;
    }

    get_points(option) {
        return [option + 4 + 2 * (-1) ** (option + this.group + 1), option + 4 + 2 * (-1) ** (option + this.group)];
    }

    choose(side) {
        this.pause_timer();
        let chosen_button, foregone_button;
        if (side === 'left') {
            chosen_button = this.left_button;
            foregone_button = this.right_button;
            this.choice.push(this.sequence[this.round][0]);
        } else if (side === 'right') {
            chosen_button = this.right_button;
            foregone_button = this.left_button;
            this.choice.push(this.sequence[this.round][1]);
        }

        this.points_array[this.round] = this.get_points(this.choice[this.round]);
        this.points_array[this.round][0] += get_random_int(1, 4);
        this.points_array[this.round][1] += get_random_int(1, 4);

        // button movement
        foregone_button.addClass('fadeout off');
        chosen_button.parent().addClass('chosen');
        chosen_button.addClass('off movedown');
        $('.history0').addClass('movedown_hist');
        $('.history1').addClass('movedown_hist2');
        $('.pop').toggleClass('pop unpop');

        // points
        setTimeout(() => {
            chosen_button.html($('<div class="pop"></div>').html(this.points_array[this.round][0]));
            setTimeout(() => {
                this.add_points(this.points_array[this.round][0]);
            }, 400);
            if (this.round > 0) {
                $('.history0 .btn').html($('<div class="pop"></div>').html(this.points_array[this.round - 1][1]));
                setTimeout(() => {
                    this.add_points(this.points_array[this.round - 1][1]);
                }, 650);
            }
        }, 1200);

        // cleanup, next round
        setTimeout(() => {
            foregone_button.parent().remove();
            $('.history1').remove();
            $('.history0').removeClass('history0 movedown_hist').addClass('history1');
            chosen_button.parent().addClass('history0').removeClass('chosen option-left option-right');
            this.round += 1;
            setTimeout(() => {
                this.round_display.html(this.round + 1);
            }, 100);
            this.start_round();
        }, 2800);

    }

    start_timer() {
        let old_timer_bar = this.timer_frame.find('.timer_bar');
        setTimeout(() => {
            old_timer_bar.remove();
        }, 500);
        this.timer_frame.append($('<div class="timer_bar"></div>'));
        this.timeout = setTimeout(() => {
            if (Math.random() > 0.5) {
                this.choose('left');
            } else {
                this.choose('right');
            }
            this.add_points(-this.penalty);
            this.container.addClass('timeout_strike');
            setTimeout(() => {
                this.container.removeClass('timeout_strike');
            }, 300);
        }, 10000);
    }

    pause_timer() {
        this.timer_frame.find('.timer_bar').css("animation-play-state", "paused");
        clearTimeout(this.timeout);
    }

    add_points(increment) {
        let feedback;
        this.total_points += increment;
        this.points_display.html(this.total_points);
        if (increment > 0) {
            feedback = $('<div class="points_added"></div>').html('+' + increment).appendTo(this.container);
        } else if (increment < 0) {
            feedback = $('<div class="points_added penalty"></div>').html(increment).appendTo(this.container);
        }
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }

    start_round() {
        this.left = this.sequence[this.round][0];
        this.right = this.sequence[this.round][1];
        this.left_button = $('<button class="btn"></button>').addClass(this.colors[this.left]).click(() => {
            this.choose('left');
        });
        this.right_button = $('<button class="btn"></button>').addClass(this.colors[this.right]).click(() => {
            this.choose('right');
        });
        this.container.append($('<div class="option-left"></div>').append(this.left_button));
        this.container.append($('<div class="option-right"></div>').append(this.right_button));
        setTimeout(() => {
            this.start_timer();
        }, 250);
    }
}

function get_sequence(a, b, c, d, e, f) {
    // pre-randomized sequence in accordance with game rules
    let sequence = [
        [f, f], [a, b], [c, d], [e, f], [a, a], [b, c], [d, e], [a, f], [c, c], [b, d], [a, e], [c, f], [d, d], [b, e], [a, c], [d, f], [b, b], [c, e], [a, d], [b, f], [e, e],
        [a, a], [d, c], [e, f], [b, a], [d, d], [c, e], [f, b], [d, a], [e, e], [c, f], [d, b], [e, a], [f, f], [c, b], [d, e], [f, a], [c, c], [e, b], [d, f], [c, a], [b, b],
        [d, d], [e, f], [b, c], [a, d], [e, e], [f, b], [c, a], [e, d], [b, b], [f, c], [e, a], [b, d], [c, c], [f, a], [e, b], [c, d], [f, f], [b, a], [e, c], [f, d], [a, a],
        [b, b], [c, e], [a, f], [d, b], [c, c], [e, a], [f, d], [c, b], [a, a], [e, f], [c, d], [a, b], [f, f], [e, d], [c, a], [f, b], [e, e], [a, d], [c, f], [e, b], [d, d],
        [c, c], [e, b], [f, d], [a, c], [e, e], [b, f], [d, a], [e, c], [f, f], [b, d], [e, a], [f, c], [d, d], [b, a], [e, f], [d, c], [b, b], [f, a], [e, d], [b, c], [a, a]
    ];
    for (let i = 0; i < sequence.length; i++) {
        sequence[i] = shuffle(sequence[i]);
    }
    return sequence;
}

function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
