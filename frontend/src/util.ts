/**
 * Credits to https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers#8043061
 */
export function two_digits(input: number): string {
    return ('0' + (input)).slice(-2);
}

export function trigger_notification(element: string, message: string, timeout: number = 5000, type: string = 'danger') {
    let error_box = document.getElementById(element);

    error_box.classList.add('alert', 'alert-' + type);
    error_box.innerHTML = message;

    let hideFunc: Function = () => {
        error_box.innerHTML = '';
        error_box.classList.remove('alert', 'alert-' + type);
    };

    if (timeout !== -1)
        setTimeout(hideFunc, timeout);
    else
        timeout;
}