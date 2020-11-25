async function fetchMonthHolidays(year, month) {
    try {
        const url = `https://api.dryg.net/dagar/v2.1/${year}/${month}`;
        const result = await fetch(url);
        const data = await result.json();
        getMonthRedDays(data.dagar);
        getHolidays(data.dagar)
    } catch (error) {
        console.error(error);
    }
}