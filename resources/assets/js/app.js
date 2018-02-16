// run all of the dummy functions

$(document).ready(function() {
    animate_inputs();
    fake_validation();
    bind_open();
    delete_note();
})

// animate input focus


function animate_inputs() {
    var input = $('.input-group > input');

    input.on('focus', function() {
        $(this).parent('.input-group').addClass('is--active');
    });

    input.on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent('.input-group').removeClass('is--active');
        }
    });
}

// fake validation

function fake_validation() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        var has_errors = false;
        $('.input-group.validate ').removeClass('is--error');
        $('.errors').hide();

        var inputs = $('form .input-group.validate > input');
        inputs.each(function(index) {
            if (!($(this).val() === $(this).attr('data-correct-value'))) {
                $(this).parent('.input-group.validate ').addClass('is--error');
                $('.errors').fadeIn();
                has_errors = true;
            }
        })
        if (!has_errors) {
            $('button[type=submit]').text('Logging in...');
            setTimeout(function() {
                window.location.replace("dashboard.html");
            }, 2000);
        }
    })
}

// global state

let state = {
    current_note: null,
}

function update_list_element() {
    var ref = $('[data-note-ref=' + state.current_note.id + ']');
    ref.find('strong')[0].innerHTML = state.current_note.title;
    ref.find('p')[0].innerHTML = state.current_note.body;
    ref.find('time')[0].innerHTML = state.current_note.time;
}

// toggle note

function toggle_note(id, self) {
    if (self != false) {
        state.current_note = {
            id: id,
            title: self.find('strong')[0].innerHTML,
            body: self.find('p')[0].innerHTML,
            time: new Date().toLocaleString(),
        };
    } else {
        state.current_note = {
            id: id,
            title: '',
            body: '',
            time: new Date().toLocaleString(),
        };
    }
    $('.not-selected-information').hide();
    $('.note').addClass('show');
    $('.note').find('.title input')[0].value = state.current_note.title;
    $('.note').find('.note__content textarea')[0].value = state.current_note.body;
}


// opening notes and displaying values to textarea and input


function open_note(id) {
    let ref = id;
    $('[data-note-ref=' + ref + ']').on('click', function() {
        $('[data-note-ref]').removeClass('is--active');
        toggle_note(ref, $(this))
        $(this).addClass('is--active');
    })
    $(".note__heading input[type='text']").change(function() {
        state.current_note.title = $(this).val();
        update_list_element();
    });
    $(".note__content textarea").change(function() {
        state.current_note.body = $(this).val();
        update_list_element();
    });
}

function bind_open() {
    // bind list with note
    $('[data-note-ref]').each(function() {
        open_note($(this).attr('data-note-ref'))
    });
}

// creating new note

function create_note() {
    let id = $('[data-note-ref]').length + 1;
    let template = `
    <li class="is--active" data-note-ref="${id}"><strong></strong>
        <time></time>
        <p></p>
    </li>
    `
    $('.notes-list').prepend(template);
    open_note(id)
    toggle_note(id, false)
}

// delete 

function delete_note() {
    $('.delete-note i').click(function() {
        $('[data-note-ref=' + state.current_note.id + ']').remove();
        $('.not-selected-information').show();
        $('.note').removeClass('show');
    })
}