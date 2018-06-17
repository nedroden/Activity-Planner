export function two_digits(input: number): string {
    return ('0' + (input)).slice(-2);
}

export function trigger_notification(element: string, message: string, timeout: number = 4000, type: string = 'danger') {
    let error_box = document.getElementById(element);

    error_box.classList.add('alert', 'alert-' + type);
    error_box.innerHTML = message;

    setTimeout(() => {
        error_box.innerHTML = '';
        error_box.classList.remove('alert', 'alert-' + type);
    }, timeout);
}