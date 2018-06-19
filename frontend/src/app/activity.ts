export class Activity {
    id: number = 0;
    title: string;
    description: string;
    location: string;

    // @todo Replace with Date
    starts_at: Date = new Date;
    ends_at: Date = new Date;

    start: string = '';
    end: string = '';

    attachments = [];

    start_date_value: string;
    start_time_value: string;
    end_date_value: string;
    end_time_value: string;
}