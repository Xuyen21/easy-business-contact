import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

function CalendarUI() {
    return (
        <div className="h-full">
            <Calendar localizer={localizer} startAccessor="start" endAccessor="end" />
        </div>
    );
}

export default CalendarUI;