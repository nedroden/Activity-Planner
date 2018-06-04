export class Activity {
    id: number = 0;
    title: string;
    description: string;

    // @todo Replace with Date
    starts_at: Date;
    ends_at: Date;

    start: string = '';
    end: string = '';

    start_date_value: string = '';
    end_date_value: string = '';
}