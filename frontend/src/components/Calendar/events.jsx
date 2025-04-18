const events = [
    {
        title: 'Event 1',
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
        title: 'Event 2',
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 1).setHours(new Date().getHours() + 1)),
    }
];
export default events;