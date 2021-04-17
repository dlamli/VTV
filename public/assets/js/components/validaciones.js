$(() => {
    $('.nombre').keydown((e) => {
        if (e.shiftKey || e.ctrlKey || e.altKey) {
            e.preventDefault();
        } else {
            let key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            };
        };
    });


    $('.usuario').keydown((e) => {
        if (e.shiftKey || e.ctrlKey || e.altKey) {
            e.preventDefault();
        } else {
            let key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            };
        };
    });

});


$(() => {

    $("input[name='tel']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $("input[name='cedula']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $("input[name='codeKilometraje']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

});