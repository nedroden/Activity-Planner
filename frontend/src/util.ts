export function two_digits(input: number): string {
    return ('0' + (input)).slice(-2);
}

export function trigger_error(element: string, message: string, fadeout: number = 4000) {
    let error_box = document.getElementById(element);

    error_box.classList.add('alert', 'alert-danger');
    error_box.innerHTML = message;

    setTimeout(() => {
        error_box.innerHTML = '';
        error_box.classList.remove('alert', 'alert-danger');
    }, fadeout);
}